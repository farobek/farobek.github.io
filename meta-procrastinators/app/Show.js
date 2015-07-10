//displays the tasks
angular.module("MetProc").controller("Show", function($scope, datastore){
    $scope.changeit = function(value){
        datastore.setasknumber(value);
    };
    $scope.tasks = datastore.seeAll();
    $scope.tnumber = datastore.getasknumber(); 
});
