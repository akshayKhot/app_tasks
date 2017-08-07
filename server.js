var   express           = require('express'),
      _                 = require('lodash'),
      bp                = require('body-parser'),
      request           = require('request'),
      expressValidator  = require('express-validator'),
      util              = require('util'),
      bcrypt            = require('bcrypt'),
      apiRouter         = require('./router'),
      Strategy          = require('passport-local').Strategy;

var app = express();

// Use Middlewares

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", ["PUT", "DELETE"]);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
app.use(bp.json());
app.use(expressValidator());

app.use("/api", apiRouter);


app.listen(3000, () => {
    console.log('Listening on port 3000')
})