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

    // Add the new award instance to the awards list.
    awardsList.appendChild(awardFormInstance);
}