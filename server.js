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

app.post('/buzzwords', (req, res) => {
  var score = req.body.score;
  var convertToNumber = Number(score);
  req.body.score = convertToNumber;
  buzzwords.buzzWords.push(req.body);
  res.send({ "success": true });
});

/*app.put('/buzzwords/:buzzword/:heard', (req,res) =>{
  buzzwords.buzzWords
});
*/
var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('server is on');
});