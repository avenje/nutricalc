//importing Node modules and initializing Express
const express = require('express'),
      app = express(),
      bodyparser = require('body-parser'),
      logger = require('morgan'),
      mongoose = require('mongoose'),
      config = require('./config/main');

//database connection
mongoose.connect(config.database);

//start the server
const server = app.listen(config.port);
console.log(`Your server is running on port ${config.port}.`);

//setting up basic middleware for all Express requests
app.use(logger('dev')); //log requests to API using morgan
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//enable CORS from client-side
app.use(function(req, res, next) {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods', 'Put, GET, POST, DELETE, OPTIONS');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
   res.header('Access-Control-Allow-Credentials', 'true');
   next();
});