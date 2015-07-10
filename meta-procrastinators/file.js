var app = angular.module("MetProc", []);

app.service("datastore", function(){
    //the tokens for the items and the itemlist are made of the same alphanumerical characters but only the itemlist token contains single quotes
    var itemtok = ["password"];
    var tok = ["'password'"]; 
    
    var tasklist = [{nature: "stannis",description: "I am one task", position: 0, type: "list", token: tok[0]}, {nature: "stannis", description: "You are another task", position: 1, type: "list", token: tok[0]}];
    var tasknumber = [0];
    var deldataset = []; //stores the the uuids and the types to use them when deleting the outdated list in the cloud

    
    return{
        
        getToken: function(){
            return tok[0];
        },
        getItemToken: function(){
            return itemtok[0];
        },
        
        injectToken: function(tokenval){
            tok.splice(0);
            tok.push(tokenval);
            
            var temp = "";
            for(var i = 0; i < tokenval.length; ++i){
                if(tokenval[i] != "'"){
                    temp = temp + tokenval[i];
                }
            }

            itemtok.splice(0);
            itemtok.push(temp);
        },
        
        replace: function(dataset){
            var datas = dataset.concat();
            dataset = dataset.splice();
            for(var i = 0; i < datas.length;++i){
                tasklist[i] = datas[i];
            }
        },
        
        //For each task in the array, the strip function strips/removes the created, modified, description, nature and position properties - the resultant array can later be used right before data pushing to delete existing records on the cloud - before pushing the new list
        strip: function(rawdata1){
            var rawdata1 = rawdata1.concat();            
            for(var i = 0; i < rawdata1.length; ++i){
                delete rawdata1[i].created;
                delete rawdata1[i].modified;
                delete rawdata1[i].metadata;
                delete rawdata1[i].description;
                delete rawdata1[i].position;
            }
            
            deldataset = rawdata1.concat();
        },
        
        getStrip: function(){
            return deldataset;
        },
        
        addTask: function(value){
            tasknumber[0] = tasknumber[0] + 1;
            tasklist.push({
                description: value,
                nature: "stannis",
                type: "lists",
                token: itemtok[0],
                position: tasklist.length
            });
        },
        seeAll: function(){
            return tasklist;
        },
        del: function(itemposition){   
            //gets a list of the items
            var itemlist = tasklist.map(function(item){ return item.position});
            //gets the index position of the item you want
            var realindex = itemlist.indexOf(itemposition);
            //removes the item at that index position
            tasklist.splice(realindex, 1);
        },
        setasknumber: function(value){
            tasknumber[0] = value;
        },
        getasknumber: function(){
            return tasknumber;
        },
        getchosentask: function(itemposition){
            //gets a list of the items
            var itemlist = tasklist.map(function(item){ return item.position});
            //gets the index position of the item you want
            var realindex = itemlist.indexOf(itemposition);
            return tasklist[realindex].description;
        },
        edit: function(item, itemposition){
            //gets a list of the items
            var itemlist = tasklist.map(function(item){ return item.position});
            //gets the index position of the item you want and assigns the new description to the item in that position
            var realindex = itemlist.indexOf(itemposition);
            tasklist[realindex].description = item;
        }
        
    }
});

//displays the tasks
app.controller("Show", function($scope, datastore){
    $scope.changeit = function(value){
        datastore.setasknumber(value);
    };
    $scope.tasks = datastore.seeAll();
    $scope.tnumber = datastore.getasknumber(); 
});

//Adds new tasks
app.controller("Add", function($scope, datastore){
    $scope.addTask = function(newtask){
        datastore.addTask(newtask);
        $scope.newtask = "";
    }
});

//Deletes tasks
app.controller("Delete", function($scope, datastore){
     $scope.setask = function(){
        datastore.setasknumber();
    };    
    $scope.delete = function(itemposition){
        datastore.del(itemposition);
    }

});

//Edits tasks
app.controller("Edit", function($scope, datastore){
    var numbertask = datastore.getasknumber();
    $scope.numbertask = numbertask;
    $scope.chosentask = datastore.getchosentask(numbertask[0]);
    $scope.modify = function(task, position){
        datastore.edit(task, position);
    }
    
});

 //login - Only needs to be done once
    var client = new Usergrid.Client({
    orgName:"Farobek",
    appName:"sandbox"
});

//Manages the e-CRUD (i.e. pushing and loading data) operations of the web application
app.controller("eCRUD", function($scope, datastore){
    $scope.sendtoken = function(tokenvalue){
        datastore.injectToken(tokenvalue);
        $scope.tok = datastore.getToken();
    }
    
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
