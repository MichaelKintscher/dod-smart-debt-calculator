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
    var yearsOwed = 0;
    var totalTuition = 0;
    var annualStipend = 0;
    var annualMisc = 0;
    var annualHealth = 0;

    var result = 0;

    // Based on code at: https://stackoverflow.com/questions/3350247/how-to-prevent-form-from-being-submitted
    e.preventDefault();

    try
    {
        // Read the inputs.
        yearsOwed = parseFloat(e.target.elements.YearsOwedInput.value);
        totalTuition = parseFloat(e.target.elements.TotalTuitionInput.value);
        annualStipend = parseFloat(e.target.elements.AnnualStipendInput.value);
        annualMisc = parseFloat(e.target.elements.AnnualMiscAllowanceInput.value);
        annualHealth = parseFloat(e.target.elements.AnnualHealthInsuranceInput.value);

        var calculator = new DebtCalculator();
        result = calculator.CalculateTotalDebt(yearsOwed, totalTuition, annualStipend, annualMisc, annualHealth);
    }
    catch (e)
    {
        throw new Error(e.message);
    }

    var testMessage = "Result: " + yearsOwed + ", " + totalTuition + ", " + annualStipend + ", " + annualMisc + ", " + annualHealth + ", " + result;
    alert(testMessage);

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