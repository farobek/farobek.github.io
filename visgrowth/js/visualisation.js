function displayVisualisation(textboSetContainer, valueList, graphicsContainerClass, visualisationContainerClass){
    if (textboSetContainer == null){
        console.log("No container passed.");
        return;
    }
        
    displayTextboxSet(textboSetContainer, valueList);
    
    var metadata = {
        class: graphicsContainerClass,
        containerClass: visualisationContainerClass
    };
    
    displayBars(valueList, metadata);
}

//Displays a set of editable boxes
function displayTextboxSet(container, valueList){
    if (container == null){
        console.log("No container passed.");
        return;
    }
        
    //Check if the container has the 10 textboxes
    var textboxes = $(container).children(".vis-unit");
    
    //If there are existing textboxes, we remove them
    if (textboxes.length > 0){
        
        $(container).empty();
    }
    
    //Create 10 textboxes each storing a value and append them to the container
    $.each(valueList, function(index, item){
        
        var textboxMarkup = "<input value='" + item + "'class='vis-unit text'></input>";
        
        $(container).append(textboxMarkup);
        
    });
    
}

//Displays a bar chart
function displayBars(data, metadata){
    
    if (data.length == 0){
        console.log("No data passed.");
        return;
    }
    
    //Remove and append new canvas
    $("." + metadata.class).remove();
    
    var containerClass = metadata.containerClass == null ? ".visualisation-container" : "." + metadata.containerClass;
    
    var defaultHeight = 700;
    
    var defaultWidth = "95%";
    
    $(containerClass).append("<canvas class='" + metadata.class + "'></canvas>");
            
    var context = $("." + metadata.class)[0].getContext("2d");
            
    var chart = new Chart(context, {
        type: "bar",        
                        
        data: {
            
            labels: data,
            
            datasets: [{
                
                label: "money",
                
                data: data,
                
                backgroundColor: "#009ACD"
            }]
        }
    });
    
    $("." + metadata.class).width(defaultWidth);
    
    $(containerClass).width(defaultWidth);
    $(containerClass).height(defaultHeight);
        
}