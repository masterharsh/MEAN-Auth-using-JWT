const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const bodyParser = require('body-parser');

const app = express();
////Bring in the data model
require('./serverCode/models/db');
////Bring in the Passport config after model is defined
require('./serverCode/config/passport');
//
//

const routesApi = require('./serverCode/routes/index');
////

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-HeadersHeaders", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});
//
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

app.use(express.static(path.join(__dirname, '/development')));
//

//app.get('/', function(req,res){
//    res.redirect('/index.html');
//});
app.use('/', routesApi);
////
//app.use(function(req, res) {
//  res.sendFile(path.join(__dirname, 'development', 'index.html'));
//});
////
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handlers

// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
 
module.exports = app;

app.listen(process.env.PORT || 2000, function(){
     console.log("App started on port 2000");
 });