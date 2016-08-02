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

var express = require('express')
var request = require('request')
var bodyParser = require('body-parser')
var app = express()

var guestbookendpoint = 'http://guestbook-service:8080/api/messages'
var helloendpoint = 'http://helloworld-service-vertx:8080/api/hello/'

// Creates a $request callback using $express objects
var defaultHandling = function(res, next) {
  // Callback for $request
  return function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body || '');
    } else {
      next(error)
    }
  }
}

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended : true
}));

// Static content routing
app.use('/', express.static('.'))

// Static content routing
app.use('/api/health', function(req, res, next) {
   res.send('I am ok');
});


app.post('/api/messages', function(req, res, next) {
  console.log('POST content %s to %s', JSON.stringify(req.body), guestbookendpoint)
  // Make a POST to guestbook endpoint
  request.post({
    'url' : guestbookendpoint,
    'form' : req.body,
    'timeout' : 1500
  }, defaultHandling(res, next))
});

app.get('/api/messages', function(req, res, next) {
  console.log('redirecting GET request to ' + guestbookendpoint)
  // Get messages from guestbook endpoint
  request({
    'url' : guestbookendpoint,
    "timeout" : 1500
  }, defaultHandling(res, next))
});

app.get('/api/hello/:name', function(req, res, next) {
  var dest = helloendpoint + req.params.name
  console.log('redirecting GET request to ' + dest)
  // Get the hello world message from helloworld-vertx endpoint
  request({
    'url' : dest,
    'timeout' : 1500
  }, defaultHandling(res, next))
});

var server = app.listen(8080, '0.0.0.0', function() {
  var host = server.address().address
  var port = server.address().port

  console.log("Frontend service running at http://%s:%s", host, port)
});