const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req,res){
    
    let user = new User();
    
    user.name = req.body.name;
    user.email = req.body.email;
    
    user.setPassword(req.body.password);
    
    user.save(function(err){
        let token;
        token = user.generateJwt();
        res.status(200);
        res.json({
            "token" : token
        });
    });//Save the instance as a record to the database
};

module.exports.login = function(req, res) {
    passport.authenticate('local', function(err, user, info){
    let token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

        
};