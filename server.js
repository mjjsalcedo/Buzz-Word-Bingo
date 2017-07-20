/*jshint esversion: 6 */

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var buzzwords = {
  buzzWords: [],
};

var currentScore = {
  'success': null,
   newScore: 0,
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
  var checkBuzzword = req.body.buzzword;
  var currentArray = buzzwords.buzzWords;
  var test = currentArray.filter(filterBuzzwords);

  if(test.length > 0){
    res.send({ "success": false });
  }

  if(test.length === 0){
  var score = req.body.score;
  var convertToNumber = Number(score);
  req.body.score = convertToNumber;
  buzzwords.buzzWords.push(req.body);
  res.send({ "success": true });
  }

  function filterBuzzwords(item){
    if(item.buzzword === checkBuzzword){
      return true;
    }
  }

});

app.put('/buzzwords', (req,res) =>{
  var checkBuzzword = req.body.buzzword;
  var currentArray = buzzwords.buzzWords;
  var test = currentArray.filter(filterBuzzwords);

  if(test.length === 0){
    currentScore.success = false;
    res.send(currentScore);
  }

  if(test.length > 0){
    test[0].heard = true;
    currentScore.success = true;
    currentScore.newScore += test[0].score;
    res.send(currentScore);
  }

  function filterBuzzwords(item){
    if(item.buzzword === checkBuzzword){
      return true;
    }
  }
});

app.delete('/buzzwords', (req, res) => {
  var checkBuzzword = req.body.buzzword;
  var currentArray = buzzwords.buzzWords;
  var test = currentArray.filter(filterBuzzwords);

  if(test.length === 0){
    res.send({ "success": false });
  }

  if(test.length > 0){
    currentScore.newScore -= test[0].score;
    var hello = currentArray.map(function(e){
      return e.buzzword;}).indexOf(checkBuzzword);

    var removeWord = buzzwords.buzzWords.splice(hello,1);
    res.send({ "success": true });
  }

  function filterBuzzwords(item){
    if(item.buzzword === checkBuzzword){
      return item;
    }
  }

});

app.post('/reset', (req, res)=>{
  buzzwords.buzzWords = [];
  currentScore.newScore = 0;
  res.send({ "success": true });
});

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('server is on');
});