/*
 * =========================================================================
 *      Window OnLoad
 * =========================================================================
 */

window.onload = function () {

    // Add a single award info block.
    AddAwardInfoBlock();
}

/*
 * =========================================================================
 *      Event Handlers
 * =========================================================================
 */

function addAward_OnClick(e) {
    // Add a single award info block.
    AddAwardInfoBlock();
}

function addInternship_OnClick(e) {
    // Get the ID of the award to add the internship to.
    var awardId = Number(e.srcElement.id.replace("AddInternshipButton", ""));

    // Add a single internship info block.
    AddInternshipInfoBlock(awardId);
}

function smartAwardInfo_OnSubmit(e)
{
    // Initialize the variables.
    var allAwardData = new Array();
    var result = 0;

    // Based on code at: https://stackoverflow.com/questions/3350247/how-to-prevent-form-from-being-submitted
    e.preventDefault();

    // Determine how many awards currently exist.
    var awardsList = document.getElementById("AwardsList");
    var numOfAwards = awardsList.children.length;

    // For each award listed...
    for (var awardId = 0; awardId < numOfAwards; awardId++) {
        // Read the inputs.
        let awardInfo = new SMARTAwardInfo();
        try {
            awardInfo = ReadAwardData(e.target.elements, awardId);
        }
        catch (err) {
            throw new Error(err.message);
        }

        // Add the award to the award data array.
        allAwardData.push(awardInfo);
    }

    var calculator = new DebtCalculator();
    result = calculator.CalculateTotalDebt(allAwardData);


    //var testMessage = "Result: " + awardInfo.yearsOwed + ", " + awardInfo.totalTuition + ", " + awardInfo.annualStipend + ", " + awardInfo.annualMisc + ", " + awardInfo.annualHealth + ", " + result;
    alert("Total debt owed: " + result);

    return false;
}

/*
 * =========================================================================
 *      Helper Functions
 * =========================================================================
 */

function AddAwardInfoBlock() {
    // Get a reference to the parent to add the new blocks as children of.
    var awardsList = document.getElementById("AwardsList");

    // Get a reference to the template and make a copy.
    var awardFormTemplate = document.getElementById("AwardInfoFormTemplate");
    var awardFormInstance = document.importNode(awardFormTemplate.content, true);

    // Determine how many awards currently exist.
    awardCounter = awardsList.children.length;

    // Update the IDs to ensure unique form element names.
    //      The ID is equal to the number of awards prior to adding
    //      the new award. This ensures award numbers are zero-indexed.
    awardFormInstance.getElementById("awardTitle").innerHTML += (" " + awardCounter)
    awardFormInstance.querySelectorAll("input").forEach(function (input) { input.id += awardCounter });
    awardFormInstance.querySelectorAll("label").forEach(function (label) { label.htmlFor += awardCounter });
    awardFormInstance.getElementById("InternshipsList").id += awardCounter;

    // Note that the internships list is initially empty, so the above does
    //      not impact any of the internship elements.

    // Wire up the event listener.
    var button = awardFormInstance.getElementById("AddInternshipButton" + awardCounter);
    button.addEventListener(
        "click", addInternship_OnClick, false
    );

    // Add the new award instance to the awards list.
    awardsList.appendChild(awardFormInstance);
}

function AddInternshipInfoBlock(awardId) {
    // Get a reference to the parent to add the new blocks as children of.
    var internshipsList = document.getElementById("InternshipsList" + awardId);

    // Get a reference to the template and make a copy.
    var internshipFormTemplate = document.getElementById("InternshipInfoFormTemplate");
    var internshipFormInstance = document.importNode(internshipFormTemplate.content, true);

    // Determine how many awards currently exist for the award.
    internshipCounter = internshipsList.children.length;

    // Update the IDs to ensure unique form element names.
    //      The ID is equal to the number of awards prior to adding
    //      the new award. This ensures award numbers are zero-indexed.
    internshipFormInstance.getElementById("internshipTitle").innerHTML += (" " + awardId + "-" + internshipCounter)
    internshipFormInstance.querySelectorAll("input").forEach(function (input) { input.id += awardId + "-" + internshipCounter });
    internshipFormInstance.querySelectorAll("label").forEach(function (label) { label.htmlFor += awardId + "-" + internshipCounter });

    // Add the new internship instance to the internships list.
    internshipsList.appendChild(internshipFormInstance);
}

function ReadAwardData(formElements, awardId) {

    // Initialize the variables.
    let awardInfo = new SMARTAwardInfo();

    // Read the inputs.
    awardInfo.yearsOwed = parseFloat(formElements.namedItem("YearsOwedInput" + awardId).value);
    awardInfo.totalTuition = parseFloat(formElements.namedItem("TotalTuitionInput" + awardId).value);
    awardInfo.annualStipend = parseFloat(formElements.namedItem("AnnualStipendInput" + awardId).value);
    awardInfo.annualMisc = parseFloat(formElements.namedItem("AnnualMiscAllowanceInput" + awardId).value);
    awardInfo.annualHealth = parseFloat(formElements.namedItem("AnnualHealthInsuranceInput" + awardId).value);

    // Determine how many internships currently exist.
    var internshipsList = document.getElementById("InternshipsList" + awardId);
    var numOfInternships = internshipsList.children.length;

    // For each internship listed...
    for (var internshipId = 0; internshipId < numOfInternships; internshipId++) {
        // Read the inputs.
        let internshipInfo = new SMARTInternshipInfo();
        try {
            internshipInfo = ReadInternshipData(formElements, awardId, internshipId);
        }
        catch (err) {
            throw new Error(err.message);
        }

        // Add the internship to the internship data array.
        awardInfo.internships.push(internshipInfo);
    }

    // Return the award info object.
    return awardInfo;
}

function ReadInternshipData(formElements, awardId, internshipId) {

    // Initialize the variable.
    let internshipInfo = new SMARTInternshipInfo();

    // Read the inputs.
    internshipInfo.year = parseFloat(formElements.namedItem("InternshipYearInput" + awardId + "-" + internshipId).value);
    internshipInfo.numWeeks = parseFloat(formElements.namedItem("InternshipNumWeeksInput" + awardId + "-" + internshipId).value);
    internshipInfo.supportPayment = parseFloat(formElements.namedItem("InternshipSupportPaymentInput" + awardId + "-" + internshipId).value);

    // Return the internship info object.
    return internshipInfo;
}