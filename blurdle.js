// ==UserScript==
// @name         Blurdle
// @namespace    http://tampermonkey.net/
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
    console.log("Begin Blurdle setup");

    // Filter the news feed every second
    //setInterval(filter, 1000);
    setInterval(filter, 5000);

    console.log("End Blurdle setup");

    function filter() {
        console.log("Begin Blurdle filter");

        //$("div[data-pagelet^='FeedUnit_']").filter($("div:contains('Wordle')")).remove();
        //$("div[data-pagelet^='FeedUnit_']").filter($("div:contains('Wordle 242 3')")).remove();
        var filtered = $("div[data-pagelet^='FeedUnit_']")
            .filter($("div:contains('Wordle')"))
            .filter(function(){
               return this.innerHTML.match(/Wordle\s+\d+\s+\d+\/\d+/);
            })
        if (filtered.length > 0) {
            console.log(`Removed ${filtered.length} Wordle sharing posts from Facebook feed`);
            filtered.remove();
        }

        console.log("End Blurdle filter");
    }
})();
