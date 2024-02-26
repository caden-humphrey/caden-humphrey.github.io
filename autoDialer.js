// ==UserScript==
// @name         AAAB TEAM Auto Dialer & Auto Dispositioner
// @namespace    http://tampermonkey.net/
// @version      2024-02-26
// @description  Auto Dialer & Auto Dispositioner
// @author       Caden H
// @match        https://thumbtack.lightning.force.com
// @match        https://thumbtack.lightning.force.com/*
// @match        https://apps.usw2.pure.cloud/crm/index.html?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// @updateURL    https://caden-humphrey.github.io/autoDialer.js
// @downloadURL  https://caden-humphrey.github.io/autoDialer.js
// ==/UserScript==

if (window.location.hostname === 'apps.usw2.pure.cloud') {
    // preview dialer auto answer function
    (function previewAutoAnswer() {
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

    // call dispositioner
    window.dispoCall = function(dispoSelector = 'No answer from Pro') {
        try {
            console.log('CADEN LOG: Genesys: dispoCall Function started');
            function getElementsByTextContent(text) {let all = Array.from(document.querySelectorAll('gux-option')); let result = all.filter(el => el.textContent.trim() == text); return result;}
            function waitForCondition(conditionFunction, interval = 5, maxAttempts = 500) {let attempts = 0;return new Promise((resolve, reject) => {const checkCondition = () => {if (conditionFunction()) {console.log('Condition met.');resolve();} else if (attempts < maxAttempts) {attempts++;setTimeout(checkCondition, interval);} else {console.log('Condition not met within the specified time');reject(console.log('Condition not met within the specified time'));}};checkCondition();});}
            function pauseForCondition(conditionFunction, interval = 5, maxAttempts = 500) {let attempts = 0;return new Promise((resolve, reject) => {const checkCondition = () => {if (conditionFunction()) {console.log('Condition met.');resolve();} else if (attempts < maxAttempts) {attempts++;setTimeout(checkCondition, interval);} else {console.log('Condition not met within the specified time');resolve(false);}};checkCondition();});}
            var elements = new Proxy({}, {get: function(target, name) {return variables()[name];}});

            function variables() {
                return {
                hangUpButton: document.querySelector('#statusController_test gef-disconnect-control'),
                transferButton: document.querySelector('#statusController_test gef-transfer-control'),
                muteButton: document.querySelector('#statusController_test gef-mute-control'),
                wrapUpButton: document.querySelectorAll('#interactionList div.right-btn-container i.fa.fa-user.interaction-call-work-edit')[0],
                wrapUpList: document.querySelectorAll('gux-dropdown[placeholder="Select wrap-up code"]')[0],
                dispo: getElementsByTextContent(dispoSelector)[0],
                done: document.querySelector('button.after-call-work-done-button.btn.btn-sm.btn-primary'),
                callBackInfo: document.querySelector('div.callback-ui div.form-group.flex')
                };
            }

            async function setdispo() {
                if (elements.hangUpButton.disabled === false) { // If the hang up button is enabled, click it
                    console.log('CADEN LOG: Genesys: dispoCall: hangUpButton is enabled');
                    elements.hangUpButton.shadowRoot.querySelector('button').click();
                    console.log('CADEN LOG: Genesys: dispoCall: hangUpButton clicked');
                }
                await waitForCondition(() => elements.wrapUpButton !== null && elements.wrapUpButton !== undefined);
                console.log('CADEN LOG: Genesys: dispoCall: wrapUpButton is found');
                elements.wrapUpButton.click();
                console.log('CADEN LOG: Genesys: dispoCall: wrapUpButton clicked');
                await waitForCondition(() => elements.dispo !== null && elements.dispo !== undefined);
                console.log('CADEN LOG: Genesys: dispoCall: dispo is found');
                elements.dispo.click();
                console.log('CADEN LOG: Genesys: dispoCall: dispo clicked');
                await waitForCondition(() => elements.done !== null && elements.done !== undefined && elements.done.disabled === false);
                console.log('CADEN LOG: Genesys: dispoCall: done button is found and enabled');
                elements.done.click();
                console.log('CADEN LOG: Genesys: dispoCall: done button clicked');

                if (elements.callBackInfo.textContent != '') {
                    await pauseForCondition(() => elements.hangUpButton.disabled === false && elements.transferButton.disabled === false && elements.muteButton.disabled === true);
                        if (elements.hangUpButton.disabled === false && elements.transferButton.disabled === false && elements.muteButton.disabled === true) {
                        elements.hangUpButton.shadowRoot.querySelector('button').click();
                        }
                }
        
                window.parent.postMessage("dispo done", 'https://thumbtack.lightning.force.com');
            }

            if (elements.wrapUpButton !== null && elements.wrapUpButton !== undefined) {
                if (
                    elements.hangUpButton.disabled === false && elements.transferButton.disabled === true && elements.muteButton.disabled === true ||
                    elements.hangUpButton.disabled === false && elements.transferButton.disabled === false && elements.muteButton.disabled === false ||
                    elements.hangUpButton.disabled === true && elements.transferButton.disabled === true && elements.muteButton.disabled === true && elements.wrapUpButton.parentElement.classList.contains('red')
                    ) {
                    console.log('CADEN LOG: Genesys: dispoCall running due to call in progress or wrap up required');
                    setdispo();
                } else if (elements.hangUpButton.disabled === false && elements.transferButton.disabled === false && elements.muteButton.disabled === true) {
                    console.log('CADEN LOG: Genesys: dispoCall NOT running due to preview dialer');
                    elements.hangUpButton.shadowRoot.querySelector('button').click();
                    window.parent.postMessage("dispo done", 'https://thumbtack.lightning.force.com');
                } else {
                    console.log('CADEN LOG: Genesys: dispoCall NOT running due to NO CALL TO DISPO');
                    window.parent.postMessage("dispo done", 'https://thumbtack.lightning.force.com');
                }
            } else {
                console.log('CADEN LOG: Genesys: dispoCall NOT running due to NO CALL TO DISPO');
                window.parent.postMessage("dispo done", 'https://thumbtack.lightning.force.com');
            }
        } catch (error) {
            console.error('CADEN LOG: dispoCall -', error);
        }
    }

    // event listener for messages from salesforce
    window.addEventListener('message', function(event) { // Add event listener for messages from the parent window

            // Check the origin of the message
            if (event.origin !== 'https://thumbtack.lightning.force.com') return;

            if (event.data === "dispoCall();") {
                dispoCall();
            }
    });

    // queue toggler
    window.toggleQueue = function() {
        try {
            var availableStatus = document.querySelector('div.simplebar-content-wrapper li.status-item.available');
            var onQueueStatus = document.querySelector('div.simplebar-content-wrapper li.status-item.on_queue');
            if (onQueueStatus) {
                var available = document.querySelector('a#AVAILABLE div.item-icon-wrapper')
                available.click();

            } else if (availableStatus) {
                var onQueue = document.querySelector('a#ON_QUEUE div.item-icon-wrapper')
                onQueue.click();
            }
        } catch (error) {
            console.error('CADEN LOG: toggleQueue -', error);
        }
    }

    // event listener for keyboard shortcut
    window.addEventListener('keydown', function(event) { // Add event listener for 'No Answer' disposition Keyboard shortcut
        if (event.key === '=') {
            try {
                window.parent.postMessage("equal button pressed", 'https://thumbtack.lightning.force.com');
            } catch (error) {
                console.error('CADEN LOG: genesys eventListener - =keyboardShortcut to send postMessage to salesforce saying: equal button pressed -', error);
            }
        }
    });
    
} else {
    // close contact
    window.closeContact = function() {
        try {
            console.log('CADEN LOG: Salesforce: closeContact Function started');

                const iframes = document.querySelectorAll('ul.tabBarItems.slds-grid li[role=\"presentation\"]');
                if (iframes.length >= 0) {
                    const tableRows = document.querySelectorAll('ul.tabBarItems.slds-grid li[role=\"presentation\"]');
                    tableRows.forEach((row, index) => {
                        if (index >= 0) {
                            const link = row.querySelector('div.close button');
                            if (link) {
                                link.click();
                            }}});}
        } catch (error) {
            console.error('CADEN LOG: newNBC -', error);
        }
    }
    
    // send message to genesys
    window.sendMessage = function () {
        'use strict';
        try {
            console.log('CADEN LOG: Salesforce: equal sign keyboard shortcut received');
            var genIframe = parent.document.querySelector('iframe.openctiSoftPhone');
            genIframe.contentWindow.postMessage('dispoCall();', 'https://apps.usw2.pure.cloud');
        } catch (error) {
            console.error('CADEN LOG: sendMessage -', error);
        }
    }

    // event listener for messages from genesys
    window.addEventListener('message', function(event) { // Add event listener for messages from the parent window
            // Check the origin of the message
            if (event.origin !== 'https://apps.usw2.pure.cloud') return;

            if (event.data === "equal button pressed") {
                console.log('CADEN LOG: Salesforce: -equal button pressed- message received from Genesys');
                window.sendMessage();
            } else if (event.data === "dispo done") {
                window.closeContact();
            }

    });

    // event listener for keyboard shortcut
    window.addEventListener('keydown', function(event) { // Add event listener for 'No Answer' disposition Keyboard shortcut
        try {
            if (event.key === '=') {
                window.sendMessage();
            }
        } catch (error) {
            console.error('CADEN LOG: salesforce evenetListener - =keyboardShortcut to run window.SendMessage -', error);
        }
    });
}
