var express = require("express"); 
var path = require("path");

var app = express();       

// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static(__dirname + '/public'));

app.use('/public/partials', express.static(__dirname + '/public/partials'));

var port = 3000;

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.get('/login', function(req, res){
	res.sendFile(path.join(__dirname+'/public/partials/login.html'));
});

app.get('/dashboard', function(req, res){
	res.sendFile(path.join(__dirname+'/public/partials/dashboard.html'));
});

// need to set up company as dynamic route params
app.get('/company-detail/:company', function(req, res){
	res.sendFile(path.join(__dirname+'/public/partials/company-detail.html'));
});

app.listen(port, function(){
  console.log("App available at port: " + port);
});