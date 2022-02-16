// ==UserScript==
// @name         Anti Wordle
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Remove wordle posts from a facebook feed
// @author       Rich Fromm
// @match        http*://facebook.com/*
// @match        http*://www.facebook.com/*
// @require      http://code.jquery.com/jquery-latest.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log("Begin Anti Wordle setup");

    // Filter the news feed every second
    //setInterval(filter, 1000);
    setInterval(filter, 5000);

    console.log("End Anti Wordle setup");

    function filter() {
        console.log("Begin filter");

        //$("div[data-pagelet^='FeedUnit_']").filter($("div:contains('Wordle')")).remove();
        //$("div[data-pagelet^='FeedUnit_']").filter($("div:contains('Wordle 242 3')")).remove();
        $("div[data-pagelet^='FeedUnit_']")
            .filter($("div:contains('Wordle')"))
            .filter(function(){
               return this.innerHTML.match(/Wordle\s+\d+\s+\d+\/\d+/);
            })
            .remove()

        console.log("End filter");
    }
})();
