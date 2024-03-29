// ==UserScript==
// @name         AAAB TEAM Auto Dialer & Auto Dispositioner
// @namespace    http://tampermonkey.net/
// @version      2024-03-01
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

    // genesys error message closer
    function callErrorCloser() {
        let targetNode = document.querySelector('#statusController_test div.alert-wrapper div.notification-container');
        let config = { childList: true, subtree: true };

        // Callback function to execute when mutations are observed
        let callback = function (mutationsList, observer) {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    for (let newNode of mutation.addedNodes) {
                        if (newNode.nodeName === 'DIV') {
                            console.log('CADEN LOG: new error "Failed to save interaction"');
                            setTimeout(function () {
                                if (newNode.innerText.includes('Failed to save an interaction log')) {
                                    newNode.childNodes[1].click();
                                    console.log('CADEN LOG: closed error');
                                }
                            }, 1000);
                        }
                    }
                }
            }
        };

        let genesysErrorobserver = new MutationObserver(callback);
        genesysErrorobserver.observe(targetNode, config);
    }

    // previewDialer auto answer
    (function previewDialerAutoAnswer() {

        var elements = new Proxy({}, { get: function (target, name) { return variables()[name]; } });
        function waitForCondition(conditionFunction, interval = 5, maxAttempts = 1500) { let attempts = 0; return new Promise((resolve, reject) => { const checkCondition = () => { if (conditionFunction()) { console.log('CADEN LOG: Condition met.'); resolve(); } else if (attempts < maxAttempts) { attempts++; setTimeout(checkCondition, interval); } else { console.log('CADEN LOG: Condition not met within the specified time'); reject(console.log('CADEN LOG: Condition not met within the specified time')); } }; checkCondition(); }); }
        function pauseForCondition(conditionFunction, interval = 5, maxAttempts = 500) { let attempts = 0; return new Promise((resolve, reject) => { const checkCondition = () => { if (conditionFunction()) { console.log('CADEN LOG: Condition met.'); resolve(); } else if (attempts < maxAttempts) { attempts++; setTimeout(checkCondition, interval); } else { console.log('CADEN LOG: call is NOT previewDialer... calling pickUpCall function'); resolve(false); } }; checkCondition(); }); }


        function variables() {
            return {
                interactionsData: document.querySelector('#interactionList div.simplebar-content div.interaction-selection.sel div.center-container'),
                makeCallButton: document.querySelectorAll('div.callback-ui-wrapper div.btn-group button')[1],
                pickUpButton: document.querySelector('gef-pickup-control[text="Pick Up"]'),
                callControl: document.querySelector('li[data-call-control="pickup"]'),
            };
        }


        // Function to pick up the call
        async function makeCall() {
            try {
                console.log('CADEN LOG: Genesys: makeCall function started')
                await waitForCondition(() => elements.interactionsData.textContent != '' && !elements.interactionsData.innerText.includes('DISCONNECTED') && elements.pickUpButton.disabled === false);
                await pauseForCondition(() => elements.interactionsData.textContent == 'CustomerALERTINGSMB English Dialer');
                if (elements.interactionsData.textContent == 'CustomerALERTINGSMB English Dialer') {
                    console.log('CADEN LOG: makeCall: call is previewDialer');
                    elements.pickUpButton.click();
                    console.log('CADEN LOG: makeCall: pickUpButton clicked');
                    await waitForCondition(() => elements.makeCallButton.disabled === false);
                    console.log('CADEN LOG: makeCall: makeCallButton is enabled');
                    elements.makeCallButton.click();
                    console.log('CADEN LOG: makeCall: makeCallButton clicked');
                } else {
                    console.log('CADEN LOG: makeCall: call NOT previewDialer... calling pickUpCall function');
                }
            } catch (error) {
                console.error('CADEN LOG: makeCall -', error);
            }
        }


        function observerSetUp() {
            let targetNode = document.querySelector('#interactionList div.simplebar-content');
            let config = { childList: true, subtree: true };

            // Callback function to execute when mutations are observed
            let callback = function (mutationsList, observer) {
                for (let mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        for (let node of mutation.addedNodes) {
                            if (node.nodeName === 'DIV') {
                                console.log('CADEN LOG: new incoming call');
                                makeCall();
                            }
                        }
                    }
                }
            };

            let observer = new MutationObserver(callback);
            observer.observe(targetNode, config);
        }


        (async function () {
            await waitForCondition(() => elements.pickUpButton !== null && document.querySelector('#interactionList div.simplebar-content') !== null && document.querySelector('#interactionList div.simplebar-content') !== undefined);
            observerSetUp();
            callErrorCloser();
        })();

    })();

    // call dispositioner
    window.dispoCall = function (dispoSelector = 'No answer from Pro') {
        try {
            console.log('CADEN LOG: Genesys: dispoCall Function started');
            function getElementsByTextContent(text) { let all = Array.from(document.querySelectorAll('gux-option')); let result = all.filter(el => el.textContent.trim() == text); return result; }
            function waitForCondition(conditionFunction, interval = 5, maxAttempts = 500) { let attempts = 0; return new Promise((resolve, reject) => { const checkCondition = () => { if (conditionFunction()) { console.log('Condition met.'); resolve(); } else if (attempts < maxAttempts) { attempts++; setTimeout(checkCondition, interval); } else { console.log('Condition not met within the specified time'); reject(console.log('Condition not met within the specified time')); } }; checkCondition(); }); }
            function pauseForCondition(conditionFunction, interval = 5, maxAttempts = 500) { let attempts = 0; return new Promise((resolve, reject) => { const checkCondition = () => { if (conditionFunction()) { console.log('Condition met.'); resolve(); } else if (attempts < maxAttempts) { attempts++; setTimeout(checkCondition, interval); } else { console.log('Condition not met within the specified time'); resolve(false); } }; checkCondition(); }); }
            var elements = new Proxy({}, { get: function (target, name) { return variables()[name]; } });

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

            function openInteractionList() {
                var interactionList = document.querySelector('div.interaction-list-container');
                if (interactionList.getAttribute('style') == 'display: none;') {
                    var interactionListNavigator = document.querySelector('#navInteractionList');
                    interactionListNavigator.click();
                    interactionListNavigator.click();
                }
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

                console.log('CADEN LOG: Genesys: dispoCall: dispo done');
                window.parent.postMessage("dispo done", 'https://thumbtack.lightning.force.com');

            }

            openInteractionList();

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

    // postMessage Handler for messages from Salesforce
    window.addEventListener('message', function (event) {
        if (event.origin !== 'https://thumbtack.lightning.force.com') return;

        console.log('Received message:', event.data); // Log the received data

        // Check if the message is a string
        if (typeof event.data === 'string' && event.data.includes("cadenMessage")) {
            console.log('CADEN LOG: postMessage from Salesforce includes cadenMessage');
            // Trim "cadenMessage " from the start of the message
            var trimmedMessage = event.data.replace('cadenMessage ', '');
            // Execute the function call
            eval(trimmedMessage);
        } else {
            console.log('CADEN LOG: postMessage from Salesforce NOT FROM CADEN');
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

} else if (window.top === window.self) { // Salesforce
    console.log('CADEN LOG: Salesforce TOP Scripts run here');

    // close contact
    window.closeContact = function () {
        try {
            console.log('CADEN LOG: Salesforce: closeContact Function started');

            const iframes = document.querySelectorAll('ul.tabBarItems.slds-grid li[role="presentation"]');
            if (iframes.length >= 0) {
                const tableRows = document.querySelectorAll('ul.tabBarItems.slds-grid li[role="presentation"]');
                tableRows.forEach((row, index) => {
                    if (index >= 0) {
                        const link = row.querySelector('div.close button');
                        if (link) {
                            link.click();
                        }
                    }
                });
            }
        } catch (error) {
            console.error('CADEN LOG: closeContact -', error);
        }
    }

    // send message to genesys
    window.sendMessage = function () {
        'use strict';
        try {
            console.log('CADEN LOG: Salesforce: equal sign keyboard shortcut received');
            var genIframe = parent.document.querySelector('iframe.openctiSoftPhone');
            genIframe.contentWindow.postMessage('cadenMessage dispoCall();', 'https://apps.usw2.pure.cloud');
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
            console.error('CADEN LOG: salesforce TOP evenetListener - =keyboardShortcut to run window.SendMessage -', error);
        }
    });

    // duplicate message closer
    (function toastMessageCloser() {
        let targetNode = document.querySelector('div.forceVisualMessageQueue');
        let config = { childList: true, subtree: true };

        // Callback function to execute when mutations are observed
        let callback = function (mutationsList, observer) {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    for (let node of mutation.addedNodes) {
                        if (node.nodeName === 'DIV') {
                            console.log('CADEN LOG: new toastMessage');
                            setTimeout(function () {
                                if (document.querySelector('span.toastMessage').textContent == 'It looks as if duplicates exist for this Contact. View Duplicates') {
                                    document.querySelector('button[title="Close"].toastClose').click();
                                    console.log('CADEN LOG: closed toastMessage');
                                }
                            }, 3000);
                        }
                    }
                }
            }
        };

        let observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
    })();

    (async function openGenesysPhone() {
        console.log('CADEN LOG: openGenesysPhone started');
        function pauseForCondition(conditionFunction, interval = 5, maxAttempts = 3000) { let attempts = 0; return new Promise((resolve, reject) => { const checkCondition = () => { if (conditionFunction()) { console.log('CADEN LOG: Condition met.'); resolve(); } else if (attempts < maxAttempts) { attempts++; setTimeout(checkCondition, interval); } else { console.log('CADEN LOG: call is NOT previewDialer... calling pickUpCall function'); resolve(false); } }; checkCondition(); }); }
        await pauseForCondition(() => document.querySelector('div[data-component-id="opencti_softPhone"] button'));
        setTimeout(function () {
            document.querySelector('div[data-component-id="opencti_softPhone"] button').click();
            console.log('CADEN LOG: genesys phone button clicked');
        }, 2000);
    })();

} else if (window.location.hostname == 'thumbtack.lightning.force.com' && window.self !== window.top) {
    console.log('CADEN LOG: Salesforce IFRAME Scripts run here');

        // event listener for messages from genesys
        window.addEventListener('message', function(event) { // Add event listener for messages from the parent window
            // Check the origin of the message
            if (event.origin !== 'https://apps.usw2.pure.cloud') return;

            if (event.data === "equal button pressed") {
                console.log('CADEN LOG: Salesforce: -equal button pressed- message received from Genesys');
                window.parent.sendMessage();
            } else if (event.data === "dispo done") {
                console.log('CADEN LOG: Salesforce: -dispo done- message received from Genesys');
                window.parent.closeContact();
            }

        });

    // event listener for keyboard shortcut
    window.addEventListener('keydown', function(event) { // Add event listener for 'No Answer' disposition Keyboard shortcut
        try {
            if (event.key === '=') {
                window.parent.sendMessage();
            }
        } catch (error) {
            console.error('CADEN LOG: salesforce IFRAME evenetListener - =keyboardShortcut to run window.SendMessage -', error);
        }
    });
}
