var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mysql = require("mysql2");
var logger = require("morgan");
var db = require("./models");
var routes = require("./routes");

var PORT = process.env.PORT || 3001;
var app = express();

// logging for request to the console
app.use(logger("dev"));

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
app.use(express.static("client/public"));

app.use(routes);
// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  if ( process.env.NODE_ENV === "production" ) {
    res.sendFile(__dirname + "/client/build/index.html");
  } else {
    res.sendFile(__dirname + "/client/public/index.html");
  }
});

db.sequelize.sync().then(function(){
  app.listen(PORT);
});
