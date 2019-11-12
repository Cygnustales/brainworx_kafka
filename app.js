var createError = require('http-errors');
var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// var bodyParser = require('body-parser')
var indexRouter = require('./routes/index');
var cors = require('cors');

var app = express();
app.use(cors());
// app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended: false }));
//app.use(cookieParser());
app.use('/', indexRouter);

app.get('/config', (req, res) => {
  res.json(global.gConfig);
});

app.use(function(req, res, next) {
  next(createError(404));
});


module.exports = app;
