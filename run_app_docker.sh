#!/bin/bash

# TO RUN COLORCODE on Windows:
# Prereq: Have docker-compose installed
# 1) Open windows powershell
# 2) cd to the directory that contains this file
# 3) run "./run_app_docker.sh"
# 4) visit localhost:8000, enjoy!
# 5) Once done, run "docker-compose down" in the directory that contains this file
# 6) All Done!

# build image
docker-compose build 
# Start app
docker-compose up -d
# Can visit site at localhost:8000

# TO SHUT DOWN COLORCODE:
# docker-compose down