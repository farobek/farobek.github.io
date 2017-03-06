$(document).ready(function(){
    
    function toggleTechIconsVisibility(){
        $(".technologies .icons-container").toggleClass("hidden");
    }
    
    $(".technologies .hoverable").on("mouseover", toggleTechIconsVisibility);
    
    $(".technologies .hoverable").on("mouseleave", toggleTechIconsVisibility);
    
});