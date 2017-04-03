/**
 * Module dependencies.
 */
var express    = require('express');
var app        = express();
var port       = process.env.PORT || 8080;
var bodyParser = require('body-parser');

// Configuration
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes 
require('./routes/routes.js')(app);
app.listen(port);
console.log('The App runs on port ' + port);