#!/bin/bash
name='rafabene/microservices-helloworld-vertx'
mvn clean package; docker build -t $name .
echo "Image $name built"