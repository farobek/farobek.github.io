//Edits tasks
angular.module("MetProc").controller("Edit", function($scope, datastore){
    var numbertask = datastore.getasknumber();
    $scope.numbertask = numbertask;
    $scope.chosentask = datastore.getchosentask(numbertask[0]);
    $scope.modify = function(task, position){
        datastore.edit(task, position);
    }
    
});
