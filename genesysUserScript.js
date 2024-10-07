console.log('Hello from Caden -- Genesys');
(function () {
    var newStyles = document.createElement('style');
    newStyles.innerHTML = `

        html#purecloudHTML.lightning,
        html#purecloudHTML body.lightning {
            height: 100% !important;
            width: 100% !important;
        }
        div[class="crm-modal call-work-ui"] gux-dropdown gux-listbox[class="wrap-up-code-dropdown"] {
            max-height: calc(100vh - 231px) !important;
        }

    `;
    document.head.prepend(newStyles);
})();
window.wait = function (conditionFunction, actionFunction, interval = 100, maxAttempts = 100) {
    let attempts = 0;
    return new Promise((resolve, reject) => {
        const checkCondition = () => {
            if (conditionFunction()) {
                resolve();
            } else if (attempts < maxAttempts) {
                if (actionFunction) {
                    actionFunction();
                }
                attempts++;
                setTimeout(checkCondition, interval);
            } else {
                reject(new Error('DANNY -- wait function: Condition not met within maximum attempts' + conditionFunction));
            }
        };
        checkCondition();
    });
};
window.checkContactForAnswerDecision = async function () {
    window.parent.postMessage("cadenMessage answerDecision", 'https://thumbtack.lightning.force.com')
    await wait(() => window.answerDecision !== "" && window.answerDecision !== '').then(() => {
        if (window.answerDecision === "Yes") {
            window.answerDecision = "";
        } else if (window.answerDecision === "No") {
            window.answerDecision = "";
            wait(() => document.querySelector('#statusController_test gef-disconnect-control')?.disabled === false).then(() => {
                window.dispoCall();
                /*
                document.querySelector('#statusController_test gef-disconnect-control').click();
                waitForCondition(() => document.querySelector('#statusController_test gef-disconnect-control')?.disabled === true).then(() => {
                    window.dispoCall();
                });
                */
            });
        }
    });
};

window.genesysVariables = function () {
    return {
        interactionsData: document.querySelector('#interactionList div.simplebar-content div.interaction-selection.sel div.center-container'),
        makeCallButton: document.querySelectorAll('div.callback-ui-wrapper div.btn-group button')[1],
        pickUpButton: document.querySelector('gef-pickup-control[text="Pick Up"]'),
        callControl: document.querySelector('li[data-call-control="pickup"]'),
        hangUpButton: document.querySelector('#statusController_test gef-disconnect-control'),
        transferButton: document.querySelector('#statusController_test gef-transfer-control'),
        muteButton: document.querySelector('#statusController_test gef-mute-control'),
        wrapUpButton: document.querySelectorAll('#interactionList div.right-btn-container i.fa.fa-user.interaction-call-work-edit')[0],
        wrapUpList: document.querySelectorAll('gux-dropdown[placeholder="Select wrap-up code"]')[0],

        done: document.querySelector('button.after-call-work-done-button.btn.btn-sm.btn-primary'),
        callBackInfo: document.querySelector('div.callback-ui div.form-group.flex'),
        muteButton: document.querySelector('li[data-call-control="mute"] gef-mute-control')?.shadowRoot?.querySelector('button[aria-label="Mute"]'),
    };
};
window.genUI = new Proxy({}, { get: function (target, name) { return window.genesysVariables()[name]; } });


function genesysFunctions() {
    window.answerDecision = "";
    window.parent.postMessage("cadenMessage set-phone-height", 'https://thumbtack.lightning.force.com');

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
                            setTimeout(function () {
                                if (newNode.innerText.includes('Failed to save an interaction log')) {
                                    newNode.childNodes[1].click();
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
    window.startTimer = function (time = 30000) {
        window.timerId = setTimeout(() => {
            if (window.remainOnCall === 'No') {
                window.dispoCall();
                window.timerId = null;
            } else {
                window.answerObserver1.disconnect();
                // window.remainOnCall = 'No';
            }
        }, time);
    };
    window.startTimer1 = function (time = 6000) {
        window.timerId1 = setTimeout(() => {
            if (window.remainOnCall === 'No') {
                window.dispoCall();
                window.timerId1 = null;
            } else {
                //window.remainOnCall = 'No';
            }
        }, time);
    };

    window.cancelTimer = function () {
        if (window.timerId) {
            clearTimeout(window.timerId);
            window.timerId = null;
        }
    };
    window.cancelTimer1 = function () {
        if (window.timerId1) {
            clearTimeout(window.timerId1);
            window.timerId1 = null;
        }
    };

    // previewDialer auto answer
    (function previewDialerAutoAnswer() {

        function waitForCondition(conditionFunction, interval = 200, maxAttempts = 100) { let attempts = 0; return new Promise((resolve, reject) => { const checkCondition = () => { if (conditionFunction()) { resolve(); } else if (attempts < maxAttempts) { attempts++; setTimeout(checkCondition, interval); } else { reject(console.log('CADEN LOG: Condition not met within the specified time')); } }; checkCondition(); }); }
        function pauseForCondition(conditionFunction, interval = 200, maxAttempts = 100) { let attempts = 0; return new Promise((resolve, reject) => { const checkCondition = () => { if (conditionFunction()) { resolve(); } else if (attempts < maxAttempts) { attempts++; setTimeout(checkCondition, interval); } else { resolve(false); } }; checkCondition(); }); }

        (function observerSetUp1() {
            window.answerObserver1Config = { attributes: true, attributeFilter: ['style'] };

            // Callback function to execute when mutations are observed
            window.answerObserver1Callback = function (mutationsList, observer) {
                for (let mutation of mutationsList) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                        if (mutation.target.style.display !== 'none') {
                            if (window.timerId) {
                                if (window.remainOnCall === 'No') {
                                    window.cancelTimer();
                                    window.startTimer1();
                                }
                            }
                            window.answerObserver1.disconnect();
                        }
                    }
                }
            };
            window.answerObserver1 = new MutationObserver(window.answerObserver1Callback);
        })();
        // Function to pick up the call
        function makeCall() {
            wait(() => window.genUI.interactionsData?.textContent != '' && !window.genUI.interactionsData?.innerText.includes('DISCONNECTED') && window.genUI.pickUpButton?.disabled === false).then(() => {
                pauseForCondition(() => window.genUI.interactionsData?.textContent == 'CustomerALERTINGSMB English Dialer').then(() => {
                    if (window.genUI.interactionsData?.textContent == 'CustomerALERTINGSMB English Dialer') {
                        window.genUI.pickUpButton.click();
                        wait(() => window.genUI.makeCallButton?.disabled === false).then(() => {
                            window.genUI.makeCallButton?.click();
                            window.parent.postMessage("newCall", 'https://thumbtack.lightning.force.com');
                            setTimeout(() => {
                                if (window.genUI.callControl?.disabled === false) {
                                    window.genUI.callControl?.click();
                                }
                            }, 1000);
                            window.startTimer();
                        });
                    }
                });
            });


            /*
                await waitForCondition(() => window.genUI.interactionsData.textContent != '' && !window.genUI.interactionsData.innerText.includes('DISCONNECTED') && window.genUI.pickUpButton.disabled === false);
                await pauseForCondition(() => window.genUI.interactionsData.textContent == 'CustomerALERTINGSMB English Dialer');
                if (window.genUI.interactionsData.textContent == 'CustomerALERTINGSMB English Dialer') {
                    window.genUI.pickUpButton.click();
                    await waitForCondition(() => window.genUI.makeCallButton.disabled === false);
                    window.genUI.makeCallButton.click();
                    setTimeout(() => {
                        if (window.genUI.callControl.disabled === false) {
                            window.genUI.callControl.click();
                        }
                    }, 1000);
                    //window.checkContactForAnswerDecision();
                }
            */
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
                                makeCall();
                            }
                            if (node.nodeName === 'I') {
                                if (node.classList.value === 'fa fa-rss') {
                                    window.answerObserver1.observe(node, window.answerObserver1Config);
                                }
                            }
                        }
                    }
                }
            };

            let observer = new MutationObserver(callback);
            observer.observe(targetNode, config);
        }

        (async function () {
            await waitForCondition(() => window.genUI.pickUpButton !== null && document.querySelector('#interactionList div.simplebar-content') !== null && document.querySelector('#interactionList div.simplebar-content') !== undefined);
            observerSetUp();
            callErrorCloser();
        })();
    })();

    // call dispositioner
    window.dispoCall = function (dispoSelector = 'No answer from Pro') {
        try {
            function getgenUIByTextContent(text) { let all = Array.from(document.querySelectorAll('gux-option')); let result = all.filter(el => el.textContent.trim() == text); return result; }
            function waitForCondition(conditionFunction, interval = 200, maxAttempts = 100) { let attempts = 0; return new Promise((resolve, reject) => { const checkCondition = () => { if (conditionFunction()) { resolve(); } else if (attempts < maxAttempts) { attempts++; setTimeout(checkCondition, interval); } else { reject(console.log('Condition not met within the specified time')); } }; checkCondition(); }); }
            function pauseForCondition(conditionFunction, interval = 200, maxAttempts = 100) { let attempts = 0; return new Promise((resolve, reject) => { const checkCondition = () => { if (conditionFunction()) { resolve(); } else if (attempts < maxAttempts) { attempts++; setTimeout(checkCondition, interval); } else { resolve(false); } }; checkCondition(); }); }

            var dispo = getgenUIByTextContent(dispoSelector)[0];
            function openInteractionList() {
                var interactionList = document.querySelector('div.interaction-list-container');
                if (interactionList.getAttribute('style') == 'display: none;') {
                    var interactionListNavigator = document.querySelector('#navInteractionList');
                    interactionListNavigator.click();
                    interactionListNavigator.click();
                }
            }


            async function setdispo() {
                if (window.genUI.hangUpButton.disabled === false) {
                    window.genUI.hangUpButton.shadowRoot.querySelector('button').click();
                }
                await waitForCondition(() => window.genUI.wrapUpButton !== null && window.genUI.wrapUpButton !== undefined);
                window.genUI.wrapUpButton.click();
                await waitForCondition(() => getgenUIByTextContent(dispoSelector)[0] !== null && getgenUIByTextContent(dispoSelector)[0] !== undefined);
                getgenUIByTextContent(dispoSelector)[0].click();
                await waitForCondition(() => window.genUI.done !== null && window.genUI.done !== undefined && window.genUI.done.disabled === false);
                window.genUI.done.click();
                if (window.genUI.callBackInfo.textContent != '') {
                    await pauseForCondition(() => window.genUI.hangUpButton.disabled === false && window.genUI.transferButton.disabled === false && window.genUI.muteButton.disabled === true);
                    if (window.genUI.hangUpButton.disabled === false && window.genUI.transferButton.disabled === false && window.genUI.muteButton.disabled === true) {
                        window.genUI.hangUpButton.shadowRoot.querySelector('button').click();
                    }
                }

                window.parent.postMessage("dispo done", 'https://thumbtack.lightning.force.com');
            }

            openInteractionList();

            if (window.genUI.wrapUpButton !== null && window.genUI.wrapUpButton !== undefined) {
                if (
                    window.genUI.hangUpButton.disabled === false && window.genUI.transferButton.disabled === true && window.genUI.muteButton.disabled === true ||
                    window.genUI.hangUpButton.disabled === false && window.genUI.transferButton.disabled === false && window.genUI.muteButton.disabled === false ||
                    window.genUI.hangUpButton.disabled === true && window.genUI.transferButton.disabled === true && window.genUI.muteButton.disabled === true && window.genUI.wrapUpButton.parentElement.classList.contains('red')
                ) {
                    setdispo();
                } else if (window.genUI.hangUpButton.disabled === false && window.genUI.transferButton.disabled === false && window.genUI.muteButton.disabled === true) {
                    window.genUI.hangUpButton.shadowRoot.querySelector('button').click();
                    window.parent.postMessage("dispo done", 'https://thumbtack.lightning.force.com');
                } else {
                    window.parent.postMessage("dispo done", 'https://thumbtack.lightning.force.com');
                }
            } else {
                window.parent.postMessage("dispo done", 'https://thumbtack.lightning.force.com');
            }
            //getCallMetrics();
        } catch (error) {
            console.error('CADEN LOG: dispoCall -', error);
        }
    }

    // postMessage Handler for messages from Salesforce
    window.addEventListener('message', function (event) {
        if (event.origin !== 'https://thumbtack.lightning.force.com') return;

        // Check if the message is a string
        if (typeof event.data === 'string' && event.data.includes("cadenMessage")) {
            // Trim "cadenMessage " from the start of the message
            var trimmedMessage = event.data.replace('cadenMessage ', '');
            if (trimmedMessage === 'window.answerDecision = "Yes";') {
                window.answerDecision = "Yes";
            } else if (trimmedMessage === 'window.answerDecision = "No";') {
                window.answerDecision = "No";
            } else if (trimmedMessage === 'remainOnCall') {
                if (this.window.remainOnCall === 'Yes') {
                    this.window.remainOnCall = 'No';
                } else if (this.window.remainOnCall === 'No') {
                    this.window.remainOnCall = 'Yes';
                }
            } else if (trimmedMessage === 'dispoCall') {
                this.window.dispoCall();
                this.window.cancelTimer();
                this.window.cancelTimer1();
            } else if (trimmedMessage.includes('dispoCall ')) {
                var trimmedDispoMessage = trimmedMessage.replace('dispoCall ', '');
                this.window.dispoCall(trimmedDispoMessage);
                this.window.cancelTimer();
                this.window.cancelTimer1();
            } else if (trimmedMessage === 'toggleQueue') {
                this.window.toggleQueue();
            } else if (trimmedMessage === 'muteCall') {
                this.window.muteCall();
            }
        }
    });
    window.kbsShortcutKey = '=';
    window.addEventListener('keydown', function (event) {
        if (event.key === window.kbsShortcutKey) {
            window.dispoCall();
        }
    });
    window.toggleQueue = function () {
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
            console.error('ERRO CADEN LOG: toggleQueue -', error);
        }
    };
    window.muteCall = function () {
        if (window.genUI.muteButton !== null) {
            if (window.genUI.muteButton.disabled === false) {
                window.genUI.muteButton.click();
            }
        }
    };
    function remainOnCallListener() {
        let remainOnCall = 'Yes';
        // Define a property with getter and setter
        Object.defineProperty(window, 'remainOnCall', {
            get() {
                return remainOnCall;
            },
            set(value) {
                remainOnCall = value;
                updateCheckbox(value);
            }
        });

        // Function to update the checkbox based on remainOnCall value
        function updateCheckbox(value) {
            const checkbox = document.querySelector('input#autoDispoCheckbox');
            if (checkbox) {
                checkbox.checked = (value === 'Yes');
            }
        }

        // create a click event listener for the checkbox. When clicked, if the check box is checked then set remainOnCall to 'Yes' but if it's not checked then set remainOnCall to 'No'
        document.querySelector('input#autoDispoCheckbox').addEventListener('click', function () {
            window.remainOnCall = this.checked ? 'Yes' : 'No';
        });

        // Set the initial state of the checkbox
        updateCheckbox(window.remainOnCall);
    };

    function autoDispoElementInsertStyle() {
        const autoDispoElement = document.querySelector('div.autoDispoContainer');
        var newStyles = document.createElement('style');
        newStyles.innerHTML = `
        div.autoDispoContainer {
            display: flex !important;
            position: relative !important;
            flex-direction: column !important;
            justify-content: center !important;
            align-items: center !important;
            align-self: center !important;
            gap: 0px !important;
            width: fit-content !important;
            height: 30px !important;
            padding: 0px !important;
            margin: 0px !important;
            background-color: rgb(23, 151, 192) !important;
        }
    
        div.autoDispoContainer>label.autoDispoLabel {
            display: flex !important;
            flex-direction: row !important;
            justify-content: center !important;
            align-items: center !important;
            padding: 0px !important;
            margin: 0px !important;
            color: #ffffff !important;
            font-size: 10px !important;
            font-weight: 500 !important;
        }
    
        div.autoDispoContainer>input.autoDispoCheckbox {
            display: flex !important;
            flex-direction: row !important;
            justify-content: center !important;
            align-items: center !important;
            padding: 0px !important;
            margin: 0px !important;
        }
        `;
        autoDispoElement.prepend(newStyles);
        remainOnCallListener();
    };

    (function () {
        const checkbox = document.createElement('div');
        checkbox.className = 'autoDispoContainer';
        checkbox.innerHTML = `
            <label for="toggle" class="autoDispoLabel">Auto Dispo</label>
            <input type="checkbox" id="autoDispoCheckbox" class="autoDispoCheckbox"></input>
                `;
        // Get the parent element
        const navBar = document.querySelector('div#navBar.top-bar.nav-bar');
        const rightBtnGroup = navBar.querySelector('.btn-group.pull-right');
        navBar.insertBefore(checkbox, rightBtnGroup);
        autoDispoElementInsertStyle();
    })();

};

// Function to log a message after the DOM has had no mutations for 2 seconds
function logAfterNoMutations() {
    let timeout = null;
    const loadObserver = new MutationObserver(() => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            loadObserver.disconnect();
            genesysFunctions();
        }, 1000);
    });

    loadObserver.observe(document, { childList: true, subtree: true, attributes: true, characterData: true });
}


// Call the function when the userscript loads
logAfterNoMutations();
