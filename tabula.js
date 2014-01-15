/*
 * Module dependencies
 */
var express = require('express');
  
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.static(__dirname + '/public'));
app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res) {
  res.render('tabuladisplay');
});

app.listen(3030);