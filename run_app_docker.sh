#!/bin/bash

#### SET-UP TO RUN COLORCODE on Windows: ####
# Prereq: Have docker-compose installed
# 1) Open windows powershell
# 2) cd to the directory that contains this file
# 3) run "dos2unix run_app_docker.sh" to ensure that this file works properly
# 3a) TROUBLESHOOT: if dos2unix was not recognized, run "bash" and then continue from step 3
# 4) run "./run_app_docker.sh"
# 5) visit localhost:8000. See 'USE' instructions below for a step-by-step guide
# 6) Once done, run "docker-compose down" in the directory that contains this file
# 7) All Done!

#### USE: ####
# 1) Select desired settings on the preferences page
# 2) Click “generate” to navigate to the generated palette page
# 3) Explore mockup interfaces using the numbered buttons
# 4) If color palette is unsatisfactory, click “Back” and repeat steps 1-3 to adjust settings
# 5) Once satisfied, click “Export” to download the color palette as a .txt file


# build image
docker-compose build 
# Start app
docker-compose up -d
# Can visit site at localhost:8000

# TO SHUT DOWN COLORCODE:
# docker-compose down