'use strict';

meanApp.controller('Member',['$scope','$state','meanData',function($scope,$state,meanData){
    
    $scope.user = {};

    meanData.getProfile()
      .success(function(data) {
        $scope.user = data;
      })
      .error(function (e) {
        console.log(e);
      });
   
}]);