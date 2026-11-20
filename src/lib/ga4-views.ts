/* Build-time GA4 page-view counts.

   The site is static, so view figures are read once when the site is built and
   baked into the article pages. We use a Google service account with the GA4
   Data API. No new package is needed: the OAuth2 assertion is a JWT signed with
   Node's built-in crypto.

   Credentials are never committed. Set one of these in the build environment:

     GA4_SERVICE_ACCOUNT_JSON   base64-encoded service account JSON key
     GOOGLE_APPLICATION_CREDENTIALS   path to the service account JSON key

   GA4_PROPERTY_ID can be set to override the property below. If no credential
   is available we return an empty map and the article simply omits the count. */

const PROPERTY_ID = process.env.GA4_PROPERTY_ID || '523773273';
const TOKEN_URI = 'https://oauth2.googleapis.com/token';
const DATA_URI = `https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}:runReport`;

type ServiceAccount = {
  client_email: string;
  private_key: string;
  token_uri?: string;
};

function decodeBase64(value: string): string {
  return typeof Buffer !== 'undefined'
    ? Buffer.from(value, 'base64').toString('utf8')
    : atob(value);
}

function base64Url(value: string | Buffer): string {
  const bytes = typeof value === 'string' ? Buffer.from(value) : value;
  return bytes.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function readServiceAccount(): ServiceAccount | null {
  const inline = process.env.GA4_SERVICE_ACCOUNT_JSON;
  if (inline) {
    try {
      return JSON.parse(decodeBase64(inline)) as ServiceAccount;
    } catch {
      console.warn('[ga4] GA4_SERVICE_ACCOUNT_JSON is not valid base64 JSON.');
      return null;
    }
  }

  const filePath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (filePath) {
    try {
      // Lazy require keeps this module from breaking client-side bundles.
      const fs = require('node:fs') as typeof import('node:fs');
      return JSON.parse(fs.readFileSync(filePath, 'utf8')) as ServiceAccount;
    } catch {
      console.warn('[ga4] Could not read GOOGLE_APPLICATION_CREDENTIALS.');
      return null;
    }
  }

  return null;
}

async function getAccessToken(account: ServiceAccount): Promise<string | null> {
  try {
    const crypto = await import('node:crypto');
    const now = Math.floor(Date.now() / 1000);
    const header = { alg: 'RS256', typ: 'JWT' };
    const claim = {
      iss: account.client_email,
      scope: 'https://www.googleapis.com/auth/analytics.readonly',
      aud: account.token_uri || TOKEN_URI,
      iat: now,
      exp: now + 3600,
    };
    const unsigned = `${base64Url(JSON.stringify(header))}.${base64Url(JSON.stringify(claim))}`;
    const signer = crypto.createSign('RSA-SHA256');
    signer.update(unsigned);
    signer.end();
    const signature = signer.sign(account.private_key);
    const assertion = `${unsigned}.${base64Url(signature)}`;

    const res = await fetch(account.token_uri || TOKEN_URI, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion,
      }),
    });
    if (!res.ok) {
      console.warn(`[ga4] Token request failed: ${res.status} ${await res.text()}`);
      return null;
    }
    const json = (await res.json()) as { access_token?: string };
    return json.access_token ?? null;
  } catch (error) {
    console.warn('[ga4] Could not create access token.', error);
    return null;
  }
}

function normalise(path: string): string {
  return path.split('?')[0].replace(/\/+$/, '') || '/';
}

let cache: Promise<Record<string, number>> | undefined;

async function fetchViews(): Promise<Record<string, number>> {
  const account = readServiceAccount();
  if (!account) {
    console.warn('[ga4] No service account found. Article view counts are omitted.');
    return {};
  }

  const token = await getAccessToken(account);
  if (!token) return {};

  try {
    const res = await fetch(DATA_URI, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        dateRanges: [{ startDate: '2020-01-01', endDate: 'today' }],
        dimensions: [{ name: 'pagePath' }],
        metrics: [{ name: 'screenPageViews' }],
        limit: 100000,
      }),
    });

    if (!res.ok) {
      console.warn(`[ga4] Data API request failed: ${res.status} ${await res.text()}`);
      return {};
    }

    const json = (await res.json()) as {
      rows?: Array<{ dimensionValues?: Array<{ value?: string }>; metricValues?: Array<{ value?: string }> }>;
    };

    const totals: Record<string, number> = {};
    for (const row of json.rows ?? []) {
      const path = normalise(row.dimensionValues?.[0]?.value ?? '');
      const count = Number(row.metricValues?.[0]?.value ?? 0);
      if (path && Number.isFinite(count)) totals[path] = (totals[path] ?? 0) + count;
    }
    return totals;
  } catch (error) {
    console.warn('[ga4] Could not read GA4 report.', error);
    return {};
  }
}

export async function getArticleViews(paths: string[]): Promise<Record<string, number>> {
  if (!paths.length) return {};
  cache ??= fetchViews();
  const totals = await cache;

  const result: Record<string, number> = {};
  for (const path of paths) {
    const key = normalise(path);
    result[path] = totals[key] ?? 0;
  }
  return result;
}

/* 850 -> "850", 1400 -> "1.4K", 1000000 -> "1M". */
export function formatViews(count: number): string {
  if (count < 1000) return `${count}`;
  if (count < 1_000_000) {
    const value = count / 1000;
    return `${Number.isInteger(value) ? value : value.toFixed(1)}K`;
  }
  const value = count / 1_000_000;
  return `${Number.isInteger(value) ? value : value.toFixed(1)}M`;
}
