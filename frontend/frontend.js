/**
 * JBoss, Home of Professional Open Source Copyright 2016, Red Hat, Inc. and/or
 * its affiliates, and individual contributors by the
 * 
 * @authors tag. See the copyright.txt in the distribution for a full listing of
 *          individual contributors.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at http://www.apache.org/licenses/LICENSE-2.0 Unless required by
 * applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific
 * language governing permissions and limitations under the License.
 */

var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();

var guestbookendpoint = 'http://guestbook-service:8080/api/messages';
var helloendpoint = 'http://helloworld-service-vertx:8080/api/hello/';

// Default request handling
function defaultHandling(res, next) {
  return function(error, response, body) {
    if (!error && response.statusCode == 200) {
        res.send(body || '');
    } else {
      next(error);
    }
  }
}

// Default error handling
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message : err.message,
    error : err
  });
});

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended : true
}));

// Static content routing
app.use('/', express.static('.'));

app.post('/api/messages', function(req, res, next) {
  console.log('redirecting POST request to ' + guestbookendpoint);
  console.log('POST content: ' + JSON.stringify(req.body));
  request.post({
    'url' : guestbookendpoint,
    'form' : req.body
  }, defaultHandling(res, next));
});

app.get('/api/messages', function(req, res, next) {
  console.log('redirecting GET request to ' + guestbookendpoint)
  request(guestbookendpoint, defaultHandling(res, next))
});

app.get('/api/hello/:name', function(req, res, next) {
  console.log('redirecting GET request to ' + helloendpoint + req.params.name)
  request(helloendpoint + req.params.name, defaultHandling(res, next))
});

var server = app.listen(8080, '0.0.0.0', function() {
  var host = server.address().address
  var port = server.address().port

  console.log("Frontend service running at http://%s:%s", host, port)
});