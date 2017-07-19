/*jshint esversion: 6 */

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var buzzwords = {
  buzzWords: [],
};

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/', (req,res) => {
  res.render('index');
});

app.get('/buzzwords', (req,res) => {
  res.send(buzzwords);
});

app.post('/buzzwords/:buzzword/:score', (req, res) => {
  buzzwords.buzzWords.push(req.params);
  res.send({ "success": true });
});

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('server is on');
});