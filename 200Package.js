(function () {

// Constants _________________________________________________________________________________________________________________________________
var paidAmount = '200';
var promoCredit = '0';
var none = '--None--';
var typeValue = 'Net New';
var numEmployeesValue = '1-14 employees';
var numLocationsValue = '1-4';
var franchiseValue = 'No';
var packageValue = 'One-Time';
var packageLevelvalue = 'Pay 200 get 200';
var leadTypeValue = 'Inbound Sales';
var leadSourceValue = 'Recent Signup';
var batchValue = 'none';

// Function to get the elements _______________________________________________________________________________________________________________
function variables() {
return {

    oppName: document.querySelector('.windowViewMode-maximized.active').querySelector('[name=\"Name\"]'),
    amountField: document.querySelector('.windowViewMode-maximized.active').querySelector('[name=\"Amount\"]'),
    amountPaidUpfrontField: document.querySelector('.windowViewMode-maximized.active').querySelector('[name=\"AmountPaidUpfront__c\"]'),
    promoCreditField: document.querySelector('.windowViewMode-maximized.active').querySelector('[name=\"PromotionalCredit__c\"]'),
    typeField: document.querySelector('.windowViewMode-maximized.active').querySelector('[field-label=\"Type\"] button span'),
    typeOption: document.querySelector('.windowViewMode-maximized.active').querySelector('[field-label=\"Type\"] [title=\"' + typeValue + '\"]'),
    numEmployeesField: document.querySelector('.windowViewMode-maximized.active').querySelector('[field-label=\"Number of Employees\"] button span'),
    numEmployeesOption: document.querySelector('.windowViewMode-maximized.active').querySelector('[field-label=\"Number of Employees\"] [title=\"' + numEmployeesValue + '\"]'),
    numLocationsField: document.querySelector('.windowViewMode-maximized.active').querySelector('[field-label=\"Number of Locations\"] button span'),
    numLocationsOption: document.querySelector('.windowViewMode-maximized.active').querySelector('[field-label=\"Number of Locations\"] [title=\"' + numLocationsValue + '\"]'),
    franchiseField: document.querySelector('.windowViewMode-maximized.active').querySelector('[field-label=\"Is Part of a Franchise?\"] button span'),
    franchiseOption: document.querySelector('.windowViewMode-maximized.active').querySelector('[field-label=\"Is Part of a Franchise?\"] [title=\"' + franchiseValue + '\"]'),
    packageField: document.querySelector('.windowViewMode-maximized.active').querySelector('[field-label=\"Package\"] button span'),
    packageOption: document.querySelector('.windowViewMode-maximized.active').querySelector('[field-label=\"Package\"] [title=\"' + packageValue + '\"]'),
    packageLevelField: document.querySelector('.windowViewMode-maximized.active').querySelector('[field-label=\"Package Level\"] button span'),  
    packageLevelOption: document.querySelector('.windowViewMode-maximized.active').querySelector('[field-label=\"Package Level\"] [title=\"' + packageLevelvalue + '\"]'),
    leadTypeField: document.querySelector('.windowViewMode-maximized.active').querySelector('[field-label=\"Lead Type\"] button span'),
    leadTypeOption: document.querySelector('.windowViewMode-maximized.active').querySelector('[field-label=\"Lead Type\"] [title=\"' + leadTypeValue + '\"]'),
    leadSourceField: document.querySelector('.windowViewMode-maximized.active').querySelector('[field-label=\"Lead Source\"] button span'),
    leadSourceOption: document.querySelector('.windowViewMode-maximized.active').querySelector('[field-label=\"Lead Source\"] [title=\"' + leadSourceValue + '\"]'),
    batchField: document.querySelector('.windowViewMode-maximized.active').querySelector('[name=\"Batch__c\"]'),
    saveBtn: document.querySelector('.windowViewMode-maximized.active').querySelector('[name=\"SaveEdit\"]')
};}

function waitForCondition(conditionFunction, interval = 5, maxAttempts = 500) {let attempts = 0;return new Promise((resolve, reject) => {const checkCondition = () => {if (conditionFunction()) {console.log('Condition met.');resolve();} else if (attempts < maxAttempts) {attempts++;setTimeout(checkCondition, interval);} else {console.log('Condition not met within the specified time');reject(new Error('Condition not met within the specified time'));}};checkCondition();});}
function actionThenWaitForCondition(actionFunction, conditionFunction, interval = 5, maxAttempts = 500) {let attempts = 0;return new Promise((resolve, reject) => {const checkCondition = () => {actionFunction();if (conditionFunction()) {console.log('Condition met.');resolve();} else if (attempts < maxAttempts) {attempts++;setTimeout(checkCondition, interval);} else {console.log('Condition not met within the specified time');reject(new Error('Condition not met within the specified time'));}};checkCondition();});}
function tab() {var focusableElements = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])');focusableElements = Array.prototype.slice.call(focusableElements);var currentFocus = document.activeElement;var currentIndex = focusableElements.indexOf(currentFocus);if (currentIndex < focusableElements.length - 1) {focusableElements[currentIndex + 1].focus();}} 
var elements = new Proxy({}, {get: function(target, name) {return variables()[name];}});
var inputEvent = new Event('input', {bubbles: true,cancelable: true,});


// Main function__________________________________________________________________________________________________________________________________
(async function () {

    var editAmountBtn = document.querySelector('.windowViewMode-maximized.active').querySelector('[title=\"Edit Amount\"]');

// Edit Opportunity ______________________________________________________________________________________________________________________________
if (editAmountBtn !== null) {    
    editAmountBtn.click();
    await waitForCondition(() => elements.amountField !== null);
}


// Amount ________________________________________________________________________________________________________________________________________
    await waitForCondition(() => elements.amountField !== null);
if (elements.amountField.value !== paidAmount) {
    await actionThenWaitForCondition( 
        () => {
                    elements.amountField.focus();
        },() => {
        return      document.activeElement === elements.amountField; // check condition
        } 
    );
    elements.amountField.value = paidAmount;
    elements.amountField.dispatchEvent(inputEvent);
    await waitForCondition(() => elements.amountField.value === paidAmount);
}



// Amount Paid Upfront ____________________________________________________________________________________________________________________________
await waitForCondition(() => elements.amountPaidUpfrontField !== null);

if (elements.amountPaidUpfrontField.value !== paidAmount) {
    await actionThenWaitForCondition( 
        () => {
                    elements.amountPaidUpfrontField.focus();
        },() => {
        return      document.activeElement === elements.amountPaidUpfrontField; // check condition
        } 
    );
    elements.amountPaidUpfrontField.value = paidAmount;
    elements.amountPaidUpfrontField.dispatchEvent(inputEvent);
    await waitForCondition(() => elements.amountPaidUpfrontField.value === paidAmount);
}



// Promo Credit ___________________________________________________________________________________________________________________________________
await waitForCondition(() => elements.promoCreditField !== null);


if (elements.promoCreditField.value !== promoCredit) {
    await actionThenWaitForCondition( 
        () => {
                    elements.promoCreditField.focus();
        },() => {
        return      document.activeElement === elements.promoCreditField; // check condition
        } 
    );
    elements.promoCreditField.value = promoCredit;
    elements.promoCreditField.dispatchEvent(inputEvent);
    await waitForCondition(() => elements.promoCreditField.value === promoCredit);
}

// Type (ie. Net New) _______________________________________________________________________________________________________________________________
    await waitForCondition(() => elements.typeField !== null);
    if (elements.typeField.textContent === none) {
        await actionThenWaitForCondition( 
            () => {
                        elements.typeField.click();
            },() => {
            return      elements.typeOption !== null; // check condition
            } 
        );

        elements.typeOption.click();
        await waitForCondition(() => elements.typeField.textContent === typeValue);
    }

// Number of Employees ________________________________________________________________________________________________________________________________
    await waitForCondition(() => elements.numEmployeesField !== null);
    if (elements.numEmployeesField.textContent === none) {
        await actionThenWaitForCondition( 
            () => {
                        elements.numEmployeesField.click();
            },() => {
            return      elements.numEmployeesOption !== null; // check condition
            } 
        );

        elements.numEmployeesOption.click();
        await waitForCondition(() => elements.numEmployeesField.textContent === numEmployeesValue);
    }

// Number of Locations ___________________________________________________________________________________________________________________________________
    await waitForCondition(() => elements.numLocationsField !== null);
    if (elements.numLocationsField.textContent === none) {
        await actionThenWaitForCondition( 
            () => {
                        elements.numLocationsField.click();
            },() => {
            return      elements.numLocationsOption !== null; // check condition
            } 
        );

        elements.numLocationsOption.click();
        await waitForCondition(() => elements.numLocationsField.textContent === numLocationsValue);
    }

// Franchise (ie. No) ______________________________________________________________________________________________________________________________________
    await waitForCondition(() => elements.franchiseField !== null);
    if (elements.franchiseField.textContent === none) {
        await actionThenWaitForCondition( 
            () => {
                        elements.franchiseField.click();
            },() => {
            return      elements.franchiseOption !== null; // check condition
            } 
        );

        elements.franchiseOption.click();
        await waitForCondition(() => elements.franchiseField.textContent === franchiseValue);
    }



// Package (ie. One-Time) ____________________________________________________________________________________________________________________________________
    await waitForCondition(() => elements.packageField !== null);
    if (elements.packageField.textContent !== packageValue) {
        await actionThenWaitForCondition( 
            () => {
                        elements.packageField.click();
            },() => {
            return      elements.packageOption !== null; // check condition
            } 
        );

        elements.packageOption.click();
        await waitForCondition(() => elements.packageField.textContent === packageValue);
/*
        tab();
        await waitForCondition(() => elements.packageLevelField !== null);
*/
    }



// Package Level (ie. Pay XXX get XXX) _________________________________________________________________________________________________________________________
    await waitForCondition(() => elements.packageLevelField !== null);
    if (elements.packageLevelField.textContent !== packageLevelvalue) {
        await actionThenWaitForCondition( 
            () => {
                        elements.packageLevelField.click();
            },() => {
            return      elements.packageLevelOption !== null; // check condition
            } 
        );

        elements.packageLevelOption.click();
        await waitForCondition(() => elements.packageLevelField.textContent === packageLevelvalue);
    }



// Lead Type (ie. Inbound Sales) __________________________________________________________________________________________________________________________________
    await waitForCondition(() => elements.leadTypeField !== null);
    if (elements.leadTypeField.textContent === none) {
        await actionThenWaitForCondition( 
            () => {
                        elements.leadTypeField.click();
            },() => {
            return      elements.leadTypeOption !== null; // check condition
            } 
        );

        elements.leadTypeOption.click();
        await waitForCondition(() => elements.leadTypeField.textContent === leadTypeValue);
    }

// Lead Source (ie. Recent Signup) _________________________________________________________________________________________________________________________________
    await waitForCondition(() => elements.leadSourceField !== null);
    if (elements.leadSourceField.textContent === none) {
        await actionThenWaitForCondition( 
            () => {
                        elements.leadSourceField.click();
            },() => {
            return      elements.leadSourceOption !== null; // check condition
            } 
        );

        elements.leadSourceOption.click();
        await waitForCondition(() => elements.leadSourceField.textContent === leadSourceValue);
    }

// Batch _____________________________________________________________________________________________________________________________________________________________
    await waitForCondition(() => elements.batchField !== null);
    if (elements.batchField.value === '') {
        await actionThenWaitForCondition( 
            () => {
                        elements.batchField.focus();
            },() => {
            return      document.activeElement === elements.batchField; // check condition
            } 
        );

        elements.batchField.value = batchValue;
        elements.batchField.dispatchEvent(inputEvent);
        await waitForCondition(() => elements.batchField.value === batchValue);
    }


// Save _______________________________________________________________________________________________________________________________________________________________
    elements.saveBtn.click();

console.log('Package applied successfully!');

})();
})();
