'use strict';

meanApp.controller('Home',['$scope','authentication','$state',function($scope,authentication,$state){
   
    $scope.credentials = {
      email : "",
      password : ""
    };

    $scope.onSubmit = function () {
       authentication
        .login($scope.credentials)
        .error(function(err){
          alert("not found in database");
        })
        .then(function(){
          $state.go('member');           
        });
         location.reload();
    };
 
}]);