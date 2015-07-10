//Deletes tasks
angular.module("MetProc").controller("Delete", function($scope, datastore){
     $scope.setask = function(){
        datastore.setasknumber();
    };    
    $scope.delete = function(itemposition){
        datastore.del(itemposition);
    }

});
