var Lexicon = angular.module("Lexicon", ["ngRoute"]);

//routing


Lexicon.config(["$routeProvider", function ($routeProvider){

	$routeProvider
		.when("/", 
		{
			controller: "homeController",
			templateUrl: "views/home.html"
		})

		.otherwise({redirectTo: "/"});



}]);

Lexicon.controller("homeController", function($scope){

			//code here
			$scope.statusTag = "Begin writing!";
			var statusTagContent = $scope.statusTag;
			$scope.emailContent = function(emailaddress, textContent){
				$scope.sendTheMail(emailaddress, textContent);
			};

			$scope.clearText = function(){
				$scope.textContent = "";
			}

			$scope.sendTheMail = function(emailaddress, textContent){

				var m = new mandrill.Mandrill('8tA4PWHLxMg5MOl2NcwByQ');

				var params = {
    				"message": {
       			 		"to":[]
    				}
				};

				var toData = {"email": emailaddress};
			    var textObj = {"text": textContent};

			    params.message.to.push(toData);
			    params.message.subject = "You wrote this with Lexicon";
			    params.message.from_email = emailaddress;
			    params.message.text = textContent;


			    function log(obj) {
			        $scope.statusTag = "Status: " + obj[0].status;
			        $scope.$apply(); //this makes Angular to update the view
			    }


			    m.messages.send(params, function(res) {
			        log(res);
			    }, function(err) {
			        log(err);
			    });

			    statusTagContent = $scope.statusTag;

			    //the text is only cleared if the email is sent. This prevents loss of your work if the email is not sent
			    if($scope.statusTag != "Status: invalid" || $scope.statusTag != "Status: rejected"){
			    	$scope.clearText();
			    }

			}

		});

