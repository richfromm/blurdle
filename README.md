# Blurdle

## What

A user script to remove Wordle sharing posts from a Facebook feed

## Install

1. Install [Tampermonkey](https://www.tampermonkey.net/) in your web browser

2. From the Tampermonkey Dashboard, click on the Utilities tab. In the
   "Import from URL" field, paste:

    [`https://raw.githubusercontent.com/richfromm/blurdle/master/blurdle.js`](https://raw.githubusercontent.com/richfromm/blurdle/master/blurdle.js)

   Click the "Install" button.

Tested with Chrome and MacOS, but I think it should work with other
browsers and OS's.

It's probably possible to export this as a Chrome extension, but
that's future work.

I have no clue if it's possible to install extensions or user scripts
on mobile.

## Why

I actually like
[Wordle](https://www.nytimes.com/games/wordle/index.html), and play it
regularly. I also sometimes play various derivatives like
[Nerdle](https://nerdlegame.com/) and
[Absurdle](https://qntm.org/files/absurdle/absurdle.html). But I find
the not insignificant stream of Wordle shares a little annoying. And I
explicitly try to not look at them, because I don't want to get any
hints if I haven't done the day's puzzle yet.

A friend joked on Facebook that someone should start a social platform
just for the Wordle people. I replied, just write a Greasemonkey
script to strip the posts from your feed. The response asked if I was
volunteering.

I've never actually done anything like this, but it seemed like a good
opportunity to learn. Hence this quick hack.

## How

I took a look at the source of a sample page with a Wordle post in the feed. Each
post seems to be a very heavily nested sequence of `<div>` tags. I saw:
```
                    <div data-pagelet="FeedUnit_0">
```

then:
```
                    <div data-pagelet="FeedUnit_1">
```

then literally a bunch like this (that is, I'm **not** using "n" as a
numeric substitution):
```
                    <div data-pagelet="FeedUnit_{n}">
```

Further down the `<div>` element rabbithole, is the start of a Wordle
share:
```
                                     <div class="kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x c1et5uql">
                                      Wordle 242 3/6
                                     </div>
```

I use [JQuery](https://jquery.com/) to find `<div>` tags with a
`data-pagelet` attribute that starts with `FeedUnit_`. They are
further filtered to only return ones that have some nested `<div>` tag
that contains `Wordle`. But I didn't want to delete any post
mentioning "Wordle" at all, just ones that look like a share, so
that's further filtered with having some inner HTML that matches what
appears to be the beginning of a Wordle share (the text in the example
above) via a regular expression.

The Facebook news feed is infinitely scrolling and populated
dynamically. So we can't just filter a fixed document and call it a
day. The actual filtering is contained in a function `filter()`,
that's called on the current page contents once a second.

## Caveats

Like any kind of screen scraping, this is inherently fragile. If
either Facebook or Wordle makes changes to their output format, it
could easily break.

I am a software developer, but not a front end guy. My experience with
JavaScript is extremely limited, and this was my first time writing a
user script, as well as my first time using JQuery. I suspect that
this might not be the most efficient solution, and I'm happy to accept
suggestions for improvement.

**UPDATE:** (2022-03-08) It's broken for me as of today. That didn't
take too long (about 3 weeks).

The `<div>` tags that contain each item in the news feed no longer have
a `data-pagelet` attribute that starts with `FeedUnit_`. In fact, they
no longer have any attributes at all.

I need to think about how to handle this (see above, I'm not a JS
guy), and I don't have the time just right now. Hopefully somewhat
soonish. Suggestions welcome, if there's anyone out there actually
reading this.

I suppose I could take advantage of the fact that the next two levels
in the hierarchy of `<div>` insanity (immediately after the level that
formerly contained the `data-pagelet` attribute) have precisely the
following attributes:

```
                     <div class="du4w35lb k4urcfbm l9j0dhe7 sjgh65i0">
                      <div class="du4w35lb l9j0dhe7">
```

But wow that would take the fragility of this implementation to a
whole new level.

And who knows, maybe I'm just part of some A/B test, and tomorrow the
HTML of my feed will return to what it was yesterday, and this will
start working again.
