// ==UserScript==
// @name         autoDialer
// @namespace    http://tampermonkey.net/
// @version      2024-02-14
// @description  try to take over the world!
// @author       Caden H
// @match        https://apps.usw2.pure.cloud/crm/index.html?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// @updateURL    https://caden-humphrey.github.io/autoDialer.js
// @downloadURL  https://caden-humphrey.github.io/autoDialer.js
// ==/UserScript==


(function () {
    'use strict';
    var elements = new Proxy({}, {get: function(target, name) {return variables()[name];}});


    function variables() {
        return {
            callState: document.querySelector('#interactionList div.center-container span.interaction-data.call-state'),
            interactionData: document.querySelector('div.callback-ui div.form-group.flex'),
            makeCallButton: document.querySelector('div.callback-ui div.btn-group button'),
            pickUpButton: document.querySelector('gef-pickup-control[text="Pick Up"]'),
            callControl: document.querySelector('li[data-call-control="pickup"]'),
            page: document.body
        };
    }


    function callCompleted() {
        var callCompletedObserver = new MutationObserver(function(mutationsList, observer) {
            for(let mutation of mutationsList) {
                console.log('Mutation detected: ', mutation);
                if (mutation.type === 'childList' || mutation.type === 'characterData') {
                    let newValue = elements.callState.textContent;
                    if(newValue === 'DISCONNECTED') {
                        callCompletedObserver.disconnect();
                        pickUpCall();
                        makeCall();
                    }
                }
            }
        });
        callCompletedObserver.observe(elements.callState, { attributes: true, childList: true, characterData: true, subtree: true });
    }



    // Function to pick up the call
    function makeCall() {
        var makeCallObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.target.getAttribute('disabled') === null) {
                    makeCallObserver.disconnect();
                    mutation.target.click();
                    callCompleted();
                }
            });
        });
        makeCallObserver.observe(elements.makeCallButton, { attributes: true, attributeOldValue: true });
    }


        // Function to pick up the call
    function pickUpCall() {
        var pickUpObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.target.getAttribute('disabled') === null) {
                    if (elements.interactionData.innerText === 'CustomerALERTINGSMB English Dialer') {
                        pickUpObserver.disconnect();
                        mutation.target.click();
                        /*
                        setTimeout(() => {
                            pickUpCall();
                        }, 1000);
                        */
                    }
                }
            });
        });
        pickUpObserver.observe(elements.pickUpButton, { attributes: true, attributeOldValue: true });
    }

        // Function to auto dial
    function autoDialer() {
        console.log('CADEN LOG: Auto dialer function started');
        if (elements.callControl === null) {
            var pageReadyObserver = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    mutation.addedNodes.forEach((node) => {
                        if (node.outerHTML === '<li data-call-control="pickup" style="order: 1; display: block;"><gef-pickup-control text="Pick Up" disabled="true"></gef-pickup-control></li>') {
                            pageReadyObserver.disconnect();
                            pickUpCall();
                            makeCall();
                        }
                    });
                });
            });

            pageReadyObserver.observe(elements.page, { childList: true, subtree: true });
        } else {
            pickUpCall();
            makeCall();
        }
    }

    // Call the autoDialer function
    autoDialer();

    })();
