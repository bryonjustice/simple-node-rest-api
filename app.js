var express = require('express');
var apiraces = require('./routes/api/api-grades');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('dotenv').config();

// app object denotes the Express application
var app = express();

// returns middleware that only parses urlencoded bodies
// 'extended:false' - parsing the URL-encoded data w/ querystring library (vs qs).
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// initialize mongoose and connections
mongoose.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PWD +
  '@' + process.env.DB_HOST_PRIMARY + ',' + process.env.DB_HOST_SECONDARY + ',' +
  process.env.DB_HOST_TERTIARY + '/' + process.env.DB_NAME + '?' + process.env.DB_OPTIONS);

// get the db.connection and listen for its event
var db = mongoose.connection;

// event listener - succesful connection
db.on('open', function(){
  console.log("connected to mongodb");
})
.catch((err)=>{
  console.error(`connection error:${err}`)
});

// app.get to the root web site (ie '/') are redirected to races
app.get('/', (req, res)=>{
  res.redirect('/api/grades')
});

// Mounts the specified routes/api/races.js (middleware)
app.use('/api/grades', apiraces);

module.exports = app;
