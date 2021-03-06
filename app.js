/*
----------------------------------------------
    Node Modules
----------------------------------------------
*/
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
/*
----------------------------------------------
    Glboals
----------------------------------------------
*/
var Globals = require("./Globals/variables");

// Configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//DB Connection
mongoose.connect(Globals.connect_url,{ useMongoClient: true });

//Middlewares
app.use(function (req, res, next) {
//  console.log("\nIn middleware\nRequest url :\t"+req.url);
  next();
})

// Routes
require('./routes/routes.js')(app);
app.listen(port);
console.log('The App runs on port ' + port);
