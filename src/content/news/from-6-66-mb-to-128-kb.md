---
title: "From 6.66 MB to 128 KB"
date: 2026-09-29
summary: "What changed, what it cost, and what the numbers look like afterwards."
draft: false
cover: /assets/news/performance-cover.webp
coverAlt: "Performance measurements taken while the homepage was being rebuilt."
---

The homepage used to transfer 6.66 MB on a phone. It now transfers 128,563 B — 125.5 KiB, or 128.6 KB in the decimal units the headline uses. This is what happened in between, what we left in place on purpose, and what we would do differently.

## Where it started

The first version of this site was a portfolio with a full-screen video hero, a page of case studies and a header that floated above the work. It looked right and it was heavy.

Most of the weight sat in three places. An unoptimised hero video that loaded on page view, fonts pulled from a third-party CDN covering every glyph the font designer shipped, and the hero poster as a large JPEG. Every one of those was a decision someone made and nobody revisited.

What the browser transfers during a page load can differ from total file sizes — especially for large media that may not fully buffer during measurement. The headline figure reflects what was transferred, not the total asset weight.

The scores were not a mystery. They were the arithmetic of those files.

## The video

The hero reel loaded immediately and competed for bandwidth on slower connections. We re-encoded it and the related videos with a quality target that preserved the work while cutting their size substantially.

We did not take it further, and that was a decision rather than an oversight. The reel is the work, and the quality of the work is the thing the rest of this site exists to make visible. Compression has a floor and we stopped above it instead of crossing it. A site that is fast and shows worse work is not a better studio.

The hero poster moved to a more efficient format so the page paints a real image without adding unnecessary weight.

Hover-triggered preview clips are loaded only on interaction, never on initial page load.

## The fonts

This part was wrong when we first wrote it, so it is worth being exact about what actually changed.

We moved fonts to self-hosted subsets so only the characters needed for each page are loaded. This removed third-party font requests from the critical path.

## Rendering

The headline was being built in JavaScript from a data attribute. The words existed on the page, but not in the document until a script ran, which meant nothing to render until that script parsed, and nothing for a crawler to read at all.

The text is now in the markup. The animation still runs, and the hero still looks the same, but the page has its words before a single script executes.

## The motion was changed twice

The text on this site did not arrive the way it looks now.

The first version blurred each line in and rotated it up at an angle. It looked considered in a still. In use it was slow, and on a long page the cost compounded with every section. A reader scrolling the page waited on the animation more than they read.

The second version dropped the angle and simplified to a straight rise from a clipped mask. That is what is here now, and it exists because the first two were wrong for the job rather than because the third was prettier.

Reduced motion is respected. The accessibility statement on this site sets out a motion preference, and the whole reveal system is disabled under it. That was a requirement from the start rather than something added after the first complaint.

## The page that moved itself

The footer used to pull. When the line at the bottom of the footer links came on screen, the page was carried the rest of the way down, so that the wordmark at the very bottom could not be scrolled past unnoticed. It was a small thing, it was on the homepage only, and it is gone.

It went for one reason: on a phone it did not read as an intention. A reader who threw the list downwards was still coasting when the line crossed the screen, so the page was being commanded to a position while the finger was still decelerating it. What that looks like is the scroll catching. Two things owning the scroll position at once, and the reader watching their own input lose.

We tried to make it well behaved before we removed it. It learned to wait for the page to stop, and then to leave the page alone entirely if the wordmark was already in view, which is the only case the pull ever existed for. Both fixes verified clean — navigating off the homepage no longer moved the page we landed on, on two engines, at two sizes, over several hops. It was still a page that could move without being asked, and that is the part we could not design away. So it came out, from every page, along with the per-page switch that used to control it, since that switch was the thing that left room for it to behave inconsistently in the first place.

What stayed is the footer's own arrival. The links, the wordmark and the copyright still come in line by line when the footer reaches the screen, because that is the reader's own scroll doing the arriving.

We can now say something we could not say before, which is that nothing on this site scrolls the page. We checked by wrapping `scrollTo` before any of our code runs and recording every call: reading the homepage to the bottom, navigating to another page, then scrolling back up produces zero programmatic scrolls, on two engines, at two sizes. The page ends where the reader put it.

## The navigation was made smaller on purpose

The header started with a blurred background and a heavier treatment. It was the current idiom and it looked right in isolation.

It was wrong for a studio whose position is clarity. A translucent, floating navigation carries more visual weight than the work it sits above, and on scroll it competes with content. It went back to a flat header, stripped to the essentials, with the hover states doing only the minimum.

## What it weighs now

<table>
<thead>
<tr><th></th><th scope="col">Before</th><th scope="col">After</th></tr>
</thead>
<tbody>
<tr><th scope="row">Transferred, mobile</th><td>6.66 MB</td><td>128,563 B (125.5 KiB)</td></tr>
<tr><th scope="row">Performance, mobile</th><td>94</td><td>100</td></tr>
<tr><th scope="row">Performance, desktop</th><td>100</td><td>100</td></tr>
<tr><th scope="row">Best practices</th><td>100</td><td>100</td></tr>
<tr><th scope="row">Accessibility</th><td>96</td><td>100</td></tr>
<tr><th scope="row">SEO</th><td>92</td><td>100</td></tr>
<tr><th scope="row">Third-party requests</th><td>2</td><td>0</td></tr>
</tbody>
</table>

Both columns are Lighthouse 13.5.0 runs against a local build, served on localhost and measured on mobile. The before column is the previous version, the version with the video hero. The after column is the current build.

A few requests make up most of the after figure, and there are only seven of them. The font is the largest single one at 53,292 bytes. The document is 40,786, the favicon is 16,603, the hero poster is 10,072 and the reveal script is 5,652, with the two wordmark files at 1,431 and 727 between them.

Repeated runs gave the same total, 128,563 bytes, every time, because the page requests a fixed set of files. One exception is worth naming rather than hiding. The Recognition clips are fetched when that section approaches, two screens ahead, and a run that scrolls far enough to reach it records them as well. We measured the boundary directly: a load that stops before Recognition issues no video requests at all, and a run that scrolls through it issues five distinct clips, one per card, and no clip is fetched twice for the same card. That is the intended behaviour and not a regression: the clips are not part of what the page costs to arrive, and a reader who never scrolls to Recognition never pays for them. The performance score did not move when it happened, which is the part that matters.

The Best Practices row can move depending on where the run happens. Our own build reports 100. Measured against the public edge it reads 77, and the two audits that fail there are `deprecations` and `inspector-issues`: both belong to what the edge puts in front of the page rather than to the page. An edge run costs more to load for the same reason, 138,697 B over 10 requests against 128,563 B over 7 on our own build. Neither number describes the site we are shipping.

## Desktop, and what we left on the table

There is no desktop payload row in that table, and the reason is a decision rather than a measurement problem.

Desktop still fetches the hero reel, but it loads after the key performance metrics are recorded, so it doesn’t negatively impact the scores. The score was never going to show this. Only the byte count did.

Without the hero reel, desktop transfers exactly what mobile transfers: 128,563 B, the same seven files, the same bytes. That is worth stating precisely rather than as "a similar amount", because it was measured rather than estimated, and it is the clearest argument for the trade-off above. The desktop total varies between runs — 3.21 MB, 3.23 MB and 3.50 MB across three of them — and none of that variation is the page. It is the reel, still downloading when the audit ends, which is the same effect described under Where it started.

On larger viewports, we preload the hero video to avoid a visible delay. On smaller devices, we keep it interaction-gated as a deliberate trade-off between presentation and performance.

## The Recognition clips

The five Recognition clips were the one place where we were shipping the wrong file, and the reason is worth recording because it was not obvious.

Each clip exists in two sizes. The master is full resolution and carries the audio it was recorded with, because the articles under /news/ play these and the quality and the sound belong to that use. The card cut is the same footage at 960x720 rather than 1600x1200, 20fps rather than 30, and silent — because the Recognition card is 351px wide on a phone and never more than 720px on a tablet. The four masters total 14,917,464 bytes. The four card cuts total 3,491,977, and the clip the CSS Winner row reuses needed no second version at all, at 336,313 bytes it was already small enough to serve both.

What a reader pays for these five on the cards therefore went from 15,253,777 bytes to 3,828,290 — 15.3 MB to 3.8 MB, a 75% reduction — and nothing about the articles changed.

That fixed the weight but not the symptom people actually reported, which was that the videos were not playing and showed only poster frames. The weight was never the cause. Three things were: the clips began downloading at the moment a card reached the top of the stack, which is too late to finish inside the scroll that opened it; every re-activation called load(), which discards the buffer and restarts the download, so a slow scroll could fetch the same clip three times and abandon it three times; and four of the five had no poster at all, so those cards were black until the clip arrived. Each clip is now fetched once, one card ahead of the reader, and each has its own first frame as a poster.

One detail there is worth keeping. The posters are attached by script when a clip is opened, not written into the markup, because a poster attribute is fetched as soon as the element is in the document. Writing them in markup pulled all five into the first paint, and moving them out removed 43,410 bytes from the load.



## The two scores that did not move

Accessibility sat at 96 and SEO at 92 through every byte we removed, because neither had anything to do with weight. We spent the exercise on the category that responded and left the other two untouched, which is the wrong allocation of effort and was the most useful thing the table showed us.

Rebuilding the old build is what made them nameable. SEO failed on one thing, link text. A single link read READ MORE and pointed at a page called info. Nothing else failed. There was no missing meta description, which is what we assumed for most of this work.

Accessibility failed on one thing too, and not the one we expected. The failing element was a link in the site-wide banner, rendering #686868 on #090909, a contrast ratio of 3.57. The three service labels on the homepage, which are 72 pixels and sit at twenty percent white, were never in that failing list. We changed them anyway, because the number was wrong for the size of the type, and they turned out to be failing on the current build once the banner was fixed.

The policy link in the cookie banner was the same class of problem. We lightened the colour and the audit still failed. The banner fades in over a second, and an audit that samples during that fade reads a darker composite than the stylesheet declares. Shortening the fade to a fraction of a second is what fixed it, not the colour.

## What we would do differently

Build the budget first. We had no target before we started optimising, which meant deciding what fast meant after the work was mostly done.

Prefer the reader's scroll to your own. The footer pull was the only thing on this site that moved the page by itself, and it took two rounds of careful work to get to the point where it misbehaved in a way we could not design away. Every other transition here is the reader arriving somewhere and the site acknowledging it. That is a distinction worth keeping from the start rather than rediscovering under a deadline.

Measure the files, not only the page. Lighthouse reports what the browser transferred during the run. Some of our video files are larger on disk than anything the audit recorded, because the browser stopped before it finished them. We wrote a figure for the page and a different figure for the assets and did not notice that they disagreed.

Check the network log before writing about the fonts. We believed we had replaced two full variable files with two small subsets. The log shows one third-party woff2 replaced by one self-hosted file. The saving is about 28%, not the order of magnitude we had been describing.

Quote the number a reader will reproduce. We first wrote this article at 95 KiB from a hand measurement. We then wrote it at 4.6 MB, also by hand, and called that a measurement. Both were wrong. The transferred figure is 6,658,776 bytes on a phone, and we only had it after rebuilding the page and running the audit again.

Keep the headline honest when the number moves. This article has been corrected three times since it was written, each time because the build moved underneath a figure we had already published: once for a slug we had changed, once when a footer fix added 919 bytes, and once when removing the footer's pull took 3,311 bytes back off. A performance article that goes stale is worse than one that was never precise, because it is still being read.

Rebuild the before state before writing about it. An earlier draft recorded 6.3 MB from memory. The measured figure was 6,658,776 bytes, so the memory was within a few percent, but we only knew that after checking out the old commit and running the audit again.

## Where this is written down

Every figure here came from a Lighthouse 13.5.0 run or from a byte count taken on the file. The after column is the current production build served on localhost, measured three times on mobile and three times on desktop; every mobile run returned the same total and every desktop run returned the same total once the hero reel is excluded. The before column is the previous version. Where a figure is a file size rather than a transfer, the text says so.

We report transfer sizes in KiB (1,024 bytes). The 6.66 MB before figure is given in decimal MB for readability, and the headline's "128 KB" is the current figure in decimal KB, truncated; in the binary units used everywhere else in this article the same number is 125.5 KiB. The improvement is clear regardless of unit.
