#!/bin/bash
name='rafabene/microservices-frontend:1.0'
docker build -t $name .
echo "Image $name built"