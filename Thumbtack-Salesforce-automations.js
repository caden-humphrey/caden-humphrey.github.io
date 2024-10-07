// ==UserScript==
// @name         Thumbtack-Salesforce-automations
// @namespace    http://tampermonkey.net/
// @version      10-01-2024
// @description  Salesforce Automations
// @author       Caden H
// @match        https://thumbtack.lightning.force.com
// @match        https://thumbtack.lightning.force.com/*
// @match        https://apps.usw2.pure.cloud/crm/index.html?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// @updateURL    https://caden-humphrey.github.io/Thumbtack-Salesforce-automations.js
// @downloadURL  https://caden-humphrey.github.io/Thumbtack-Salesforce-automations.js
// ==/UserScript==
(function () {
    if (window.top === window.self) {
        window.dblClick = new MouseEvent('dblclick', { bubbles: true, cancelable: true, view: window });
        window.inputEvent = new Event('input', { bubbles: true, cancelable: true, });
        window.windowPathTest;
        window.contactRecordType;
        window.paidAmount = ''; window.promoCredit = ''; window.none = ''; window.typeValue = ''; window.numEmployeesValue = ''; window.numLocationsValue = ''; window.franchiseValue = ''; window.packageValue = ''; window.packageLevelvalue = ''; window.leadTypeValue = ''; window.leadSourceValue = ''; window.batchValue = '';
        window.wait = async function (conditionFunction, actionFunction, interval = 200) {
            return new Promise((resolve, reject) => {
                // const startingPath = window.location.pathname;
                const checkCondition = () => {
                    if (conditionFunction()) {
                        console.log('condition met -- ' + conditionFunction);
                        resolve();
                    } else if (window.contactRecordType === 'Other') {
                        window.contactRecordType = '';
                        reject(new Error('Emma TEST -- waitForConditionContact = FAILURE -- ' + conditionFunction));
                        return;
                    } else if (window.location.pathname === window.windowPathTest) {
                        if (actionFunction) {
                            actionFunction();
                            setTimeout(checkCondition, interval);
                        } else {
                            setTimeout(checkCondition, interval);
                        }
                    } else {
                        reject(new Error('Emma TEST -- waitForConditionContact = FAILURE -- ' + conditionFunction));
                        return;
                    }
                };
                checkCondition();
            });
        };
        window.actionThenWaitForCondition = function (actionFunction, conditionFunction, interval = 100, maxAttempts = 100) {
            let attempts = 0;
            return new Promise((resolve, reject) => {
                const checkCondition = () => {
                    actionFunction();
                    if (conditionFunction()) {
                        resolve();
                    } else if (attempts < maxAttempts) {
                        attempts++; setTimeout(checkCondition, interval);
                    } else {
                        reject(new Error('Condition not met within the specified time'));
                    }
                };
                checkCondition();
            });
        };
        window.createActionThenWaitForCondition = function (windowPath, interval = 250) {
            return function (conditionFunction, actionFunction) {
                return new Promise((resolve, reject) => {
                    const checkCondition = () => {
                        if (conditionFunction()) {
                            resolve();
                        } else if (window.location.pathname === windowPath) {
                            actionFunction();
                            setTimeout(checkCondition, interval);
                        } else {
                            reject(new Error('Emma TEST -- waitForConditionContact = FAILURE -- ' + conditionFunction));
                            return;
                        }
                    };
                    checkCondition();
                });
            };
        };
        window.createWaitForCondition = function (windowPath, interval = 100) {
            return function (conditionFunction) {
                return new Promise((resolve, reject) => {
                    const checkCondition = () => {
                        if (conditionFunction()) {
                            resolve();
                        } else if (window.location.pathname === windowPath) {
                            setTimeout(checkCondition, interval);
                        } else {
                            reject(new Error('CADEN TEST -- waitForConditionContact = FAILURE -- ' + conditionFunction));
                            return;
                        }
                    };
                    checkCondition();
                });
            };
        };
        window.waitForCondition = function (conditionFunction, interval = 100, maxAttempts = 100) {
            let attempts = 0; return new Promise((resolve, reject) => {
                const checkCondition = () => {
                    if (conditionFunction()) {
                        resolve();
                    } else if (attempts < maxAttempts) {
                        attempts++; setTimeout(checkCondition, interval);
                    } else {
                        reject(new Error('Caden Test -- Condition not met in time' + conditionFunction));
                    }
                }; checkCondition();
            });
        };

        // Custom UI Variables___________________________________________
        window.customUI = new Proxy({}, { get: function (target, name) { return window.customUIvariables()[name]; } });
        window.customUIvariables = function () {
            return {
                leftContainer: document.querySelector('.caden.left-content'),
                phoneSpace: document.querySelector('div.caden.phone-space'),
                customUIContainer: document.querySelector('li.caden.custom-ui-container'),
                kbsEditSection: document.querySelector('#kbsEditSection'),
                editKbsButton: document.querySelector('#editKbsButton'),
                newKbsSubmit: document.querySelector('#newKbsSubmit'),
                newKbsShortcutInput: document.querySelector('#newKbsShortcutInput'),
                currentKbs: document.querySelector('#currentKbs'),
                kbsCloseButton: document.querySelector('#closeKbsWindow-icon'),


                automationsButton: document.querySelector('span#automationsDropdownImage'),
                automationsDropdown: document.querySelector('div.caden.automationsContainer'),
                editKbsButtonContainer: document.querySelector('div.caden.editKeyboardShortcut')




                // Opportunity UI Fields
            };
        };
        let customUIvalues = ['leftContainer', 'phoneSpace', 'customUIContainer', 'kbsEditSection', 'editKbsButton', 'newKbsSubmit', 'newKbsShortcutInput', 'currentKbs', 'kbsCloseButton', 'automationsButton', 'automationsDropdown'];
        window.phoneResizer = function () {
            // Get the container element
            var container = document.querySelector('div.oneUtilityBarPanel.DOCKED.slds-is-open');
            var startY, startHeight, startX, startWidth, startPhoneSpaceWidth;

            // Function to check if the cursor is near the top edge
            function isNearTopEdge(event) {
                var rect = container.getBoundingClientRect();
                // Allow for a mousedown event within a 4px range from the top edge
                return event.clientY >= rect.top - 4 && event.clientY <= rect.top + 4;
            }

            // Function to check if the cursor is near the right edge
            function isNearRightEdge(event) {
                var rect = container.getBoundingClientRect();
                // Allow for a mousedown event within a 4px range from the right edge
                return event.clientX >= rect.right - 4 && event.clientX <= rect.right + 4;
            }

            // Attach the mousedown event listener to the container
            container.addEventListener('mousedown', function (event) {
                // Prevent any default action to ensure smooth dragging
                event.preventDefault();

                // Check if the cursor is near the top edge
                if (isNearTopEdge(event)) {
                    startY = event.clientY;
                    startHeight = container.offsetHeight;
                    document.documentElement.addEventListener('mousemove', resizeHeight, false);
                }
                // Check if the cursor is near the right edge
                if (isNearRightEdge(event)) {
                    startX = event.clientX;
                    startWidth = container.offsetWidth;
                    startPhoneSpaceWidth = customUI.phoneSpace.offsetWidth;
                    document.documentElement.addEventListener('mousemove', resizeWidth, false);
                }
                // run waitForMouseUp function which adds a mouseup event listener to the document
                waitForMouseUp();
            });
            function waitForMouseUp() {
                document.addEventListener('mouseup', function () {
                    document.documentElement.removeEventListener('mousemove', resizeHeight, false);
                    document.documentElement.removeEventListener('mousemove', resizeWidth, false);
                    document.removeEventListener('mouseup', waitForMouseUp);
                });
            };

            // Function to resize the height of the container
            function resizeHeight(event) {
                var newY = event.clientY;
                var newHeight = startHeight - (newY - startY);
                //container.style.height = newHeight + 'px !important';
                container.style.setProperty('height', newHeight + 'px', 'important');
            }

            // Function to resize the width of the container
            function resizeWidth(event) {
                var newX = event.clientX;
                var newWidth = startWidth + (newX - startX);
                var newPhoneSpaceWidth = startPhoneSpaceWidth + (newX - startX);
                container.style.width = newWidth + 'px';
                customUI.phoneSpace.style.width = newPhoneSpaceWidth + 'px';
            }
        };

        // Tack UI Variables___________________________________________
        window.tackUIvariables = function () {
            return {
                contactName: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[data-target-selection-name="sfdc:RecordField.Contact.Name"] slot [slot="output"]')?.innerText,
                occupation: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[data-target-selection-name="sfdc:RecordField.Contact.pro_occupation__c"] slot [slot="output"]')?.innerText,
                mailingAddress: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('lightning-formatted-address a'),
                createdDate: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[data-target-selection-name="sfdc:RecordField.Contact.CreatedById"] slot [slot="output"] lightning-formatted-text')?.innerText,
                numberOfEmployees: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[data-target-selection-name="sfdc:RecordField.Contact.NumberofEmployees__c"] slot [slot="output"]')?.innerText.split('(')[0].trim(),

                firstServiceCreatedDate: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('p[title="First Service Create Time"]')?.nextSibling?.innerText,
                signupDate: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[data-target-selection-name="sfdc:RecordField.Contact.usr_signup_date__c"] slot [slot="output"]')?.innerText,
                userLastActivity: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[data-target-selection-name="sfdc:RecordField.Contact.usr_last_activity_date__c"] slot [slot="output"]')?.innerText,

                assignedCategory: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[data-target-selection-name="sfdc:RecordField.Contact.AssignedCategory__c"] slot [slot="output"]')?.innerText,
                decile: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[data-target-selection-name="sfdc:RecordField.Contact.Decile__c"] slot [slot="output"]')?.innerText,


                targetingOn: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[data-target-selection-name="sfdc:RecordField.Contact.targeting_on__c"] input[type="checkbox"]')?.checked,
                cardOnFile: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[data-target-selection-name="sfdc:RecordField.Contact.card_on_file__c"] input[type="checkbox"]')?.checked,
                numberOfReviews: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[data-target-selection-name="sfdc:RecordField.Contact.reviews__c"] slot [slot="output"]')?.innerText,

                backgroundCheckStatus: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[data-target-selection-name="sfdc:RecordField.Contact.Background_Check_Status__c"] slot [slot="output"]')?.innerText,
                salesActivationDate: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[data-target-selection-name="sfdc:RecordField.Contact.SalesActivationDate__c"] slot [slot="output"]')?.innerText,
                maxActivationDate: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[data-target-selection-name="sfdc:RecordField.Contact.MaxActivationDate__c"] slot [slot="output"]')?.innerText,

                contactRecordType: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('div.recordTypeName')?.innerText,
                salesStatus: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('div[class="slds-grid slds-path__scroller-container runtime_sales_pathassistantPathAssistantTabSet"] li.slds-is-current.slds-is-active')?.innerText.trim().replace(/\s+/g, ''),
                contactSalesStatus: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('flexipage-component2[data-component-id="c_SalesPathCustom1"] li.slds-is-current.slds-is-active')?.innerText.trim().replace(/\s+/g, ''),
                opportunitySalesStatus: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('flexipage-component2[data-component-id="runtime_sales_pathassistant_pathAssistant"] li.slds-is-current.slds-is-active')?.innerText.trim().replace(/\s+/g, ''),
                flextabContainer: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('flexipage-tab2'),
                contactInformationHeader: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('span[title="Contact Information"]'),
                contactOutreachSummaryHeader: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('span[title="Contact Outreach Summary"]'),
                proActivationDetailHeader: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('span[title="Pro Activation Detail"]'),
                thumbtackProDetailHeader: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('span[title="Thumbtack Pro Detail"]'),
                systemInformationHeader: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('span[title="System Information"]'),

                toastMessageContainerNode: document.querySelector('div.forceVisualMessageQueue'),
                toastMessage: document.querySelector('span.toastMessage')?.textContent,
                phoneButton: document.querySelector('div[data-component-id="opencti_softPhone"] button'),
                phonePanel: document.querySelector('div.oneUtilityBarContainer.oneUtilityBar > div.DOCKED.slds-is-open'),


                tabs: document.querySelectorAll('ul.tabBarItems.slds-grid li[role="presentation"]'),
                insertPoint: document.querySelector('div.desktop.container.forceStyle.oneOne.navexDesktopLayoutContainer.lafAppLayoutHost.forceAccess.tablet'),
                viewport: document.querySelector('div.viewport'),
                dockingPanel: document.querySelector('div[class="oneDockingPanelManager oneUtilityBar"]'),
                utilityBarParentElement: document.querySelector('div.oneUtilityBarContainer.oneUtilityBar'),
                outerPhoneContainer: document.querySelector('div.oneUtilityBarPanel.DOCKED.slds-is-open'),
                innerPhoneContainer: document.querySelector('div.oneUtilityBarPanel.DOCKED.slds-is-open>div.slds-utility-panel__body'),
                pageHost: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]'),
                allProgressiveContainers: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelectorAll('laf-progressive-container[lwc-mlenr16lk9]'),
                passiveContainers: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelectorAll('flexipage-tab2[aria-labelledby="detailTab__item"] laf-progressive-container[aria-busy="true"]'),
                flexiComponents: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelectorAll('flexipage-tab2[aria-labelledby="detailTab__item"] flexipage-component2[style="position: absolute; top: 0px; z-index: -1;"]'),
                genesysIframe: document.querySelector('iframe.openctiSoftPhone'),
                closedPassiveContainerButtons: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelectorAll('button[class="slds-button slds-section__title-action"][aria-expanded="false"]'),

                // contact sales status buttons
                statusNewButton: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('li[data-name="New"]'),
                statusAttemptingButton: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('li[data-name="Attempting"]'),
                statusUnsuccessfulButton: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('li[data-name="Unsuccessful"]'),
                statusConvertButton: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('li[data-name="Convert"]'),
                statusRetiredButton: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('li[data-name="Retired"]'),

                /* Opportunity Objects */
                oppContactCard: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('article[class="slds-card slds-card_boundary forceBaseCard cProPersona"]'),
                oppContactCardFields: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('article[class="slds-card slds-card_boundary forceBaseCard cProPersona"]')?.querySelectorAll('lightning-output-field[class="slds-form-element_small slds-form-element_edit slds-hint-parent slds-form-element slds-form-element_stacked"]'),
                oppCloseDate: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[field-label="Close Date"] [slot="outputField"]')?.innerText,
                oppOwner: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[field-label="Opportunity Owner"] slot[name="outputField"] span a')?.innerText,
                oppContactName: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[data-target-selection-name="sfdc:RecordField.Opportunity.Contact__c"] slot[name="outputField"] span')?.innerText,
                oppAccountName: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[field-label="Account Name"] slot[name="outputField"] span')?.innerText,
                oppOccupation: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[field-label="Contact Information"] [slot="outputField"] span[part="formatted-rich-text"]')?.innerText?.split('\n')[0].split(': ')[1],
                oppRevenue: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelectorAll('lightning-formatted-text[lwc-2i3do6c70ve][class="slds-border_bottom slds-form-element__static"]')[1]?.innerText,
                oppAmount: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[field-label="Amount"] [slot="outputField"]')?.innerText,
                oppAmountPaidUpfront: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[field-label="Amount Paid Upfront"] [slot="outputField"]')?.innerText,
                oppPackage: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[field-label="Package"] [slot="outputField"]')?.innerText,
                oppPackageLevel: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[field-label="Package Level"] [slot="outputField"]')?.innerText,


                oppStatusNew: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('ul[class="slds-path__nav"] li[data-name="New"]'),
                oppStatusAttempting: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('ul[class="slds-path__nav"] li[data-name="Attempting"]'),
                oppStatusContacted: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('ul[class="slds-path__nav"] li[data-name="Contacted"]'),
                oppStatusSqo: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('ul[class="slds-path__nav"] li[data-name="Sales Qualified Opportunity"]'),
                oppStatusPitched: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('ul[class="slds-path__nav"] li[data-name="Pitched"]'),
                oppStatusFinalDetails: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('ul[class="slds-path__nav"] li[data-name="Final Details"]'),
                oppStatusCommitted: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('ul[class="slds-path__nav"] li[data-name="Committed"]'),
                oppStatusClosed: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('ul[class="slds-path__nav"] li[data-name="Closed"],li[data-name="Closed Won"],li[data-name="Closed Lost"]'),

                oppTempStage: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('div[class="slds-grid slds-path__scroller-container runtime_sales_pathassistantPathAssistantTabSet"] li.slds-is-complete.slds-is-active,li.slds-is-incomplete.slds-is-active')?.querySelector('span[class="title slds-path__title"]'),
                oppMarkStageCompleteButton: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('button[class="slds-button slds-button--brand slds-path__mark-complete stepAction active uiButton"]'),

                /* convert function variables */
                convertEditBatchBtn: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[title="Edit Lead Batch"]'),
                convertLeadBatchField: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[name="LeadBatch__c"]'),
                convertGatedStatusField: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('.slds-cell-wrap strong'),
                convertLeadTypeField: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[data-target-selection-name="sfdc:RecordField.Contact.LeadType__c"] span'),
                convertLeadTypeOption: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[data-value="Inbound Sales"]'),
                convertNumLocationsField: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[data-target-selection-name="sfdc:RecordField.Contact.NumberofLocations__c"] span'),
                convertNumLocationsOption: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[data-value="1-4"]'),
                convertFranchiseField: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[data-target-selection-name="sfdc:RecordField.Contact.IsPartofaFranchise__c"] span'),
                convertFranchiseOption: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[data-value="No"]'),
                convertLanguageField: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[data-target-selection-name="sfdc:RecordField.Contact.PreferredLanguage__c"] span'),
                convertLanguageOption: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[data-value="English"]'),
                convertSaveBtn: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[name="SaveEdit"]'),
                convertConvertTab: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[data-name="Convert"]'),
                convertCreateOpportunityRadio: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('input[name="conversionChoiceRadio"]'),
                convertConvertBtn: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('button[name="save"]'),
                convertPageSaveSpinner: document.querySelector('div.oneWorkspace.active.navexWorkspace div.spinnerWrapper'),
                convertSaveFooter: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('records-form-footer.slds-docked-form-footer div'),

                /* Package Fill variables */
                packageOppName: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[name=\"Name\"]'),
                packageAmountField: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[name=\"Amount\"]'),
                packageAmountPaidUpfrontField: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[name=\"AmountPaidUpfront__c\"]'),
                packagePromoCreditField: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[name=\"PromotionalCredit__c\"]'),
                packageTypeField: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[field-label=\"Type\"] button span'),
                packageTypeOption: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[field-label=\"Type\"] [title=\"' + window.typeValue + '\"]'),
                packageNumEmployeesField: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[field-label=\"Number of Employees\"] button span'),
                packageNumEmployeesOption: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[field-label=\"Number of Employees\"] [title=\"' + window.numEmployeesValue + '\"]'),
                packageNumLocationsField: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[field-label=\"Number of Locations\"] button span'),
                packageNumLocationsOption: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[field-label=\"Number of Locations\"] [title=\"' + window.numLocationsValue + '\"]'),
                packageFranchiseField: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[field-label=\"Is Part of a Franchise?\"] button span'),
                packageFranchiseOption: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[field-label=\"Is Part of a Franchise?\"] [title=\"' + window.franchiseValue + '\"]'),
                packagePackageField: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[field-label=\"Package\"] button span'),
                packagePackageOption: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[field-label=\"Package\"] [title=\"' + window.packageValue + '\"]'),
                packagePackageLevelField: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[field-label=\"Package Level\"] button span'),
                packagePackageLevelOption: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[field-label=\"Package Level\"] [title=\"' + window.packageLevelvalue + '\"]'),
                packageLeadTypeField: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[field-label=\"Lead Type\"] button span'),
                packageLeadTypeOption: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[field-label=\"Lead Type\"] [title=\"' + window.leadTypeValue + '\"]'),
                packageLeadSourceField: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[field-label=\"Lead Source\"] button span'),
                packageLeadSourceOption: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[field-label=\"Lead Source\"] [title=\"' + window.leadSourceValue + '\"]'),
                packageBatchField: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[name=\"Batch__c\"]'),
                packageSaveBtn: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[name=\"SaveEdit\"]'),

                dialRefreshButton: document.querySelector('iframe[src="https://thumbtack.lightning.force.com/reports/lightningReportApp.app?reportId=00O3q000006ML1SEAW&isView=true&filterValues=%7B%7D"]')?.contentDocument.querySelector('button.action-bar-action-refreshReport'),

                headerNavSlot: document.querySelector('ul.slds-global-actions'),
                headerItemInsertBefore: document.querySelector('ul.slds-global-actions li[class="slds-global-actions__item slds-grid"]'),
            };
        };
        window.tackUI = new Proxy({}, { get: function (target, name) { return window.tackUIvariables()[name]; } });

        window.insertCustomUI = function () {

            // Create a new div element
            const phoneSpacer = document.createElement('section');
            phoneSpacer.className = 'caden left-content';
            phoneSpacer.innerHTML = `
                <div class="caden body-container">
                    <div class="caden phone-space"></div>
                </div>
                `;

            // Append the new element to the tackUI.insertPoint
            tackUI.viewport.prepend(phoneSpacer);

            const kbsEditDropdown = document.createElement('li');
            kbsEditDropdown.className = 'caden custom-ui-container';
            kbsEditDropdown.innerHTML = `
                <section class="caden automationSection">
                    <div class="caden automationsHeader">
                        <span id="automationsDropdownImage" class="caden dropdownIcon">
                            <svg class="caden dropdownIconSVG" viewBox="0 0 520 520" part="icon">
                                <g>
                                    <path class="caden dropdownIconPath" d="M476 178L271 385c-6 6-16 6-22 0L44 178c-6-6-6-16 0-22l22-22c6-6 16-6 22 0l161 163c6 6 16 6 22 0l161-163c6-6 16-6 22 0l22 22c5 7 5 16 0 22z"></path>
                                </g>
                            </svg>
                        </span>
                    </div>
                </section>
                `;
            tackUI.headerNavSlot.insertBefore(kbsEditDropdown, tackUI.headerItemInsertBefore);

            const kbsEditSection = document.createElement('div');
            kbsEditSection.className = 'caden kbsEditSection';
            kbsEditSection.innerHTML = `
                <div class="caden automationsContainer">
                    <div class="caden editKeyboardShortcut">
                        <button id="editKbsButton" class="caden editKeyboardShortcutButton">Edit Keyboard Shortcut</button>
                    </div>
                </div>
                <section id="kbsEditSection" class="caden kbsEditSection">
                    <div class="caden kbsEditWindow">
                        <div class="caden kbsHeader">
                            <label class="caden kbs-header-label">Edit Keyboard Shortcut</label>
                            <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-3bq099ugqsh="" data-key="close" id="closeKbsWindow-icon" class="caden closeKbsWindow-icon">
                                <g lwc-3bq099ugqsh="">
                                    <path d="M310 254l130-131c6-6 6-15 0-21l-20-21c-6-6-15-6-21 0L268 212a10 10 0 01-14 0L123 80c-6-6-15-6-21 0l-21 21c-6 6-6 15 0 21l131 131c4 4 4 10 0 14L80 399c-6 6-6 15 0 21l21 21c6 6 15 6 21 0l131-131a10 10 0 0114 0l131 131c6 6 15 6 21 0l21-21c6-6 6-15 0-21L310 268a10 10 0 010-14z" lwc-3bq099ugqsh=""></path>
                                </g>
                            </svg>
                        </div>
                        <div class="caden kbsContentContainer">
                            <div id="currentKbsContainer" class="caden kbsContainer">
                                <label class="caden kbs-label currentLabel">Current</label>
                                <output id="currentKbs" class="caden kbs-output currentOutput">=</output>
                            </div>
                            <div id="newKbsContainer" class="caden kbsContainer">
                                <label class="caden kbs-label newLabel">New</label>
                                <div class="caden inputAndSubmitContainer">
                                    <input id="newKbsShortcutInput" class="caden kbs-input newInput" type="text" placeholder="new kbs here"></input>
                                    <button id="newKbsSubmit" class="caden newKbsSubmit">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                `;
            tackUI.viewport.prepend(kbsEditSection);

            // Create a new style element
            const style = document.createElement('style');
            style.className = 'caden-style';
            style.textContent = `
                section.caden.left-content {
                    position: fixed;
                    top: 90px;
                    left: 0px;
                    height: calc(100% - 130px);
                    min-width: fit-content;
                    z-index: 3;
                    margin: 0;
                    padding: 0;
                }

                div.caden.body-container {
                    position: relative;
                    top: 0px;
                    left: 0px;
                    font-family: -apple-system, 'system-ui', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
                    margin: 0;
                    padding: 0;
                    background-color: rgb(255, 255, 255);
                    display: flex;
                    flex-direction: row;
                    align-items: flex-start;
                    height: fit-content;
                    min-height: fit-content;
                    width: fit-content;
                    z-index: 1;
                    gap: 2px;
                }

                /* Phone Spacer */
                div.caden.phone-space {
                    display: none;
                    flex-direction: column;
                    position: relative;
                    top: 0px;
                    bottom: 0px;
                    left: 0px;
                    align-items: flex-start;
                    width: 350px;
                }

                /* Custom UI Container */
                li.caden.custom-ui-container {
                    box-sizing: border-box;
                    color: rgb(24, 24, 24);
                    display: flex;
                    font-family: -apple-system, "system-ui", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                    font-size: 12px;
                    height: 24px;
                    width: 24px;
                    line-height: normal;
                    list-style-image: none;
                    list-style-position: outside;
                    list-style-type: none;
                    margin-left: 4px;
                    margin-right: 4px;
                    text-align: left;
                    text-size-adjust: 100%;
                    unicode-bidi: isolate;
                    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                }

                /* Autmoations */

                div.caden.automationsHeader {
                    display: flex;
                    height: 24px;
                    width: 24px;
                    padding: 0px;
                    margin: 0px;
                    border: 1.11111px solid rgb(116, 116, 116);
                    border-radius: 4px;
                    align-items: center;
                }

                span#automationsDropdownImage.caden.dropdownIcon {
                    height: 24px;
                    width: 24px;
                    fill: rgb(116, 116, 116);
                    border: none;
                    padding: 0px;
                    margin: 0px;
                    border-radius: 4px;
                    align-items: center;
                    cursor: pointer !important;
                }

                div.caden.automationsContainer {
                    display: none;
                    position: fixed !important;
                }

                div.caden.automationsContainer.show {
                    gap: 10px;
                    height: fit-content;
                    width: 94.730;
                    display: flex;
                    flex-direction: column;
                    padding: 0px;
                    margin: 0px;
                    background-color: rgb(243, 243, 243);
                    padding-left: 10px;
                    padding-right: 10px;
                    padding-top: 5px;
                    padding-bottom: 5px;
                    border-top-left-radius: 4px;
                    border-bottom-left-radius: 4px;
                    border-bottom-right-radius: 4px;
                    border: 1.11111px solid rgb(116, 116, 116);
                    position: fixed !important;
                    top: 37px;
                    z-index: 30000;
                }

                div.caden.editKeyboardShortcut {
                    position: relative;
                    display: flex;
                    flex-direction: row;
                    width: 94.73px;
                    height: 32px;
                    padding: 0px;
                    margin: 0px;
                    border-radius: 4px;
                    z-index: 20000;
                }

                button.caden.automationButton {
                    position: relative;
                    display: flex;
                    width: fit-content;
                    height: fit-content;
                    border-radius: 4px;
                    background-color: rgb(255, 255, 255);
                    font-size: 13px;
                    color: rgb(1, 118, 211);
                    justify-content: center;
                    align-items: center;
                    border: 1.11111px solid rgb(116, 116, 116);
                    padding: 0px;
                    margin: 0px;
                }

                div.caden.editKeyboardShortcut {
                    position: relative;
                    display: flex;
                    flex-direction: row;
                    width: 94.73px;
                    height: 32px;
                    padding: 0px;
                    margin: 0px;
                    z-index: 20000;
                }

                button.caden.editKeyboardShortcutButton {
                    position: relative;
                    display: flex;
                    width: 94.73px;
                    height: 32px;
                    border-radius: 4px;
                    background-color: rgb(255, 255, 255);
                    font-size: 13px;
                    color: rgb(1, 118, 211);
                    justify-content: center;
                    align-items: center;
                    border: 1.11111px solid rgb(116, 116, 116);
                    padding: 0px;
                    margin: 0px;
                    cursor: pointer;
                }

                /* edit kbs shortcuts */

                section.caden.kbsEditSection {
                    position: fixed;
                    top: 0px;
                    left: 0px;
                    display: none;
                    flex-direction: column;
                    position: fixed;
                    gap: 10px;
                    z-index: 20000;
                    align-items: center;
                    height: 100vh;
                    width: 100vw;
                    background-color: rgba(0, 0, 0, 0.5);
                    align-items: center;
                    justify-content: center;
                }

                div.caden.kbsEditWindow {
                    display: flex;
                    flex-direction: column;
                    padding: 10px;
                    border: 1.5px solid rgb(116, 116, 116);
                    border-radius: 4px;
                    background-color: rgb(255, 255, 255);
                    width: 200px;
                    position: fixed;
                }

                div.caden.kbsHeader {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    width: 100%;
                    background-color: rgb(243, 243, 243);
                    border-radius: 4px;
                    position: relative;
                    left: -10px;
                    top: -10px;
                    padding-top: 5px;
                    padding-bottom: 5px;
                    width: calc(100% + 20px);
                }

                label.caden.kbs-header-label {
                    display: flex;
                    border-radius: 4px;
                    position: relative;
                    text-indent: 10px;
                }

                svg.caden.closeKbsWindow-icon {
                    display: flex;
                    width: 15.9896px;
                    height: 15.9896px;
                    fill: rgb(116, 116, 116);
                    border: none;
                    border-radius: 4px;
                    padding-right: 5px;
                    cursor: pointer;
                }

                div.caden.kbsContentContainer {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                div.kbsContainer {
                    display: flex;
                    flex-direction: column;
                }

                label.kbs-label {
                    display: flex;
                    font-size: 13px;
                    font-weight: 400;
                    color: rgb(68, 68, 68);
                    height: 100%;
                }

                output.caden.kbs-output {
                    display: flex;
                    box-sizing: border-box;
                    font-size: 13px;
                    font-weight: 500;
                    color: rgb(68, 68, 68);
                    width: 50px;
                    border: 1px solid rgb(118, 118, 118);
                    border-radius: 2px;
                    padding-top: 1px;
                    padding-bottom: 1px;
                    padding-left: 2px;
                    padding-right: 2px;
                    height: 23px;
                    max-height: 23px;
                }

                div.caden.inputAndSubmitContainer {
                    display: flex;
                    flex-direction: row;
                    gap: 5px;
                }

                input.caden.kbs-input.newInput {
                    display: flex;
                    font-size: 13px;
                    font-weight: 500;
                    width: 50px;
                    max-height: 21px;
                }

                button.newKbsSubmit {
                    display: flex;
                    font-size: 13px;
                    font-weight: 400;
                    color: rgb(1, 118, 211);
                    justify-content: center;
                    align-items: center;
                    border: 1.11111px solid rgb(116, 116, 116);
                    padding: 0px;
                    margin: 0px;
                    height: 23px;
                    width: 50px;
                    cursor: pointer;
                }

                /* Object Automation Buttons */

                div.caden.automationButtonContainer.Convert {
                    align-content: center !important;
                    align-items: center !important;
                    box-sizing: border-box !important;
                    color: rgb(24, 24, 24) !important;
                    display: flex !important;
                    flex-basis: auto !important;
                    flex-grow: 0 !important;
                    flex-shrink: 0 !important;
                    font-family: -apple-system, "system-ui", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !important;
                    font-size: 13px !important;
                    height: 36.5px !important;
                    line-height: normal !important;
                    margin-right: 4px !important;
                    text-size-adjust: 100% !important;
                    unicode-bidi: isolate !important;
                    width: 94.7344px !important;
                    -webkit-tap-highlight-color: rgba(0, 0, 0, 0) !important;
                }

                button.caden.automationButton.Convert {
                    box-sizing: border-box !important;
                    display: block !important;
                    font-family: -apple-system, "system-ui", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !important;
                    font-size: 13px !important;
                    height: 32px !important;
                    line-height: normal !important;
                    text-size-adjust: 100% !important;
                    unicode-bidi: isolate !important;
                    width: 94.7344px !important;
                    -webkit-tap-highlight-color: rgba(0, 0, 0, 0) !important;
                }

                div.caden.automationButtonContainer.opp {
                    align-content: center !important;
                    align-items: center !important;
                    box-sizing: border-box !important;
                    color: rgb(24, 24, 24) !important;
                    display: flex !important;
                    flex-basis: auto !important;
                    flex-grow: 0 !important;
                    flex-shrink: 0 !important;
                    font-family: -apple-system, "system-ui", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !important;
                    font-size: 13px !important;
                    height: 36.5px !important;
                    line-height: normal !important;
                    margin: 0px !important;
                    text-size-adjust: 100% !important;
                    unicode-bidi: isolate !important;
                    width: 94.7344px !important;
                    -webkit-tap-highlight-color: rgba(0, 0, 0, 0) !important;
                }

                button.caden.automationButton.opp {
                    box-sizing: border-box !important;
                    display: block !important;
                    font-family: -apple-system, "system-ui", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !important;
                    font-size: 13px !important;
                    height: 32px !important;
                    line-height: normal !important;
                    text-size-adjust: 100% !important;
                    unicode-bidi: isolate !important;
                    width: 94.7344px !important;
                    -webkit-tap-highlight-color: rgba(0, 0, 0, 0) !important;
                }

                div.caden.automationButtonContainer.opp.start {
                    border-top-left-radius: 4px !important;
                    border-bottom-left-radius: 4px !important;
                    border-top-right-radius: 0px !important;
                    border-bottom-right-radius: 0px !important;
                }

                div.caden.automationButtonContainer.opp.middle {
                    border-left: 0px !important;
                    border-right: 0px !important;
                    border-radius: 0px !important;
                }

                div.caden.automationButtonContainer.opp.end {
                    border-top-right-radius: 4px !important;
                    border-bottom-right-radius: 4px !important;
                    border-top-left-radius: 0px !important;
                    border-bottom-left-radius: 0px !important;
                    margin-right: 4px !important;
                }

                button.caden.automationButton.opp.start {
                    border-top-left-radius: 4px !important;
                    border-bottom-left-radius: 4px !important;
                    border-top-right-radius: 0px !important;
                    border-bottom-right-radius: 0px !important;
                }

                button.caden.automationButton.opp.middle {
                    border-left: 0px !important;
                    border-right: 0px !important;
                    border-radius: 0px !important;
                }

                button.caden.automationButton.opp.end {
                    border-top-right-radius: 4px !important;
                    border-bottom-right-radius: 4px !important;
                    border-top-left-radius: 0px !important;
                    border-bottom-left-radius: 0px !important;
                }

                /* Salesforce Objects */

                div.viewport {
                    left: 400px !important;
                }

                section.layoutContent {
                    position: relative !important;
                    z-index: auto !important;
                }

                div.tabsetHeader.slds-context-bar.slds-context-bar--tabs.slds-no-print {
                    left: 0px !important;
                    z-index: 1001 !important;
                }

                div.oneUtilityBarPanel.DOCKED.slds-is-open {
                    left: -10px !important;
                    bottom: 40px !important;
                    height: calc(100% - 135px) !important;
                }

                div.oneUtilityBarPanel.DOCKED.slds-is-open>div.slds-utility-panel__body {
                    min-height: calc(100% - 41.98px) !important;
                    max-height: calc(100% - 41.98px) !important;
                }

                [data-component-id="c_layoutComponent2"][data-target-selection-name="c_layoutComponent2"][slot="header"][lwc-7uq5q81tcsp-host] article {
                    display: none !important;
                }

                div.oneUtilityBarPanel.DOCKED.slds-is-open:before {
                    content: "";
                    position: absolute;
                    top: -2px;
                    left: 4px;
                    right: 4px;
                    height: 3px;
                    z-index: 1000;
                    cursor: ns-resize;
                }

                div.oneUtilityBarPanel.DOCKED.slds-is-open:after {
                    content: "";
                    position: absolute;
                    top: 4px;
                    bottom: 4px;
                    right: -2px;
                    width: 3px;
                    z-index: 1000;
                    cursor: ew-resize;
                }

                div[lwc-mlenr16lk9][class="field-section2 slds-card slds-theme_default"]:has(> div[lwc-mlenr16lk9][class="slds-card__body slds-card__body_inner"] > div[lwc-mlenr16lk9][class="section-layout-container slds-section slds-is-open"] > laf-progressive-container[aria-busy="true"]) {
                    position: absolute !important;
                    top: 0px !important;
                    z-index: -1 !important;
                }

                `;
            // Append the style element to the document head
            tackUI.insertPoint.prepend(style);
        };

        window.customUIscript = function () {
            function adjustViewport() {
                var leftWidth = customUI.leftContainer.offsetWidth;
                tackUI.viewport.style = 'left: ' + leftWidth + 'px !important';
            }
            setTimeout(adjustViewport, 1000);
            // Create a new ResizeObserver instance and pass adjustHeaderAndPseudo as the callback function
            var resizeObserver = new ResizeObserver(adjustViewport);

            // Start observing the leftContent element
            resizeObserver.observe(customUI.leftContainer);
        };
        window.kbsChanger = function () {

            window.kbsShortcutKey = '=';

            window.addEventListener('keydown', function (event) {
                if (event.key === window.kbsShortcutKey) {
                    if (document.querySelector('iframe.openctiSoftPhone') !== null) {
                        genesysPM("dispoCall();");
                    } else {
                        window.closeContact();
                    }
                }
            });

            customUI.editKbsButton.addEventListener('click', clickToOpenKbsWindow);
            customUI.kbsCloseButton.addEventListener('click', clickToCloseKbsWindow);

            function clickToOpenKbsWindow() {
                customUI.kbsEditSection.style.display = 'flex';
            }

            function clickToCloseKbsWindow() {
                customUI.kbsEditSection.style.display = 'none';
            }

            customUI.newKbsSubmit.addEventListener('click', function () {
                var newKbsShortcutKey = customUI.newKbsShortcutInput.value;
                if (newKbsShortcutKey !== '' && newKbsShortcutKey !== ' ') {
                    window.kbsShortcutKey = newKbsShortcutKey;
                    customUI.currentKbs.textContent = newKbsShortcutKey;
                    customUI.newKbsShortcutInput.value = '';
                    customUI.kbsEditSection.style.display = 'none';
                    genesysPM('window.kbsShortcutKey = "' + newKbsShortcutKey + '";');
                } else {
                    customUI.newKbsShortcutInput.value = '';
                }
            });
        };
        window.kbsPositionObserverSetup = function () {
            // observer resizing of tackUI.headerNavSlot and on resize, call setKbsDropdownPosition
            const observer = new ResizeObserver(setKbsDropdownPosition);
            observer.observe(tackUI.viewport);
        };
        window.setKbsDropdownPosition = function () {
            let automationsButtonPositionBottom = customUI.automationsButton.getBoundingClientRect().bottom;
            let automationsButtonPositionLeft = customUI.automationsButton.getBoundingClientRect().left - getComputedStyle(customUI.editKbsButtonContainer).width.replace('px', '');
            customUI.automationsDropdown.style.top = automationsButtonPositionBottom + 'px';
            customUI.automationsDropdown.style.left = automationsButtonPositionLeft + 'px';
        };

        window.genesysPM = function (funcString) { var genIframe = document.querySelector('iframe.openctiSoftPhone'); genIframe.contentWindow.postMessage('cadenMessage ' + funcString, 'https://apps.usw2.pure.cloud'); }
        window.customUIautomationsFunctions = function () {
            let isDropdownShown = false;

            // Toggle dropdown on click
            customUI.automationsButton.addEventListener('click', () => {
                customUI.automationsDropdown.classList.toggle('show');
                isDropdownShown = !isDropdownShown;
            });

            // Function to check if the mouse is far from the elements
            function isMouseFar(event) {
                // Define a threshold distance (5px)
                const threshold = 10;
                const elements = [customUI.automationsButton, customUI.automationsDropdown];

                // Check if the mouse is farther than the threshold from all elements
                return elements.every(element => {
                    const rect = element.getBoundingClientRect();
                    return (
                        event.clientX < rect.left - threshold ||
                        event.clientX > rect.right + threshold ||
                        event.clientY < rect.top - threshold ||
                        event.clientY > rect.bottom + threshold
                    );
                });
            }

            // Hide dropdown if the mouse moves more than 5px away from any element
            document.addEventListener('mousemove', (event) => {
                if (isDropdownShown && isMouseFar(event)) {
                    customUI.automationsDropdown.classList.remove('show');
                    isDropdownShown = false;
                }
            });

        };
        window.testUIvariables = function () {
            return {
                secondFlexipageComponenet: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('flexipage-tab2')?.querySelectorAll('flexipage-component2')[1],
                flexiComponentSlot: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('flexipage-tab2 slot'),
                contactOutreachSummaryComponent: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelectorAll('flexipage-tab2 flexipage-component2')[1],
                proActivationDetailComponent: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelectorAll('flexipage-tab2 flexipage-component2')[1]?.nextSibling,
                column1: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelectorAll('flexipage-column2 slot[class="column"]')[0],
                column2: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelectorAll('flexipage-column2 slot[class="column"]')[1],
                column3: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelectorAll('flexipage-column2 slot[class="column"]')[2],
                column4: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelectorAll('flexipage-column2 slot[class="column"]')[3],
                defaultContactInfoFlexitab: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('flexipage-component2'),
                highlightedFieldsSlot: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('div[class="secondaryFields"] slot'),
                contactInformationColumn1Slot: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelectorAll('flexipage-field-section2 slot[class="column"]')[0],
                contactInformationColumn2Slot: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelectorAll('flexipage-field-section2 slot[class="column"]')[1],
                parentAccount: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelectorAll('div[class="secondaryFields"][role="presentation"] slot records-highlights-details-item')[2],
                occupation: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelectorAll('div[class="secondaryFields"][role="presentation"] slot records-highlights-details-item')[3],
                firstServiceCreateTime: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelectorAll('div[class="secondaryFields"][role="presentation"] slot records-highlights-details-item')[4],
                mailingAddress: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelectorAll('div[class="secondaryFields"][role="presentation"] slot records-highlights-details-item')[5],
                name: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('flexipage-field[data-field-id="RecordNameField"]'),
                accountName: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('flexipage-field[data-field-id="RecordAccountIdField"]'),
                adminLinkViewUser: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('flexipage-field[data-field-id="RecordAdminLinkViewUser_cField"]'),
                thumbtackUserPk: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('flexipage-field[data-field-id="Recorduser_pk_id_cField"]'),
                occupation: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('flexipage-field[data-field-id="Recordpro_occupation_cField"]'),
                assignedCategory: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('flexipage-field[data-field-id="RecordAssignedCategory_cField"]'),
                numberOfEmployees: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('flexipage-field[data-field-id="RecordNumberofEmployees_cField"]'),
                decile: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('flexipage-field[data-field-id="RecordDecile_cField"]'),
                contactOwner: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('flexipage-field[data-field-id="RecordOwnerIdField"]'),
                createdDate: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('flexipage-field[data-field-id="RecordCreatedByIdField"]'),
                signupDate: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('flexipage-field[data-field-id="Recordusr_signup_date_cField"]'),
                userLastActivity: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('flexipage-field[data-field-id="Recordusr_last_activity_date_cField"]'),
                preferredLanguage: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('flexipage-field[data-field-id="RecordPreferredLanguage_cField"]'),
                CBSA: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('flexipage-field[data-field-id="Recordcbsa_cField"]'),
                holdout: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('flexipage-field[data-field-id="RecordHoldout_cField"]'),
                marketCompetitionDashboard: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('flexipage-field[data-field-id="RecordMarketCompetitionDashboard_cField"]'),
                title: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('flexipage-field[data-field-id="RecordTitleField"]'),
                email: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('flexipage-field[data-field-id="RecordEmailField"]'),
                phone: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('flexipage-field[data-field-id="RecordPhoneField"]'),
                preferredPhone: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('flexipage-field[data-field-id="RecordPreferredPhone_cField"]'),
                revenuePotential: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('flexipage-field[data-field-id="RecordRevenuePotential_cField"]'),
                businessType: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('flexipage-field[data-field-id="RecordBusinessType_cField"]'),
                lastQuoteTime: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('flexipage-field[data-field-id="Recordlast_quote_time_cField"]'),
                holdoutV1: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('flexipage-field[data-field-id="RecordHoldoutV1_cField"]'),
                holdoutSegmentationName: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('flexipage-field[data-field-id="RecordHoldoutSegmentationName_cField"]'),

                automationInsertSlot: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('div.slds-grid.primaryFieldRow'),
                automationInsertBefore: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('div.slds-grid.primaryFieldRow div.slds-col.slds-no-flex'),
                convertButton: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('button[id="convertToOpp"]'),
                $200Button: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('button[id="$200Package"]'),
            };
        };
        window.testUI = new Proxy({}, { get: function (target, name) { return window.testUIvariables()[name]; } });

        window.testUiElements = ['flexiComponentSlot', 'contactOutreachSummaryComponent', 'proActivationDetailComponent', 'column1', 'column2', 'column3', 'column4', 'defaultContactInfoFlexitab', 'highlightedFieldsSlot', 'contactInformationColumn1Slot', 'contactInformationColumn2Slot', 'parentAccount', 'occupation', 'firstServiceCreateTime', 'mailingAddress', 'name', 'accountName', 'adminLinkViewUser', 'thumbtackUserPk', 'occupation', 'assignedCategory', 'numberOfEmployees', 'decile', 'contactOwner', 'createdDate', 'signupDate', 'userLastActivity', 'preferredLanguage', 'CBSA', 'holdout', 'marketCompetitionDashboard', 'title', 'email', 'phone', 'preferredPhone', 'revenuePotential', 'businessType', 'lastQuoteTime', 'holdoutV1', 'holdoutSegmentationName'];

        window.moveFields = function () {
            testUI.column1.prepend(testUI.decile);
            testUI.column1.prepend(testUI.numberOfEmployees);
            testUI.column1.prepend(testUI.assignedCategory);
            testUI.column1.prepend(testUI.occupation);
            testUI.column1.prepend(testUI.thumbtackUserPk);
            testUI.column1.prepend(testUI.adminLinkViewUser);
            testUI.column1.prepend(testUI.accountName);
            testUI.column1.prepend(testUI.name);

            testUI.column2.appendChild(testUI.preferredLanguage);
            testUI.column2.appendChild(testUI.CBSA);
            testUI.column2.appendChild(testUI.holdout);
            testUI.column2.appendChild(testUI.marketCompetitionDashboard);
            testUI.column2.prepend(testUI.userLastActivity);
            testUI.column2.prepend(testUI.signupDate);
            testUI.column2.prepend(testUI.createdDate);
            testUI.column2.prepend(testUI.contactOwner);

            testUI.column3.prepend(testUI.revenuePotential);
            testUI.column3.prepend(testUI.preferredPhone);
            testUI.column3.prepend(testUI.phone);
            testUI.column3.prepend(testUI.email);
            testUI.column3.prepend(testUI.title);

            testUI.column4.prepend(testUI.holdoutSegmentationName);
            testUI.column4.prepend(testUI.holdoutV1);
            testUI.column4.prepend(testUI.lastQuoteTime);
            testUI.column4.prepend(testUI.businessType);


            testUI.flexiComponentSlot.insertBefore(testUI.proActivationDetailComponent, testUI.contactOutreachSummaryComponent);
        };
        window.insertContactAutomations = function () {
            const convertButton = document.createElement('div');
            convertButton.className = 'caden automationButtonContainer Convert';
            convertButton.innerHTML = `
            <button id="convertToOpp" class="caden automationButton Convert">
                Convert
            </button>
            `;
            convertButton.addEventListener('click', () => {
                window.convertContact();
            });

            testUI.automationInsertSlot.insertBefore(convertButton, testUI.automationInsertBefore);
        };

        window.insertOppAutomations = function () {
            const $200Button = document.createElement('div');
            $200Button.className = 'caden automationButtonContainer opp start';
            $200Button.innerHTML = `
            <button id="$200Package" class="caden automationButton opp start $200Package">
                $200 Package
            </button>
            `;
            const $300Button = document.createElement('div');
            $300Button.className = 'caden automationButtonContainer opp middle';
            $300Button.innerHTML = `
            <button id="$300Package" class="caden automationButton opp middle $300Package">
                $300 Package
            </button>
            `;
            const $400Button = document.createElement('div');
            $400Button.className = 'caden automationButtonContainer opp end';
            $400Button.innerHTML = `
            <button id="$400Package" class="caden automationButton opp end $400Package">
                $400 Package
            </button>
            `;
            $200Button.addEventListener('click', () => {
                window.fillPackage($200Package);
            });
            $300Button.addEventListener('click', () => {
                window.fillPackage($300Package);
            });
            $400Button.addEventListener('click', () => {
                window.fillPackage($400Package);
            });


            testUI.automationInsertSlot.insertBefore($200Button, testUI.automationInsertBefore);
            testUI.automationInsertSlot.insertBefore($300Button, testUI.automationInsertBefore);
            testUI.automationInsertSlot.insertBefore($400Button, testUI.automationInsertBefore);
        };
        window.contactRecordTypeChecker = async function () {
            await wait(() => tackUI.contactRecordType !== null && tackUI.contactRecordType !== undefined).then(() => {
                if (tackUI.contactRecordType == 'Thumbtack Pro') {
                    window.formatCustomContact();
                } else {
                }
            });
        };
        window.formatCustomContact = function () {
            // use wait function to wait until testUiElements.every are defined then run the moveFields function
            setTimeout(() => {
                testUiElements.forEach(element => console.log(testUI[element]));
            }, 6000);
            wait(() => testUiElements.every(element => testUI[element]?.innerText !== undefined)).then(() => {
                if (!testUI.secondFlexipageComponenet?.innerText.includes('Pro Activation Detail')) {
                    window.moveFields();
                }
                if (testUI.convertButton === null || testUI.convertButton === undefined) {
                    window.insertContactAutomations();
                }
            });

            // testUiElements.forEach(element => console.log(testUI[element]));

        };

        window.formatCustomOpp = function () {
            // use wait function to wait until testUiElements.every are defined then run the moveFields function
            wait(() => testUI.automationInsertSlot !== null && testUI.automationInsertSlot !== undefined && testUI.automationInsertBefore !== null && testUI.automationInsertBefore !== undefined).then(() => {
                if (testUI.$200Button === null || testUI.$200Button === undefined) {
                    window.insertOppAutomations();
                }
            });
        };

        // Navigation functions _______________________________________________________
        window.handleNavigation = function (event) {
            var urlPath = new URL(event.destination.url).pathname;
            var basePath = '/lightning/r/';
            var contactPath = '/lightning/r/Contact/';
            var opportunityPath = '/lightning/r/Opportunity/';

            if (urlPath.startsWith(basePath)) {
                if (urlPath.startsWith(contactPath)) {
                    // customUI.contactContainer.style.display = 'flex';
                    // customUI.opportunityContainer.style.display = 'none';
                    window.checkURL(urlPath);
                } else if (urlPath.startsWith(opportunityPath)) {
                    // customUI.contactContainer.style.display = 'none';
                    // customUI.opportunityContainer.style.display = 'flex';
                    window.checkURL(urlPath);
                } else {
                    // customUI.contactContainer.style.display = 'flex';
                    // customUI.opportunityContainer.style.display = 'none';
                    // window.clearContactData();
                }
            } else {
                // customUI.contactContainer.style.display = 'flex';
                // customUI.opportunityContainer.style.display = 'none';
                // window.clearContactData();
            }
        };
        window.checkURL = async function (newUrlPath = window.location.pathname) {
            await new Promise((resolve) => {
                const interval = setInterval(() => {
                    if (window.location.pathname === newUrlPath) {
                        clearInterval(interval);
                        window.windowPathTest = newUrlPath;
                        resolve();
                    }
                }, 100); // Check every 100 milliseconds
            }).then(() => {
                // window.refreshDials();
                var urlPath = window.location.pathname;
                var contactPath = '/lightning/r/Contact/';
                var opportunityPath = '/lightning/r/Opportunity/';
                if (urlPath.startsWith(contactPath)) {
                    // var target = document.querySelector('[class="windowViewMode-maximized active lafPageHost"]');
                    window.contactRecordTypeChecker();
                    // window.contactLoaderWaiter();
                } else if (urlPath.startsWith(opportunityPath)) {
                    window.formatCustomOpp();
                } else {
                    // window.clearContactData();
                }
            });
        };
        window.navigation.addEventListener('navigate', window.handleNavigation);



        // other running functions _______________________________________________________
        window.toastMessageCloser = async function () {
            let config = { childList: true, subtree: true };

            // Callback function to execute when mutations are observed
            let callback = function (mutationsList, observer) {
                for (let mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        for (let node of mutation.addedNodes) {
                            if (node.nodeName === 'DIV') {
                                setTimeout(function () {
                                    if (tackUI.toastMessage !== undefined) {
                                        if (tackUI.toastMessage == 'It looks as if duplicates exist for this Contact. View Duplicates') {
                                            document.querySelector('button.toastClose').click();
                                        }
                                    }
                                }, 2000);
                            }
                        }
                    }
                }
            };

            let observer = new MutationObserver(callback);
            observer.observe(tackUI.toastMessageContainerNode, config);
        };
        window.makeRoomForPhone = function () {
            let attempts = 0; // Moved outside to maintain its state across invocations

            function checkAriaHidden(maxAttempts = 2) {
                if (Array.from(tackUI.utilityBarParentElement.querySelectorAll('.slds-grid_vertical')).find(child => child.getAttribute('aria-hidden') === 'false')) {
                    customUI.phoneSpace.style.display = 'flex';
                } else if (attempts < maxAttempts) {
                    attempts++;
                    setTimeout(() => checkAriaHidden(maxAttempts), 150); // Use arrow function to maintain scope
                } else {
                    customUI.phoneSpace.style.display = 'none';
                    attempts = 0; // Reset attempts
                }
            }

            var resizeObserver = new ResizeObserver(() => {
                checkAriaHidden();
            });
            resizeObserver.observe(tackUI.dockingPanel);
        };
        window.closeContact = function () {
            try {
                if (tackUI.tabs.length >= 0) {
                    tackUI.tabs.forEach((row, index) => {
                        if (index >= 0) {
                            const link = row.querySelector('div.close button');
                            if (link) {
                                link.click();
                            }
                        }
                    });
                }
            } catch (error) {
                console.error('ERROR CADEN LOG: closeContact -', error);
            }
        };
        window.convertContact = function () {
            // Constants _______________________________________________________________________________________
            var noneValue = '--None--';
            var leadBatchValue = 'None';
            var leadTypeValue = 'Inbound Sales';
            var numLocationsValue = '1-4';
            var franchiseValue = 'No';
            var languageValue = 'English';


            // Function to get the elements ____________________________________________________________________
            function variables() {
                return {
                    editBatchBtn: document.querySelector('[class=\"windowViewMode-maximized active lafPageHost\"]').querySelector('[title=\"Edit Lead Batch\"]'),
                    leadBatchField: document.querySelector('[class=\"windowViewMode-maximized active lafPageHost\"]').querySelector('[name=\"LeadBatch__c\"]'),
                    gatedStatusField: document.querySelector('[class=\"windowViewMode-maximized active lafPageHost\"]').querySelector('.slds-cell-wrap strong'),
                    leadTypeField: document.querySelector('[class=\"windowViewMode-maximized active lafPageHost\"]').querySelector('[data-target-selection-name=\"sfdc:RecordField.Contact.LeadType__c\"] span'),
                    leadTypeOption: document.querySelector('[class=\"windowViewMode-maximized active lafPageHost\"]').querySelector('[data-value=\"' + leadTypeValue + '\"]'),
                    numLocationsField: document.querySelector('[class=\"windowViewMode-maximized active lafPageHost\"]').querySelector('[data-target-selection-name=\"sfdc:RecordField.Contact.NumberofLocations__c\"] span'),
                    numLocationsOption: document.querySelector('[class=\"windowViewMode-maximized active lafPageHost\"]').querySelector('[data-value=\"' + numLocationsValue + '\"]'),
                    franchiseField: document.querySelector('[class=\"windowViewMode-maximized active lafPageHost\"]').querySelector('[data-target-selection-name=\"sfdc:RecordField.Contact.IsPartofaFranchise__c\"] span'),
                    franchiseOption: document.querySelector('[class=\"windowViewMode-maximized active lafPageHost\"]').querySelector('[data-value=\"' + franchiseValue + '\"]'),
                    languageField: document.querySelector('[class=\"windowViewMode-maximized active lafPageHost\"]').querySelector('[data-target-selection-name=\"sfdc:RecordField.Contact.PreferredLanguage__c\"] span'),
                    languageOption: document.querySelector('[class=\"windowViewMode-maximized active lafPageHost\"]').querySelector('[data-value=\"' + languageValue + '\"]'),
                    saveBtn: document.querySelector('[class=\"windowViewMode-maximized active lafPageHost\"]').querySelector('[name=\"SaveEdit\"]'),
                    convertTab: document.querySelector('[class=\"windowViewMode-maximized active lafPageHost\"]').querySelector('[data-name=\"Convert\"]'),
                    createOpportunityRadio: document.querySelector('[class=\"windowViewMode-maximized active lafPageHost\"]').querySelector('input[name=\"conversionChoiceRadio\"]'),
                    convertBtn: document.querySelector('[class=\"windowViewMode-maximized active lafPageHost\"]').querySelector('button[name=\"save\"]'),
                    pageSaveSpinner: document.querySelector('div.oneWorkspace.active.navexWorkspace div.spinnerWrapper'),
                    saveFooter: document.querySelector('[class=\"windowViewMode-maximized active lafPageHost\"]').querySelector('records-form-footer.slds-docked-form-footer div')
                };

            }


            function waitForCondition(conditionFunction, interval = 5, maxAttempts = 500) { let attempts = 0; return new Promise((resolve, reject) => { const checkCondition = () => { if (conditionFunction()) { resolve(); } else if (attempts < maxAttempts) { attempts++; setTimeout(checkCondition, interval); } else { reject(new Error('Condition not met within the specified time')); } }; checkCondition(); }); }
            function actionThenWaitForCondition(actionFunction, conditionFunction, interval = 5, maxAttempts = 500) { let attempts = 0; return new Promise((resolve, reject) => { const checkCondition = () => { actionFunction(); if (conditionFunction()) { resolve(); } else if (attempts < maxAttempts) { attempts++; setTimeout(checkCondition, interval); } else { reject(new Error('Condition not met within the specified time')); } }; checkCondition(); }); }
            var elements = new Proxy({}, { get: function (target, name) { return variables()[name]; } });
            var inputEvent = new Event('input', { bubbles: true, cancelable: true, });






            // Edit Contact _________________________________________________________________________________
            (async function editContact() {
                try {
                    if (elements.editBatchBtn !== null) {
                        elements.editBatchBtn.click();
                    }
                    await waitForCondition(() => elements.leadBatchField !== null);
                    saveFunciton();
                } catch (error) { console.error('CADEN LOG: fillLeadBatch -', error); }
            })();

            // Lead Batch ___________________________________________________________________________________
            async function leadBatchFunction() {
                try {
                    await waitForCondition(() => elements.leadBatchField !== null && elements.leadBatchField.value !== undefined);
                    if (elements.leadBatchField.value === '') {
                        elements.leadBatchField.value = leadBatchValue;
                        elements.leadBatchField.dispatchEvent(inputEvent);
                        await waitForCondition(() => elements.leadBatchField.value === leadBatchValue);
                    }
                } catch (error) { console.error('CADEN LOG: fillLeadBatch -', error); }
            }

            // Lead Type _____________________________________________________________________________________
            async function leadTypeFunction() {
                try {
                    await waitForCondition(() => elements.leadTypeField !== null && elements.leadTypeField.textContent !== undefined);
                    if (elements.leadTypeField.textContent === noneValue) {
                        await actionThenWaitForCondition(
                            () => {
                                elements.leadTypeField.click();
                            }, () => {
                                return elements.leadTypeOption !== null; // check condition
                            }
                        );
                        elements.leadTypeOption.click();
                        await waitForCondition(() => elements.leadTypeField.textContent === leadTypeValue);
                    }
                } catch (error) { console.error('CADEN LOG: fillLeadBatch -', error); }
            }

            // Number of Locations _____________________________________________________________________________
            async function numLocationsFunction() {
                try {
                    await waitForCondition(() => elements.numLocationsField !== null && elements.numLocationsField.textContent !== undefined);
                    if (elements.numLocationsField.textContent === noneValue) {
                        await actionThenWaitForCondition(
                            () => {
                                elements.numLocationsField.click();
                            },
                            () => {
                                return elements.numLocationsOption !== null; // check condition
                            }
                        );
                        elements.numLocationsOption.click();
                        await waitForCondition(() => elements.numLocationsField.textContent === numLocationsValue);
                    }
                } catch (error) { console.error('CADEN LOG: fillLeadBatch -', error); }
            }

            // Franchise ________________________________________________________________________________________
            async function franchiseFunction() {
                try {
                    await waitForCondition(() => elements.franchiseField !== null && elements.franchiseField.textContent !== undefined);
                    if (elements.franchiseField.textContent === noneValue) {
                        await actionThenWaitForCondition(
                            () => {
                                elements.franchiseField.click(); // execute action
                            },
                            () => {
                                return elements.franchiseOption !== null; // check condition
                            }
                        );
                        elements.franchiseOption.click();
                        await waitForCondition(() => elements.franchiseField.textContent === franchiseValue);
                    }
                } catch (error) { console.error('CADEN LOG: fillLeadBatch -', error); }
            }

            // Language __________________________________________________________________________________________
            async function languageFunction() {
                try {
                    await waitForCondition(() => elements.languageField !== null && elements.languageField.textContent !== undefined);
                    if (elements.languageField.textContent === noneValue) {
                        await actionThenWaitForCondition(
                            () => {
                                elements.languageField.click(); // execute action
                            },
                            () => {
                                return elements.languageOption !== null; // check condition
                            }
                        );
                        elements.languageOption.click();
                        await waitForCondition(() => elements.languageField.textContent === languageValue);
                    }
                } catch (error) { console.error('CADEN LOG: fillLeadBatch -', error); }
            }

            // Save _______________________________________________________________________________________________
            async function saveFunciton() {
                try {
                    await Promise.all([leadBatchFunction(), leadTypeFunction(), numLocationsFunction(), franchiseFunction(), languageFunction()]);
                    await waitForCondition(() => elements.saveBtn !== null);
                    elements.saveBtn.click();
                    await waitForCondition(() => elements.saveFooter === null);
                    convertTabFunction();
                } catch (error) { console.error('CADEN LOG: fillLeadBatch -', error); }
            }


            // Convert _________________________________________________________________________________________________
            async function convertTabFunction() {
                try {
                    await waitForCondition(() => elements.pageSaveSpinner.className !== 'spinnerWrapper forceComponentSpinner hideSpinner hideEl');
                    await waitForCondition(() => elements.pageSaveSpinner.className === 'spinnerWrapper forceComponentSpinner hideSpinner hideEl');
                    await waitForCondition(() => elements.convertTab !== null);
                    elements.convertTab.click();
                    createOppButtonFunction();
                } catch (error) { console.error('CADEN LOG: fillLeadBatch -', error); }
            }

            async function createOppButtonFunction() {
                try {
                    await waitForCondition(() => elements.createOpportunityRadio !== null);
                    elements.createOpportunityRadio.click();
                    convertButtonFunction();
                } catch (error) { console.error('CADEN LOG: fillLeadBatch -', error); }
            }

            async function convertButtonFunction() {
                try {
                    await waitForCondition(() => elements.convertBtn !== null);
                    elements.convertBtn.click();
                } catch (error) { console.error('CADEN LOG: fillLeadBatch -', error); }
            }

        };


        window.$200Package = function () {
            window.paidAmount = '200';
            window.promoCredit = '0';
            window.none = '--None--';
            window.typeValue = 'Net New';
            window.numEmployeesValue = '1-14 employees';
            window.numLocationsValue = '1-4';
            window.franchiseValue = 'No';
            window.packageValue = 'One-Time';
            window.packageLevelvalue = 'Pay 200 get 200';
            window.leadTypeValue = 'Inbound Sales';
            window.leadSourceValue = 'Recent Signup';
            window.batchValue = 'none';
        };
        window.$300Package = function () {
            window.paidAmount = '300';
            window.promoCredit = '0';
            window.none = '--None--';
            window.typeValue = 'Net New';
            window.numEmployeesValue = '1-14 employees';
            window.numLocationsValue = '1-4';
            window.franchiseValue = 'No';
            window.packageValue = 'One-Time';
            window.packageLevelvalue = 'Pay 300 get 300';
            window.leadTypeValue = 'Inbound Sales';
            window.leadSourceValue = 'Recent Signup';
            window.batchValue = 'none';
        };
        window.$400Package = function () {
            window.paidAmount = '400';
            window.promoCredit = '0';
            window.none = '--None--';
            window.typeValue = 'Net New';
            window.numEmployeesValue = '1-14 employees';
            window.numLocationsValue = '1-4';
            window.franchiseValue = 'No';
            window.packageValue = 'One-Time';
            window.packageLevelvalue = 'Pay 400 get 400';
            window.leadTypeValue = 'Inbound Sales';
            window.leadSourceValue = 'Recent Signup';
            window.batchValue = 'none';
        };
        window.fillPackage = function (Package) {
            Package();
            window.windowPathTest = window.location.pathname


            // Edit Opportunity _______
            async function editForm() {
                var editFormBtn = document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[title=\"Edit Opportunity Name\"]');
                if (editFormBtn !== null) {
                    editFormBtn.click();
                    await window.wait(() => tackUI.packageAmountField !== null);
                }
            }

            async function fillAmount() {
                await window.wait(() => tackUI.packageAmountField !== null && tackUI.packageAmountField.value !== undefined);
                await window.wait(() =>
                    tackUI.packageAmountField.value.includes(paidAmount),
                    () => {
                        tackUI.packageAmountField.value = paidAmount;
                        tackUI.packageAmountField.dispatchEvent(inputEvent);
                    }
                );
            }

            async function fillAmountPaidUpFront() {
                await window.wait(() => tackUI.packageAmountPaidUpfrontField !== null && tackUI.packageAmountPaidUpfrontField.value !== undefined);
                await window.wait(() =>
                    tackUI.packageAmountPaidUpfrontField.value.includes(paidAmount),
                    () => {
                        tackUI.packageAmountPaidUpfrontField.value = paidAmount;
                        tackUI.packageAmountPaidUpfrontField.dispatchEvent(inputEvent);
                    }
                );
            }

            async function fillPromoCredit() {
                await window.wait(() => tackUI.packagePromoCreditField !== null && tackUI.packagePromoCreditField.value !== undefined);
                await window.wait(() =>
                    tackUI.packagePromoCreditField.value.includes(promoCredit),
                    () => {
                        tackUI.packagePromoCreditField.value = promoCredit;
                        tackUI.packagePromoCreditField.dispatchEvent(inputEvent);
                    }
                );
            }

            async function fillType() {
                try {
                    await window.wait(() => tackUI.packageTypeField !== null);
                    if (tackUI.packageTypeField.textContent === none) {
                        await window.wait(() =>
                            tackUI.packageTypeOption !== null,
                            () => {
                                tackUI.packageTypeField.click();
                            }
                        );

                        tackUI.packageTypeOption.click();
                        await window.wait(() => tackUI.packageTypeField.textContent === typeValue);
                    }
                } catch (error) { console.error('CADEN LOG: fillType -', error); }
            }

            async function fillNumEmployees() {
                try {
                    await window.wait(() => tackUI.packageNumEmployeesField !== null);
                    if (tackUI.packageNumEmployeesField.textContent === none) {
                        await window.wait(() =>
                            tackUI.packageNumEmployeesOption !== null,
                            () => {
                                tackUI.packageNumEmployeesField.click();
                            }
                        );

                        tackUI.packageNumEmployeesOption.click();
                        await window.wait(() => tackUI.packageNumEmployeesField.textContent === numEmployeesValue);
                    }
                } catch (error) { console.error('CADEN LOG: fillNumEmployees -', error); }
            }

            async function fillNumLocations() {
                try {
                    await window.wait(() => tackUI.packageNumLocationsField !== null);
                    if (tackUI.packageNumLocationsField.textContent === none) {
                        await window.wait(() =>
                            tackUI.packageNumLocationsOption !== null,
                            () => {
                                tackUI.packageNumLocationsField.click();
                            }
                        );

                        tackUI.packageNumLocationsOption.click();
                        await window.wait(() => tackUI.packageNumLocationsField.textContent === numLocationsValue);
                    }
                } catch (error) { console.error('CADEN LOG: fillNumLocations -', error); }
            }

            async function fillFranchise() {
                try {
                    await window.wait(() => tackUI.packageFranchiseField !== null);
                    if (tackUI.packageFranchiseField.textContent === none) {
                        await window.wait(() =>
                            tackUI.packageFranchiseOption !== null,
                            () => {
                                tackUI.packageFranchiseField.click();
                            }
                        );

                        tackUI.packageFranchiseOption.click();
                        await window.wait(() => tackUI.packageFranchiseField.textContent === franchiseValue);
                    }
                } catch (error) { console.error('CADEN LOG: fillFranchise -', error); }
            }

            async function fillPackage() {
                try {
                    await window.wait(() => tackUI.packagePackageField !== null).then(async () => {
                        if (tackUI.packagePackageField.textContent !== packageValue) {
                            await window.wait(() =>
                                tackUI.packagePackageOption !== null,
                                () => {
                                    tackUI.packagePackageField.click();
                                }
                            );

                            tackUI.packagePackageOption.click();
                            await window.wait(() => tackUI.packagePackageField.textContent === packageValue);
                        }
                    });
                    await window.wait(() => tackUI.packagePackageLevelField !== null);
                    if (tackUI.packagePackageLevelField.textContent !== packageLevelvalue) {
                        await window.wait(() =>
                            tackUI.packagePackageLevelOption !== null,
                            () => {
                                tackUI.packagePackageLevelField.click();
                            }
                        );

                        tackUI.packagePackageLevelOption.click();
                        await window.wait(() => tackUI.packagePackageLevelField.textContent === packageLevelvalue);
                    }
                } catch (error) { console.error('CADEN LOG: fillPackage -', error); }
            }

            async function fillLeadType() {
                try {
                    await window.wait(() => tackUI.packageLeadTypeField !== null);
                    if (tackUI.packageLeadTypeField.textContent === none) {
                        await window.wait(() =>
                            tackUI.packageLeadTypeOption !== null,
                            () => {
                                tackUI.packageLeadTypeField.click();
                            }
                        );

                        tackUI.packageLeadTypeOption.click();
                        await window.wait(() => tackUI.packageLeadTypeField.textContent === leadTypeValue);
                    }
                } catch (error) { console.error('CADEN LOG: fillLeadType -', error); }
            }

            async function fillLeadSource() {
                try {
                    await window.wait(() => tackUI.packageLeadSourceField !== null);
                    if (tackUI.packageLeadSourceField.textContent === none) {
                        await window.wait(() =>
                            tackUI.packageLeadSourceOption !== null,
                            () => {
                                tackUI.packageLeadSourceField.click();
                            }
                        );

                        tackUI.packageLeadSourceOption.click();
                        await window.wait(() => tackUI.packageLeadSourceField.textContent === leadSourceValue);
                    }
                } catch (error) { console.error('CADEN LOG: fillLeadSource -', error); }
            }

            async function fillBatch() {
                try {
                    await window.wait(() => tackUI.packageBatchField !== null);
                    if (tackUI.packageBatchField.value === '') {
                        tackUI.packageBatchField.value = batchValue;
                        tackUI.packageBatchField.dispatchEvent(inputEvent);
                        await window.wait(() => tackUI.packageBatchField.value === batchValue);
                    }
                } catch (error) { console.error('CADEN LOG: fillBatch -', error); }
            }

            async function save() {
                await window.wait(() => tackUI.packageSaveBtn !== null && tackUI.packageSaveBtn.disabled === false);
                tackUI.packageSaveBtn.click();
            }

            (async function saveOpp() {
                try {
                    await Promise.all([ editForm() ]);
                    await Promise.all([ fillAmount() ]);
                    await Promise.all([ fillAmountPaidUpFront() ]);
                    await Promise.all([ fillPromoCredit() ]);
                    await Promise.all([ fillType() ]);
                    await Promise.all([ fillNumEmployees() ]);
                    await Promise.all([ fillNumLocations() ]);
                    await Promise.all([ fillFranchise() ]);
                    await Promise.all([ fillPackage() ]);
                    await Promise.all([ fillLeadType() ]);
                    await Promise.all([ fillLeadSource() ]);
                    await Promise.all([ fillBatch() ]);
                    await Promise.all([ save() ]);



/*
                    await Promise.all([
                        fillAmount(),
                        fillAmountPaidUpFront(),
                        fillPromoCredit(),
                        fillType(),
                        fillNumEmployees(),
                        fillNumLocations(),
                        fillFranchise(),
                        fillPackage(),
                        fillLeadType(),
                        fillLeadSource(),
                        fillBatch(),
                    ]);


                await window.wait(() => tackUI.packageSaveBtn !== null && tackUI.packageSaveBtn.disabled === false);
                tackUI.packageSaveBtn.click();
        */


                    // window.sendToCustomOpportunity();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });

                } catch (error) {
                    console.error('CADEN LOG: saveOpp -', error);
                }
            })();
        };


/*
        window.cadenDialsReportRefresher = function () {
            // Select the iframe element
            var iframe = document.querySelector('iframe[title="Report Viewer"]');
            // var iframeRefreshButton = document.querySelector('div[title="Actions for Caden Dials"] li[title="Refresh Tab"] a');

            // Create a function to refresh the iframe
            function refreshIframe() {
                setTimeout(() => {
                    document.querySelector('div[title="Actions for Caden Dials"] li[title="Refresh Tab"] a')?.click();

                }, 500);
            }

            function checkForRefreshButton() {
                if (document.querySelector('div[title="Actions for Caden Dials"] li[title="Refresh Tab"] a') === null) {
                    document.querySelector('div[title="Actions for Caden Dials"] button')?.click();
                    document.querySelector('div[title="Actions for Caden Dials"] button')?.click();
                    refreshIframe();
                } else {
                    refreshIframe();
                }
            }

            // Create an observer instance
            var dialReportObserver = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    checkForRefreshButton();
                });
            });

            // Configuration of the observer:
            // Observe only attribute changes
            var config = { attributes: true, attributeFilter: ['src'], subtree: true };

            // Pass in the target node, as well as the observer options
            dialReportObserver.observe(iframe, config);

        };
        window.refreshDials = function () {
            setTimeout(() => {
                if (tackUI.dialRefreshButton !== null) {
                    if (tackUI.dialRefreshButton?.disabled !== true) {
                        tackUI.dialRefreshButton?.click();
                    }
                }
            }, 1500);
        };
*/
        waitForCondition(() => tackUI.viewport !== null, 100, 150).then(() => {
            window.insertCustomUI();
        });
        waitForCondition(() => customUIvalues.every(value => customUI[value] !== null), 100, 150).then(() => {
            window.customUIscript();
            window.customUIautomationsFunctions();
            window.checkURL();
            window.kbsChanger();
            window.kbsPositionObserverSetup();
            setTimeout(() => {
                window.setKbsDropdownPosition();
            }, 3000);
        });
        waitForCondition(() => tackUI.toastMessageContainerNode !== null, 100, 150).then(() => {
            setTimeout(() => {
                window.toastMessageCloser();
            }, 1000);
        });
        waitForCondition(() => tackUI.phoneButton !== null && tackUI.dockingPanel !== null, 100, 150).then(() => {
            // setTimeout(() => {window.openGenesysPhone();}, 500);
            setTimeout(() => { window.makeRoomForPhone(); }, 750);
        });
        waitForCondition(() => tackUI.viewport !== null, 100, 150).then(() => {
            window.addEventListener('message', function (event) { // Add event listener for messages from the parent window
                // Check the origin of the message
                if (event.origin !== 'https://apps.usw2.pure.cloud') return;

                if (event.data === "dispo done") {
                    window.closeContact();
                } else if (event.data === "cadenMessage set-phone-height") {
                    setTimeout(() => {
                        window.phoneResizer();
                    }, 500);
                } else if (event.data === "newCall") {
                    window.refreshDials();
                }
            });
        });






    } else if (window.location.hostname === 'apps.usw2.pure.cloud') {
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
/*
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
*/
                // Function to pick up the call
                function makeCall() {
                    wait(() => genUI.interactionsData?.textContent != '' && !genUI.interactionsData?.innerText.includes('DISCONNECTED') && genUI.pickUpButton?.disabled === false).then(() => {
                        pauseForCondition(() => genUI.interactionsData?.textContent == 'CustomerALERTINGSMB English Dialer' || genUI.interactionsData?.textContent == 'CustomerALERTINGLarge Pro').then(() => {
                            if (genUI.interactionsData?.textContent == 'CustomerALERTINGSMB English Dialer' || genUI.interactionsData?.textContent == 'CustomerALERTINGLarge Pro') {
                                genUI.pickUpButton.click();
                                wait(() => genUI.makeCallButton?.disabled === false).then(() => {
                                    genUI.makeCallButton?.click();
                                    // window.parent.postMessage("newCall", 'https://thumbtack.lightning.force.com');
                                    setTimeout(() => {
                                        if (genUI.makeCallButton?.disabled === false) {
                                            genUI.makeCallButton?.click();
                                        }
                                    }, 1000);
                                    // window.startTimer();
                                });
                            }
                        });
                    });


                    /*
                        await waitForCondition(() => genUI.interactionsData.textContent != '' && !genUI.interactionsData.innerText.includes('DISCONNECTED') && genUI.pickUpButton.disabled === false);
                        await pauseForCondition(() => genUI.interactionsData.textContent == 'CustomerALERTINGSMB English Dialer');
                        if (genUI.interactionsData.textContent == 'CustomerALERTINGSMB English Dialer') {
                            genUI.pickUpButton.click();
                            await waitForCondition(() => genUI.makeCallButton.disabled === false);
                            genUI.makeCallButton.click();
                            setTimeout(() => {
                                if (genUI.callControl.disabled === false) {
                                    genUI.callControl.click();
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
                                /*
                                    if (node.nodeName === 'I') {
                                        if (node.classList.value === 'fa fa-rss') {
                                            window.answerObserver1.observe(node, window.answerObserver1Config);
                                        }
                                    }
                                */
                                }
                            }
                        }
                    };

                    let observer = new MutationObserver(callback);
                    observer.observe(targetNode, config);
                }

                (async function () {
                    await waitForCondition(() => genUI.pickUpButton !== null && document.querySelector('#interactionList div.simplebar-content') !== null && document.querySelector('#interactionList div.simplebar-content') !== undefined);
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
                        if (genUI.hangUpButton.disabled === false) {
                            genUI.hangUpButton.shadowRoot.querySelector('button').click();
                        }
                        await waitForCondition(() => genUI.wrapUpButton !== null && genUI.wrapUpButton !== undefined);
                        genUI.wrapUpButton.click();
                        await waitForCondition(() => getgenUIByTextContent(dispoSelector)[0] !== null && getgenUIByTextContent(dispoSelector)[0] !== undefined);
                        getgenUIByTextContent(dispoSelector)[0].click();
                        await waitForCondition(() => genUI.done !== null && genUI.done !== undefined && genUI.done.disabled === false);
                        genUI.done.click();
                        if (genUI.callBackInfo.textContent != '') {
                            await pauseForCondition(() => genUI.hangUpButton.disabled === false && genUI.transferButton.disabled === false && genUI.muteButton.disabled === true);
                            if (genUI.hangUpButton.disabled === false && genUI.transferButton.disabled === false && genUI.muteButton.disabled === true) {
                                genUI.hangUpButton.shadowRoot.querySelector('button').click();
                            }
                        }

                        window.parent.postMessage("dispo done", 'https://thumbtack.lightning.force.com');
                    }

                    openInteractionList();

                    if (genUI.wrapUpButton !== null && genUI.wrapUpButton !== undefined) {
                        if (
                            genUI.hangUpButton.disabled === false && genUI.transferButton.disabled === true && genUI.muteButton.disabled === true ||
                            genUI.hangUpButton.disabled === false && genUI.transferButton.disabled === false && genUI.muteButton.disabled === false ||
                            genUI.hangUpButton.disabled === true && genUI.transferButton.disabled === true && genUI.muteButton.disabled === true && genUI.wrapUpButton.parentElement.classList.contains('red')
                        ) {
                            setdispo();
                        } else if (genUI.hangUpButton.disabled === false && genUI.transferButton.disabled === false && genUI.muteButton.disabled === true) {
                            genUI.hangUpButton.shadowRoot.querySelector('button').click();
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
            };

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
                    } else {
                        eval(trimmedMessage);
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
                if (genUI.muteButton !== null) {
                    if (genUI.muteButton.disabled === false) {
                        genUI.muteButton.click();
                    }
                }
            };
        /*
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
        */
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
    }
})();
