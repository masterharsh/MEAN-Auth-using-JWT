const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(new localStrategy({
    usernameField: 'email'
},
 function(username, password, done) {
    User.findOne({email: username}, function(err, user) {
        if(err) { return done(err); }
        //Return id user not found in database
        if(!user){
            return done(null, false, {
                message:'User not found'
            });
        }
        //Return if password is wrong
        if(!user.validPassword(password)){
            return done(null, false, {
                message:'Password is wrong'
            });
        }
        // If credentaials are correct, return the user object
        return done(null, user);
    })
}                              
                              ))