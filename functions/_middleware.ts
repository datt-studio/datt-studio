export const onRequest: PagesFunction = async (context) => {
  try {
    // 1. Let the request continue to your site
    const response = await context.next();

    // 2. If the response is a server error (500-504)
    if (response.status >= 500 && response.status <= 504) {
      // We try to fetch the specific custom page you built (e.g., /500 or /503)
      const errorPage = await context.env.ASSETS.fetch(new URL(`/${response.status}`, context.request.url));

      // Return your custom page with the original error status code
      return new Response(errorPage.body, {
        ...errorPage,
        status: response.status,
        headers: {
          ...errorPage.headers,
          'content-type': 'text/html;charset=UTF-8',
        },
      });
    }

    return response;
  } catch (err) {
    // 3. Catch-all: If the middleware itself or the site crashes completely
    // Show your custom 500 page
    const errorPage = await context.env.ASSETS.fetch(new URL('/500', context.request.url));
    return new Response(errorPage.body, {
      status: 500,
      headers: {
        'content-type': 'text/html;charset=UTF-8',
      },
    });
  }
};
