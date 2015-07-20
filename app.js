var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var moment = require('moment');
var db = require('./lib/database');
var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var adduser = require('./routes/adduser');
var order = require('./routes/order');
var report = require('./routes/report');
var logout = require('./routes/logout');
var resource = require('./routes/resource');
var change = require('./routes/change');
var team = require('./routes/team');
var location = require('./routes/location');
var type = require('./routes/type');
var template = require('./routes/template');
var api = require('./routes/api');
var detail = require('./routes/detail');
var position = require('./routes/position');
var test = require('./routes/test');
var model = require('./routes/model');
var size = require('./routes/size');
var importpage = require('./routes/import');
var manufacturer = require('./routes/manufacturer');
var app = express(); 


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(cookieParser());
app.use(session({secret: 'dasdsadsadwqre32543tgewr3q'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', login);
app.use('/users', users);
app.use('/login',login);
app.use('/adduser',adduser);
app.use('/order',order);
app.use('/report',report);
app.use('/logout',logout);
app.use('/asset',resource);
app.use('/change',change);
app.use('/team',team);
app.use('/location',location);
app.use('/type',type);
app.use('/template',template);
app.use('/detail',detail);
app.use('/position',position);
app.use('/test',test);
app.use('/model',model);
app.use('/size',size);
app.use('/manufacturer',manufacturer);
app.use('/import',importpage);

//api of the location
app.get('/api/locations',api.findAllLab);
app.delete('/api/locations/:id',api.deleteLab);

// //api of teams

app.get('/api/teams',api.findAllTeams);
app.delete('/api/teams/:id',api.deleteTeam);

//api of type
app.get('/api/types',api.findAllTypes);
app.delete('/api/types/:id',api.deleteType);

//api for deleting user
app.get('/api/users/',api.findAllUsers);
app.delete('/api/users/:id',api.deleteUser);


//api for deleting resource
app.delete('/api/asset/:id',api.deleteResource);
app.get('/api/serverId',api.selectServerId);
app.get('/api/asset',api.selectResources);
app.put('/api/asset/:id',api.updateResource);

//api for template operation
app.get('/api/templates',api.findAllTemplate);
app.get('/api/templates/:name',api.findOneTemplate);
app.delete('api/templates/:id',api.deleteTemplate);


//api of the labs
app.get('/api/position',api.findAllPosition);
app.delete('/api/position/:id',api.deletePosition);
//api for all servers
app.get('/api/servers',api.findAllServer);

app.get('/api/details',api.findAllDetail);
app.get('/api/details/:id',api.findOneDetail);
app.delete('/api/details/:id',api.deleteDetail);



//api of the orders
app.get('/api/orders',api.findAllOrder);
app.delete('/api/orders/:id',api.deleteOrder);


//api of transfer asset

app.post('/api/transfer/',api.transfer);


//api of the model
app.get('/api/model',api.findAllModel);
app.delete('/api/model/:id',api.deleteModel);

//api of the size
app.get('/api/size',api.findAllSize);
app.delete('/api/size/:id',api.deleteSize);

//api of the manu
app.get('/api/manu',api.findAllManu);
app.delete('/api/manu/:id',api.deleteManu);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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
