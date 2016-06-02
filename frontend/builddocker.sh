#!/bin/bash
name='rafabene/microservices-frontend'
npm install; docker build -t $name .
echo "Image $name built"