var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

// setting up access to static folders

app.use(express.static(path.join(_dirname, 'public')));

app.use('/uploads', express.static('uploads'));

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

// handling cors errors

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.headersSent('Access-Control-Allow-Methods', POST, PUT, GET, DELETE);
    return res.status(200).json({})
  }
  next();
});

// handle error

app.use((req, res, next) => {
  const error = new Error('NOT FOUND');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message;
    }
  });
});

module.exports = app;