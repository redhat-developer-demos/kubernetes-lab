#!/bin/bash

mvn clean package; docker build -t rafabene/guestbook-service .