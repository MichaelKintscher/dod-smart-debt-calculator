// Contains methods for debt calculations.
class DebtCalculator {

    // Gets the amount of debt accrued at a given point in time.
    //      p - the principle
    //      r - the interest rate (APR, should be in decimal format - i.e. 5% is 0.05)
    //      n - the number of compounding periods per year (4 for quarterly, 12 for monthly, etc)
    //      t - the amound of time (in years) since the principle was issued
    GetAccruedDebt(p, r, n, t) {

        // Compound interest formula.
        return p * Math.pow(1 + (r / n), n * t);
    }

    CalculateTotalDebt(awardInfoArray) {

        // Initialize the total debt to zero.
        var totalDebt = 0;

        // Sum up the debt of each award.
        for (var i = 0; i < awardInfoArray.length; i++)
        {
            totalDebt += this.CalculateAwardDebt(awardInfoArray[i]);
        }

        return totalDebt;
    }

    CalculateAwardDebt(awardInfo) {

        return awardInfo.totalTuition + awardInfo.yearsOwed * (awardInfo.annualStipend + awardInfo.annualMisc + awardInfo.annualHealth);
    }
}

// Contains info for award debt calculations.
class SMARTAwardInfo {
    constructor() {
        this.yearsOwed = 0;
        this.totalTuition = 0;
        this.annualStipend = 0;
        this.annualMisc = 0;
        this.annualHealth = 0;
    }
}