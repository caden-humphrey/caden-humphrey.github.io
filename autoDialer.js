// ==UserScript==
// @name         autoDialer
// @namespace    http://caden-humphrey.github.io/autodialer.js
// @version      2024-02-16
// @description  Auto Answer and Place Calls in Genesys Cloud
// @author       Caden H
// @match        https://apps.usw2.pure.cloud/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// @updateURL    https://caden-humphrey.github.io/autoDialer.js
// @downloadURL  https://caden-humphrey.github.io/autoDialer.js
// ==/UserScript==
(function() {
    'use strict';

function waitForElement(selector, attempts = 0) {
    if (document.querySelector(selector)) {
        startObserver();
    } else if (attempts < 60) {
        setTimeout(function() {
            waitForElement(selector, attempts + 1);
        }, 500);
    }
}

// 1: observe Answer Button
function startObserver() {
// var targetObservedNode = document.querySelector('div.left-chat-rail div.interactions');
var config = { childList: true, subtree: true };

window.answerObserver = new MutationObserver((mutationsList) => {
    for(var mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            var newNode = mutation.addedNodes[0];
            if (newNode.id === 'roster-action-answer-button') {
                console.log('CADEN LOG: Answer button added:');
                // Inititate Call Function
                (function() {
                function waitForCondition(conditionFunction, interval = 5, maxAttempts = 500) {let attempts = 0;return new Promise((resolve, reject) => {const checkCondition = () => {if (conditionFunction()) {console.log('Condition met.');resolve();} else if (attempts < maxAttempts) {attempts++;setTimeout(checkCondition, interval);} else {console.log('Condition not met within the specified time');reject(new Error('Condition not met within the specified time'));}};checkCondition();});}
                var answerButton = document.querySelector('#roster-action-answer-button');
                    console.log('CADEN LOG: Answer button FOUND')
                answerButton.click();
                    console.log('CADEN LOG: Answer button CLICKED')
                (async function() {
                await waitForCondition(() => document.querySelector('button.place-callback'));
                        console.log('CADEN LOG: Place call button FOUND')
                var placeCallButton = document.querySelector('button.place-callback');
                placeCallButton.click();
                        console.log('CADEN LOG: place call button CLICKED')
                })();
                })();
            }
        }
    }
});
window.answerObserver.observe(document.querySelector('div.left-chat-rail div.interactions'), config);

};

waitForElement('div.left-chat-rail div.interactions');
})();
