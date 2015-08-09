var app = angular.module("Semnet",[]);

app.service("database", function(){

    //examples to play around without having to spend time adding data
    var nounlist = ["Soc","human","animal","mammal","life form","multicellular","carbon based","mortal","physical","real"]; //[];
    var relationlist = ["is"];  //[];
    var linklist = [["Soc",1],["human",2,3],["mammal",4,5],["life form",6],["animal",7,8],["physical",9]]; //[];
    var ylist = []
    
    return{
            //setters
            setNoun: function(noun){
                
                //checks if nounlist is empty
                if(nounlist.length == 0){
                    nounlist.push(noun);
                    return "Noun added.";    
                }
                
                else{
                //checks that noun is not in the database
                      for(var i = 0; i < nounlist.length;++i){
                          if(nounlist[i] == noun){
                              return "Noun is already in the database.";
                          }
                          //if we reach the end of the list
                          else if(i == (nounlist.length - 1)){
                              nounlist.push(noun);
                              return "Noun added.";
                           }
                      }
            }
                      
                      
             }, 
            setRel: function(relationitem){
                
                //checks if relationlist is empty
                if(relationlist.length == 0){
                    relationlist.push(relationitem);
                    return "Relation added.";    
                }
                else{
                //checks that relation is not in the database
                for(var i = 0; i< relationlist.length;++i){
                    if(relationlist[i] == relationitem){
                        return "Relation is already in the database.";
                    }
                    //if we reach the end of the list
                    else if(i == (relationlist.length - 1)){
                        relationlist.push(relationitem);
                        return "Relation added.";
                    }
                }
                }
                
            }, 
            setLink: function(xnounpos, ynounpos){
            //ynounpos is the position of the ynoun in the nounlist
            //xnounpos is the position of the xnoun in the nounlist   
                
                var noun = nounlist[xnounpos];
                if(linklist.length == 0){ //checks if linklist is empty
                    linklist.push([noun, ynounpos]);
                    return "New ynoun created and link was pushed in."
                }
                
                else{ //if linklist ain't empty
                for(var i = 0; i < linklist.length;++i){
                    if(linklist[i][0] == noun){ //if the noun is in the linklist
                        //checks if the ynoun in the linklist[xnoun]
                        for(var e = 0; e < linklist[i].length; ++e){
                            if(linklist[i][e] == ynounpos){ //if ynoun is in the linklist[xnoun]
                                return "Link already exists.";
                            }
                            else if(e == (linklist[i].length - 1)){ //if ynoun is not in linklist[xnoun] it is pushed in
                                 linklist[i].push(ynounpos); 
                                 return "Link pushed in.";
                            }
                        }

                    }
                    
                    else if(i == (linklist.length - 1)){ //if the noun is not in the linklist - This will be the case normally
                        linklist.push([noun, ynounpos]);
                        //linklist[i].push(ynounpos); //we push the noun and the ynounpos
                    } 
                    
                }
            }
            },
        
        //getters 
        getNoun: function(noun){
             //checks if database is empty
                if(nounlist.length == 0){
                  var lista = ["There are no nouns in the database.", null];
                    return lista;
                }
            
            else{
            
            for(var i = 0; i < nounlist.length; ++i){
                if(nounlist[i] == noun){
                    return nounlist[i];
                }
                else if(i == (nounlist.length-1)){
                    var lista = ["No item found.", null];
                    return lista;
                }
            }
        }
        },
        getAllNoun: function(){
            return nounlist;
        },
        getAllRel: function(){
            return relationlist;
        },
        getAllLink: function(){
            return linklist;
        },
        resetYList: function(){
            ylist = [];
        },
        getYList: function(){ //gets the list of ynouns
            return ylist;
        },
        pushYList: function(alist){ //updates the ynoun list
            var bigger = 0;
            if(alist.length > ylist.length){
                bigger = alist.length;
            }
            else{
                bigger = ylist.length;
            }
            //every item in alist is checked against every item in the ynoun list and if there are any matches, the item is not copied
            for(var i = 0; i < bigger;++i){
                if(alist[i] != ylist[i]){
                    for(var e = 0; e < ylist.length; e++){
                        if(e == (ylist.length - 1) && ylist[e] != alist[i]){
                        ylist.push(alist[i]);
                        }
                    }
                }
            }
            
        },
        
        getRel: function(relationitem){
            //checks if database is empty
                if(relationlist.length == 0){
                  return "There are no relations in the database.";
                }
            else{
            
            for(var i = 0; i< relationlist.length;++i){
                if(relationlist[i] == relationitem){
                    return relationlist[i];
                }
                else if(i == (relationlist.length - 1)){
                    return "No relations found.";
                }
            }
        }
        },
        //xnounpos is the index of an xnoun in nounlist
        
        getLink: function(xnounpos){
            var items = [];
            var yitem = "";
            var xnoun = nounlist[xnounpos];
            for(var i = 0; i < linklist.length; ++i){
                if(linklist[i][0] == xnoun){//if it has a linklist slot
                    for(var e = 1; e < linklist[i].length;++e){
                        yitem = linklist[i][e]; //gets position of ynoun in nounlist
                        items.push(nounlist[yitem]);
                        
                    }
                
                }
                
            }
            return items; //returns list of ynouns of an xnoun
        },
        
        //deleters
        delNoun: function(noun){
            //checks if database is empty
            if(nounlist.length == 0){
                  return "There are no nouns in the database.";
                }
            else{
            
            for(var i = 0; i < nounlist.length; ++i){
                if(nounlist[i] == noun){
                    nounlist.splice(i,1); //removes the element in the ith position
                    return "Noun deleted";
                }
                else if(i == (nounlist.length - 1)){
                    return "No items found";
                }
            }
        }
        },
        
        delRel: function(relationitem){
            //checks if database is empty
            if(relationlist.length == 0){
                  return "There are no relations in the database.";
                }
            else{
            for(var i = 0; i < relationlist.length; ++i){
                if(relationlist[i] == relationitem){
                    relationlist.splice(i,1);
                    return "Relation deleted";
                }
                else if(i == (relationlist.length - 1)){
                    return "No relations found";
                }
            }
        }
        },
        //xnounpos is the index position of xnoun in nounlist/linklist
        //ynounpos is the index position of the ynounreference in linklist[xnounpos][1]
        
        delLink: function(xnounpos, ynounpos){
            if(linklist[xnounpos][1][ynounpos] != null){
                linklist[xnounpos][1].splice(ynounpos, 1);
            }
        },
        //support functions
        //indexGet returns the index of a given item. Nouns and relations are the only items
        
        indexGet: function(itemtype, item){
            
            if(itemtype == 1){ //item is a noun
                //searches for noun in nounlist
                for(var i = 0; i < nounlist.length; ++i){
                    if(nounlist[i] == item){
                        return i; //returns index position of item
                    }
                    else if(i == (nounlist.length - 1)){
                        return null; //returns null if we finish searching and don't find the item
                    }
                }
            }
            
            else if(itemtype == 2){ //item is a relation
                
                //searches for relation in relationlist
                for(var i = 0; i < relationlist.length; ++i){
                    if(relationlist[i] == item){
                        return i;// returns index position of item
                    }
                    
                    if(i == (relationlist.length - 1)){
                        return null;
                    }
                    
                }
                
            }
            
        }
        
        
    } 
    //^end of return{}

});

app.controller("DBOps", function($scope, database){
    $scope.nounlist = database.getAllNoun();
    $scope.relationlist = database.getAllRel();
    $scope.linklist = database.getAllLink();
    $scope.result = "";
    newResult = function(newresult){
        $scope.result = newresult;
    };
    //the parser connects the user request with the Database CRUD
    $scope.dbOpsParser = function(typeitem, typeop, userinput){
        //noun
        if(typeitem == "noun"){
            if(typeop == "set"){
                //call setNoun
                var opfeedback = database.setNoun(userinput);
                newResult(opfeedback);
            }
           else if(typeop == "get"){
                //call getNoun
                var opfeedback = database.getNoun(userinput);
                newResult(opfeedback[0]);
            }
            else if(typeop == "delete"){
                //call getNoun
                var opfeedback = database.delNoun(userinput);
                newResult(opfeedback);
            }
        }
        else if(typeitem == "relation"){
            if(typeop == "set"){
                //call setRel
                var opfeedback = database.setRel(userinput);
                newResult(opfeedback);
            }
            else if(typeop == "get"){
                //call getRel
                var opfeedback = database.getRel(userinput);
                newResult(opfeedback);
            }
            else if(typeop == "delete"){
                //call delRel
                var opfeedback = database.delRel(userinput);
                newResult(opfeedback);
            }
        }
        else if(typeitem == "link"){
            if(typeop == "set"){
                //it is easier to input data using the Earbox
                //so no point building a function for setting ynouns
                newResult(opfeedback);
            }
        }
    };
});
app.controller("Conversation", function($scope, database){
    newResponse = function(newresponse){
        $scope.response = newresponse;
    };
    $scope.chooseParser = function(choice, userinput){
        if(choice == "statement"){
            var newresponse = lParser(userinput);
            newResponse(newresponse);
        }
        else if(choice == "query"){
            var newresponse = qParser(userinput);
            newResponse(newresponse);
        }
    };
    
    //Learning Parser
//used to add items to the database
//userinput will be of the format: x-is-y: a tree-is- a plant

function lParser(userinput){
	var xnoun = "";
	var relationitem = "";
	var rawynoun = "";
	var ynoun = 0;

	var bxnoun = true;
	var brelationitem = false;
	var brawynoun = false;

    
	//parses user input and stores it in xnoun, relationitem and ynoun
	for(var i = 0; i < userinput.length; ++i){
        
		//checks if bxnoun is false
		if(bxnoun == true && userinput[i] != "-"){
			xnoun = xnoun + userinput[i];
		}
		else if(bxnoun == true && userinput[i] == "-"){ //if we reach the end of xnoun characters
			bxnoun = false;
			brelationitem = true;
		}
		else if(brelationitem == true && userinput[i] != "-"){
			relationitem = relationitem + userinput[i];
		}
		else if(brelationitem == true && userinput[i] == "-"){ //if we reach the end of relationitem characters
			brelationitem = false;
			brawynoun = true;
		}
		else if(brawynoun == true && userinput[i] != "-"){
			rawynoun = rawynoun + userinput[i];
		}
		else if(brawynoun == true && userinput[i] == "-"){ //if we reach the end of rawynoun characters
			brawynoun = false;
		}
        
	}
    
	 var ynouncanreference = false; //if true, the xnoun exists and the ynoun can reference it, otherwise, we need to create it first --Part1
    var nounlist = database.getAllNoun();
	 for(var i = 0; i < nounlist.length; ++i){
	 	if(nounlist[i] == rawynoun){ //if the xnoun exists
	 		ynouncanreference = true;
	 		ynoun = i; //ynoun gets the reference value of the xnoun
	 	}
	 }
    
    //call setNoun on xnoun, setRel on relationitem and setLink on xnounpos and ynoun
	var opfeedback = database.setNoun(xnoun); //stores the feedback of the operation*
	var opfeedback2 = database.setRel(relationitem); //*
    var xnounpos = database.indexGet(1, xnoun);

	 //if the xnoun does not exist, we create it and then we use it to give a reference value to ynoun - Part 2
	 if(ynouncanreference == false){
	 	 database.setNoun(rawynoun);
         nounlist = database.getAllNoun();
	 	 ynoun = nounlist.length - 1; //ynoun gets the reference value of the xnoun
	 }
	
	
	var opfeedback3 = database.setLink(xnounpos ,ynoun); //*
    
    return "Feedback:" + " " + opfeedback + " " + opfeedback2 + " " + opfeedback3;
    
};
    
//Query parser
    function qParser(userinput){
        database.resetYList();
        var bswitch = false;
        var xnoun = "";
        //parsing input
        for(var i = 0; i < userinput.length; ++i){
            if(userinput[i] == "-"){ //if the s of 'what is-x?' is found
                bswitch = true;
            }
            else if(bswitch == true){
                xnoun = xnoun + userinput[i];
            }
        }
        
        
        var ylist = []; //will contain all the ynouns
        var linklist = database.getAllLink();
        var fxnounq = xnoun; //to be able to access the queried term;
        
        //checks if xnoun has been heard and then if it is known
        if(database.getNoun(xnoun)[1] == null){ //if it is not in nounlist
            return "I have not heard of that term.";
        }
        
        
        else if(database.getNoun(xnoun)[1] != null){ //if it is in nounlist
            //we check in linklist
            for(var i = 0; i < linklist.length; ++i){
                if(linklist[i][0] == xnoun){ //if it is in linklist
                    var xnounpos = database.indexGet(1,xnoun);
                    ylist = database.getLink(xnounpos); //we get the ynouns - for Soc it is ["human"] and for animal it is [mortal, physical]
                    
                    //iteration starts here - every item in ylist is recursively explored
                    var fxnoun;
                    var fxnounpos;
                    var inferencing;                    
                    
                    if(ylist.length == 0){ 
                        return "Isolated item. No related words found.";
                    }                    
                    else if(ylist.length > 0){ //we only iterate if there are items
                        for(var i = 0; i< ylist.length;i++){
                            fxnoun = ylist[i]; //first sub-xnoun - human is the sub-xnoun of Soc
                            fxnounpos = database.indexGet(1, fxnoun); //sub-xnoun's position in nounlist
                            inferencing = inference(fxnounpos, fxnoun); //follows through the links
                        }
                    }
   
                    //iteration finishes here
                    
                    
                    
                
                    //formats the data to be displayed to the user
                    var ylista = database.getYList();
                    newResponse(ylista); 
                    var response = xnoun + " is ";
                    
                    for(var i = 0; i < ylista.length;++i){
               
                        
                        //if there is only one ynoun
                        if(ylista.length == 1){
                            response = response + ylista[i] + ".";
                        }                        
                        
                        //if it is the last ynoun
                        else if(i == (ylista.length - 1)){
                            response = response + " and " + ylista[i] + ".";
                        }
                        else {
                            response = response + ylista[i];
                            if(i+1 != (ylista.length - 1)){
                                response = response + ", ";
                            }
                        }
                        }
                    return response;
                    }
                else if(linklist[i][0] != xnoun && i == (linklist.length - 1)){ //if it is not in linklist
                    return "I have heard the term but I don't know what it means.";
                }
                }
            }
        };
    
    //inference algorithm
    //given an xnoun, it collects the nouns referenced in their linklists
    function inference(xnounpos, xnoun){
        
        var isThere = false;
        var ylist = database.getYList();

        //Step 1 - stores the ynoun
        for(var i = 0; i< ylist.length; ++i){
            if(xnoun == ylist[i]){
                isThere = true;
            }
        }
        if(isThere == false){
            ylist.push(xnoun);
        }
        isThere = false;
                
        //step 2 - gets the position and linklist of the noun so for mortal is 7 and empty and for human is 2 and [animal, mammal]
        var xnounpos = database.indexGet(1,xnoun);
        var xnounlinklist = database.getLink(xnounpos);
        
        //step 3 - calls inference() on each the nouns and their positions
        if(xnounlinklist.length > 0){
            for(var i = 0; i< xnounlinklist.length; ++i){
                
                ylist.push(xnounlinklist[i]);
                database.pushYList(ylist);
                var linklistxnoun = xnounlinklist[i];
                var linklistxnounpos = database.indexGet(1, linklistxnoun);
                
                
                //step 3.1
                inference(linklistxnounpos, linklistxnoun);
            }
        }

    };
    
});

