#!/bin/bash

mvn clean package; docker build -t rafabene/microservices-helloworld-vertx .