FROM python:3
ENV PYTHONUNBUFFERED 1
WORKDIR /ColorCode
COPY . .
RUN pip3 install -r requirements.txt
EXPOSE 8000