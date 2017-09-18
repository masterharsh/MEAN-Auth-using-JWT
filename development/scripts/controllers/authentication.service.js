meanApp.service('authentication',['$http', '$window',function($http, $window){
        
        let saveToken = function(token){
            $window.localStorage['mean-token'] = token;
        };
        
        let getToken = function(){
            return $window.localStorage['mean-token'];
        };
        
        let logout = function(){
          
            return $window.localStorage.clear('mean-token');
        };
        
        let isLoggedIn = function() {
            let token = getToken();
            let payload;
            
            if(token){
                payload = token.split('.')[1];
                payload = $window.atob(payload);//will decode a Base64 string like this
                payload = JSON.parse(payload);
                
                return payload.exp > Date.now() / 1000;
            }else{
                return false;
            }
        };
        
        let currentUser = function(){
            if(isLoggedIn()){
                let token = getToken();
                let payload = token.split('.')[1];
                payload = $window.atob(payload);//will decode a Base64 string like this
                payload = JSON.parse(payload);
                return {
                    email: payload.email,
                    name: payload.name
                };
            }
        };
        
         let register = function(user) {
              return $http.post('/signup', user)
                  .success(function(data){saveToken(data.token);
              }); 
            };

        let login = function(user) {
      return $http.post('/home', user).success(function(data) {
        saveToken(data.token);
      }).error(function (data, status, headers, config) {
        alert("error");
        return status;
      });
    };
        
        return{
              currentUser : currentUser,
              saveToken : saveToken,
              getToken : getToken,
              isLoggedIn : isLoggedIn,
              register : register,
              login : login,
              logout : logout
        };
    
}]);

    
   