#!/bin/bash
name='rafabene/microservices-frontend:fabric8'
docker build -t $name .
echo "Image $name built"