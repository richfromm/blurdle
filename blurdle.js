// ==UserScript==
// @name         Blurdle
// @namespace    https://github.com/richfromm/
// @version      0.5
// @description  Remove Wordle sharing posts from a Facebook feed
// @author       Rich Fromm
// @match        http*://facebook.com/*
// @match        http*://www.facebook.com/*
// @require      http://code.jquery.com/jquery-latest.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.info("Begin Blurdle setup");

    // How often to apply filter to infinitely scrolling news feed.
    // Longer times can be useful for debugging.
    var freqSeconds = 1;
    setInterval(filter, freqSeconds * 1000);

    console.info(`End Blurdle setup, will filter Facebook feed every ${freqSeconds} second(s)`);

    function filter() {
        console.debug("Begin Blurdle filter");

        // We used to be able to rely on the fact that each post in a feed was
        // a heavily nested sequence of <div> tags, where the first tag was of
        // the form (I'm adding the wildcard here)
        //            <div data-pagelet="FeedUnit_*">
        //
        // On 2022-03-08, that broke, and the top level <div> tag for each feed
        // post now has no attributes at all.
        //
        // So we are instead taking advantage of (the first line of) the fact
        // that the next two levels of tags are precisely as follows:
        //             <div class="du4w35lb k4urcfbm l9j0dhe7 sjgh65i0">
        //              <div class="du4w35lb l9j0dhe7">
        //
        // Admittedly, this is SUPER fragile. But it was true even before the
        // breakage, and it continues to be unchanged as of this writing, 3
        // months after the breakage, so maybe there's hope.
        var filtered = $("div[class='du4w35lb k4urcfbm l9j0dhe7 sjgh65i0']")
            .filter($("div:contains('Wordle')"))
            .filter(function(){
               return this.innerHTML.match(/Wordle\s+\d+\s+\d+\/\d+/);
            })
            .parent()
        if (filtered.length > 0) {
            console.info(`Removed ${filtered.length} Wordle sharing post(s) from Facebook feed`);
            filtered.remove();
        }

        console.debug("End Blurdle filter");
    }
})();
