$(document).ready(function(){
    
    //Events related to the main content area
    
    $(document).on("keyup", "input.main-content", function(){
        
        //Check what form the user is in
        var selectedForm = getSelectedForm();
        
        if ($(selectedForm).hasClass("future-amount-form")){
            updateFutureAmountFields(selectedForm)
        }
        
        else if ($(selectedForm).hasClass("growth-target-form")){
            updateGrowthTargetFields(selectedForm);
        }
                        
        var processingOutcome = processInputFieldData(selectedForm);
        
        if (processingOutcome == -1){
            return;
        }
        
        //Displaying the visualisation
        
        if ($(selectedForm).hasClass("future-amount-form")){
            
            var initialAmount = parseFloat($(selectedForm).find("input.initial-amount").val());
            var interestRate = parseFloat($(selectedForm).find("input.interest").val());
            var years = parseInt($(selectedForm).find("input.years").val());
            
            var visualisationElementClassname = "visualisation-display";
            
            var visualisationContainerClassName = "visualisation-container"
            
            var growth = getFutureAmountGrowth(initialAmount, interestRate, years);
            
            displayVisualisation($(".visualisation-textboxset"), growth, visualisationElementClassname, visualisationContainerClassName);
        }
                
    });
    
    $(document).on("click", "input.main-content", function(){
        
        //Check what form the user is in
        var selectedForm = getSelectedForm();
        
        if ($(selectedForm).hasClass("future-amount-form")){
            updateFutureAmountFields(selectedForm);
        }
        
        else if ($(selectedForm).hasClass("growth-target-form")){
            updateGrowthTargetFields(selectedForm);
        }
                        
        var processingOutcome = processInputFieldData(selectedForm);
        
        if (processingOutcome == -1){
            return;
        }
        
        if ($(selectedForm).hasClass("future-amount-form")){
            
            var initialAmount = parseFloat($(selectedForm).find("input.initial-amount").val());
            var interestRate = parseFloat($(selectedForm).find("input.interest").val());
            var years = parseInt($(selectedForm).find("input.years").val());
            
            var visualisationElementClassname = "visualisation-display";
            
            var visualisationContainerClassName = "visualisation-container";
            
            var growth = getFutureAmountGrowth(initialAmount, interestRate, years);
            
            displayVisualisation($(".visualisation-textboxset"), growth, visualisationElementClassname, visualisationContainerClassName);
        }
        
    });
    
    $(".form-choice").on("change", function(){
        
        //Toggles visibility of the two forms and the visualisation
        var toggleFutureAmountFormVisibility = $(".future-amount-form").css("display") == "block" ? "none" : "block";
        var toggleGrowthFormVisibility = $(".growth-target-form").css("display") == "block" ? "none" : "block";
        var toggleGrowthVisualisationVisibility = $(".visualisation-container").css("display") == "block" ? "none" : "block";
            
        $(".growth-target-form").css("display", toggleGrowthFormVisibility);
        $(".future-amount-form").css("display", toggleFutureAmountFormVisibility);
        $(".visualisation-container").css("display", toggleGrowthVisualisationVisibility);
        
    });
    
    //Events related to the visualisation
    
    $(document).on("keyup", "input.vis-unit", function() {
        
        if ($(this).nextAll().length == 0){
            return;
        }
        
        $(this).nextAll().css("background-color", "#bcd4e6");
        
        //Take the value of the edited field as the initial amount
        var initialAmout = parseInt($(this).val());
        
        var interestRate = parseFloat($(".future-amount-form").find("input.interest").val());
        
        //The years are the number of right siblings
        var years = $(this).nextAll().length;
        
        var futureAmounts = getFutureAmountGrowth(initialAmout, interestRate, years);
        
        if (futureAmounts == null || futureAmounts.length == 0){
            return;
        }
        
        //Apply the future amounts to the right siblings
        $.each($(this).nextAll(), function(index, sibiling){
            $(sibiling).val(futureAmounts[index]);
        });
        
        var metadata = {
            class: "visualisation-display",
            containerClass: "visualisation-container"
        };
        
        var fullAmountsList = [];
        
        var textboxes = $("input.vis-unit");
        
        if (textboxes == null || textboxes.length == 0){
            return;
        }
        
        //Collect the future amount values from the textboxes
        $.each(textboxes, function(index, textbox){
            
            fullAmountsList.push($(textbox).val());
        });
                
        displayBars(fullAmountsList, metadata);
          
    });
    
    
    
});

//Uses the state of the radio buttons to return the selected form
function getSelectedForm(){
    
    //Check what form the user is in
    var selectedRadioValue = $('input[name=form-choice]:checked').val();
                
    //Future amount form selected
    if (selectedRadioValue == 0){

        return $(".future-amount-form");
    }

    else if (selectedRadioValue == 1) {

        return $(".growth-target-form");

    }
    
    return;
}

function allFutureAmountFieldsFilled(form){
    
    if (form == null){
        console.log("No form passed.")
        return;
    }
    
    //check if field for initial amount is filled
    var initialAmount = $(form).find("input.initial-amount").val();
    
    //check if field for interest rate is filled
    var interestRate = $(form).find("input.interest").val();
    
    //check if field for interest rate is filled
    var years = $(form).find("input.years").val();
        
    if (initialAmount.length && interestRate.length && years.length){
        return true;
    }
    
    return false;
    
}

function allGrowthTargetFieldsFilled(form){
    
    if (form == null){
        console.log("No form passed.")
        return;
    }
    
    //check if field for initial amount is filled
    var initialAmount = $(form).find("input.initial-amount").val();
    
    //check if field for interest rate is filled
    var interestRate = $(form).find("input.interest").val();
    
    //check if field for target amount is filled
    var targetAmount = $(form).find("input.target-amount").val();
        
    if (initialAmount.length && interestRate.length && targetAmount.length){
        return true;
    }
    
    return false;
}

//Blurring the field makes whatever the user just typed get passed to the value property
function updateFutureAmountFields(form){
            
    if (form == null){
        console.log("No form passed");
        return;
    }
    
    if ($(form).find("input.initial-amount").is(":focus")){
        $(form).find("input.initial-amount").blur();
        $(form).find("input.initial-amount").focus();
    }
    
    else if ($(form).find("input.interest").is(":focus")){
        $(form).find("input.interest").blur();
        $(form).find("input.interest").focus();
    }
    
    if ($(form).find("input.years").is(":focus")){
        $(form).find("input.years").blur();
        $(form).find("input.years").focus();
    }
}

//Blurring the field makes whatever the user just typed get passed to the value property
function updateGrowthTargetFields(form){
    if (form == null){
        console.log("No form passed");
        return;
    }
    
     if ($(form).find("input.initial-amount").is(":focus")){
        $(form).find("input.initial-amount").blur();
        $(form).find("input.initial-amount").focus();
    }
    
    else if ($(form).find("input.interest").is(":focus")){
        $(form).find("input.interest").blur();
        $(form).find("input.interest").focus();
    }
    
    if ($(form).find("input.target-amount").is(":focus")){
        $(form).find("input.target-amount").blur();
        $(form).find("input.target-amount").focus();
    }
}

function futureAmountFormIsValid(form){
    
    if (form == null){
        console.log("No form passed");
        return;
    }
    
    //Parse the interest rate value
    var interestRate = $(form).find("input.interest").val();
    
    var interestRateParsed = parseFloat(interestRate);
    
    if (isNaN(interestRateParsed)){
        return false;
    }
    
    var initialAmount = $(form).find("input.initial-amount").val();
        
    var years = $(form).find("input.years").val();
    
    if (initialAmount.length > 0 && years.length > 0){
        return true;
    }
    
    return false;
}

function growthTargetFormIsValid(form){
    
    if (form == null){
        console.log("No form passed");
        return;
    }
    
    //Parse the interest rate value
    var interestRate = $(form).find("input.interest").val();
    
    var interestRateParsed = parseFloat(interestRate);
    
    if (isNaN(interestRateParsed)){
        return false;
    }
    
    var initialAmount = $(form).find("input.initial-amount").val();
        
    var targetAmount = $(form).find("input.target-amount").val();
    
    if (parseInt(initialAmount) > 0 && targetAmount.length > 0){
        return true;
    }
    
    return false;
}

function processInputFieldData(form) {
    
    if (form == null) {
        return -1;
    }
    
    var isFutureAmountForm = $(form).hasClass("future-amount-form");
    var isGrowthTargetAmount = $(form).hasClass("growth-target-form");
    
    if (isFutureAmountForm){
        //Check if all the input fields for future amount calculation are filled out
        var parametersGiven = allFutureAmountFieldsFilled(form);

        if (parametersGiven) {
            var validityChecksPassed = futureAmountFormIsValid(form);
            
            if (!validityChecksPassed){
                return -1;
            }

            var initialAmount = $(form).find("input.initial-amount").val();

            var interestRate = $(form).find("input.interest").val();

            var years = $(form).find("input.years").val();

            var futureAmount = computeFutureAmount(parseInt(initialAmount), parseFloat(interestRate), parseInt(years));

            $(form).find(".future-amount").text(futureAmount);
        }
        
        //If not all the fields are filled out
        else{
            return -1;
        }
    }
    
       
    else if (isGrowthTargetAmount) {
        //Check if all the input fields for growth target calculation are filled out
        var parametersGiven = allGrowthTargetFieldsFilled(form);

        if (parametersGiven){
            var validityChecksPassed = growthTargetFormIsValid(form);
            
            if (!validityChecksPassed){
                return -1;
            }

            var initialAmount = $(form).find("input.initial-amount").val();

            var interestRate = $(form).find("input.interest").val();

            var targetAmount = $(form).find("input.target-amount").val();

            var futureAmount = getTargetAmountGrowthYears(parseInt(initialAmount), parseFloat(interestRate), parseInt(targetAmount));

            $(form).find(".target-amount-output").text(futureAmount);
        }
        
        //If not all the fields are filled out
        else {
            return -1;
        }
    }
    
}