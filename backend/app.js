var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('client-sessions');

var routes = require('./routes/index');
var users = require('./routes/users');
var register = require('./routes/register');
var addTask = require('./routes/addTask');
var deleteTask = require('./routes/deleteTask');
var viewTask = require('./routes/viewTask');
var addSchedule = require('./routes/addSchedule');
var startTask = require('./routes/startTask');
var logout = require('./routes/logout');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  cookieName: 'session',
  secret: 'something',
  duration: 15 * 60 * 1000 ,
  activeDuration: 15 * 60 * 1000
}));
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/register',register);
app.use('/addTask',addTask);
app.use('/addSchedule',addSchedule);
app.use('/deleteTask',deleteTask);
app.use('/viewTask',viewTask);
app.use('/startTask',startTask);
app.use('/logout',logout);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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
