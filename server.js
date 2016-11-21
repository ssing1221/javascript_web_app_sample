//BASE SETUP by Josh
//=============================================================================

//call the packages we need

// body-parser - This is a node.js middleware for handling JSON, Raw, Text and URL encoded form data.
var bodyParser = require('body-parser');
var session = require('express-session');
var favicon = require('serve-favicon');

var config = require('./config.json');

var express = require('express'); // call express
var app = express(); // define our app using express

app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));

//configure app to use bodyParser(). this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(favicon(__dirname + '/app/app-content/img/favicon.ico'));

app.use('/entryAPI', require('./controller/entry.controller'));
app.use('/userAPI', require('./controller/user.controller'));
app.use('/logAPI', require('./controller/log.controller'));

//REGISTER OUR ROUTES 
//=============================================================================

app.use('/scripts', express.static(__dirname + '/node_modules/'));

app.use('/app/app-content/lang/', express.static(__dirname + '/app/app-content/lang/'));
app.use(express.static(__dirname + '/app'));

app.get('/', function(req, res) {
	res.redirect('/index.html');
});



//start server
var server = app.listen(config.serverPort, config.serverIP, function () {
 console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});