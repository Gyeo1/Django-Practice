FROM ubuntu:18.04

RUN apt-get update && apt-get install -y python3-pip && apt-get clean

#아래 부분을 해줘야 pillow를 사용할수 있는 종속성 파일들을 다운받는다!
RUN python3 -m pip install --upgrade pip && python3 -m pip install --upgrade Pillow 
RUN python3 -m pip install boto3

# 장고 project라는 폴더를 최상위에 만든다.
WORKDIR /djangoproject
ADD . /djangoproject
RUN pip3 install -r requirements.txt

ENV PYTHONUNBUFFERED=1

# ENV AWS_ACCOUNT_KEY=""
# ENV AWS_ACCOUNT_NAME=""
# ENV DJANGO_SETTINGS_MODULE=""

EXPOSE 8000
# CMD ["python3","manage.py","runserver","0.0.0.0:8000"]
CMD ["gunicorn","backend.wsgi:application","--bind","0.0.0.0:80"]