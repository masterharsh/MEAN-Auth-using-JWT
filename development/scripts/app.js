'use strict';

var meanApp= angular.module('meanApp',['ui.router']);

meanApp.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        .state('home',{
            url:'/home',
            templateUrl: './views/home.html',
            controller: 'Home'
    }).state('member',{
            url:'/member',
            templateUrl: './views/member.html',
            controller: 'Member'
    }).state('signup',{
            url:'/signup',
            templateUrl: './views/signup.html',
            controller: 'Signup'
    })
    
}]);

meanApp.run(['$rootScope', '$state', 'authentication', function($rootScope, $state, authentication) {
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      if ( $state.current.name === 'member' && !authentication.isLoggedIn()) {
        $state.go('home');
      }else if($state.current.name === 'home' && authentication.isLoggedIn()){
          $state.go('member');
      }
    });
  }]);



meanApp.directive('navigation',function(){
   return {
      restrict: 'E',
      templateUrl: './directives/nav.html',
      controller: 'Navbar',
     
    };
    
});