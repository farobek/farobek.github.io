//Applies interest to the given amount. The interest should be in decimal form
function applyInterest(amount, interest){
    
    var newAmount = amount * interest;
    return amount + newAmount;
    
}

//Applies annual compound interest for the given number of years
function computeFutureAmount(amount, interest, years){
    
    if (years == 0){
        return amount;
    }
    
    var futureAmount = amount;
    
    for (var i = 0; i < years; i++){
        futureAmount = applyInterest(futureAmount, interest);
    }
    
    return futureAmount;
}

//Returns an array of future amounts
function getFutureAmountGrowth(amount, interest, years){
    
    if (years == 0){
        return [amount];
    }
    
    var futureAmounts = [];
    
    futureAmounts.push(applyInterest(amount, interest));
    
    
    for (var i = 1; i < years; i++){
        futureAmounts.push(applyInterest(futureAmounts[i - 1], interest));
    }
    
    return futureAmounts;
    
}

//Returns the number of years needed for the given amount to reach the target amount given an annual compound interest rate - maximum year given is 100
function getTargetAmountGrowthYears(amount, interest, targetAmount){
    
    //If the target amount is equal to or below the initial amount
    if (targetAmount <= amount){
        return 0;
    }
    
    var nextYearAmount = amount;
    
    var maximumYearsAllowed = 101;
    
    for (var i = 1; i < maximumYearsAllowed; i++){
        
        nextYearAmount = computeFutureAmount(amount, interest, i);
        
        if (nextYearAmount >= targetAmount){
            return i;
        }
    }
    
    return null;
}

//Returns the number of years needed for the accumulated interest amount to reach the target amount given an annual compound interest rate - maximum year given is 100
function getTargetAccummulatedInterestAmountGrowthYears(amount, interest, targetAmount){
    
    //We do the first year outside the loop
    
    var futureAmount = computeFutureAmount(amount, interest, 1);
    
    var accumulatedInterest = futureAmount - amount;
    
    console.log("Accummulated interest: " + accumulatedInterest);
    
    if (accumulatedInterest >= targetAmount){
        
        return 1;
    }
    
    var maximumYearsAllowed = 101;
    
    for (var i = 2; i < maximumYearsAllowed; i++){
        
        futureAmount = computeFutureAmount(futureAmount, interest, 1);
        
        accumulatedInterest = futureAmount - amount;
        
        console.log("Accummulated interest: " + accumulatedInterest);
        
        if (accumulatedInterest >= targetAmount){
            return i;
        }
    }
    
    return null;
}
