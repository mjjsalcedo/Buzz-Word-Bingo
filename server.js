/*jshint esversion: 6 */

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req,res) => {
  res.send('index');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('server is on');
});