// ==UserScript==
// @name         New Team Function Test
// @namespace    http://tampermonkey.net/
// @version      2024-06-13
// @description  Auto Dialer & Auto Dispositioner
// @author       Caden H
// @match        https://thumbtack.lightning.force.com
// @match        https://thumbtack.lightning.force.com/*
// @match        https://apps.usw2.pure.cloud/crm/index.html?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// @updateURL    https://caden-humphrey.github.io/teamUserScript.js
// @downloadURL  https://caden-humphrey.github.io/teamUserScript.js
// ==/UserScript==

if (window.top === window.self) {
    window.salesforceFunctions = async function () {
        window.paidAmount = '';
        window.promoCredit = '';
        window.none = '';
        window.typeValue = '';
        window.numEmployeesValue = '';
        window.numLocationsValue = '';
        window.franchiseValue = '';
        window.packageValue = '';
        window.packageLevelvalue = '';
        window.leadTypeValue = '';
        window.leadSourceValue = '';
        window.batchValue = '';
        window.actionThenWaitForCondition = function (actionFunction, conditionFunction, interval = 100, maxAttempts = 100) { let attempts = 0; return new Promise((resolve, reject) => { const checkCondition = () => { actionFunction(); if (conditionFunction()) { resolve(); } else if (attempts < maxAttempts) { attempts++; setTimeout(checkCondition, interval); } else { reject(new Error('Condition not met within the specified time')); } }; checkCondition(); }); };
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
        };
        // event listener for keyboard shortcut
        window.addEventListener('keydown', function (event) { // Add event listener for 'No Answer' disposition Keyboard shortcut
            try {
                if (event.key === '=') {
                    window.sendMessage();
                }
            } catch (error) {
                console.error('CADEN LOG: salesforce TOP evenetListener - =keyboardShortcut to run window.SendMessage -', error);
            }
        });




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
        window.inputtingEvent = new Event('input', { bubbles: true, cancelable: true, });
        window.customUIvariables = function () {
            return {
                leftContainer: document.querySelector('.caden.left-content'),
                phoneSpace: document.querySelector('div.caden.phone-space'),
                widthAdjuster: document.querySelector('.caden.width-adjuster'),
                customUIContainer: document.querySelector('div.caden.custom-ui-container'),
                // Custom UI Fields
                contactName: document.querySelector('#contactName'),
                occupationHeader: document.querySelector('#occupation1'),
                mailingAddressHeader: document.querySelector('#address1'),
                createdDateHeader: document.querySelector('#createdDate1'),
                numberOfEmployeesHeader: document.querySelector('#employees1'),

                createdDate: document.querySelector('#createdDate'),
                firstServiceCreatedDate: document.querySelector('#firstServiceCreatedDate'),
                signupDate: document.querySelector('#signupDate'),
                userLastActivity: document.querySelector('#userLastActivity'),

                occupation: document.querySelector('#occupation'),
                assignedCategory: document.querySelector('#assignedCategory'),
                numberOfEmployees: document.querySelector('#numberOfEmployees'),
                decile: document.querySelector('#decile'),

                targetingOn: document.querySelector('#targetingOn'),
                cardOnFile: document.querySelector('#cardOnFile'),
                numberOfReviews: document.querySelector('#numberOfReviews'),

                backgroundCheckStatus: document.querySelector('#backgroundCheckStatus'),
                salesActivationDate: document.querySelector('#salesActivationDate'),
                maxActivationDate: document.querySelector('#maxActivationDate'),

                // Custom UI Buttons
                convertButton: document.querySelector('#convertToOpp'),
                packageOne: document.querySelector('#Package200'),
                packageTwo: document.querySelector('#Package300'),
                packageThree: document.querySelector('#Package400'),

                automationsButton: document.querySelector('span#automationsDropdownImage'),
                automationsDropdown: document.querySelector('div.caden.automationsContainer'),
                automationsButtonsContainers: document.querySelectorAll('div.automationButtonContainer'),
                automationButtons: document.querySelectorAll('button.automationButton'),

                statusNewButton: document.querySelector('#statusNew'),
                statusAttemptingButton: document.querySelector('#statusAttempting'),
                statusUnsuccessfulButton: document.querySelector('#statusUnsuccessful'),
                statusConvertButton: document.querySelector('#statusConvert'),
                statusRetiredButton: document.querySelector('#statusRetired'),

                contactContainer: document.querySelector('section.caden.contact-container'),
                opportunityContainer: document.querySelector('section.caden.opportunity-container'),

                // Opportunity UI Fields
                oppContactCard: document.querySelector('section.caden.opportunity-container article[class="slds-card slds-card_boundary forceBaseCard cProPersona"]'),
                oppContactNameHeader: document.querySelector('section.caden.opportunity-container #oppContactName1'),
                oppAccountNameHeader: document.querySelector('section.caden.opportunity-container #oppAccountName1'),
                oppCloseDateHeader: document.querySelector('section.caden.opportunity-container #oppCloseDate1'),
                oppAmountHeader: document.querySelector('section.caden.opportunity-container #oppAmount1'),
                oppOwnerHeader: document.querySelector('section.caden.opportunity-container #oppOwner1'),
                oppContactName: document.querySelector('section.caden.opportunity-container #oppContactName'),
                oppAccountName: document.querySelector('section.caden.opportunity-container #oppAccountName'),
                oppOccupation: document.querySelector('section.caden.opportunity-container #oppOccupation'),
                oppRevenue: document.querySelector('section.caden.opportunity-container #oppRevenue'),
                oppAmount: document.querySelector('section.caden.opportunity-container #oppAmount'),
                oppAmountPaidUpfront: document.querySelector('section.caden.opportunity-container #oppAmountPaidUpfront'),
                oppPackage: document.querySelector('section.caden.opportunity-container #oppPackage'),
                oppPackageLevel: document.querySelector('section.caden.opportunity-container #oppPackageLevel'),

                oppStatusNew: document.querySelector('section.caden.opportunity-container #statusNewOpp'),
                oppStatusAttempting: document.querySelector('section.caden.opportunity-container #statusAttemptingOpp'),
                oppStatusContacted: document.querySelector('section.caden.opportunity-container #statusContactedOpp'),
                oppStatusSqo: document.querySelector('section.caden.opportunity-container #statusSqoOpp'),
                oppStatusPitched: document.querySelector('section.caden.opportunity-container #statusPitchedOpp'),
                oppStatusFinalDetails: document.querySelector('section.caden.opportunity-container #statusFinalDetailsOpp'),
                oppStatusCommitted: document.querySelector('section.caden.opportunity-container #statusCommittedOpp'),
                oppStatusClosed: document.querySelector('section.caden.opportunity-container #statusClosedOpp'),
            };
        };
        window.customUI = new Proxy({}, {
            get: function (target, name) {
                return window.customUIvariables()[name];
            }
        });
        let customUIvalues = ['contactName', 'occupationHeader', 'mailingAddressHeader', 'createdDateHeader', 'numberOfEmployeesHeader', 'createdDate', 'firstServiceCreatedDate', 'signupDate', 'userLastActivity', 'occupation', 'assignedCategory', 'numberOfEmployees', 'decile', 'targetingOn', 'cardOnFile', 'numberOfReviews', 'backgroundCheckStatus', 'salesActivationDate', 'maxActivationDate', 'convertButton', 'packageOne', 'packageTwo', 'packageThree', 'automationsButton', 'automationsDropdown', 'automationsButtonsContainers', 'automationButtons', 'statusNewButton', 'statusAttemptingButton', 'statusUnsuccessfulButton', 'statusConvertButton', 'statusRetiredButton'];
        // Tack UI Variable___________________________________________
        window.tackUIvariables = function () {
            return {
                contactName: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[data-target-selection-name="sfdc:RecordField.Contact.Name"] slot [slot="output"]'),
                occupation: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[data-target-selection-name="sfdc:RecordField.Contact.pro_occupation__c"] slot [slot="output"]'),
                mailingAddress: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('lightning-formatted-address a'),
                createdDate: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[data-target-selection-name="sfdc:RecordField.Contact.CreatedById"] slot [slot="output"] lightning-formatted-text'),
                numberOfEmployees: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[data-target-selection-name="sfdc:RecordField.Contact.NumberofEmployees__c"] slot [slot="output"]'),

                firstServiceCreatedDate: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('p[title="First Service Create Time"]'),
                signupDate: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[data-target-selection-name="sfdc:RecordField.Contact.usr_signup_date__c"] slot [slot="output"]'),
                userLastActivity: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[data-target-selection-name="sfdc:RecordField.Contact.usr_last_activity_date__c"] slot [slot="output"]'),

                assignedCategory: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[data-target-selection-name="sfdc:RecordField.Contact.AssignedCategory__c"] slot [slot="output"]'),
                decile: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[data-target-selection-name="sfdc:RecordField.Contact.Decile__c"] slot [slot="output"]'),


                targetingOn: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[data-target-selection-name="sfdc:RecordField.Contact.targeting_on__c"] input[type="checkbox"]'),
                cardOnFile: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[data-target-selection-name="sfdc:RecordField.Contact.card_on_file__c"] input[type="checkbox"]'),
                numberOfReviews: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[data-target-selection-name="sfdc:RecordField.Contact.reviews__c"] slot [slot="output"]'),

                backgroundCheckStatus: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[data-target-selection-name="sfdc:RecordField.Contact.Background_Check_Status__c"] slot [slot="output"]'),
                salesActivationDate: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[data-target-selection-name="sfdc:RecordField.Contact.SalesActivationDate__c"] slot [slot="output"]'),
                maxActivationDate: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[data-target-selection-name="sfdc:RecordField.Contact.MaxActivationDate__c"] slot [slot="output"]'),

                salesStatus: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('div[class="slds-grid slds-path__scroller-container runtime_sales_pathassistantPathAssistantTabSet"] li.slds-is-current.slds-is-active'),
                flextabContainer: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('flexipage-tab2'),
                contactInformationHeader: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('span[title="Contact Information"]'),
                contactOutreachSummaryHeader: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('span[title="Contact Outreach Summary"]'),
                proActivationDetailHeader: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('span[title="Pro Activation Detail"]'),
                thumbtackProDetailHeader: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('span[title="Thumbtack Pro Detail"]'),
                systemInformationHeader: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('span[title="System Information"]'),

                toastMessageContainerNode: document.querySelector('div.forceVisualMessageQueue'),
                toastMessage: document.querySelector('span.toastMessage'),
                phoneButton: document.querySelector('div[data-component-id="opencti_softPhone"] button'),
                phonePanel: document.querySelector('div.oneUtilityBarContainer.oneUtilityBar > div.DOCKED.slds-is-open'),


                tabs: document.querySelectorAll('ul.tabBarItems.slds-grid li[role="presentation"]'),
                insertPoint: document.querySelector('div.desktop.container.forceStyle.oneOne.navexDesktopLayoutContainer.lafAppLayoutHost.forceAccess.tablet'),
                viewport: document.querySelector('.viewport'),
                dockingPanel: document.querySelector('div[class="oneDockingPanelManager oneUtilityBar"]'),
                utilityBarParentElement: document.querySelector('div.oneUtilityBarContainer.oneUtilityBar'),
                outerPhoneContainer: document.querySelector('div.panel.scrollable.slds-utility-panel.slds-grid.slds-grid--vertical.oneUtilityBarPanel.DOCKED.slds-is-open'),
                innerPhoneContainer: document.querySelector('div.panel.scrollable.slds-utility-panel.slds-grid.slds-grid--vertical.oneUtilityBarPanel.DOCKED.slds-is-open>div.slds-utility-panel__body'),
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
                oppStatusClosed: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('ul[class="slds-path__nav"] li[data-name="Closed"]'),

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
                packageTypeOption: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[field-label=\"Type\"] [title=\"' + typeValue + '\"]'),
                packageNumEmployeesField: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[field-label=\"Number of Employees\"] button span'),
                packageNumEmployeesOption: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[field-label=\"Number of Employees\"] [title=\"' + numEmployeesValue + '\"]'),
                packageNumLocationsField: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[field-label=\"Number of Locations\"] button span'),
                packageNumLocationsOption: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[field-label=\"Number of Locations\"] [title=\"' + numLocationsValue + '\"]'),
                packageFranchiseField: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[field-label=\"Is Part of a Franchise?\"] button span'),
                packageFranchiseOption: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[field-label=\"Is Part of a Franchise?\"] [title=\"' + franchiseValue + '\"]'),
                packagePackageField: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[field-label=\"Package\"] button span'),
                packagePackageOption: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[field-label=\"Package\"] [title=\"' + packageValue + '\"]'),
                packagePackageLevelField: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[field-label=\"Package Level\"] button span'),
                packagePackageLevelOption: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[field-label=\"Package Level\"] [title=\"' + packageLevelvalue + '\"]'),
                packageLeadTypeField: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[field-label=\"Lead Type\"] button span'),
                packageLeadTypeOption: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[field-label=\"Lead Type\"] [title=\"' + leadTypeValue + '\"]'),
                packageLeadSourceField: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[field-label=\"Lead Source\"] button span'),
                packageLeadSourceOption: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[field-label=\"Lead Source\"] [title=\"' + leadSourceValue + '\"]'),
                packageBatchField: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[name=\"Batch__c\"]'),
                packageSaveBtn: document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[name=\"SaveEdit\"]'),

            };
        };
        window.tackUI = new Proxy({}, {
            get: function (target, name) {
                return window.tackUIvariables()[name];
            }
        });
        let headers = ['contactInformationHeader', 'contactOutreachSummaryHeader', 'proActivationDetailHeader', 'thumbtackProDetailHeader', 'systemInformationHeader'];
        let contactValues = ['contactName', 'occupation', 'mailingAddress', 'createdDate', 'numberOfEmployees', 'firstServiceCreatedDate', 'signupDate', 'userLastActivity', 'assignedCategory', 'decile', 'targetingOn', 'cardOnFile', 'numberOfReviews', 'backgroundCheckStatus', 'salesActivationDate', 'maxActivationDate'];
        let oppValues = ['oppCloseDate', 'oppOwner', 'oppContactName', 'oppAccountName', 'oppOccupation', 'oppRevenue', 'oppAmount', 'oppAmountPaidUpfront', 'oppPackage', 'oppPackageLevel'];
        window.insertCustomUI = function () {
            try {

                // Create a new div element
                const newElement = document.createElement('section');
                newElement.className = 'caden left-content';
                newElement.innerHTML = `
        <div class="caden body-container">
            <div class="caden phone-space"></div>
            <div class="caden custom-ui-container">
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
                    <div class="caden automationsContainer">
                        <div class="caden automationButtonContainer">
                            <button id="convertToOpp" class="caden automationButton Convert">Convert</button>
                        </div>
                        <div class="caden automationButtonContainer">
                            <button id="Package200" class="caden automationButton">$200 Package</button>
                        </div>
                        <div class="caden automationButtonContainer">
                            <button id="Package300" class="caden automationButton">$300 Package</button>
                        </div>
                        <div class="caden automationButtonContainer">
                            <button id="Package400" class="caden automationButton">$400 Package</button>
                        </div>
                    </div>
                </section>
                <section class="caden contact-container">
                    <section class="caden header">
                        <div class="caden header top">
                            <div class="caden header-main">
                                <span id="contact-img" class="caden">
                                    <img class="caden" src="https://thumbtack.my.salesforce.com/img/icon/t4v35/standard/contact_120.png" alt="Contact Image" title="Contact">
                                </span>
                                <span id="contact-info" class="caden">
                                    <label id="headerLabel" class="caden header">Contact</label>
                                    <output id="contactName" class="caden"></output>
                                </span>
                            </div>
                        </div>
                        <div class="caden priority-info">
                            <span class="caden header-list-content occupation long">
                                <label class="caden header">Occupation</label>
                                <output id="occupation1" class="caden header-list-output"></output>
                            </span>
                            <span class="caden header-list-content address long">
                                <label class="caden header">Address</label>
                                <output id="address1" class="caden header-list-output"></output>
                            </span>
                            <span class="caden header-list-content created-date long">
                                <label class="caden header">Created Date</label>
                                <output id="createdDate1" class="caden header-list-output"></output>
                            </span>
                            <span class="caden header-list-content employees">
                                <label class="caden header">Employees</label>
                                <output id="employees1" class="caden header-list-output"></output>
                            </span>
                        </div>
                    </section>
                    <section class="sales_status">
                        <div>
                            <div class="button-container">
                                <button id="statusNew" class="status Start current">
                                    <div class="status-label-container">
                                        <span class="statusLabel">
                                            New
                                        </span>
                                        <svg class="status-done-icon hidden" focusable="false" data-key="check" aria-hidden="true" viewBox="0 0 520 520" part="icon">
                                            <g>
                                                <path d="M191 425L26 259c-6-6-6-16 0-22l22-22c6-6 16-6 22 0l124 125a10 10 0 0015 0L452 95c6-6 16-6 22 0l22 22c6 6 6 16 0 22L213 425c-6 7-16 7-22 0z"></path>
                                            </g>
                                        </svg>
                                    </div>
                                </button>
                                <button id="statusAttempting" class="status Middle">
                                    <div class="status-label-container">
                                        <span class="statusLabel">
                                            Attempting
                                        </span>
                                        <svg class="status-done-icon hidden" focusable="false" data-key="check" aria-hidden="true" viewBox="0 0 520 520" part="icon">
                                            <g>
                                                <path d="M191 425L26 259c-6-6-6-16 0-22l22-22c6-6 16-6 22 0l124 125a10 10 0 0015 0L452 95c6-6 16-6 22 0l22 22c6 6 6 16 0 22L213 425c-6 7-16 7-22 0z"></path>
                                            </g>
                                        </svg>
                                    </div>
                                </button>
                                <button id="statusUnsuccessful" class="status Middle">
                                    <div class="status-label-container">
                                        <span class="statusLabel">
                                            Unsuccessful
                                        </span>
                                        <svg class="status-done-icon hidden" focusable="false" data-key="check" aria-hidden="true" viewBox="0 0 520 520" part="icon">
                                            <g>
                                                <path d="M191 425L26 259c-6-6-6-16 0-22l22-22c6-6 16-6 22 0l124 125a10 10 0 0015 0L452 95c6-6 16-6 22 0l22 22c6 6 6 16 0 22L213 425c-6 7-16 7-22 0z"></path>
                                            </g>
                                        </svg>
                                    </div>
                                </button>
                                <button id="statusConvert" class="status Middle">
                                    <div class="status-label-container">
                                        <span class="statusLabel">
                                            Convert
                                        </span>
                                        <svg class="status-done-icon hidden" focusable="false" data-key="check" aria-hidden="true" viewBox="0 0 520 520" part="icon">
                                            <g>
                                                <path d="M191 425L26 259c-6-6-6-16 0-22l22-22c6-6 16-6 22 0l124 125a10 10 0 0015 0L452 95c6-6 16-6 22 0l22 22c6 6 6 16 0 22L213 425c-6 7-16 7-22 0z"></path>
                                            </g>
                                        </svg>
                                    </div>
                                </button>
                                <button id="statusRetired" class="status End">
                                    <div class="status-label-container">
                                        <span class="statusLabel">
                                            Retired
                                        </span>
                                        <svg class="status-done-icon hidden" focusable="false" data-key="check" aria-hidden="true" viewBox="0 0 520 520" part="icon">
                                            <g>
                                                <path d="M191 425L26 259c-6-6-6-16 0-22l22-22c6-6 16-6 22 0l124 125a10 10 0 0015 0L452 95c6-6 16-6 22 0l22 22c6 6 6 16 0 22L213 425c-6 7-16 7-22 0z"></path>
                                            </g>
                                        </svg>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </section>
                    <section class="caden main-body">
                        <div class="caden row-container">
                            <div class="caden body-row-section">
                                <div class="caden header sub-header">
                                    <button id="accountInfoCollapseButton" class="caden box-button" onclick="">
                                        <div class="caden sub-header-Content">
                                            <span id="collapse-accountInfo-icon" class="caden expanded-icon">
                                                <svg class="caden arrowIcon" viewBox="0 0 520 520" part="icon">
                                                    <g>
                                                        <path class="caden" d="M476 178L271 385c-6 6-16 6-22 0L44 178c-6-6-6-16 0-22l22-22c6-6 16-6 22 0l161 163c6 6 16 6 22 0l161-163c6-6 16-6 22 0l22 22c5 7 5 16 0 22z"></path>
                                                    </g>
                                                </svg>
                                            </span>
                                            <span class="caden sub-header">
                                                <label class="caden sub-header">Account Info</label>
                                            </span>
                                        </div>
                                    </button>
                                </div>
                                <div class="caden row">
                                    <div id="account-info-column-1" class="caden listContent column">
                                        <span class="caden listContent occupation">
                                            <label class="caden">Occupation</label>
                                            <output id="occupation" class="caden"></output>
                                        </span>
                                        <span class="caden listContent assignedCategory">
                                            <label class="caden">Assigned Category</label>
                                            <output id="assignedCategory" class="caden"></output>
                                        </span>
                                        <span class="caden listContent numberOfEmployees">
                                            <label class="caden">Number of Employees</label>
                                            <output id="numberOfEmployees" class="caden"></output>
                                        </span>
                                        <span class="caden listContent decile">
                                            <label class="caden">Decile</label>
                                            <output id="decile" class="caden"></output>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="caden body-row-section">
                                <div class="caden header sub-header">
                                    <button id="companyInfoCollapseButton" class="caden box-button">
                                        <div class="caden sub-header-Content">
                                            <span id="collapse-companyInfo-icon" class="caden expanded-icon">
                                                <svg class="caden arrowIcon" viewBox="0 0 520 520" part="icon">
                                                    <g>
                                                        <path class="caden" d="M476 178L271 385c-6 6-16 6-22 0L44 178c-6-6-6-16 0-22l22-22c6-6 16-6 22 0l161 163c6 6 16 6 22 0l161-163c6-6 16-6 22 0l22 22c5 7 5 16 0 22z"></path>
                                                    </g>
                                                </svg>
                                            </span>
                                            <span class="caden sub-header">
                                                <label class="caden sub-header">Company Info</label>
                                            </span>
                                        </div>
                                    </button>
                                </div>
                                <div class="caden row">
                                    <div id="company-info-column-1" class="caden listContent column">
                                        <span class="caden listContent createdDate">
                                            <label class="caden">Created Date</label>
                                            <output id="createdDate" class="caden"></output>
                                        </span>
                                        <span class="caden listContent firstServiceCreatedDate">
                                            <label class="caden">First Service Created Date</label>
                                            <output id="firstServiceCreatedDate" class="caden"></output>
                                        </span>
                                        <span class="caden listContent signupDate">
                                            <label class="caden">Signup Date</label>
                                            <output id="signupDate" class="caden"></output>
                                        </span>
                                        <span class="caden listContent userLastActivity">
                                            <label class="caden">User Last Acitvity</label>
                                            <output id="userLastActivity" class="caden"></output>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="caden list-container">
                            <div class="caden body-section">
                                <div class="caden header sub-header">
                                    <button id="activationDetailsCollapseButton" class="caden box-button">
                                        <div class="caden sub-header-Content">
                                            <span id="collapse-activationDetails-icon" class="caden expanded-icon">
                                                <svg class="caden arrowIcon" viewBox="0 0 520 520" part="icon">
                                                    <g>
                                                        <path class="caden" d="M476 178L271 385c-6 6-16 6-22 0L44 178c-6-6-6-16 0-22l22-22c6-6 16-6 22 0l161 163c6 6 16 6 22 0l161-163c6-6 16-6 22 0l22 22c5 7 5 16 0 22z"></path>
                                                    </g>
                                                </svg>
                                            </span>
                                            <span class="caden sub-header">
                                                <label class="caden sub-header">Activation Details</label>
                                            </span>
                                        </div>
                                    </button>
                                </div>
                                <div class="caden row">
                                    <div id="activation-details-column-1" class="caden listContent column">
                                        <span class="caden listContent checkbox targetingOn">
                                            <label class="caden checkbox">Targeting On</label>
                                            <input id="targetingOn" class="caden checkbox" type="checkbox">
                                        </span>
                                        <span class="caden listContent checkbox cardOnFile">
                                            <label class="caden checkbox">Card on File</label>
                                            <input id="cardOnFile" class="caden checkbox" type="checkbox">
                                        </span>
                                        <span class="caden listContent numberOfReviews">
                                            <label class="caden">Number of Reviews</label>
                                            <output id="numberOfReviews" class="caden"></output>
                                        </span>
                                    </div>
                                    <div id="activation-details-column-2" class="caden listContent column">
                                        <span class="caden listContent backgroundCheckStatus">
                                            <label class="caden">Background Check Status</label>
                                            <output id="backgroundCheckStatus" class="caden"></output>
                                        </span>
                                        <span class="caden listContent salesActivationDate">
                                            <label class="caden">Sales Activation Date</label>
                                            <output id="salesActivationDate" class="caden"></output>
                                        </span>
                                        <span class="caden listContent maxActivationDate">
                                            <label class="caden">Max Activation Date</label>
                                            <output id="maxActivationDate" class="caden"></output>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
                <section class="caden opportunity-container">
                    <section class="caden header">
                        <div class="caden header top">
                            <div class="caden header-main">
                                <span id="opportunity-img" class="caden">
                                    <img class="caden" src="https://thumbtack.my.salesforce.com/img/icon/t4v35/standard/opportunity_120.png" title="Opportunity" alt="" alt="opportunity Image" title="opportunity">
                                </span>
                                <span id="opportunity-info" class="caden">
                                    <label id="headerLabel" class="caden header">opportunity</label>
                                    <output id="oppContactName1" class="caden"></output>
                                </span>
                            </div>
                        </div>
                        <div class="caden priority-info">
                            <span class="caden header-list-content occupation long">
                                <label class="caden header">Account Name</label>
                                <output id="oppAccountName1" class="caden header-list-output"></output>
                            </span>
                            <span class="caden header-list-content address long">
                                <label class="caden header">Close Date</label>
                                <output id="oppCloseDate1" class="caden header-list-output"></output>
                            </span>
                            <span class="caden header-list-content created-date long">
                                <label class="caden header">Amount</label>
                                <output id="oppAmount1" class="caden header-list-output"></output>
                            </span>
                            <span class="caden header-list-content employees">
                                <label class="caden header">Opp Owner</label>
                                <output id="oppOwner1" class="caden header-list-output"></output>
                            </span>
                        </div>
                    </section>
                    <section class="sales_status">
                        <div>
                            <div class="button-container">
                                <button id="statusNewOpp" class="status Start current">
                                    <div class="status-label-container">
                                        <span class="statusLabel">
                                            New
                                        </span>
                                        <svg class="status-done-icon hidden" focusable="false" data-key="check" aria-hidden="true" viewBox="0 0 520 520" part="icon">
                                            <g>
                                                <path d="M191 425L26 259c-6-6-6-16 0-22l22-22c6-6 16-6 22 0l124 125a10 10 0 0015 0L452 95c6-6 16-6 22 0l22 22c6 6 6 16 0 22L213 425c-6 7-16 7-22 0z"></path>
                                            </g>
                                        </svg>
                                    </div>
                                </button>
                                <button id="statusAttemptingOpp" class="status Middle">
                                    <div class="status-label-container">
                                        <span class="statusLabel">
                                            Attempting
                                        </span>
                                        <svg class="status-done-icon hidden" focusable="false" data-key="check" aria-hidden="true" viewBox="0 0 520 520" part="icon">
                                            <g>
                                                <path d="M191 425L26 259c-6-6-6-16 0-22l22-22c6-6 16-6 22 0l124 125a10 10 0 0015 0L452 95c6-6 16-6 22 0l22 22c6 6 6 16 0 22L213 425c-6 7-16 7-22 0z"></path>
                                            </g>
                                        </svg>
                                    </div>
                                </button>
                                <button id="statusContactedOpp" class="status Middle">
                                    <div class="status-label-container">
                                        <span class="statusLabel">
                                            Contacted
                                        </span>
                                        <svg class="status-done-icon hidden" focusable="false" data-key="check" aria-hidden="true" viewBox="0 0 520 520" part="icon">
                                            <g>
                                                <path d="M191 425L26 259c-6-6-6-16 0-22l22-22c6-6 16-6 22 0l124 125a10 10 0 0015 0L452 95c6-6 16-6 22 0l22 22c6 6 6 16 0 22L213 425c-6 7-16 7-22 0z"></path>
                                            </g>
                                        </svg>
                                    </div>
                                </button>
                                <button id="statusSqoOpp" class="status Middle">
                                    <div class="status-label-container">
                                        <span class="statusLabel">
                                            SQO
                                        </span>
                                        <svg class="status-done-icon hidden" focusable="false" data-key="check" aria-hidden="true" viewBox="0 0 520 520" part="icon">
                                            <g>
                                                <path d="M191 425L26 259c-6-6-6-16 0-22l22-22c6-6 16-6 22 0l124 125a10 10 0 0015 0L452 95c6-6 16-6 22 0l22 22c6 6 6 16 0 22L213 425c-6 7-16 7-22 0z"></path>
                                            </g>
                                        </svg>
                                    </div>
                                </button>
                                <button id="statusPitchedOpp" class="status Middle">
                                    <div class="status-label-container">
                                        <span class="statusLabel">
                                            Pitched
                                        </span>
                                        <svg class="status-done-icon hidden" focusable="false" data-key="check" aria-hidden="true" viewBox="0 0 520 520" part="icon">
                                            <g>
                                                <path d="M191 425L26 259c-6-6-6-16 0-22l22-22c6-6 16-6 22 0l124 125a10 10 0 0015 0L452 95c6-6 16-6 22 0l22 22c6 6 6 16 0 22L213 425c-6 7-16 7-22 0z"></path>
                                            </g>
                                        </svg>
                                    </div>
                                </button>
                                <button id="statusFinalDetailsOpp" class="status Middle">
                                    <div class="status-label-container">
                                        <span class="statusLabel">
                                            Final Details
                                        </span>
                                        <svg class="status-done-icon hidden" focusable="false" data-key="check" aria-hidden="true" viewBox="0 0 520 520" part="icon">
                                            <g>
                                                <path d="M191 425L26 259c-6-6-6-16 0-22l22-22c6-6 16-6 22 0l124 125a10 10 0 0015 0L452 95c6-6 16-6 22 0l22 22c6 6 6 16 0 22L213 425c-6 7-16 7-22 0z"></path>
                                            </g>
                                        </svg>
                                    </div>
                                </button>
                                <button id="statusCommittedOpp" class="status Middle">
                                    <div class="status-label-container">
                                        <span class="statusLabel">
                                            Committed
                                        </span>
                                        <svg class="status-done-icon hidden" focusable="false" data-key="check" aria-hidden="true" viewBox="0 0 520 520" part="icon">
                                            <g>
                                                <path d="M191 425L26 259c-6-6-6-16 0-22l22-22c6-6 16-6 22 0l124 125a10 10 0 0015 0L452 95c6-6 16-6 22 0l22 22c6 6 6 16 0 22L213 425c-6 7-16 7-22 0z"></path>
                                            </g>
                                        </svg>
                                    </div>
                                </button>
                                <button id="statusClosedOpp" class="status End">
                                    <div class="status-label-container">
                                        <span class="statusLabel">
                                            Closed
                                        </span>
                                        <svg class="status-done-icon hidden" focusable="false" data-key="check" aria-hidden="true" viewBox="0 0 520 520" part="icon">
                                            <g>
                                                <path d="M191 425L26 259c-6-6-6-16 0-22l22-22c6-6 16-6 22 0l124 125a10 10 0 0015 0L452 95c6-6 16-6 22 0l22 22c6 6 6 16 0 22L213 425c-6 7-16 7-22 0z"></path>
                                            </g>
                                        </svg>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </section>
                    <section class="caden main-body">
                        <div class="caden row-container">
                            <div class="caden body-row-section">
                                <div class="caden header sub-header">
                                    <button id="accountInfoCollapseButton" class="caden box-button" onclick="">
                                        <div class="caden sub-header-Content">
                                            <span id="collapse-accountInfo-icon" class="caden expanded-icon">
                                                <svg class="caden arrowIcon" viewBox="0 0 520 520" part="icon">
                                                    <g>
                                                        <path class="caden" d="M476 178L271 385c-6 6-16 6-22 0L44 178c-6-6-6-16 0-22l22-22c6-6 16-6 22 0l161 163c6 6 16 6 22 0l161-163c6-6 16-6 22 0l22 22c5 7 5 16 0 22z"></path>
                                                    </g>
                                                </svg>
                                            </span>
                                            <span class="caden sub-header">
                                                <label class="caden sub-header">Account Info</label>
                                            </span>
                                        </div>
                                    </button>
                                </div>
                                <div class="caden row">
                                    <div id="account-info-column-1" class="caden listContent column">
                                        <span class="caden listContent occupation">
                                            <label class="caden">Contact Name</label>
                                            <output id="oppContactName" class="caden"></output>
                                        </span>
                                        <span class="caden listContent assignedCategory">
                                            <label class="caden">Account Name</label>
                                            <output id="oppAccountName" class="caden"></output>
                                        </span>
                                        <span class="caden listContent numberOfEmployees">
                                            <label class="caden">Occupation</label>
                                            <output id="oppOccupation" class="caden"></output>
                                        </span>
                                        <span class="caden listContent decile">
                                            <label class="caden">Revenue</label>
                                            <output id="oppRevenue" class="caden"></output>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="caden body-row-section">
                                <div class="caden header sub-header">
                                    <button id="companyInfoCollapseButton" class="caden box-button">
                                        <div class="caden sub-header-Content">
                                            <span id="collapse-companyInfo-icon" class="caden expanded-icon">
                                                <svg class="caden arrowIcon" viewBox="0 0 520 520" part="icon">
                                                    <g>
                                                        <path class="caden" d="M476 178L271 385c-6 6-16 6-22 0L44 178c-6-6-6-16 0-22l22-22c6-6 16-6 22 0l161 163c6 6 16 6 22 0l161-163c6-6 16-6 22 0l22 22c5 7 5 16 0 22z"></path>
                                                    </g>
                                                </svg>
                                            </span>
                                            <span class="caden sub-header">
                                                <label class="caden sub-header">Package Info</label>
                                            </span>
                                        </div>
                                    </button>
                                </div>
                                <div class="caden row">
                                    <div id="Package-info-column-1" class="caden listContent column">
                                        <span class="caden listContent createdDate">
                                            <label class="caden">Amount</label>
                                            <output id="oppAmount" class="caden"></output>
                                        </span>
                                        <span class="caden listContent firstServiceCreatedDate">
                                            <label class="caden">Amount Paid Upfront</label>
                                            <output id="oppAmountPaidUpfront" class="caden"></output>
                                        </span>
                                        <span class="caden listContent signupDate">
                                            <label class="caden">Package</label>
                                            <output id="oppPackage" class="caden"></output>
                                        </span>
                                        <span class="caden listContent userLastActivity">
                                            <label class="caden">Package Level</label>
                                            <output id="oppPackageLevel" class="caden"></output>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            </div>
            <div class="caden width-adjuster"></div>
        </div>
`;

                // Append the new element to the tackUI.insertPoint
                tackUI.viewport.prepend(newElement);

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
    z-index: 1;
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
div.caden.custom-ui-container {
    display: flex;
    flex-direction: column;
    position: relative;
    top: 5px;
    width: 370px;
    height: calc(100vh - 140px);
    border-radius: 4px;
    gap: 5px;
    margin: 0;
    padding: 0;
}

div.caden.width-adjuster {
    position: relative;
    right: 0px;
    background-color: rgba(135, 135, 135, 0.349);
    cursor: ew-resize;
    align-items: start;
    margin: 0;
    padding: 0;
    height: calc(100vh - 130px);
    width: 3px;
    margin-right: 5px;
}



/* Contact Container */
section.caden.contact-container {
    display: none;
}

section.caden.contact-container {

    flex-direction: column;
    gap: 5px;
}

section.caden.contact-container section.caden.header {
    display: flex;
    flex-direction: column;
    border: 1.11111px solid rgb(201, 201, 201);
    border-radius: 4px;
    height: fit-content;
    background-color: rgb(255, 255, 255);
}

section.caden.contact-container div.caden.header {
    background-color: rgb(243, 243, 243);
    border-radius: 4px;
    height: 100px;
}

section.caden.contact-container div.caden.header.top {
    display: flex;
    align-items: center;
    height: fit-content;
    margin: 0px;
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 8px;
    padding-bottom: 8px;
}

section.caden.contact-container div.caden.priority-info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: fit-content;
    gap: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
    padding-right: 10px;
    text-align: left;
}

section.caden.contact-container div.caden.header-main {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: fit-content;
    gap: 10px;
    height: 32px;
}

section.caden.contact-container span#contact-img.caden {
    display: flex;
    border-radius: 4px;
    background-color: rgb(150, 2, 199);
    height: 32px;
    width: 32px;
}

section.caden.contact-container span#contact-info.caden {
    display: flex;
    flex-direction: column;
    height: fit-content;
    justify-content: space-between;
    height: 32px;
}

section.caden.contact-container label#headerLabel.caden {
    display: flex;
    flex-direction: row;
    font-size: 13px;
    color: rgb(68, 68, 68);
    height: 13px;
    align-items: flex-end;
}

section.caden.contact-container output#contactName.caden {
    display: flex;
    flex-direction: row;
    font-size: 18px;
    color: black;
    font-weight: 700;
    height: 18px;
    align-items: flex-start;
}

section.caden.contact-container span.caden.header-list-content {
    display: flex;
    flex-direction: column;
    gap: 3px;
    width: 100%;
    height: fit-content;
    width: fit-content;
}

section.caden.contact-container label.caden.header {
    align-items: flex-end;
}

section.caden.contact-container output.caden.header-list-output {
    width: fit-content inline-block;
    min-height: 36px;
    height: fit-content;
    align-items: flex-start;
    display: flex;
    font-size: 15px;
    font-weight: 500;
    color: rgb(24, 24, 24);
}

/* Contact Status */

section.caden.contact-container section.sales_status {
    position: relative;
    display: flex;
    flex-direction: column;
    border: 1.11111px solid rgb(201, 201, 201);
    border-radius: 4px;
}

section.caden.contact-container div.button-container {
    display: flex;
    flex-direction: row;
    padding-left: 5px;
    padding-right: 5px;
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: 4px;
    overflow-x: scroll;
    margin-left: 10px;
    margin-right: 10px;
}

section.caden.contact-container button.status {
    display: flex;
    width: 100%;
    height: 30px;
    background-color: rgb(243, 243, 243);
    color: rgb(68, 68, 68);
    font-weight: 500;
    border: none;
    margin-left: -4px;
    margin-right: -4px;
    padding: 0px;
    cursor: pointer;
    min-width: 85.4844px;
    overflow-x: scroll;
}

section.caden.contact-container button.status.Start {
    clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%, 0 50%);
    border-top-left-radius: 32px;
    border-bottom-left-radius: 32px;
}

section.caden.contact-container button.status.Middle {
    clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%, 10px 50%);
}

section.caden.contact-container button.status.End {
    clip-path: polygon(0 0, 100% 0, 100% 50%, 100% 100%, 0 100%, 10px 50%);
    border-top-right-radius: 32px;
    border-bottom-right-radius: 32px;
}

section.caden.contact-container button.status.done {
    color: white;
    background-color: rgb(59, 167, 85);
}

section.caden.contact-container button.status.current {
    color: white;
    background-color: rgb(1, 68, 134);
}

section.caden.contact-container div.status-label-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 30px;
    margin-left: 10px;
    margin-right: 10px;
    width: calc(100% - 20px);
}

section.caden.contact-container span.statusLabel {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 5px;
    margin-right: 5px;
    width: 100%;
    height: calc(100% - 15px);
    font-size: 70%;
}

section.caden.contact-container span.statusLabel.hidden {
    display: none;
}

section.caden.contact-container svg.status-done-icon.hidden {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    margin-right: 10px;
    width: 100%;
    height: calc(100% - 15px);
    font-size: 100%;
}

section.caden.contact-container svg.status-done-icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    margin-right: 10px;
    width: 100%;
    height: calc(100% - 15px);
    font-size: 100%;
    fill: white;
}


/* contact body */

section.caden.contact-container section.caden.main-body {
    display: flex;
    flex-direction: column;
    border: 1.11111px solid rgb(201, 201, 201);
    border-radius: 4px;
    background-color: rgb(255, 255, 255);
    padding: 5px;
    height: 100%;
    gap: 10px;
}

/* contact body top section */
section.caden.contact-container div.caden.row-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 5px;
    border-radius: 4px;
    width: 100%;
    height: fit-content;
}

section.caden.contact-container div.caden.body-row-section {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    min-height: 100%;
}

section.caden.contact-container div.caden.list-container {
    display: flex;
    flex-direction: column;
    gap: 5px;
    border-radius: 4px;
    width: 100%;
    height: fit-content;
}

section.caden.contact-container div.caden.body-section {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    min-height: 100%;
}

section.caden.contact-container div.caden.header.sub-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    font-weight: 500;
    height: 30px;
    text-align: left;
}

section.caden.contact-container div.caden.row {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
}

section.caden.contact-container div.caden.listContent.column {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    min-height: 100%;
    margin-left: 5px;
    margin-right: 5px;
    gap: 10px;
}

section.caden.contact-container span.caden.listContent {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 4px;
    padding-top: 3px;
    border-bottom: thin solid black;
    border-width: 1px;
    margin-left: 5px;
    margin-right: 5px;
    width: calc(100% - 10px);
    min-height: 40px;
    height: fit-content;
}

section.caden.contact-container label.caden {
    display: flex;
    align-items: flex-end;
    font-size: 11px;
    font-stretch: normal;
    color: rgb(68, 68, 68);
    padding-bottom: 0px;
    width: 100%;
    min-height: 13px;
    height: fit-content;
}

section.caden.contact-container span.caden.listContent output.caden {
    /* output */
    display: flex;
    align-items: flex-start;
    font-size: 15px;
    font-weight: 500;
    color: rgb(24, 24, 24);
    width: 100%;
    height: 20px;
    overflow: auto;
    text-align: left;
}

/* checkbox */
section.caden.contact-container span.caden.listContent.checkbox {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-top: 5px;
    border-bottom: thin solid black;
    border-width: 1px;
    margin-left: 5px;
    margin-right: 5px;
    width: calc(100% - 10px);
    min-height: 40px;
    height: fit-content;
}

section.caden.contact-container label.caden.checkbox {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    min-height: 13px;
    height: fit-content;
}

section.caden.contact-container input.caden.checkbox {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 5px;
    cursor: pointer;
    background-color: rgb(243, 243, 243);
    min-height: 13px;
    height: fit-content;
}

section.caden.contact-container button.caden.box-button {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0px;
    padding: 0px;
    width: 100%;
    height: 100%;
    border: none;
    cursor: pointer;
    border-radius: 7px;
}

section.caden.contact-container .caden.sub-header-Content {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 10px;
    cursor: pointer;
    height: 100%;
}

section.caden.contact-container .caden.expanded-icon {
    display: flex;
    width: 15.9896px;
    height: 15.9896px;
    fill: rgb(116, 116, 116);
    border: none;
    visibility: visible;
    cursor: pointer;
}

section.caden.contact-container .caden.collapsed-icon {
    display: flex;
    width: 15.9896px;
    height: 15.9896px;
    fill: rgb(116, 116, 116);
    border: none;
    rotate: -90deg;
    visibility: visible;
    cursor: pointer;
}

/* contact body bottom section */
section.caden.contact-container label.caden.sub-header {
    display: flex;
    font-size: 14px;
    font-weight: 500;
    color: rgb(24, 24, 24);
    height: 100%;
}

section.caden.contact-container div.caden.collapsed-column {
    display: none;
}












/* Opportunity Container */
section.caden.opportunity-container {
    display: none;
}

section.caden.opportunity-container {

    flex-direction: column;
    gap: 5px;
}

section.caden.opportunity-container section.caden.header {
    display: flex;
    flex-direction: column;
    border: 1.11111px solid rgb(201, 201, 201);
    border-radius: 4px;
    height: fit-content;
    background-color: rgb(255, 255, 255);
}

section.caden.opportunity-container div.caden.header {
    background-color: rgb(243, 243, 243);
    border-radius: 4px;
    height: 100px;
}

section.caden.opportunity-container div.caden.header.top {
    display: flex;
    align-items: center;
    height: fit-content;
    margin: 0px;
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 8px;
    padding-bottom: 8px;
}

section.caden.opportunity-container div.caden.priority-info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: fit-content;
    gap: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
    padding-right: 10px;
    text-align: left;
}

section.caden.opportunity-container div.caden.header-main {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: fit-content;
    gap: 10px;
    height: 32px;
}

section.caden.opportunity-container span#opportunity-img.caden {
    display: flex;
    border-radius: 4px;
    background-color: #FF5D2D;
    height: 32px;
    width: 32px;
}

section.caden.opportunity-container span#opportunity-info.caden {
    display: flex;
    flex-direction: column;
    height: fit-content;
    justify-content: space-between;
    height: 32px;
}

section.caden.opportunity-container label#headerLabel.caden {
    display: flex;
    flex-direction: row;
    font-size: 13px;
    color: rgb(68, 68, 68);
    height: 13px;
    align-items: flex-end;
}

section.caden.opportunity-container output#oppContactName1.caden {
    display: flex;
    flex-direction: row;
    font-size: 18px;
    color: black;
    font-weight: 700;
    height: 18px;
    align-items: flex-start;
}

section.caden.opportunity-container span.caden.header-list-content {
    display: flex;
    flex-direction: column;
    gap: 3px;
    width: 100%;
    height: fit-content;
    width: fit-content;
}

section.caden.opportunity-container label.caden.header {
    align-items: flex-end;
}

section.caden.opportunity-container output.caden.header-list-output {
    width: fit-content inline-block;
    min-height: 36px;
    height: fit-content;
    align-items: flex-start;
    display: flex;
    font-size: 15px;
    font-weight: 500;
    color: rgb(24, 24, 24);
}

/* Opportunity Status */

section.caden.opportunity-container section.sales_status {
    position: relative;
    display: flex;
    flex-direction: column;
    border: 1.11111px solid rgb(201, 201, 201);
    border-radius: 4px;
}

section.caden.opportunity-container div.button-container {
    display: flex;
    flex-direction: row;
    padding-left: 5px;
    padding-right: 5px;
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: 4px;
    overflow-x: scroll;
    margin-left: 10px;
    margin-right: 10px;
}

section.caden.opportunity-container button.status {
    display: flex;
    width: 100%;
    height: 30px;
    background-color: rgb(243, 243, 243);
    color: rgb(68, 68, 68);
    font-weight: 500;
    border: none;
    margin-left: -4px;
    margin-right: -4px;
    padding: 0px;
    cursor: pointer;
    min-width: 85.4844px;
    overflow-x: scroll;
}

section.caden.opportunity-container button.status.Start {
    clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%, 0 50%);
    border-top-left-radius: 32px;
    border-bottom-left-radius: 32px;
}

section.caden.opportunity-container button.status.Middle {
    clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%, 10px 50%);
}

section.caden.opportunity-container button.status.End {
    clip-path: polygon(0 0, 100% 0, 100% 50%, 100% 100%, 0 100%, 10px 50%);
    border-top-right-radius: 32px;
    border-bottom-right-radius: 32px;
}

section.caden.opportunity-container button.status.done {
    color: white;
    background-color: rgb(59, 167, 85);
}

section.caden.opportunity-container button.status.current {
    color: white;
    background-color: rgb(1, 68, 134);
}

section.caden.opportunity-container div.status-label-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 30px;
    margin-left: 10px;
    margin-right: 10px;
    width: calc(100% - 20px);
}

section.caden.opportunity-container span.statusLabel {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 5px;
    margin-right: 5px;
    width: 100%;
    height: calc(100% - 15px);
    font-size: 70%;
}

section.caden.opportunity-container span.statusLabel.hidden {
    display: none;
}

section.caden.opportunity-container svg.status-done-icon.hidden {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    margin-right: 10px;
    width: 100%;
    height: calc(100% - 15px);
    font-size: 100%;
}

section.caden.opportunity-container svg.status-done-icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    margin-right: 10px;
    width: 100%;
    height: calc(100% - 15px);
    font-size: 100%;
    fill: white;
}


/* Opportunity body */

section.caden.opportunity-container section.caden.main-body {
    display: flex;
    flex-direction: column;
    border: 1.11111px solid rgb(201, 201, 201);
    border-radius: 4px;
    background-color: rgb(255, 255, 255);
    padding: 5px;
    height: 100%;
    gap: 10px;
}

/* body top section */
section.caden.opportunity-container div.caden.row-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 5px;
    border-radius: 4px;
    width: 100%;
    height: fit-content;
}

section.caden.opportunity-container div.caden.body-row-section {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    min-height: 100%;
}

section.caden.opportunity-container div.caden.list-container {
    display: flex;
    flex-direction: column;
    gap: 5px;
    border-radius: 4px;
    width: 100%;
    height: fit-content;
}

section.caden.opportunity-container div.caden.body-section {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    min-height: 100%;
}

section.caden.opportunity-container div.caden.header.sub-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    font-weight: 500;
    height: 30px;
    text-align: left;
}

section.caden.opportunity-container div.caden.row {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
}

section.caden.opportunity-container div.caden.listContent.column {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    min-height: 100%;
    margin-left: 5px;
    margin-right: 5px;
    gap: 10px;
}

section.caden.opportunity-container span.caden.listContent {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 4px;
    padding-top: 3px;
    border-bottom: thin solid black;
    border-width: 1px;
    margin-left: 5px;
    margin-right: 5px;
    width: calc(100% - 10px);
    min-height: 40px;
    height: fit-content;
}

section.caden.opportunity-container label.caden {
    display: flex;
    align-items: flex-end;
    font-size: 11px;
    font-stretch: normal;
    color: rgb(68, 68, 68);
    padding-bottom: 0px;
    width: 100%;
    min-height: 13px;
    height: fit-content;
}

section.caden.opportunity-container span.caden.listContent output.caden {
    /* output */
    display: flex;
    align-items: flex-start;
    font-size: 15px;
    font-weight: 500;
    color: rgb(24, 24, 24);
    width: 100%;
    height: 20px;
    overflow: auto;
    text-align: left;
}

/* checkbox */
section.caden.opportunity-container span.caden.listContent.checkbox {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-top: 5px;
    border-bottom: thin solid black;
    border-width: 1px;
    margin-left: 5px;
    margin-right: 5px;
    width: calc(100% - 10px);
    min-height: 40px;
    height: fit-content;
}

section.caden.opportunity-container label.caden.checkbox {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    min-height: 13px;
    height: fit-content;
}

section.caden.opportunity-container input.caden.checkbox {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 5px;
    cursor: pointer;
    background-color: rgb(243, 243, 243);
    min-height: 13px;
    height: fit-content;
}

section.caden.opportunity-container button.caden.box-button {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0px;
    padding: 0px;
    width: 100%;
    height: 100%;
    border: none;
    cursor: pointer;
    border-radius: 7px;
}

section.caden.opportunity-container .caden.sub-header-Content {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 10px;
    cursor: pointer;
    height: 100%;
}

section.caden.opportunity-container .caden.expanded-icon {
    display: flex;
    width: 15.9896px;
    height: 15.9896px;
    fill: rgb(116, 116, 116);
    border: none;
    visibility: visible;
    cursor: pointer;
}

section.caden.opportunity-container .caden.collapsed-icon {
    display: flex;
    width: 15.9896px;
    height: 15.9896px;
    fill: rgb(116, 116, 116);
    border: none;
    rotate: -90deg;
    visibility: visible;
    cursor: pointer;
}

/* body bottom section */
section.caden.opportunity-container label.caden.sub-header {
    display: flex;
    font-size: 14px;
    font-weight: 500;
    color: rgb(24, 24, 24);
    height: 100%;
}

section.caden.opportunity-container div.caden.collapsed-column {
    display: none;
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

div.panel.scrollable.slds-utility-panel.slds-grid.slds-grid--vertical.oneUtilityBarPanel.DOCKED.slds-is-open {
    left: -10px !important;
    bottom: 40px !important;
    height: calc(100% - 135px) !important;
}

div.panel.scrollable.slds-utility-panel.slds-grid.slds-grid--vertical.oneUtilityBarPanel.DOCKED.slds-is-open>div.slds-utility-panel__body {
    min-height: calc(100% - 41.98px) !important;
    max-height: calc(100% - 41.98px) !important;
}











/* Autmoations */

section.caden.automationSection {
    position: absolute;
    top: 12.5px;
    right: 12.5px;
    height: fit-content;
    width: fit-content;
    z-index: 1;
}

div.caden.automationsHeader {
    position: relative;
    top: 0px;
    right: 0px;
    height: 20px;
    width: 20px;
    display: flex;
    flex-direction: row;
    padding: 0px;
    margin: 0px;
    border: 1.11111px solid rgb(116, 116, 116);
    border-radius: 4px;
    align-items: center;
}

div.caden.automationsDropdownButton {
    position: relative;
    top: 0px;
    right: 0px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 0px;
    margin: 0px;
    border-radius: 4px;
    align-items: center;
}

span.caden.dropdownIcon {
    display: flex;
    height: 100%;
    width: 100%;
    fill: rgb(116, 116, 116);
    border: none;
    visibility: visible;
    cursor: pointer;
    padding: 0px;
    margin: 0px;
    border-radius: 4px;
    align-items: center;
}

span.caden.dropdownIcon svg {
    cursor: pointer;
}







div.caden.automationsContainer {
    display: none;
}



div.caden.automationsContainer.show {
    position: absolute;
    top: 21.11111px;
    right: 0px;
    gap: 10px;
    height: fit-content;
    width: fit-content;
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
}


div.caden.automationButtonContainer {
    display: flex;
    flex-direction: row;
    width: 94.73px;
    height: 32px;
    padding: 0px;
    margin: 0px;
    border-radius: 4px;
}

button.caden.automationButton {
    display: flex;
    cursor: pointer;
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
}

            `;
                // Append the style element to the document head
                tackUI.insertPoint.prepend(style);

            } catch (error) { console.error('CADEN TEST -- insertCustomUI', error); }
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
        window.makeDraggable = function () {
            var startX, startWidth, newWidth;

            customUI.widthAdjuster.addEventListener('mousedown', function (e) {
                // Prevent any default action to ensure smooth dragging
                e.preventDefault();
                document.documentElement.addEventListener('mousemove', doDrag, false);
                document.documentElement.addEventListener('mouseup', stopDrag, false);

                startX = e.clientX;
                startWidth = customUI.customUIContainer.clientWidth;
            });

            function doDrag(e) {
                var newX = e.clientX;
                newWidth = startWidth + (newX - startX);
                customUI.customUIContainer.style.width = newWidth + 'px';
            }

            function stopDrag() {
                // Remove the event listeners when dragging is stopped
                document.documentElement.removeEventListener('mousemove', doDrag, false);
                document.documentElement.removeEventListener('mouseup', stopDrag, false);
            }

        };
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
                const elements = [customUI.automationsButton, customUI.automationsDropdown, ...customUI.automationsButtonsContainers, ...customUI.automationButtons];

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
            // Add event listeners to the automation buttons
            window.customUI.convertButton.addEventListener('click', () => {
                window.convertContact();
            });
            window.customUI.packageOne.addEventListener('click', () => {
                window.fill200Package();
            });
            window.customUI.packageTwo.addEventListener('click', () => {
                window.fill300Package();
            });
            window.customUI.packageThree.addEventListener('click', () => {
                window.fill400Package();
            });

        };
        window.setContactStatus = function (event) {
            var buttons = document.querySelectorAll('section.caden.contact-container .status');
            var clickedButtonIndex = Array.from(buttons).indexOf(event.currentTarget);

            // set the 'NOT done' status elements
            for (var j = clickedButtonIndex; j < buttons.length; j++) {
                var currentButton = buttons[j];
                if (currentButton && currentButton.classList.contains('done')) {
                    currentButton.classList.remove('done');
                }
                var spanElement = currentButton && currentButton.querySelector('span');
                if (spanElement && spanElement.classList.contains('hidden')) {
                    spanElement.classList.remove('hidden');
                }
                var svgElement = currentButton && currentButton.querySelector('svg');
                if (svgElement && !svgElement.classList.contains('hidden')) {
                    svgElement.classList.add('hidden');
                }
            }

            // set the 'done' status elements
            for (var i = 0; i < clickedButtonIndex; i++) {
                var currentButton = buttons[i];
                if (currentButton && !currentButton.classList.contains('done')) {
                    currentButton.classList.add('done');
                }
                var spanElement = currentButton && currentButton.querySelector('span');
                if (spanElement && !spanElement.classList.contains('hidden')) {
                    spanElement.classList.add('hidden');
                }
                var svgElement = currentButton && currentButton.querySelector('svg');
                if (svgElement && svgElement.classList.contains('hidden')) {
                    svgElement.classList.remove('hidden');
                }
            }

            for (var k = 0; k < buttons.length; k++) {
                var currentButton = buttons[k];
                if (currentButton && currentButton !== event.currentTarget) {
                    currentButton.classList.remove('current');
                }
            }

            event.currentTarget.classList.add('current');
            if (tackUI.salesStatus !== null) {
                if (event.currentTarget.textContent.trim() !== tackUI.salesStatus.textContent.trim()) {
                    if (event.currentTarget.textContent.trim() === 'Convert') {
                        window.convertContact();
                    } else {
                        tackUI['status' + event.currentTarget.textContent.trim() + 'Button'].click();
                    }
                }
            }

        };
        window.setOpportunityStage = function (event) {
            var buttons = document.querySelectorAll('section.caden.opportunity-container .status');
            var clickedButtonIndex = Array.from(buttons).indexOf(event.currentTarget);

            // set the 'NOT done' status elements
            for (var j = clickedButtonIndex; j < buttons.length; j++) {
                var currentButton = buttons[j];
                if (currentButton && currentButton.classList.contains('done')) {
                    currentButton.classList.remove('done');
                }
                var spanElement = currentButton && currentButton.querySelector('span');
                if (spanElement && spanElement.classList.contains('hidden')) {
                    spanElement.classList.remove('hidden');
                }
                var svgElement = currentButton && currentButton.querySelector('svg');
                if (svgElement && !svgElement.classList.contains('hidden')) {
                    svgElement.classList.add('hidden');
                }
            }

            // set the 'done' status elements
            for (var i = 0; i < clickedButtonIndex; i++) {
                var currentButton = buttons[i];
                if (currentButton && !currentButton.classList.contains('done')) {
                    currentButton.classList.add('done');
                }
                var spanElement = currentButton && currentButton.querySelector('span');
                if (spanElement && !spanElement.classList.contains('hidden')) {
                    spanElement.classList.add('hidden');
                }
                var svgElement = currentButton && currentButton.querySelector('svg');
                if (svgElement && svgElement.classList.contains('hidden')) {
                    svgElement.classList.remove('hidden');
                }
            }

            for (var k = 0; k < buttons.length; k++) {
                var currentButton = buttons[k];
                if (currentButton && currentButton !== event.currentTarget) {
                    currentButton.classList.remove('current');
                }
            }

            event.currentTarget.classList.add('current');
            if (tackUI.salesStatus !== null) {
                if (event.currentTarget.textContent.trim().replace(/\s+/g, '') === 'SQO') {
                    if (tackUI.salesStatus.textContent.trim().replace(/\s+/g, '') !== 'SalesQualifiedOpportunity') {
                        (async function () {
                            tackUI.oppStatusSqo.click();
                            await waitForCondition(() => tackUI.oppTempStage?.textContent.trim().replace(/\s+/g, '') === 'SalesQualifiedOpportunity').then(() => {
                                tackUI.oppMarkStageCompleteButton.click();
                            });
                        })();
                    }
                } else if (event.currentTarget.textContent.trim().replace(/\s+/g, '') !== 'SQO' && event.currentTarget.textContent.trim().replace(/\s+/g, '') !== tackUI.salesStatus.textContent.trim().replace(/\s+/g, '')) {
                    (async function () {
                        tackUI['oppStatus' + event.currentTarget.textContent.trim().replace(/\s+/g, '')].click();
                        await waitForCondition(() => tackUI.oppTempStage !== null)
                        await waitForCondition(() => tackUI.oppTempStage?.textContent.trim().replace(/\s+/g, '') !== undefined)
                        await waitForCondition(() => tackUI.oppTempStage?.textContent.trim().replace(/\s+/g, '') === event.currentTarget?.textContent.trim().replace(/\s+/g, '')).then(() => {
                            tackUI.oppMarkStageCompleteButton.click();
                        });
                    })();
                }
            }

        };
        await window.insertCustomUI();
        await waitForCondition(() => customUIvalues.every(value => customUI[value] !== null), 100, 100).then(() => {
            window.customUIscript();
            window.makeDraggable();
            window.customUI.widthAdjuster.addEventListener('dblclick', function () {
                var mainContainer = customUI.informationContainer;
                if (mainContainer.style.display === 'none') {
                    mainContainer.style.display = '';
                } else {
                    mainContainer.style.display = 'none';
                }
            });
            window.customUIautomationsFunctions();
            window.customUI.statusNewButton.addEventListener('click', setContactStatus);
            window.customUI.statusAttemptingButton.addEventListener('click', setContactStatus);
            window.customUI.statusUnsuccessfulButton.addEventListener('click', setContactStatus);
            window.customUI.statusConvertButton.addEventListener('dblclick', setContactStatus);
            window.customUI.statusRetiredButton.addEventListener('click', setContactStatus);
            window.customUI.oppStatusNew.addEventListener("click", setOpportunityStage);
            window.customUI.oppStatusAttempting.addEventListener("click", setOpportunityStage);
            window.customUI.oppStatusContacted.addEventListener("click", setOpportunityStage);
            window.customUI.oppStatusSqo.addEventListener("click", setOpportunityStage);
            window.customUI.oppStatusPitched.addEventListener("click", setOpportunityStage);
            window.customUI.oppStatusFinalDetails.addEventListener("click", setOpportunityStage);
            window.customUI.oppStatusCommitted.addEventListener("click", setOpportunityStage);
            window.customUI.oppStatusClosed.addEventListener("click", setOpportunityStage);
        });

        window.objectLoaded = false;
        window.waitForContactLoad = (function () {
            let timeout = null;
            window.loadObserver = new MutationObserver(() => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    window.loadObserver.disconnect();
                    window.objectLoaded = true;
                    //window.sendToCustomContact();
                }, 500);
            });
        })();

        window.customUIconditionalFormatting = function () {
            (function highlightSalesActivationDate() {
                const targetElement = customUI.salesActivationDate;
                const targetComponent = targetElement.closest('.listContent');

                if (targetElement.textContent !== "") {
                    targetComponent.style.backgroundColor = 'rgba(255, 0, 0, 0.168)';
                } else {
                    targetComponent.style.backgroundColor = '';
                }
            })();
            // highlight max activation date component if not equal to ""
            (function highlightMaxActivationDate() {
                const targetElement = customUI.maxActivationDate;
                const targetComponent = targetElement.closest('.listContent');

                if (targetElement.textContent !== "") {
                    targetComponent.style.backgroundColor = 'rgba(255, 0, 0, 0.168)';
                } else {
                    targetComponent.style.backgroundColor = '';
                }
            })();
            // highlight decile component
            (function highlightDecile() {
                const targetElement = customUI.decile;
                const targetComponent = targetElement.closest('.listContent');

                if (targetElement.textContent === 'Decile 1' || targetElement.textContent === 'Decile 2') {
                    targetComponent.style.backgroundColor = 'rgba(99, 248, 99, 0.426)';
                } else if (targetElement.textContent === 'Decile 8' || targetElement.textContent === 'Decile 9' || targetElement.textContent === 'Decile 10') {
                    targetComponent.style.backgroundColor = 'rgba(255, 0, 0, 0.168)';
                } else {
                    targetComponent.style.backgroundColor = '';
                }
            })();
            // highlight employees component
            (function highlightEmployees() {
                const targetElement = customUI.numberOfEmployees;
                const targetComponent = targetElement.parentElement;

                if (targetElement.textContent === '2-3 people' || targetElement.textContent === '4-9 people') {
                    targetComponent.style.backgroundColor = 'rgba(99, 248, 99, 0.426)';
                    customUI.numberOfEmployeesHeader.parentElement.style.backgroundColor = 'rgba(99, 248, 99, 0.426)';
                } else if (targetElement.textContent.contains === '10+') {
                    targetComponent.style.backgroundColor = 'rgba(255, 0, 0, 0.168)';
                    customUI.numberOfEmployeesHeader.parentElement.style.backgroundColor = 'rgba(255, 0, 0, 0.168)';
                } else {
                    targetComponent.style.backgroundColor = '';
                    customUI.numberOfEmployeesHeader.parentElement.style.backgroundColor = '';
                }
            })();
            // highlight created date component if = today or yesterday
            (function highlightCreatedDate() {
                const createdDateElement = customUI.createdDate;
                const dateValue = new Date(createdDateElement.textContent.split(',')[0]);
                const today = new Date();
                const yesterday = new Date(today);

                yesterday.setDate(yesterday.getDate() - 1);

                // Reset time parts for comparison
                dateValue.setHours(0, 0, 0, 0);
                today.setHours(0, 0, 0, 0);
                yesterday.setHours(0, 0, 0, 0);

                const spanElement = createdDateElement.parentElement;

                if (dateValue.getTime() === today.getTime() || dateValue.getTime() === yesterday.getTime()) {
                    spanElement.style.backgroundColor = 'rgba(99, 248, 99, 0.426)';
                    customUI.createdDateHeader.parentElement.style.backgroundColor = 'rgba(99, 248, 99, 0.426)';
                } else {
                    spanElement.style.backgroundColor = '';
                    customUI.createdDateHeader.parentElement.style.backgroundColor = '';
                }
            })();
        };
        window.updateCustomUiFields = async function () {
            console.log('Emma - updateCustomUiFields started');
            async function calculateMailingAddress() {
                let mailingAddressCalc = '';
                if (tackUI.mailingAddress.childNodes.length > 1) {
                    mailingAddressCalc = tackUI.mailingAddress.childNodes[1].innerText;
                } else if (tackUI.mailingAddress.childNodes.length == 1) {
                    mailingAddressCalc = tackUI.mailingAddress.innerText;
                }
                return mailingAddressCalc;
            };
            let mailingAddress = await calculateMailingAddress();
            console.log('Emma - contactFields being updated');
            customUI.contactName.textContent = tackUI.contactName.innerText;
            customUI.occupationHeader.textContent = tackUI.occupation.innerText;
            customUI.mailingAddressHeader.textContent = mailingAddress;
            customUI.createdDateHeader.textContent = tackUI.createdDate.innerText;
            customUI.numberOfEmployeesHeader.textContent = tackUI.numberOfEmployees.innerText.split('(')[0].trim();
            customUI.firstServiceCreatedDate.textContent = tackUI.firstServiceCreatedDate.nextSibling.innerText;
            customUI.signupDate.textContent = tackUI.signupDate.innerText;
            customUI.userLastActivity.textContent = tackUI.userLastActivity.innerText;
            customUI.createdDate.textContent = tackUI.createdDate.innerText;
            customUI.occupation.textContent = tackUI.occupation.innerText;
            customUI.assignedCategory.textContent = tackUI.assignedCategory.innerText;
            customUI.numberOfEmployees.textContent = tackUI.numberOfEmployees.innerText.split('(')[0].trim();
            customUI.decile.textContent = tackUI.decile.innerText;
            customUI.targetingOn.checked = tackUI.targetingOn.checked;
            customUI.cardOnFile.checked = tackUI.cardOnFile.checked;
            customUI.numberOfReviews.textContent = tackUI.numberOfReviews.innerText;
            customUI.backgroundCheckStatus.textContent = tackUI.backgroundCheckStatus.innerText;
            customUI.salesActivationDate.textContent = tackUI.salesActivationDate.innerText;
            customUI.maxActivationDate.textContent = tackUI.maxActivationDate.innerText;
        };
        window.sendToCustomContact = async function () {
            try {
                var windowPath = window.location.pathname;
                var waitForConditionContact = createWaitForCondition(windowPath);
                customUI.opportunityContainer.style.display = 'none';
                customUI.contactContainer.style.display = 'flex';

                await waitForConditionContact(() => tackUI.allProgressiveContainers.length = 5);
                // wait until headers are found
                //await waitForConditionContact(() => headers.every(header => tackUI[header] !== null));
                if (contactValues.every(value => tackUI[value] !== null)) {
                    await waitForConditionContact(() =>
                        contactValues.every(value => tackUI[value].innerText !== undefined)
                    );
                    await window.updateCustomUiFields();
                    await window.customUIconditionalFormatting();
                    window.objectLoaded = false;
                } else {
                    window.loadObserver.observe(tackUI.pageHost, { childList: true, subtree: true, attributes: true, characterData: true });
                    await waitForConditionContact(() => window.objectLoaded === true);
                    await waitForConditionContact(() => tackUI.passiveContainers.length !== 0).then(() => {
                        window.currentPassiveContainers = tackUI.passiveContainers;
                        Array.from(tackUI.passiveContainers).forEach((container) => { container.closest('flexipage-component2').style = 'position: absolute; top: 0px; z-index: -1;'; });
                    });
                    await waitForConditionContact(() => tackUI.passiveContainers.length === 0);
                    await waitForConditionContact(() => contactValues.every(value => tackUI[value] !== null)).then(() => {
                        Array.from(tackUI.flexiComponents).forEach((component) => { component.style.cssText = ''; });
                        console.log('Emma - Elements found');
                    });
                    await waitForConditionContact(() => contactValues.every(value => tackUI[value].innerText !== undefined)).then(() => {
                        console.log('Emma - Elements have text');
                    });
                    await window.updateCustomUiFields();
                    await window.customUIconditionalFormatting();
                    // await timeout for 2 seconds
                    /*
                    await new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
                        Array.from(window.currentPassiveContainers).forEach((container) => {
                            container.previousSibling.children[0].click();
                            setTimeout(() => { container.previousSibling.children[0].click(); }, 1000);
                        });
                    });
                    */
                    await waitForConditionContact(() => tackUI.salesStatus !== null);
                    await waitForConditionContact(() => tackUI.salesStatus.textContent !== null && tackUI.salesStatus.textContent !== undefined).then(() => {
                        var currentStatus = document.querySelector('#status' + tackUI.salesStatus.textContent);
                        currentStatus.click();
                    });

                    window.objectLoaded = false;
                };
            } catch (error) { console.error('CADEN testerings -- sendToCustomContact', error); }
        };
        window.clearCustomContactUiFields = async function () {
            customUI.contactName.textContent = '';
            customUI.occupationHeader.textContent = '';
            customUI.mailingAddressHeader.textContent = '';
            customUI.createdDateHeader.textContent = '';
            customUI.numberOfEmployeesHeader.textContent = '';
            customUI.firstServiceCreatedDate.textContent = '';
            customUI.signupDate.textContent = '';
            customUI.userLastActivity.textContent = '';
            customUI.createdDate.textContent = '';
            customUI.occupation.textContent = '';
            customUI.assignedCategory.textContent = '';
            customUI.numberOfEmployees.textContent = '';
            customUI.decile.textContent = '';
            customUI.targetingOn.checked = '';
            customUI.cardOnFile.checked = '';
            customUI.numberOfReviews.textContent = '';
            customUI.backgroundCheckStatus.textContent = '';
            customUI.salesActivationDate.textContent = '';
            customUI.maxActivationDate.textContent = '';
            customUI.statusNewButton.click();
        };
        window.clearCustomOpportunityUiFields = async function () {
            customUI.oppContactNameHeader.textContent = '';
            customUI.oppAccountNameHeader.textContent = '';
            customUI.oppCloseDateHeader.textContent = '';
            customUI.oppAmountHeader.textContent = '';
            customUI.oppOwnerHeader.textContent = '';
            customUI.oppContactName.textContent = '';
            customUI.oppAccountName.textContent = '';
            customUI.oppOccupation.textContent = '';
            customUI.oppRevenue.textContent = '';
            customUI.oppAmount.textContent = '';
            customUI.oppAmountPaidUpfront.textContent = '';
            customUI.oppPackage.textContent = '';
            customUI.oppPackageLevel.textContent = '';
            if (customUI.oppContactCard !== null) {
                customUI.oppContactCard.remove();
            }
            customUI.oppStatusNew.click();
        };
        window.clearContactData = async function () {
            customUI.contactContainer.style.display = 'none';
            customUI.opportunityContainer.style.display = 'none';
            await window.clearCustomContactUiFields();
            await window.customUIconditionalFormatting();
            await window.clearCustomOpportunityUiFields();
        };

        window.updateCustomOpportunityUiFields = async function () {
            customUI.oppContactNameHeader.textContent = tackUI.oppContactName;
            customUI.oppAccountNameHeader.textContent = tackUI.oppAccountName;
            customUI.oppCloseDateHeader.textContent = tackUI.oppCloseDate;
            customUI.oppAmountHeader.textContent = tackUI.oppAmount;
            customUI.oppOwnerHeader.textContent = tackUI.oppOwner;
            customUI.oppContactName.textContent = tackUI.oppContactName;
            customUI.oppAccountName.textContent = tackUI.oppAccountName;
            customUI.oppOccupation.textContent = tackUI.oppOccupation;
            customUI.oppRevenue.textContent = tackUI.oppRevenue;
            customUI.oppAmount.textContent = tackUI.oppAmount;
            customUI.oppAmountPaidUpfront.textContent = tackUI.oppAmountPaidUpfront;
            customUI.oppPackage.textContent = tackUI.oppPackage;
            customUI.oppPackageLevel.textContent = tackUI.oppPackageLevel;
        };

        window.sendToCustomOpportunity = async function () {
            var windowPath = window.location.pathname;
            var waitForConditionOpportunity = createWaitForCondition(windowPath);
            customUI.contactContainer.style.display = 'none';
            customUI.opportunityContainer.style.display = 'flex';

            // await wait until the if function that checks if the oppValues have been found is completed before continuing
            let oppLoaded;
            if (oppValues.every(value => tackUI[value] === undefined)) {
                window.loadObserver.observe(tackUI.pageHost, { childList: true, subtree: true, attributes: true, characterData: true });
                await waitForConditionOpportunity(() => window.objectLoaded === true).then(() => {
                    oppLoaded = true;
                });

            } else {
                oppLoaded = true;
            }
            await waitForConditionOpportunity(() => oppLoaded === true).then(() => {
                window.objectLoaded = false;
            });
            await waitForConditionOpportunity(() => tackUI.allProgressiveContainers.length = 5);
            await waitForConditionOpportunity(() =>
                oppValues.every(value => tackUI[value] !== undefined)
            ).then(() => {
                window.updateCustomOpportunityUiFields();
            });
            await waitForConditionOpportunity(() => tackUI.oppContactCard !== null).then(() => {
                // Clone the contactCard
                const clonedCard = tackUI.oppContactCard.cloneNode(true);

                // Remove the specified div elements from the cloned card
                const divToRemove1 = clonedCard.querySelectorAll('div[class="slds-p-bottom_large"]')[1];
                const divToRemove2 = clonedCard.querySelectorAll('div[class="slds-p-bottom_large"]')[2];
                divToRemove1?.remove();
                divToRemove2?.remove();

                // Append the modified clone to the insertPoint
                customUI.opportunityContainer.appendChild(clonedCard);
            });
            await waitForConditionOpportunity(() => tackUI.salesStatus !== null);
            await waitForConditionOpportunity(() => tackUI.salesStatus.textContent !== null && tackUI.salesStatus.textContent !== undefined).then(() => {
                if (tackUI.salesStatus.textContent.trim().replace(/\s+/g, '') === 'SalesQualifiedOpportunity') {
                    customUI.oppStatusSqo.click();
                } else {
                    var currentStatus = document.querySelector('#status' + tackUI.salesStatus.textContent.trim().replace(/\s+/g, '') + 'Opp');
                    currentStatus.click();
                }
            });
        };

        window.checkURL = async function (newUrlPath = window.location.pathname) {
            await waitForCondition(() => newUrlPath === window.location.pathname, 100, 100);
            var urlPath = window.location.pathname;
            var basePath = '/lightning/r/';
            var contactPath = '/lightning/r/Contact/';
            var opportunityPath = '/lightning/r/Opportunity/';
            if (urlPath.startsWith(basePath)) {
                if (urlPath.startsWith(contactPath)) {
                    // var target = document.querySelector('[class="windowViewMode-maximized active lafPageHost"]');
                    window.sendToCustomContact();
                } else if (urlPath.startsWith(opportunityPath)) {
                    window.sendToCustomOpportunity();
                } else {
                    window.clearContactData();
                }
            } else {
                window.clearContactData();
            }
        };

        window.navigation.addEventListener('navigate', (event) => {
            // Check if the URL path has changed after a specific part
            var urlPath = new URL(event.destination.url).pathname;
            var basePath = '/lightning/r/';
            var contactPath = '/lightning/r/Contact/';
            var opportunityPath = '/lightning/r/Opportunity/';
            if (urlPath.startsWith(basePath)) {
                if (urlPath.startsWith(contactPath) || urlPath.startsWith(opportunityPath)) {
                    window.checkURL(urlPath);
                } else {
                    window.clearContactData();
                }
            } else {
                window.clearContactData();
            }
        });

        await waitForCondition(() => customUIvalues.every(value => customUI[value] !== null), 100, 100).then(() => window.checkURL());


        // other running functions _______________________________________________________
        window.toastMessageCloser = async function () {
            let config = { childList: true, subtree: true };

            // Callback function to execute when mutations are observed
            let callback = function (mutationsList, observer) {
                for (let mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        for (let node of mutation.addedNodes) {
                            if (node.nodeName === 'DIV') {
                                console.log('Emma test -- new toast child');
                                setTimeout(function () {
                                    if (tackUI.toastMessage !== null) {
                                        if (tackUI.toastMessage.textContent == 'It looks as if duplicates exist for this Contact. View Duplicates') {
                                            console.log('Emma test -- new toast MESSAGE');
                                            document.querySelector('button[title="Close"].toastClose').click();
                                            console.log('Emma test -- new toast MESSAGE closed');
                                        }
                                    }
                                }, 1000);
                            }
                        }
                    }
                }
            };

            let observer = new MutationObserver(callback);
            observer.observe(tackUI.toastMessageContainerNode, config);
            setTimeout(function () {
                if (tackUI.toastMessage !== null) {
                    if (tackUI.toastMessage.textContent == 'It looks as if duplicates exist for this Contact. View Duplicates') {
                        document.querySelector('button[title="Close"].toastClose').click();
                    }
                }
            }, 2000);

        };
        await waitForCondition(() => tackUI.toastMessageContainerNode !== null, 100, 100).then(() => {
            setTimeout(() => {
                window.toastMessageCloser();
            }, 1000);
        });
        window.openGenesysPhone = async function () {
            try {
                await actionThenWaitForCondition(
                    () => {
                        if (tackUI.phonePanel === null || tackUI.phonePanel === undefined) {
                            tackUI.phoneButton.click();
                        }
                    }, () => {
                        return tackUI.phonePanel !== null && tackUI.phonePanel !== undefined;
                    }
                );
            } catch (error) { console.error('ERROR CADEN LOG: openGenesysPhone function -', error); }
        };
        window.makeRoomForPhone = function () {
            let attempts = 0; // Moved outside to maintain its state across invocations

            function checkAriaHidden(maxAttempts = 2) {
                if (Array.from(tackUI.utilityBarParentElement.querySelectorAll('.slds-grid--vertical')).find(child => child.getAttribute('aria-hidden') === 'false')) {
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

        await waitForCondition(() => tackUI.phoneButton !== null && tackUI.dockingPanel !== null, 100, 100).then(() => {
            // setTimeout(() => {window.openGenesysPhone();}, 500);
            setTimeout(() => { window.makeRoomForPhone(); }, 750);
        });

        window.sendHeightMessage = function () {
            const newHeight = getComputedStyle(tackUI.innerPhoneContainer).height;
            function genesysPM(funcString) {
                var genIframe = document.querySelector('iframe.openctiSoftPhone');
                genIframe.contentWindow.postMessage('cadenMessage ' + funcString, 'https://apps.usw2.pure.cloud');
            }
            genesysPM("setGenesysHeight('" + newHeight + "');");
        };

        // other called function _______________________________________________________
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

        await waitForCondition(() => tackUI.viewport !== null, 100, 100).then(() => {
            window.addEventListener('message', function (event) { // Add event listener for messages from the parent window
                // Check the origin of the message
                if (event.origin !== 'https://apps.usw2.pure.cloud') return;

                if (event.data === "dispo done") {
                    window.closeContact();
                } else if (event.data === "cadenMessage set-phone-height") {
                    setTimeout(() => {
                        window.sendHeightMessage();
                    }, 500);
                    var resizeObserver = new ResizeObserver(() => {
                        window.sendHeightMessage();
                    });
                    resizeObserver.observe(tackUI.viewport);
                }
            });
        });


        // automation functions _______________________________________________________
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


            function waitForCondition(conditionFunction, interval = 5, maxAttempts = 500) { let attempts = 0; return new Promise((resolve, reject) => { const checkCondition = () => { if (conditionFunction()) { console.log('Condition met.'); resolve(); } else if (attempts < maxAttempts) { attempts++; setTimeout(checkCondition, interval); } else { console.log('Condition not met within the specified time'); reject(new Error('Condition not met within the specified time')); } }; checkCondition(); }); }
            function actionThenWaitForCondition(actionFunction, conditionFunction, interval = 5, maxAttempts = 500) { let attempts = 0; return new Promise((resolve, reject) => { const checkCondition = () => { actionFunction(); if (conditionFunction()) { console.log('Condition met.'); resolve(); } else if (attempts < maxAttempts) { attempts++; setTimeout(checkCondition, interval); } else { console.log('Condition not met within the specified time'); reject(new Error('Condition not met within the specified time')); } }; checkCondition(); }); }
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
        window.fill200Package = function () {

            // Constants __________
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

            var windowPath = window.location.pathname;
            var actionThenWaitForConditionPackage = createActionThenWaitForCondition(windowPath);
            var waitForConditionPackage = createWaitForCondition(windowPath);

            // Edit Opportunity _______
            async function editForm() {
                var editFormBtn = document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[title=\"Edit Opportunity Name\"]');
                if (editFormBtn !== null) {
                    editFormBtn.click();
                    await waitForConditionPackage(() => tackUI.packageAmountField !== null);
                }
            }

            async function fillAmount() {
                await waitForConditionPackage(() => tackUI.packageAmountField !== null && tackUI.packageAmountField.value !== undefined);
                await actionThenWaitForConditionPackage(() =>
                    tackUI.packageAmountField.value.includes(paidAmount),
                    () => {
                        tackUI.packageAmountField.value = paidAmount;
                        tackUI.packageAmountField.dispatchEvent(inputtingEvent);
                    });
            }

            async function fillAmountPaidUpFront() {
                await waitForConditionPackage(() => tackUI.packageAmountPaidUpfrontField !== null && tackUI.packageAmountPaidUpfrontField.value !== undefined);
                await actionThenWaitForConditionPackage(() =>
                    tackUI.packageAmountPaidUpfrontField.value.includes(paidAmount),
                    () => {
                        tackUI.packageAmountPaidUpfrontField.value = paidAmount;
                        tackUI.packageAmountPaidUpfrontField.dispatchEvent(inputtingEvent);
                    });
            }

            async function fillPromoCredit() {
                await waitForConditionPackage(() => tackUI.packagePromoCreditField !== null && tackUI.packagePromoCreditField.value !== undefined);
                await actionThenWaitForConditionPackage(() =>
                    tackUI.packagePromoCreditField.value.includes(promoCredit),
                    () => {
                        tackUI.packagePromoCreditField.value = promoCredit;
                        tackUI.packagePromoCreditField.dispatchEvent(inputtingEvent);
                    });
            }

            async function fillType() {
                try {
                    await waitForConditionPackage(() => tackUI.packageTypeField !== null);
                    if (tackUI.packageTypeField.textContent === none) {
                        await actionThenWaitForCondition(
                            () => {
                                tackUI.packageTypeField.click();
                            }, () => {
                                return tackUI.packageTypeOption !== null;
                            }
                        );

                        tackUI.packageTypeOption.click();
                        await waitForConditionPackage(() => tackUI.packageTypeField.textContent === typeValue);
                    }
                } catch (error) { console.error('CADEN LOG: fillType -', error); }
            }

            async function fillNumEmployees() {
                try {
                    await waitForConditionPackage(() => tackUI.packageNumEmployeesField !== null);
                    if (tackUI.packageNumEmployeesField.textContent === none) {
                        await actionThenWaitForCondition(
                            () => {
                                tackUI.packageNumEmployeesField.click();
                            }, () => {
                                return tackUI.packageNumEmployeesOption !== null;
                            }
                        );

                        tackUI.packageNumEmployeesOption.click();
                        await waitForConditionPackage(() => tackUI.packageNumEmployeesField.textContent === numEmployeesValue);
                    }
                } catch (error) { console.error('CADEN LOG: fillNumEmployees -', error); }
            }

            async function fillNumLocations() {
                try {
                    await waitForConditionPackage(() => tackUI.packageNumLocationsField !== null);
                    if (tackUI.packageNumLocationsField.textContent === none) {
                        await actionThenWaitForCondition(
                            () => {
                                tackUI.packageNumLocationsField.click();
                            }, () => {
                                return tackUI.packageNumLocationsOption !== null;
                            }
                        );

                        tackUI.packageNumLocationsOption.click();
                        await waitForConditionPackage(() => tackUI.packageNumLocationsField.textContent === numLocationsValue);
                    }
                } catch (error) { console.error('CADEN LOG: fillNumLocations -', error); }
            }

            async function fillFranchise() {
                try {
                    await waitForConditionPackage(() => tackUI.packageFranchiseField !== null);
                    if (tackUI.packageFranchiseField.textContent === none) {
                        await actionThenWaitForCondition(
                            () => {
                                tackUI.packageFranchiseField.click();
                            }, () => {
                                return tackUI.packageFranchiseOption !== null;
                            }
                        );

                        tackUI.packageFranchiseOption.click();
                        await waitForConditionPackage(() => tackUI.packageFranchiseField.textContent === franchiseValue);
                    }
                } catch (error) { console.error('CADEN LOG: fillFranchise -', error); }
            }

            async function fillPackage() {
                try {
                    await waitForConditionPackage(() => tackUI.packagePackageField !== null);
                    if (tackUI.packagePackageField.textContent !== packageValue) {
                        await actionThenWaitForCondition(
                            () => {
                                tackUI.packagePackageField.click();
                            }, () => {
                                return tackUI.packagePackageOption !== null;
                            }
                        );

                        tackUI.packagePackageOption.click();
                        await waitForConditionPackage(() => tackUI.packagePackageField.textContent === packageValue);
                    }



                    await waitForConditionPackage(() => tackUI.packagePackageLevelField !== null);
                    if (tackUI.packagePackageLevelField.textContent !== packageLevelvalue) {
                        await actionThenWaitForCondition(
                            () => {
                                tackUI.packagePackageLevelField.click();
                            }, () => {
                                return tackUI.packagePackageLevelOption !== null;
                            }
                        );

                        tackUI.packagePackageLevelOption.click();
                        await waitForConditionPackage(() => tackUI.packagePackageLevelField.textContent === packageLevelvalue);
                    }
                } catch (error) { console.error('CADEN LOG: fillPackage -', error); }
            }

            async function fillLeadType() {
                try {
                    await waitForConditionPackage(() => tackUI.packageLeadTypeField !== null);
                    if (tackUI.packageLeadTypeField.textContent === none) {
                        await actionThenWaitForCondition(
                            () => {
                                tackUI.packageLeadTypeField.click();
                            }, () => {
                                return tackUI.packageLeadTypeOption !== null;
                            }
                        );

                        tackUI.packageLeadTypeOption.click();
                        await waitForConditionPackage(() => tackUI.packageLeadTypeField.textContent === leadTypeValue);
                    }
                } catch (error) { console.error('CADEN LOG: fillLeadType -', error); }
            }

            async function fillLeadSource() {
                try {
                    await waitForConditionPackage(() => tackUI.packageLeadSourceField !== null);
                    if (tackUI.packageLeadSourceField.textContent === none) {
                        await actionThenWaitForCondition(
                            () => {
                                tackUI.packageLeadSourceField.click();
                            }, () => {
                                return tackUI.packageLeadSourceOption !== null;
                            }
                        );

                        tackUI.packageLeadSourceOption.click();
                        await waitForConditionPackage(() => tackUI.packageLeadSourceField.textContent === leadSourceValue);
                    }
                } catch (error) { console.error('CADEN LOG: fillLeadSource -', error); }
            }

            async function fillBatch() {
                try {
                    await waitForConditionPackage(() => tackUI.packageBatchField !== null);
                    if (tackUI.packageBatchField.value === '') {
                        tackUI.packageBatchField.value = batchValue;
                        tackUI.packageBatchField.dispatchEvent(inputtingEvent);
                        await waitForConditionPackage(() => tackUI.packageBatchField.value === batchValue);
                    }
                } catch (error) { console.error('CADEN LOG: fillBatch -', error); }
            }

            (async function saveOpp() {
                try {
                    await Promise.all([
                        editForm(),
                    ]);
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


                    await waitForConditionPackage(() => tackUI.packageSaveBtn !== null && tackUI.packageSaveBtn.disabled === false);
                    tackUI.packageSaveBtn.click();
                    window.sendToCustomOpportunity();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });

                } catch (error) {
                    console.error('CADEN LOG: saveOpp -', error);
                }
            })();
        };
        window.fill300Package = function () {

            // Constants __________
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

            var windowPath = window.location.pathname;
            var actionThenWaitForConditionPackage = createActionThenWaitForCondition(windowPath);
            var waitForConditionPackage = createWaitForCondition(windowPath);

            // Edit Opportunity _______
            async function editForm() {
                var editFormBtn = document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[title=\"Edit Opportunity Name\"]');
                if (editFormBtn !== null) {
                    editFormBtn.click();
                    await waitForConditionPackage(() => tackUI.packageAmountField !== null);
                }
            }

            async function fillAmount() {
                await waitForConditionPackage(() => tackUI.packageAmountField !== null && tackUI.packageAmountField.value !== undefined);
                await actionThenWaitForConditionPackage(() =>
                    tackUI.packageAmountField.value.includes(paidAmount),
                    () => {
                        tackUI.packageAmountField.value = paidAmount;
                        tackUI.packageAmountField.dispatchEvent(inputtingEvent);
                    });
            }

            async function fillAmountPaidUpFront() {
                await waitForConditionPackage(() => tackUI.packageAmountPaidUpfrontField !== null && tackUI.packageAmountPaidUpfrontField.value !== undefined);
                await actionThenWaitForConditionPackage(() =>
                    tackUI.packageAmountPaidUpfrontField.value.includes(paidAmount),
                    () => {
                        tackUI.packageAmountPaidUpfrontField.value = paidAmount;
                        tackUI.packageAmountPaidUpfrontField.dispatchEvent(inputtingEvent);
                    });
            }

            async function fillPromoCredit() {
                await waitForConditionPackage(() => tackUI.packagePromoCreditField !== null && tackUI.packagePromoCreditField.value !== undefined);
                await actionThenWaitForConditionPackage(() =>
                    tackUI.packagePromoCreditField.value.includes(promoCredit),
                    () => {
                        tackUI.packagePromoCreditField.value = promoCredit;
                        tackUI.packagePromoCreditField.dispatchEvent(inputtingEvent);
                    });
            }

            async function fillType() {
                try {
                    await waitForConditionPackage(() => tackUI.packageTypeField !== null);
                    if (tackUI.packageTypeField.textContent === none) {
                        await actionThenWaitForCondition(
                            () => {
                                tackUI.packageTypeField.click();
                            }, () => {
                                return tackUI.packageTypeOption !== null;
                            }
                        );

                        tackUI.packageTypeOption.click();
                        await waitForConditionPackage(() => tackUI.packageTypeField.textContent === typeValue);
                    }
                } catch (error) { console.error('CADEN LOG: fillType -', error); }
            }

            async function fillNumEmployees() {
                try {
                    await waitForConditionPackage(() => tackUI.packageNumEmployeesField !== null);
                    if (tackUI.packageNumEmployeesField.textContent === none) {
                        await actionThenWaitForCondition(
                            () => {
                                tackUI.packageNumEmployeesField.click();
                            }, () => {
                                return tackUI.packageNumEmployeesOption !== null;
                            }
                        );

                        tackUI.packageNumEmployeesOption.click();
                        await waitForConditionPackage(() => tackUI.packageNumEmployeesField.textContent === numEmployeesValue);
                    }
                } catch (error) { console.error('CADEN LOG: fillNumEmployees -', error); }
            }

            async function fillNumLocations() {
                try {
                    await waitForConditionPackage(() => tackUI.packageNumLocationsField !== null);
                    if (tackUI.packageNumLocationsField.textContent === none) {
                        await actionThenWaitForCondition(
                            () => {
                                tackUI.packageNumLocationsField.click();
                            }, () => {
                                return tackUI.packageNumLocationsOption !== null;
                            }
                        );

                        tackUI.packageNumLocationsOption.click();
                        await waitForConditionPackage(() => tackUI.packageNumLocationsField.textContent === numLocationsValue);
                    }
                } catch (error) { console.error('CADEN LOG: fillNumLocations -', error); }
            }

            async function fillFranchise() {
                try {
                    await waitForConditionPackage(() => tackUI.packageFranchiseField !== null);
                    if (tackUI.packageFranchiseField.textContent === none) {
                        await actionThenWaitForCondition(
                            () => {
                                tackUI.packageFranchiseField.click();
                            }, () => {
                                return tackUI.packageFranchiseOption !== null;
                            }
                        );

                        tackUI.packageFranchiseOption.click();
                        await waitForConditionPackage(() => tackUI.packageFranchiseField.textContent === franchiseValue);
                    }
                } catch (error) { console.error('CADEN LOG: fillFranchise -', error); }
            }

            async function fillPackage() {
                try {
                    await waitForConditionPackage(() => tackUI.packagePackageField !== null);
                    if (tackUI.packagePackageField.textContent !== packageValue) {
                        await actionThenWaitForCondition(
                            () => {
                                tackUI.packagePackageField.click();
                            }, () => {
                                return tackUI.packagePackageOption !== null;
                            }
                        );

                        tackUI.packagePackageOption.click();
                        await waitForConditionPackage(() => tackUI.packagePackageField.textContent === packageValue);
                    }



                    await waitForConditionPackage(() => tackUI.packagePackageLevelField !== null);
                    if (tackUI.packagePackageLevelField.textContent !== packageLevelvalue) {
                        await actionThenWaitForCondition(
                            () => {
                                tackUI.packagePackageLevelField.click();
                            }, () => {
                                return tackUI.packagePackageLevelOption !== null;
                            }
                        );

                        tackUI.packagePackageLevelOption.click();
                        await waitForConditionPackage(() => tackUI.packagePackageLevelField.textContent === packageLevelvalue);
                    }
                } catch (error) { console.error('CADEN LOG: fillPackage -', error); }
            }

            async function fillLeadType() {
                try {
                    await waitForConditionPackage(() => tackUI.packageLeadTypeField !== null);
                    if (tackUI.packageLeadTypeField.textContent === none) {
                        await actionThenWaitForCondition(
                            () => {
                                tackUI.packageLeadTypeField.click();
                            }, () => {
                                return tackUI.packageLeadTypeOption !== null;
                            }
                        );

                        tackUI.packageLeadTypeOption.click();
                        await waitForConditionPackage(() => tackUI.packageLeadTypeField.textContent === leadTypeValue);
                    }
                } catch (error) { console.error('CADEN LOG: fillLeadType -', error); }
            }

            async function fillLeadSource() {
                try {
                    await waitForConditionPackage(() => tackUI.packageLeadSourceField !== null);
                    if (tackUI.packageLeadSourceField.textContent === none) {
                        await actionThenWaitForCondition(
                            () => {
                                tackUI.packageLeadSourceField.click();
                            }, () => {
                                return tackUI.packageLeadSourceOption !== null;
                            }
                        );

                        tackUI.packageLeadSourceOption.click();
                        await waitForConditionPackage(() => tackUI.packageLeadSourceField.textContent === leadSourceValue);
                    }
                } catch (error) { console.error('CADEN LOG: fillLeadSource -', error); }
            }

            async function fillBatch() {
                try {
                    await waitForConditionPackage(() => tackUI.packageBatchField !== null);
                    if (tackUI.packageBatchField.value === '') {
                        tackUI.packageBatchField.value = batchValue;
                        tackUI.packageBatchField.dispatchEvent(inputtingEvent);
                        await waitForConditionPackage(() => tackUI.packageBatchField.value === batchValue);
                    }
                } catch (error) { console.error('CADEN LOG: fillBatch -', error); }
            }

            (async function saveOpp() {
                try {
                    await Promise.all([
                        editForm(),
                    ]);
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


                    await waitForConditionPackage(() => tackUI.packageSaveBtn !== null && tackUI.packageSaveBtn.disabled === false);
                    tackUI.packageSaveBtn.click();
                    window.sendToCustomOpportunity();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });

                } catch (error) {
                    console.error('CADEN LOG: saveOpp -', error);
                }
            })();
        };
        window.fill400Package = function () {

            // Constants __________
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

            var windowPath = window.location.pathname;
            var actionThenWaitForConditionPackage = createActionThenWaitForCondition(windowPath);
            var waitForConditionPackage = createWaitForCondition(windowPath);

            // Edit Opportunity _______
            async function editForm() {
                var editFormBtn = document.querySelector('[class="windowViewMode-maximized active lafPageHost"]')?.querySelector('[title=\"Edit Opportunity Name\"]');
                if (editFormBtn !== null) {
                    editFormBtn.click();
                    await waitForConditionPackage(() => tackUI.packageAmountField !== null);
                }
            }

            async function fillAmount() {
                await waitForConditionPackage(() => tackUI.packageAmountField !== null && tackUI.packageAmountField.value !== undefined);
                await actionThenWaitForConditionPackage(() =>
                    tackUI.packageAmountField.value.includes(paidAmount),
                    () => {
                        tackUI.packageAmountField.value = paidAmount;
                        tackUI.packageAmountField.dispatchEvent(inputtingEvent);
                    });
            }

            async function fillAmountPaidUpFront() {
                await waitForConditionPackage(() => tackUI.packageAmountPaidUpfrontField !== null && tackUI.packageAmountPaidUpfrontField.value !== undefined);
                await actionThenWaitForConditionPackage(() =>
                    tackUI.packageAmountPaidUpfrontField.value.includes(paidAmount),
                    () => {
                        tackUI.packageAmountPaidUpfrontField.value = paidAmount;
                        tackUI.packageAmountPaidUpfrontField.dispatchEvent(inputtingEvent);
                    });
            }

            async function fillPromoCredit() {
                await waitForConditionPackage(() => tackUI.packagePromoCreditField !== null && tackUI.packagePromoCreditField.value !== undefined);
                await actionThenWaitForConditionPackage(() =>
                    tackUI.packagePromoCreditField.value.includes(promoCredit),
                    () => {
                        tackUI.packagePromoCreditField.value = promoCredit;
                        tackUI.packagePromoCreditField.dispatchEvent(inputtingEvent);
                    });
            }

            async function fillType() {
                try {
                    await waitForConditionPackage(() => tackUI.packageTypeField !== null);
                    if (tackUI.packageTypeField.textContent === none) {
                        await actionThenWaitForCondition(
                            () => {
                                tackUI.packageTypeField.click();
                            }, () => {
                                return tackUI.packageTypeOption !== null;
                            }
                        );

                        tackUI.packageTypeOption.click();
                        await waitForConditionPackage(() => tackUI.packageTypeField.textContent === typeValue);
                    }
                } catch (error) { console.error('CADEN LOG: fillType -', error); }
            }

            async function fillNumEmployees() {
                try {
                    await waitForConditionPackage(() => tackUI.packageNumEmployeesField !== null);
                    if (tackUI.packageNumEmployeesField.textContent === none) {
                        await actionThenWaitForCondition(
                            () => {
                                tackUI.packageNumEmployeesField.click();
                            }, () => {
                                return tackUI.packageNumEmployeesOption !== null;
                            }
                        );

                        tackUI.packageNumEmployeesOption.click();
                        await waitForConditionPackage(() => tackUI.packageNumEmployeesField.textContent === numEmployeesValue);
                    }
                } catch (error) { console.error('CADEN LOG: fillNumEmployees -', error); }
            }

            async function fillNumLocations() {
                try {
                    await waitForConditionPackage(() => tackUI.packageNumLocationsField !== null);
                    if (tackUI.packageNumLocationsField.textContent === none) {
                        await actionThenWaitForCondition(
                            () => {
                                tackUI.packageNumLocationsField.click();
                            }, () => {
                                return tackUI.packageNumLocationsOption !== null;
                            }
                        );

                        tackUI.packageNumLocationsOption.click();
                        await waitForConditionPackage(() => tackUI.packageNumLocationsField.textContent === numLocationsValue);
                    }
                } catch (error) { console.error('CADEN LOG: fillNumLocations -', error); }
            }

            async function fillFranchise() {
                try {
                    await waitForConditionPackage(() => tackUI.packageFranchiseField !== null);
                    if (tackUI.packageFranchiseField.textContent === none) {
                        await actionThenWaitForCondition(
                            () => {
                                tackUI.packageFranchiseField.click();
                            }, () => {
                                return tackUI.packageFranchiseOption !== null;
                            }
                        );

                        tackUI.packageFranchiseOption.click();
                        await waitForConditionPackage(() => tackUI.packageFranchiseField.textContent === franchiseValue);
                    }
                } catch (error) { console.error('CADEN LOG: fillFranchise -', error); }
            }

            async function fillPackage() {
                try {
                    await waitForConditionPackage(() => tackUI.packagePackageField !== null);
                    if (tackUI.packagePackageField.textContent !== packageValue) {
                        await actionThenWaitForCondition(
                            () => {
                                tackUI.packagePackageField.click();
                            }, () => {
                                return tackUI.packagePackageOption !== null;
                            }
                        );

                        tackUI.packagePackageOption.click();
                        await waitForConditionPackage(() => tackUI.packagePackageField.textContent === packageValue);
                    }



                    await waitForConditionPackage(() => tackUI.packagePackageLevelField !== null);
                    if (tackUI.packagePackageLevelField.textContent !== packageLevelvalue) {
                        await actionThenWaitForCondition(
                            () => {
                                tackUI.packagePackageLevelField.click();
                            }, () => {
                                return tackUI.packagePackageLevelOption !== null;
                            }
                        );

                        tackUI.packagePackageLevelOption.click();
                        await waitForConditionPackage(() => tackUI.packagePackageLevelField.textContent === packageLevelvalue);
                    }
                } catch (error) { console.error('CADEN LOG: fillPackage -', error); }
            }

            async function fillLeadType() {
                try {
                    await waitForConditionPackage(() => tackUI.packageLeadTypeField !== null);
                    if (tackUI.packageLeadTypeField.textContent === none) {
                        await actionThenWaitForCondition(
                            () => {
                                tackUI.packageLeadTypeField.click();
                            }, () => {
                                return tackUI.packageLeadTypeOption !== null;
                            }
                        );

                        tackUI.packageLeadTypeOption.click();
                        await waitForConditionPackage(() => tackUI.packageLeadTypeField.textContent === leadTypeValue);
                    }
                } catch (error) { console.error('CADEN LOG: fillLeadType -', error); }
            }

            async function fillLeadSource() {
                try {
                    await waitForConditionPackage(() => tackUI.packageLeadSourceField !== null);
                    if (tackUI.packageLeadSourceField.textContent === none) {
                        await actionThenWaitForCondition(
                            () => {
                                tackUI.packageLeadSourceField.click();
                            }, () => {
                                return tackUI.packageLeadSourceOption !== null;
                            }
                        );

                        tackUI.packageLeadSourceOption.click();
                        await waitForConditionPackage(() => tackUI.packageLeadSourceField.textContent === leadSourceValue);
                    }
                } catch (error) { console.error('CADEN LOG: fillLeadSource -', error); }
            }

            async function fillBatch() {
                try {
                    await waitForConditionPackage(() => tackUI.packageBatchField !== null);
                    if (tackUI.packageBatchField.value === '') {
                        tackUI.packageBatchField.value = batchValue;
                        tackUI.packageBatchField.dispatchEvent(inputtingEvent);
                        await waitForConditionPackage(() => tackUI.packageBatchField.value === batchValue);
                    }
                } catch (error) { console.error('CADEN LOG: fillBatch -', error); }
            }

            (async function saveOpp() {
                try {
                    await Promise.all([
                        editForm(),
                    ]);
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


                    await waitForConditionPackage(() => tackUI.packageSaveBtn !== null && tackUI.packageSaveBtn.disabled === false);
                    tackUI.packageSaveBtn.click();
                    window.sendToCustomOpportunity();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });

                } catch (error) {
                    console.error('CADEN LOG: saveOpp -', error);
                }
            })();
        };


    };

    function logAfterNoMutations() {
        let timeout = null;
        const loadObserver = new MutationObserver(() => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                loadObserver.disconnect();
                setTimeout(() => {
                    window.salesforceFunctions();
                }, 1000);
            }, 1000);
        });

        loadObserver.observe(document, { childList: true, subtree: true, attributes: true, characterData: true });
    };

    logAfterNoMutations();

} else if (window.location.hostname == 'thumbtack.lightning.force.com' && window.self !== window.top) {
    console.log('CADEN LOG: Salesforce IFRAME Scripts run here');

    // event listener for messages from genesys
    window.addEventListener('message', function (event) { // Add event listener for messages from the parent window
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
    window.addEventListener('keydown', function (event) { // Add event listener for 'No Answer' disposition Keyboard shortcut
        try {
            if (event.key === '=') {
                window.parent.sendMessage();
            }
        } catch (error) {
            console.error('CADEN LOG: salesforce IFRAME evenetListener - =keyboardShortcut to run window.SendMessage -', error);
        }
    });
} else if (window.location.hostname === 'apps.usw2.pure.cloud') {
    window.setGenesysHeight = function (newHeight) {
        try {
            console.log('Caden Test -- setGenesysHeight started')
            const htmlElement = document.querySelector('html#purecloudHTML.lightning');
            const bodyElement = document.querySelector('body.call-control-count-11');
            const watermark = document.querySelector('div.watermark');


            htmlElement.style.minHeight = newHeight;
            htmlElement.style.height = newHeight;
            htmlElement.style.maxHeight = newHeight;

            bodyElement.style.minHeight = newHeight;
            bodyElement.style.height = newHeight;
            bodyElement.style.maxHeight = newHeight;

            watermark.style.maxHeight = 'calc(100% - 125px)';
            watermark.style.top = '90px';
            watermark.style.bottom = '35px';
        } catch (error) {
            console.error('Caden Test: setGenesysHeight -', error);
        }
    }
    window.parent.postMessage("cadenMessage set-phone-height", 'https://thumbtack.lightning.force.com');


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


    // event listener for keyboard shortcut
    window.addEventListener('keydown', function (event) { // Add event listener for 'No Answer' disposition Keyboard shortcut
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
    };

    // event listener for messages from genesys
    window.addEventListener('message', function (event) { // Add event listener for messages from the parent window
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
    window.addEventListener('keydown', function (event) { // Add event listener for 'No Answer' disposition Keyboard shortcut
        try {
            if (event.key === '=') {
                window.sendMessage();
            }
        } catch (error) {
            console.error('CADEN LOG: salesforce TOP evenetListener - =keyboardShortcut to run window.SendMessage -', error);
        }
    });

}
/* https://caden-humphrey.github.io/teamUserScript.js */
