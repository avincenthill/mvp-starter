var express = require('express');
var bodyParser = require('body-parser');

// var items = require('../database-mongo');

var app = express();

app.use(express.static(`${__dirname}/../react-client/dist`));

app.listen(1337, function () {
  console.log('fizzbang server listening on port 1337...');
});

