// ==UserScript==
// @name         autoDialer
// @namespace    http://tampermonkey.net/
// @version      2024-02-14
// @description  try to take over the world!
// @author       Caden H
// @match        https://apps.usw2.pure.cloud/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// @updateURL    https://caden-humphrey.github.io/autoDialer.js
// @downloadURL  https://caden-humphrey.github.io/autoDialer.js
// ==/UserScript==
(function() {
// Function to wait for an element to exist
function waitForElement(selector, callback, attempts = 0) {
    if (document.querySelector(selector)) {
        callback(document.querySelector(selector));
    } else if (attempts < 60) {
        setTimeout(function() {
            waitForElement(selector, callback, attempts + 1);
        }, 500);
    }
}

// Function to set up the MutationObserver
function setupObserver(targetNode) {
    // Options for the observer (which mutations to observe)
    var config = { attributes: true, attributeOldValue: true, childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    var callback = function(mutationsList, observer) {
        // Your callback code goes here...
        for(var mutation of mutationsList) {
            if (mutation.type == 'childList') {
                mutation.addedNodes.forEach(function(node) {
                    // Check if the added node is the one you're interested in
                    if (node.nodeType === Node.ELEMENT_NODE && node.getAttribute('id') === 'roster-action-answer-button') {
                        console.log('CHILD NODE FOUND');



    // Trigger your macro here
    (function () {
        function waitForCondition(conditionFunction, interval = 5, maxAttempts = 500) {let attempts = 0;return new Promise((resolve, reject) => {const checkCondition = () => {if (conditionFunction()) {console.log('Condition met.');resolve();} else if (attempts < maxAttempts) {attempts++;setTimeout(checkCondition, interval);} else {console.log('Condition not met within the specified time');reject(new Error('Condition not met within the specified time'));}};checkCondition();});}
        var elements = new Proxy({}, {get: function(target, name) {return variables()[name];}});

        // Function to get the elements
        function variables() {
            return {
                answer: document.querySelector('#roster-action-answer-button'),
                placeCall: document.querySelector('button.place-callback')
            };
        }

        (async function () {
           // await waitForCondition(() => elements.answer !== null);
            if (elements.answer !== null) {
                if (elements.answer !== null) {
                    elements.answer.click();
                    console.log('CADEN LOG: Answer button clicked');
                } else {
                    console.log('CADEN LOG: Answer button not found');
                }

                await waitForCondition(() => elements.placeCall !== null);
                console.log('CADEN LOG: Place call button found');
                elements.placeCall.click();
                console.log('CADEN LOG: Place call button clicked');
            }
        })();
    })();




                    }
                });
            }
        }
    };

    // Create an observer instance linked to the callback function
    window.autoAnswer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    window.autoAnswer.observe(targetNode, config);
}

// Wait for the target node to exist, then set up the observer
waitForElement('div.left-chat-rail div.interactions', function(targetNode) {
    // Set targetNode as a global variable
    window.targetNode = targetNode;
    // Set up the observer
    setupObserver(targetNode);
});
})();
