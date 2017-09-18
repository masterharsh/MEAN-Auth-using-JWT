'use strict';

meanApp.controller('Signup',['$scope','authentication','$state',function($scope,authentication,$state){
   $scope.title='signup';
    
   $scope.credentials = {
      name : "",
      email : "",
      password : ""
    };

    $scope.onSubmit = function () {
      console.log('Submitting registration');
      authentication
        .register($scope.credentials)
        .error(function(err){
          alert(err);
        })
        .then(function(){
          $state.go('member');
        });
        location.reload();
    };
    

    
    
}]);