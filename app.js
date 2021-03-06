'use strict';

var SwaggerRestify = require('swagger-restify-mw');
var restify = require('restify');
var app = restify.createServer();

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerRestify.create(config, function(err, swaggerRestify) {
  if (err) { throw err; }

  swaggerRestify.register(app);
  if(!module.parent){
    var port = process.env.PORT || 10010;
    app.listen(port);
    console.log(`Listening on http://127.0.0.1:${port}`);
  }
  
});
