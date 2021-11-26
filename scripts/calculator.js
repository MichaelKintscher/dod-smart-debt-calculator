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

    CalculateTotalDebt(yearsOwed, totalTuition, annualStipend, annualMisc, annualHealth) {

        return totalTuition + yearsOwed * (annualStipend + annualMisc + annualHealth);
    }
}