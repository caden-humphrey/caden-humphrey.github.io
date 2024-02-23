// ==UserScript==
// @name         Auto Dialer & Auto Dispositioner
// @namespace    http://tampermonkey.net/
// @version      2024-02-22
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
    window.dispoCall = function(dispoSelector = 'No answer from Pro') {
    console.log('LOG LOG: Genesys: dispoCall Function started');
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
        };
    }

    async function setdispo() {
        if (elements.hangUpButton.disabled === false) { // If the hang up button is enabled, click it
            console.log('LOG LOG: Genesys: dispoCall: hangUpButton is enabled');
            elements.hangUpButton.shadowRoot.querySelector('button').click();
            console.log('LOG LOG: Genesys: dispoCall: hangUpButton clicked');
        }
        await waitForCondition(() => elements.wrapUpButton !== null && elements.wrapUpButton !== undefined);
        console.log('LOG LOG: Genesys: dispoCall: wrapUpButton is found');
        elements.wrapUpButton.click();
        console.log('LOG LOG: Genesys: dispoCall: wrapUpButton clicked');
        await waitForCondition(() => elements.dispo !== null && elements.dispo !== undefined);
        console.log('LOG LOG: Genesys: dispoCall: dispo is found');
        elements.dispo.click();
        console.log('LOG LOG: Genesys: dispoCall: dispo clicked');
        await waitForCondition(() => elements.done !== null && elements.done !== undefined && elements.done.disabled === false);
        console.log('LOG LOG: Genesys: dispoCall: done button is found and enabled');
        elements.done.click();
        console.log('LOG LOG: Genesys: dispoCall: done button clicked');
/*
        await pauseForCondition(() => elements.hangUpButton.disabled === false && elements.transferButton.disabled === false && elements.muteButton.disabled === true);
        if (elements.hangUpButton.disabled === false && elements.transferButton.disabled === false && elements.muteButton.disabled === true) {
        elements.hangUpButton.shadowRoot.querySelector('button').click();
        }
*/
        window.parent.postMessage("dispo done", 'https://thumbtack.lightning.force.com');
    }

    if (elements.wrapUpButton !== null && elements.wrapUpButton !== undefined)  {
        if (
            elements.hangUpButton.disabled === false && elements.transferButton.disabled === true && elements.muteButton.disabled === true ||
            elements.hangUpButton.disabled === false && elements.transferButton.disabled === false && elements.muteButton.disabled === false ||
            elements.hangUpButton.disabled === true && elements.transferButton.disabled === true && elements.muteButton.disabled === true && elements.wrapUpButton.parentElement.classList.contains('red')
            ) {
            console.log('LOG LOG: Genesys: dispoCall running due to call in progress or wrap up required');
            setdispo();
        } else if (elements.hangUpButton.disabled === false && elements.transferButton.disabled === false && elements.muteButton.disabled === true) {
            console.log('LOG LOG: Genesys: dispoCall NOT running due to preview dialer');
            elements.hangUpButton.shadowRoot.querySelector('button').click();
            window.parent.postMessage("dispo done", 'https://thumbtack.lightning.force.com');
        } else {
            console.log('LOG LOG: Genesys: dispoCall NOT running due to NO CALL TO DISPO');
            window.parent.postMessage("dispo done", 'https://thumbtack.lightning.force.com');
        }
    } else {
        console.log('LOG LOG: Genesys: dispoCall NOT running due to NO CALL TO DISPO');
        window.parent.postMessage("dispo done", 'https://thumbtack.lightning.force.com');
    }
}

window.startDial = async function() {
    function waitForCondition(conditionFunction, interval = 5, maxAttempts = 500) {let attempts = 0;return new Promise((resolve, reject) => {const checkCondition = () => {if (conditionFunction()) {console.log('Condition met.');resolve();} else if (attempts < maxAttempts) {attempts++;setTimeout(checkCondition, interval);} else {console.log('Condition not met within the specified time');reject(new Error('Condition not met within the specified time'));}};checkCondition();});}
    var elements = new Proxy({}, {get: function(target, name) {return variables()[name];}});

    function variables() {
        return {
        hangUpButton: document.querySelector('#statusController_test gef-disconnect-control'),
        transferButton: document.querySelector('#statusController_test gef-transfer-control'),
        muteButton: document.querySelector('#statusController_test gef-mute-control'),
        wrapUpButton: document.querySelectorAll('#interactionList div.right-btn-container i.fa.fa-user.interaction-call-work-edit')[0],
        };
    }
    await waitForCondition(() => elements.hangUpButton.disabled === true && elements.transferButton.disabled === true && elements.muteButton.disabled === true);
    if (elements.wrapUpButton !== null && elements.wrapUpButton !== undefined) {
        await waitForCondition(() => !elements.wrapUpButton.parentElement.classList.contains('red'));
    }
    await waitForCondition(() => callButton !== null);
    var callButton = document.querySelector('#dialForm button.add-interaction-button');
    await waitForCondition(() => callButton !== null);
    await waitForCondition(() => callButton.disabled === false);

    if (callButton.disabled === false) {
        callButton.click();
    }
}

window.addEventListener('message', function(event) { // Add event listener for messages from the parent window
    // Check the origin of the message
    if (event.origin !== 'https://thumbtack.lightning.force.com') return;

    // Execute the function call
    eval(event.data);
});

window.toggleQueue = function() {

    var availableStatus = document.querySelector('div.simplebar-content-wrapper li.status-item.available');
    var onQueueStatus = document.querySelector('div.simplebar-content-wrapper li.status-item.on_queue');
    if (onQueueStatus) {
        var available = document.querySelector('a#AVAILABLE div.item-icon-wrapper')
        available.click();

    } else if (availableStatus) {
        var onQueue = document.querySelector('a#ON_QUEUE div.item-icon-wrapper')
        onQueue.click();
    }

}

window.addEventListener('keydown', function(event) { // Add event listener for 'No Answer' disposition Keyboard shortcut
    if (event.key === '=') {
        window.parent.postMessage("equal button pressed", 'https://thumbtack.lightning.force.com');

    }
});
} else {
    window.newNBC = function() {
    console.log('LOG LOG: Salesforce: newNBC Function started');
    function waitForCondition(conditionFunction, interval = 5, maxAttempts = 2000) {let attempts = 0;return new Promise((resolve, reject) => {const checkCondition = () => {if (conditionFunction()) {console.log('Condition met.');resolve();} else if (attempts < maxAttempts) {attempts++;setTimeout(checkCondition, interval);} else {console.log('Condition not met within the specified time');reject(new Error('Condition not met within the specified time'));}};checkCondition();});}

    function exitCurrentContact() {
        const iframes = document.querySelectorAll('ul.tabBarItems.slds-grid li[role=\"presentation\"]');

        if (iframes.length >= 0) {

            const tableRows = document.querySelectorAll('ul.tabBarItems.slds-grid li[role=\"presentation\"]');

            tableRows.forEach((row, index) => {
                if (index >= 0) {
                    const link = row.querySelector('div.close button');
                    if (link) {
                        link.click();
                    }
                }
            });
        }
    }

    function openNewContact() {
        var newContactButton = Array.from(document.querySelectorAll('button')).find(el => el.textContent === 'Go To Contact'); /* set variable: 'Go To Contact' button */
        if (newContactButton) {
            newContactButton.click(); /* Open new contact */
        } else {
            var nextBestContactButton = document.querySelector('div[data-component-id=\"NextBestContact\"] button'); /* set variable: 'Next Best Contact' button */
            var five9window = document.querySelector('div[data-component-id=\"opencti_softPhone\"] button'); /* set variable: five9 adapter window button */
            if (nextBestContactButton) {
                nextBestContactButton.click(); /* Open NBC Window */
                setTimeout(function () {
                    five9window.click(); /* Open Five9 Adapter Window */
                    openNewContact();
                }, 10);
            }
        }
    }

        async function clickPhoneNumber() {
            await waitForCondition(() => document.querySelector('.windowViewMode-maximized.active.lafPageHost').querySelector('[title=\"Click to dial\"]'));
            var phoneNumber = document.querySelector('.windowViewMode-maximized.active.lafPageHost').querySelector('[title=\"Click to dial\"]'); /* set variable: Click to dial */
                phoneNumber.click(); /* Load phone number into five9 */
                        // Get a reference to the iframe
    var gen2iframe = parent.document.querySelector('iframe.openctiSoftPhone');
    console.log('LOG LOG: Salesforce: startDial function message sent to genesys');

    // Use postMessage to send a message to the iframe
    gen2iframe.contentWindow.postMessage('window.startDial();', 'https://apps.usw2.pure.cloud');
    console.log('LOG LOG: Salesforce: startDial function message sent to genesys CONFIRMED');
        }


    function runScript() {
        setTimeout(function () {
            openNewContact();
                if (document.querySelector('button.toastClose')){
                document.querySelector('button.toastClose').click();
                }

            exitCurrentContact();
            setTimeout(clickPhoneNumber, 500);
                if (document.querySelector('button.toastClose')){
                document.querySelector('button.toastClose').click();
                }

        }, 0);
    }

    runScript();
}

window.sendMessage = function () {
    'use strict';
    console.log('LOG LOG: Salesforce: equal sign keyboard shortcut received');
    var genIframe = parent.document.querySelector('iframe.openctiSoftPhone');
    genIframe.contentWindow.postMessage('dispoCall();', 'https://apps.usw2.pure.cloud');
}

window.addEventListener('message', function(event) { // Add event listener for messages from the parent window
    // Check the origin of the message
    if (event.origin !== 'https://apps.usw2.pure.cloud') return;

    if (event.data === "equal button pressed") {
        console.log('LOG LOG: Salesforce: -equal button pressed- message received from Genesys');
        window.sendMessage();
    } else if (event.data === "dispo done") {
        window.newNBC();
    }
});

window.addEventListener('keydown', function(event) { // Add event listener for 'No Answer' disposition Keyboard shortcut
    if (event.key === '=') {
        window.sendMessage();
    }
});
}
