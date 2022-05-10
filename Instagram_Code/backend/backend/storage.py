from storages.backends.s3boto3 import S3Boto3Storage
# AWS S3에 업로드 하기 위해 사용한다


class S3StaticStorage(S3Boto3Storage):
    location = 'static'


class S3MediaStorage(S3Boto3Storage):
    location = 'media'
