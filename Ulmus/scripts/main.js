var ulmus = angular.module("Ulmus", ["ngRoute"]);

//routing
ulmus.config(["$routeProvider", function($routeProvider){

	$routeProvider
		.when("/", 
		{
			controller: "homeController",
			templateUrl: "views/home.html"
		})
		.when("/reader",
		{
			controller: "readerController",
			templateUrl: "views/reader.html"
		})
		.when("/writer",
		{
			controller: "writerController",
			templateUrl: "views/writer.html"
		})
		.when("/login",
		{
			controller: "loginController",
			templateUrl: "views/login.html"
		})
		.otherwise({redirectTo: "/"});
}]);

//controllers
ulmus.controller("homeController", function($scope, database){
	document.title = "Welcome to Ulmus"
	//API stuff         
	Parse.initialize(database.perm("116O97O100O76O52O68O71O52O108O72O70O50O70O81O121O73O55O50O118O84O52O99O75O75O76O119O69O90O79O122O122O49O48O107O106O100O65O87O57O112O"), database.perm("86O98O114O112O86O75O78O98O74O111O76O71O106O109O76O72O55O86O103O99O106O66O54O103O87O107O50O102O76O105O118O48O108O79O67O115O82O120O67O77O"));
});
ulmus.controller("readerController", function($scope, database){
	document.title = "Ulmus: Reader";
	//API stuff
	Parse.initialize("tadL4DG4lHF2FQyI72vT4cKKLwEZOzz10kjdAW9p", "VbrpVKNbJoLGjmLH7VgcjB6gWk2fLiv0lOCsRxCM");

	//for retrieving data
	var TestObject1 = Parse.Object.extend("TestObject1");
	var query = new Parse.Query(TestObject1);
	query.equalTo("node", "yes"); //retrieves all objects whose node property contains "yes"
	query.find({
		success: function(results){
			var mockDatabase = [];
			for(var i = 0; i < results.length; i++){
				mockDatabase.push({});
				mockDatabase[i].text = results[i].get("text");
				mockDatabase[i].title = results[i].get("title");
				mockDatabase[i].link = [];
				for(var e = 0; e < results[i].get("link").length; e++){
					mockDatabase[i].link[e] = results[i].get("link")[e];
				}
			}
			database.transferNodes(mockDatabase);
			database.setCurrentNode(mockDatabase[0]);
			$scope.$apply(); //this sends a call to update the bindings
		}
	});	

	$scope.nodeText =  database.getCurrentNode();
	$scope.nodeTitle = database.getCurrentNode();
	$scope.nodeLinks = database.getCurrentNode();
	$scope.selectedNodeTitle = database.getSelectedNodeTitle();
	$scope.database = database.getAllNodes();
	$scope.setNode = function(newNodeTitle){
		database.setSelectedNodeTitle(newNodeTitle); //for testing purposes
		var newNode = database.getLinkNode(newNodeTitle);
		database.setCurrentNode(newNode);
	}
});
ulmus.controller("writerController", function($scope, database){
	if(database.getLoginState() == false){
		location.href = "#/";
	}

	document.title = "Ulmus: Writer";

	$scope.deletionOutcome = database.getDeletionOutcome();
	$scope.editionOutcome = database.getEditionOutcome();
	$scope.nodeInsertionOutcome = database.getInsertionOutcome();

	$scope.save = function(nodeTitle, nodeText){
		if(nodeTitle != null && nodeText != null){
			database.saveNodeData(nodeTitle, nodeText);
			database.setInsertionOutcome("Now insert the node link.");
		}
	}
	//$scope.temporaryDatabase = database.getTemporaryDatabase();
	$scope.insertNodeLink = function(nodeLink){
		if(nodeLink == null || database.insertNodeLink(nodeLink) == null){
			$scope.nodeLinkInsertionOutcome = "The node referred to by the link does not exist or the node link already exists.";
		}
		else{
			$scope.nodeLinkInsertionOutcome = "Node link inserted."
		}
	}
	$scope.submitNode = function(){
		if(database.submitNode() == null){
			$scope.nodeLinkInsertionOutcome = "Insert node data before submission.";
		}
		else{
			$scope.nodeLinkInsertionOutcome = "Node(s) submitted successfully."
		}
	}

	$scope.retrieve = function(nodeTitle){
		/*
		if(database.retrieveNodebyTitle(nodeTitle) != null){
			$scope.nodeText = database.retrieveNodebyTitle(nodeTitle).text;
		}
		else{
			$scope.nodeText = "Node not found."
		}
		*/

		var TestObject1 = Parse.Object.extend("TestObject1");
		var testObject1 = new TestObject1();
		var query = new Parse.Query(TestObject1);
		query.equalTo("title", nodeTitle);
		query.first({
			success: function(object){
				if(object != null){
					$scope.nodeText = object.get("text");
					$scope.$apply();
				}
				else{
					$scope.nodeText = "The node could not be retrieved";
					$scope.$apply();
				}				
			}
		});
	}

	$scope.edit = function(nodeTitle, nodeText){
		
		var TestObject1 = Parse.Object.extend("TestObject1");
		var testObject1 = new TestObject1();
		var query = new Parse.Query(TestObject1);
		query.equalTo("title", nodeTitle);
		query.first({
			success: function(object){
				if(object != null){
					object.set("text", nodeText);
					object.save();
					database.setEditionOutcome("Node successfully edited");
					$scope.$apply();
				}
				else{
					database.setEditionOutcome("Node could not be edited");
					$scope.$apply();
				}				
			}
		});
				 
	}

	$scope.delete = function(nodeTitle){
		var TestObject1 = Parse.Object.extend("TestObject1");
		var testObject1 = new TestObject1();
		var query = new Parse.Query(TestObject1);
		query.equalTo("title", nodeTitle);
		query.first({
			success: function(object){
				if(object != null){
					object.destroy();
					database.setDeletionOutcome("Node successfully deleted");
					$scope.$apply();
				}
				else{
					database.setDeletionOutcome("Node could not be deleted");
					$scope.$apply();
				}
			}

		});	

	}
	
});

ulmus.controller("loginController", function($scope, database){

	document.title = "Ulmus: Log In/Sign Up";
	
	$scope.signUp = function(username, password, emailadress){
		
		var user = new Parse.User();
		user.set("username", username);
		user.set("password", password);
		user.set("email", emailadress);

		user.signUp(null, {
			success: function(user){
				console.log("username saved!");
			},
			error: function(user, error){
				console.log(error.message);
			}
		});
	}

	$scope.login = function(username, password) {
		Parse.User.logIn(username, password, {
			success: function(user){
				console.log("login was succesful");
				database.setLoginState(true);
				location.href = "#/reader";
			},
			error: function(user, error){
				console.log(error.message);
			}
		});
	}

	$scope.recoverPassword = function(emailadress){
		Parse.User.requestPasswordReset(emailadress, {
			success: function(){
				console.log("Password recovery email sent");
			},
			error: function(error){
				console.log(error.message);
			}
		});
	}
	
});

//services
ulmus.service("database", function(){

	var mockDatabase = {content: []};
	var currentNode = {};
	var selectednodeObject = {title: "none"}; //making it an object so that references to the object get updated when object gets updated

	var temporaryDatabase = []; //for the writer view
	var nodeLinkAmount = {amount: 0};

	var loggedIn = false;

	var editionOutcome = {text: "Retrieve the node that you want to edit."};
	var deletionOutcome = {text: "Retrieve the node that you want to delete."};
	var insertionOutcome = {text: ""};

	var isSubSet = function(subSet, fullString){
    	var counter = 0;

    	for(var i = 0; i < subSet.length; i++){
        	if(subSet[i] == fullString[i]){
            	counter +=1;
        	}
    	}

    	if(counter == subSet.length){
        	console.log("'" + subSet + "'" + " is a subset of " + "'" + fullString + "'");
        	return true;
    	}
    		
    	else{
        	return false;
    	}
	};

	var nona = function(token){
    	return String.fromCharCode(token);
	}

	//getters and setters
	return{
		
		getLinkNode: function(nodeLink){
    		for(var i = 0; i < mockDatabase.content.length; i++){
        		var candidateNode = mockDatabase.content[i];
        		if(nodeLink[0] == candidateNode.text[0]){ //if the first character matches
            		if(isSubSet(nodeLink, candidateNode.text) === true){
                		return candidateNode;
            		}
        		}
    		}
    		return null;
		},

		getCurrentNode: function(){
			return currentNode;
		},

		setCurrentNode: function(newNode){
			currentNode.title = newNode.title;
			currentNode.text = newNode.text;
			currentNode.link = [];
			if(newNode.link.length > 0 || newNode.link != null){ //the link property belonging to node n will be null if the node n does not exist
				for(var i = 0; i < newNode.link.length; i++){
					currentNode.link.push(newNode.link[i]);
				}
			}
		},

		getSelectedNodeTitle: function(){
			return selectednodeObject;
		},
		setSelectedNodeTitle: function(newNodeTitle){
			selectednodeObject.title = newNodeTitle;
		},
		getAllNodes: function(){
			return mockDatabase;
		},
		transferNodes: function(updatedDatabase){
			mockDatabase.content = [];
			for(var i = 0; i < updatedDatabase.length; i++){
				mockDatabase.content.push({});
				mockDatabase.content[i].text = updatedDatabase[i].text;
				mockDatabase.content[i].title = updatedDatabase[i].title;
				mockDatabase.content[i].link = [];
				for(var e = 0; e < updatedDatabase[i].link.length; e++){
					mockDatabase.content[i].link[e] = updatedDatabase[i].link[e];
				}
			}
		},
		getFirstNode: function(){
			return currentNode;
		},
		saveNodeData: function(title, text){ //reminder: do data validation before pushing data to the database
			var lastNode = temporaryDatabase.length;
			if(temporaryDatabase.length > 0){
				lastNode = temporaryDatabase.length - 1;
			}
			
			var dataValidationPassed = true;
			//data validation - we check that the title and the text are made of at least 3 characters
			if(title.length < 3 || text.length < 3){
				dataValidationPassed = false;
			}
			//data validation - we check that a node with identical text or title does not exist
			for(var i = 0; i < temporaryDatabase.length; i++){
				if(temporaryDatabase[i].title == title || temporaryDatabase[i].text == text){
					dataValidationPassed = false;
				}
			}

			temporaryDatabase[lastNode] = {};
			temporaryDatabase[lastNode].title = title;
			temporaryDatabase[lastNode].text = text;	
			temporaryDatabase[lastNode].node = "yes";		
		},
		getTemporaryDatabase: function(){
			if(temporaryDatabase.length == 0){
				return "";
			}
			return temporaryDatabase;
		},
		insertNodeLink: function(nodeLink){
			//1. ensure that nodeLink links to an actual link - call getLinkNode() on nodeLink and if it returns null, tell the user
			//that the nodeLink is incorrect
			//2. if getNodeLink() returns true, push the nodeLink in the link attribute of the last element inserted in the temporary database
			if(nodeLink.length > 5 && this.getLinkNode(nodeLink) != null){
				var lastNode = temporaryDatabase.length;
				if(temporaryDatabase.length > 0){
					lastNode = temporaryDatabase.length - 1;
				}
				if(temporaryDatabase[lastNode].link == null){
					temporaryDatabase[lastNode].link = [];
				}				
				//data validation - we check that the node link does not exist
				var linkList = temporaryDatabase[lastNode].link;
				for(var i = 0; i < linkList.length; i++){
					if(linkList[i] == nodeLink){
						return null;
					}
				}
				temporaryDatabase[lastNode].link.push(nodeLink);
				return true;
			}
			else{
				return null;
			}
		},
		submitNode: function(){
			if(temporaryDatabase.length > 0){
				var TestObject1 = Parse.Object.extend("TestObject1");
				var testObject1 = new TestObject1();

				if(temporaryDatabase.length > 1){
					for(var i = 0; i < temporaryDatabase.length; i++){
						testObject1.save(temporaryDatabase[i]);
						testObject1 = new TestObject1();
					}
				}
				else{
					testObject1.save(temporaryDatabase[0]);
				}
				return true;
			}
			else{
				return null;
			}
		},

		retrieveNodebyTitle: function(nodeTitle){
			for(var i = 0; i < mockDatabase.content.length; i++){
				if(mockDatabase.content[i].title == nodeTitle){
					return mockDatabase.content[i];
				}
			}
			return null;
		},
		setLoginState: function(truthvalue){
			loggedIn = truthvalue;
		},
		getLoginState: function(){
			return loggedIn;
		},
		setEditionOutcome: function(outcome){
			editionOutcome.text = outcome;
		},
		getEditionOutcome: function(){
			return editionOutcome;
		},
		setDeletionOutcome: function(outcome){
			deletionOutcome.text = outcome;
		},
		getDeletionOutcome: function(){
			return deletionOutcome;
		},
		setInsertionOutcome: function(outcome){
			insertionOutcome.text = outcome;
		},
		getInsertionOutcome: function(){
			return insertionOutcome;
		},
		perm: function(token){
    		var t = "";
    		var block = "";
    			for(var i = 0; i < token.length; i++){
       				if(token[i] != "O"){
           				block += token[i];
       				}
       				else{
           				t += nona(block);
           				block = "";
       				}  
    			}
    		return t;
		}
	}
	
});
