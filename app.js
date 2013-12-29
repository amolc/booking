
/**
 * Module dependencies
 */

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api'),
  db2 = require('./routes/db2'),
  http = require('http'),
  path = require('path');



var app = module.exports = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

// Socket.io Communication
//io.sockets.on('connection', require('./routes/socket'));

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
//app.set('views', __dirname + '/views');
//app.set('view engine', 'jade');

app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, '/views')));
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);


// JSON API
app.get('/api/cities', api.cities);
app.get('/api/tourtype', api.tourtype);
app.get('/api/tours', api.tours);
app.get('/api/overview', api.overview);
app.get('/api/tourdetail', api.tourdetail);

//db2 
app.get('/db2/addproduct', db2.addproduct);
app.get('/db2/listproduct', db2.listproduct);
app.get('/db2/deleteproduct/:id', db2.deleteproduct);
app.get('/db2/deleteallproduct', db2.deleteallproduct);


//db-cities

app.get('/db2/addcities', db2.addcities);
app.get('/db2/listcities', db2.listcities);
app.get('/db2/deletecities/:id', db2.deletecities);
app.get('/db2/deleteallcities', db2.deleteallcities);




// redirect all others to the index (HTML5 history)
//app.get('*', routes.index);

// Socket.io Communication
//io.sockets.on('connection', require('./routes/socket'));

/**
 * Start Server
 */

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
