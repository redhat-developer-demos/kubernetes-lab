#!/bin/bash
name='rafabene/microservices-guestbook:1.0'
mvn clean package; docker build -t $name .
echo "Image $name built"