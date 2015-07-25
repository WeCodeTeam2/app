var express = require("express"); 
var path = require("path");

var app = express();       

// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname  + '/public/views');
app.engine('html', require('ejs').renderFile); 
app.set('view engine', 'html');

app.get('/', function (req, res) {
   res.render('index.html');
});

var port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log("App available at port: " + port);
});