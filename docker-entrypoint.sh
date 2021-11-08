#!/bin/bash
cd frontend
npm install --silent
cd ..
python3 manage.py migrate && python3 manage.py runserver 0.0.0.0:8000
