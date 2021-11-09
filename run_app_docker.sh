#!/bin/bash
# This should be executed in powershell on windows
# If you're on mac, you may have different commands, I don't mac
# Requires you to have docker-compose installed and Docker set up
# Simply run this executable with ./run_app_docker.sh
# Or you can put in the commands by hand (I know, two whole commands. Ambitious)

# build image
docker-compose build 
# Start app
docker-compose up -d
# Can visit site at localhost:8000

# TO SHUT DOWN COLORCODE:
# docker-compose down