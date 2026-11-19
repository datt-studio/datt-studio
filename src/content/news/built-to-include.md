---
title: "Built to include"
date: 2026-11-19
summary: "How we built this site for more people: motion control on arrival, clear touch targets, a readable page order, measured contrast, and a layout that holds on older devices."
draft: false
cover: /news/accessibility1.webp
coverAlt: "The DATT Studio footer with the TURN OFF MOTION control visible beside the privacy links."
---

We think about who is using the site before we think about how it looks. That affects the type, the spacing, the colour, the order of the page, and the way it moves. We did this work while we could, before more work made proper adjustment harder. This is what we built, and why.

## You can turn motion off straight away

When someone lands on the site for the first time, the cookie banner appears two seconds later. Beside Privacy & Cookie Policy there is a button: Turn off motion. It works before any cookie choice is made, and it works whether cookies are accepted or rejected.

We put it there for a reason. For some people, motion on a page is enough to make them leave. We did not want that control hidden in a settings page, and we did not want it waiting behind a cookie decision. It needed to be available on arrival.

<figure>
  <img src="/news/accessibility2.webp" alt="The cookie banner with the TURN OFF MOTION switch beside the Privacy &amp; Cookie Policy link." width="1600" height="900" loading="lazy" decoding="async" />
  <figcaption>The motion switch sits in the cookie banner, before any consent choice is made.</figcaption>
</figure>

The button is a switch. Press it and it reads Turn motion on. Press it again and motion returns.

The same control is in the footer, on the Accessibility Statement, and on error pages. Turning it off stops animations and transitions, pauses any video already playing, and saves the choice in the browser. Change it in one place and the others follow, including a second tab. If someone has already asked their device for less motion, we respect that too.

When motion is off, the page still works as a whole. Animations and transitions drop away, smooth scrolling stops, and the line-by-line text reveals do not run. The content is simply there.

## Touch targets sized for real use

In the mobile menu, the main rows are 48px tall and full width, with space between them. That gives a thumb room to hit the right link. The secondary rows in that menu, including social links, are 36px. The legal and social links in the footer use the same 36px row on smaller screens.

WCAG 2.2 Level AA sets the minimum target size at 24px. We went higher for the main navigation because a mis-tap there sends someone to the wrong place.

## A page order that makes sense

The page is built in the order it is read: header, content, share row, footer. Tabbing follows the same path.

Interactive elements behave like what they are. Links are links. The motion control and share actions are buttons. Each share icon has a name a screen reader can read, such as Share on LinkedIn, not just the letters shown on screen. When Instagram copies the link, a status message announces Link copied so the result is not only visual.

<figure>
  <img src="/news/accessibility3.webp" alt="The selected state visible while tabbing through the site navigation." width="1600" height="900" loading="lazy" decoding="async" />
  <figcaption>Focus stays visible as the keyboard moves through selected controls.</figcaption>
</figure>

Headings follow a clear structure: one `h1` per page, `h2` for sections, `h3` beneath. In comparison tables, the label on the left is marked as a row header so a screen reader can tell what each figure refers to. Images have alt text that describes them. Decorative elements are hidden from assistive technology.

## Colour checked by numbers

We chose the palette, then measured it. A colour can look fine on a studio screen and be hard to read on a phone in daylight, so we checked contrast ratios rather than relying on how it felt.

The live site is dark. On dark pages, body copy is `#B4B4B4` on `#000000`, 10.1:1, and quieter labels are `#7E7E7E`, 5.2:1. In the cookie banner, secondary links are `#808080` on `#0A0A0A`, 5.0:1. The Share label and the Link copied confirmation sit at `#808080` on black, 5.3:1.

The light palette is retained as a fallback and for future iterations of the site: body copy `#131313` on `#FAFAFA`, 17.8:1, and the grey email link `#5F5F5F` on the same background, 6.1:1.

<figure>
  <img src="/news/accessibility4.webp" alt="The dark palette and the light fallback, with hex values and contrast ratios beside each colour pair." width="1600" height="900" loading="lazy" decoding="async" />
  <figcaption>Contrast ratios are written beside each colour pair, not judged by eye.</figcaption>
</figure>

WCAG 2.2 AA asks for 4.5:1 for normal text and 3:1 for large text. Every pair above meets the higher bar. The point is simple: we can check these choices again later, and so can anyone else.

## Built to hold up on older devices

We built the site to work on the device someone already has. The layout starts at 320px and scales with the viewport. Type is fluid, with a separate step for tablets between 768 and 1023px so headings do not jump to desktop size too early.

The hero video does not download until it is needed. It uses a poster and `preload="none"`, and it only warms up on devices with a fine pointer and motion left on. On a slower phone connection, the page loads the headline, the text, and the poster first.

Images below the fold load lazily and decode off the main thread. The font is a self-hosted subset with `font-display: swap`, so text stays readable before the font arrives.

Hover effects only apply where a device actually has hover. A touch screen does not get stuck with a hover state it cannot clear. Motion remains optional across the site.

## We keep checking

We do not treat accessibility as finished. We checked the site against WCAG 2.2 Level A and AA, then added best-practice checks for names, landmarks and page structure. The Accessibility Statement sets WCAG 2.2 Level AA as our target and gives people a way to tell us when something does not work. A standard is only useful if there is a clear way to report a problem.

Where we find an issue, we fix it and say so. That is the approach we are taking here: make the site easier to use for more people, and keep improving it as we go.
