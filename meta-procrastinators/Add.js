//Adds new tasks
angular.module("MetProc").controller("Add", function($scope, datastore){
    $scope.addTask = function(newtask){
        datastore.addTask(newtask);
        $scope.newtask = "";
    }
});
