"use strict";

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3002;

// var bodyParser = require('body-parser');
var ejs = require('ejs');

app.set("view engine", "ejs");

app.use(express.static('public'));
// app.use(bodyParser.urlencoded({ extended: true }));

// route for image selected from flickr api call
app.get('/index.ejs', function(req, res) {
  res.render('index');
});

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/api-call', function(req, res) {
  res.render('api-call');
});

app.listen(PORT, function(req, res) {
  console.log(`Listening on port ${PORT}`);
});
