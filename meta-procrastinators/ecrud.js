//Manages the e-CRUD (i.e. pushing and loading data) operations of the web application
angular.module("MetProc").controller("ecrud", function($scope, datastore){
    $scope.sendtoken = function(tokenvalue){
        datastore.injectToken(tokenvalue);
        $scope.tok = datastore.getToken();
    }
    
    
     //login - Only needs to be done once
    var client = new Usergrid.Client({
    orgName:"Farobek",
    appName:"sandbox"
	});
    
    
    
    
    $scope.tok = datastore.getToken();
    var tok = $scope.tok;
    $scope.lista = datastore.seeAll();
    $scope.result = "Send your data";
    
    //Data Pushing - first deletion step and then data pushing
    $scope.pushit = function(){
        
        ///deleting outdated list on the cloud before pushing new list
        var deldata = datastore.getStrip();
        var querystring = "token=" + tok; 
        var options = {endpoint: "lists", method: "DELETE" ,qs:{ql: querystring}} //using a string variable frees me from hardcoding data into the query

        client.request(options, function(error,result){
            
            if(error){
                 $scope.result = "Error while deleted the outdated list!";
            }else{
                $scope.result = "Success while deleting outdated list!";
            }
        
        });
        
        
 /// Pushing the data - First we prepare the data and then we send it
    var datalist = $scope.lista;
        
    //preparing data
    //It creates an APIGEE entity for each task    
    var itemtoken = datastore.getItemToken();
    for(var i = 0; i< datalist.length;++i){
        
       options = {type: datalist[i].type, description: datalist[i].description, token: itemtoken, position: datalist[i].position.toString(), nature : datalist[i].nature};
        
    ////sending process
    client.createEntity(options, function(error, list){
        if(error) {
            //error saving book
            $scope.result = "Error while uploading the list!";
        } else {
            $scope.result = "The list was uploaded successfully.";
        }
    }); 
   }
    
    };
    
    //Loading the data
    //I use the token to identify all the tasks related to the same session
        $scope.loadit = function(){
        var natureval = datastore.getToken();
        $scope.tok = natureval;
        var querystring = "token=" + natureval;
        var options = {endpoint: "lists", qs:{ql: querystring}};
        
        //getting the data
        client.request(options, function (error, result) {
            if (error) {
	        //error — GET request failed
                $scope.data = "Error!";
            } else {
	    //success
        var rawdata = [];
    
        for(var i = 0; i < result.entities.length; ++i){
            var position = result.entities[i].position;
            var type = result.entities[i].type;
            var nature = result.entities[i].nature;
            var description = result.entities[i].description;
            rawdata.push({position, description, type, nature});   
        }
        
    
        //removes the metadata
        for(var i = 0; i < rawdata.length; i++){
            delete rawdata[i].metadata;
        }
    
    var tasklistsize = datastore.seeAll().length;
    var difference = rawdata.length - tasklistsize;
    var dummy = "I am a dummy";
    
    //adds dummy tasks to make space if the tasklist loaded is bigger
    //than the list on the browser- This is a default assumption
    for(var i = 0; i < difference; ++i){
        datastore.addTask(dummy);
    }
    $scope.data = "Successful list download";
    var cleandata = [];
    cleandata = rawdata.concat();
    datastore.replace(cleandata);
    
    //get uuids and types - to later destroy the data on the cloud
    var tohold = result.entities.concat();   //cloning the array rather than using a reference to it
    rawdata = null;
    datastore.strip();
    var allistitems = datastore.seeAll();
    $scope.result = allistitems; 
    }
    });

   };
});
