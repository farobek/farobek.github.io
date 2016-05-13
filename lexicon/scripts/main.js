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
	$scope.statusTag = "Begin writing!";
	var statusTagContent = $scope.statusTag;
	$scope.emailContent = function(emailaddress, textContent){
		$scope.sendTheMail(emailaddress, textContent);
	};
	$scope.clearText = function(){
		$scope.textContent = "";
		$scope.email = "";
	}
	function submitSendingStatus(obj) {
	        $scope.statusTag = "Status: " + obj;
			$scope.$apply(); //this makes Angular update the view
	}
	$scope.sendTheMail = function(emailaddress, textContent){
		var successStatus = "Sent";
		var errorStatus = "Error. Please try again.";
		emailjs.send("default_service","template_eE2LOMLx",{to_email: emailaddress, message_html: textContent})
			.then(function(response) {
					submitSendingStatus(successStatus);
					$scope.clearText();
					$scope.$apply();
			}, function(err) {
					submitSendingStatus(errorStatus);
			});
	}

});
