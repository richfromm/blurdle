// ==UserScript==
// @name         Blurdle
// @namespace    https://github.com/richfromm/
// @version      0.4
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

        var filtered = $("div[data-pagelet^='FeedUnit_']")
            .filter($("div:contains('Wordle')"))
            .filter(function(){
               return this.innerHTML.match(/Wordle\s+\d+\s+\d+\/\d+/);
            })
        if (filtered.length > 0) {
            console.info(`Removed ${filtered.length} Wordle sharing post(s) from Facebook feed`);
            filtered.remove();
        }

        console.debug("End Blurdle filter");
    }
})();
