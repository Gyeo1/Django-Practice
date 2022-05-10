FROM ubuntu:18.04

RUN apt-get update && apt-get install -y python3-pip && apt-get clean


RUN python3 -m pip install --upgrade pip && python3 -m pip install --upgrade Pillow 
RUN python3 -m pip install boto3
RUN python3 -m pip install psycopg2-binary==2.8.6 

WORKDIR /djangoproject
ADD . /djangoproject
RUN pip3 install -r requirements.txt

ENV PYTHONUNBUFFERED=1


EXPOSE 80

CMD ["gunicorn","backend.wsgi:application","--bind","0.0.0.0:80"]