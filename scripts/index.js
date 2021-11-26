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
    var awardsList = document.getElementById("AwardsList");

    var awardFormTemplate = document.getElementById("AwardInfoFormTemplate");

    // Update the IDs to ensure unique form element names.

    var awardFormInstance = document.importNode(awardFormTemplate.content, true);

    awardsList.appendChild(awardFormInstance);
}