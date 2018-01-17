var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var mysql = require('mysql');

var app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(express.static('upload'));

var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'vue',
  password : 'root',
  database : 'kequ'
});

var ticket = require('./routes/ticket');
ticket.listen(app,conn,multer);

app.listen(8888);
console.log('start server');

