'use strict';

meanApp.controller('Navbar',['$scope','authentication','$window',function($scope,authentication,$window){
    
    $scope.title="";
    $scope.optionClicked = function(value){
    $scope.title = value;       
    };
    
    $scope.logout = function(value){
    $scope.title = value;       
    authentication.logout();
          location.reload();
        
    }
    
     $scope.isLoggedIn = authentication.isLoggedIn();

     $scope.currentUser = authentication.currentUser();
    
    
    
}]);