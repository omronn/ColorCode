#!/bin/bash

# TO RUN COLORCODE on Windows:
# Prereq: Have docker-compose installed
# 1) Open windows powershell
# 2) cd to the directory that contains this file
# 3) run "dos2unix run_app_docker.sh" to ensure that this file works properly
# 3a) TROUBLESHOOT: if dos2unix was not recognized, run "bash" and then continue from step 3
# 4) run "./run_app_docker.sh"
# 5) visit localhost:8000, enjoy!
# 6) Once done, run "docker-compose down" in the directory that contains this file
# 7) All Done!

# build image
docker-compose build 
# Start app
docker-compose up -d
# Can visit site at localhost:8000

# TO SHUT DOWN COLORCODE:
# docker-compose down