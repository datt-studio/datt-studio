---
title: "Built to include"
date: 2026-10-26
summary: "The accessibility decisions in this build: touch targets, keyboard order, measured contrast, a motion switch offered on arrival, and a layout that holds on older devices."
draft: true
---

Inclusion is a set of decisions, not a feature added at the end. Every choice in a site either opens it to someone or closes it. These are the choices we made in this one, and the reasons behind them.

## The first choice is yours

A first-time visitor sees the cookie banner two seconds after landing. Beside Privacy & Cookie Policy sits Turn off motion. It works before any cookie decision is made, and it works whether cookies are accepted or rejected.

That placement is deliberate. Motion is the thing most likely to end a visit early for someone with a vestibular disorder. Asking them to find a settings page, or to accept cookies first, puts the exit behind two doors. So the control sits in the first thing they see, and it says what it does.

The button is a switch, not a one-way door. Press it and it reads Turn motion on. Press it again and the site moves as it did before.

The same control lives on the Accessibility Statement. It turns off every animation and transition, pauses any video already playing, and is remembered in the browser. Change it in one place and the other follows, including a second tab. The operating system preference is respected too, so a visitor who has already asked their device for less motion gets it without touching ours.

When motion is off, nothing is left half finished. Animation and transition durations fall to almost zero, smooth scrolling stops, and the line-by-line text reveals are skipped so the copy is simply there. A reduced experience is not a reduced page.

## Touch targets are sized for a thumb

The rows in the mobile menu are 48px tall and full width, with real space between them, so a thumb cannot land on the neighbouring link. The secondary rows in that menu, the social links, are 36px. The legal and social links in the footer use the same 36px row below the desktop breakpoint.

WCAG 2.2 sets the minimum target at 24px. We put the primary navigation well above it, because the menu is where a mis-tap costs the most. A target is not only a size on a screen. It is the difference between arriving somewhere and starting again.

## The order you can follow

The page is built in the order it is read: header, article, share row, footer. Tab follows the same path. Nothing that looks interactive is a plain box. Links are links, the motion control and the share actions are buttons, and each share icon carries a name a screen reader can read, such as Share on LinkedIn, rather than the abbreviation printed on screen. When Instagram copies the link, a status message announces Link copied, so the confirmation is not only visual.

Headings carry the structure. One `h1` per page, `h2` for sections, `h3` beneath. In the comparison tables, the label down the left is marked as a row header, so a screen reader announces what each figure belongs to instead of reading a row of numbers with no subject. Images carry alt text that describes them. Decorative pieces are hidden from the accessibility tree rather than described as decoration.

## Colour is measured, not judged

The palette was chosen, then measured. A colour can look resolved on a studio screen and fail on a phone in daylight, so we worked to ratios rather than to taste alone.

On the light pages, body copy is `#131313` on `#FAFAFA`, 17.8:1. The grey email link is `#5F5F5F` on the same background, 6.1:1. On the black pages, body copy is `#B4B4B4` on `#000000`, 10.1:1, and the quieter labels sit at `#7E7E7E`, 5.2:1. In the cookie banner, the secondary links are `#808080` on `#0A0A0A`, 5.0:1.

WCAG 2.2 AA asks for 4.5:1 for normal text and 3:1 for large text. Every pair above clears the higher bar. The numbers matter less than what they make possible. They mean the decision can be checked by anyone, including us, long after the page is finished.

## Made for the device you already have

The site is built to hold on the device someone owns, not the one on the desk in the studio. The layout starts at 320px and scales with the viewport rather than switching between fixed widths. Type is fluid, with a separate step for tablets between 768 and 1023px, so a headline does not arrive at desktop size on a small screen.

The hero video is not downloaded until it is needed. It ships with a poster and `preload="none"`, and only warms on a device with a fine pointer and motion left on. A phone on a slow connection pays for the headline, the type and the poster, not for a film it did not ask to see. Images below the fold load lazily and decode off the main thread. The font is a self-hosted subset with `font-display: swap`, so text is readable before the font lands.

Hover is treated as an enhancement. Effects that depend on a cursor sit behind a check for a device that actually has one, so a touch screen never inherits a hover state it cannot clear. Motion stays optional throughout. The page holds on an older phone because the weight arrives in the order it is needed.

## Inclusion is a design decision

None of this is a certificate. Accessibility is not a state a site reaches and keeps. It is the habit of asking who is not in the room while the work is being made.

The Accessibility Statement names WCAG 2.2 Level AA as the target, and it gives a route to tell us when we miss it. That route matters as much as the target. A standard without a way to report a failure is only a claim.

We think about inclusion in the type, the spacing, the colour, the order of the page and the way it moves. We think about it when a control is placed and when a sentence is written. Where we find something that does not hold, we fix it and say so.

That is what inclusion means here. Not a page about accessibility. A site that assumes everyone is coming.
