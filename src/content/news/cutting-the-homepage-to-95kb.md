---
title: "Cutting the homepage to 95 KB"
date: 2026-09-29
summary: "What changed, what it cost, and what the numbers look like afterwards."
draft: false
cover: /assets/news/performance-cover.webp
coverAlt: "Performance measurements taken while the homepage was being rebuilt."
---

The homepage used to transfer 4.6 MB on a phone. It now weighs 95 KB. This is what happened in between, and what we would do differently.

## Where it started

The first version of this site was a portfolio with a full-screen video hero, self-hosted variable fonts and a page of case studies. It looked right and it was heavy.

4.6 MB on a mobile load, and 3.2 MB on desktop. The video files on disk totalled 16.8 MB. Most of the weight sat in three places: an unoptimised hero video that loaded on page view, two full variable font files, and the hero poster as a large JPEG. Every one of those was a decision someone made and nobody revisited.

The Lighthouse scores were not a mystery. They were the arithmetic of those files.

## The video

The hero video was loading immediately, competing with the headline, the fonts and the poster for bandwidth. A visitor on a poor connection was waiting for a file they had not asked for yet.

Two changes. The video now loads only on interaction, on devices that report a fine pointer. And the poster frame is a 2160px-wide WebP, so the first paint has a real image behind it instead of an empty box.

The poster is the part worth being precise about. Converting that still to WebP at quality 85 took it from a large JPEG to 9,806 bytes at full resolution, and the measured similarity to the original was 58.2 dB PSNR. That is above the threshold usually treated as visually lossless. The image you see is not a degraded one.

## The fonts

Two full variable font files were being served, covering every glyph the font designer shipped. We do not use most of them.

The site is now two subsets. The core file covers Latin-1 and the punctuation the copy actually uses, at 52,972 bytes. The extended file covers the accented characters and Vietnamese ranges, at 12,492 bytes, and is only fetched when a browser needs it. Both retain the optical size and weight axes, so the type still sets properly at every size we use.

Together that is 65,464 bytes of font where there were two files several times larger.

## Rendering

The headline was being built in JavaScript from a data attribute. The words existed on the page, but not in the document until a script ran, which meant nothing to render until that script parsed, and nothing for a crawler to read at all.

The text is now in the markup. The animation still runs, and the hero still looks the same, but the page has its words before a single script executes.

## The motion was changed twice

The text on this site did not arrive the way it looks now.

The first version blurred each line in and rotated it up at an angle. It looked considered in a still. In use it was slow, and on a long page the cost compounded with every section. A reader scrolling the page waited on the animation more than they read.

The second version dropped the angle and simplified to a straight rise from a clipped mask. That is what is here now, and it exists because the first two were wrong for the job rather than because the third was prettier.

Reduced motion is respected. The accessibility statement on this site sets out a motion preference, and the whole reveal system is disabled under it. That was a requirement from the start rather than something added after the first complaint.

## The navigation was made smaller on purpose

The header started with a blurred background and a heavier treatment. It was the current idiom and it looked right in isolation.

It was wrong for a studio whose position is clarity. A translucent, floating navigation carries more visual weight than the work it sits above, and on scroll it competes with content. It went back to a flat header, stripped to the essentials, with the hover states doing only the minimum.

The test we applied was simple. Does the navigation ask for attention, or does it stay available? Answering that honestly took it back to almost nothing.

## What it weighs now

| | Before | After |
|---|---|---|
| Homepage payload, mobile | 4.6 MB | 95 KB |
| Homepage payload, desktop | 3.2 MB | 95 KB |
| Performance, mobile | 97 | 100 |
| Performance, desktop | 100 | 100 |
| Best practices | 100 | 100 |
| Accessibility | 96 | 96 |
| SEO | 92 | 92 |
| Third-party requests | 3 | 0 |

The before column is not a remembered figure. It is a Lighthouse run against commit `7b20a84`, the last build before the videos were compressed, served locally and measured under the same conditions as the after column.

Ninety-five kilobytes, no third-party requests, one hundred on mobile and desktop.

Two of those numbers did not move, and it would be dishonest to leave them out of a table about optimisation. Accessibility sits at 96 and SEO at 92, both before and after. Those are structural faults rather than weight problems, and no amount of shaving kilobytes addresses them.

Reconstructing the old build is what made them nameable. On the earliest build the accessibility loss is a colour contrast failure, and the SEO loss is a missing meta description plus links with non-descriptive anchor text. The scores have not moved since, which tells us the fixes have not landed. Both are still open.

## What we would do differently

Build the budget first. We had no target before we started optimising, which meant deciding what "fast" meant after the work was mostly done. A number written down at the start would have prevented the video loading on page view in the first place.

Audit the third-party requests earlier. Three were carrying tracking we did not need. Removing them was the single easiest change in this list and it should have been the first.

Measure the poster rather than trusting the format. WebP at quality 85 was a guess until it was measured. The number gave us confidence to ship it.

Chase the scores that do not move. Accessibility at 96 and SEO at 92 survived every byte we removed, because neither had anything to do with weight. We spent this whole exercise on the one category that responded and left the other two untouched.

Rebuild the before state before writing about it. We had a number in our heads for the original payload and it did not survive contact with a measurement. The figure we would have published was wrong, and the only reason we know that is that we checked out the old commit and ran the audit.

## Where this is written down

Every figure in this note came from a Lighthouse 13.5.0 run or a direct measurement of a file. The before column is commit `7b20a84`, built locally and served on localhost so it could be measured under the same conditions as the after column.

The numbers we originally wrote down from memory were wrong. The homepage payload was recorded as 6.3 MB and mobile performance as 93. Measured, it was 4.6 MB and 97. That gap is why the before column was rebuilt and re-audited rather than trusted, and it is the reason this note cites a commit hash and a tool version.
