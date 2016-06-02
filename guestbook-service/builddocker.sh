#!/bin/bash
name='rafabene/microservices-guestbook'
mvn clean package; docker build -t $name .
echo "Image $name built"