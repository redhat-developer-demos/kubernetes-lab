#!/bin/bash
name='rafabene/microservices-frontend:1.0'
npm install; docker build -t $name .
echo "Image $name built"