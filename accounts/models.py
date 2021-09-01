from re import A
from django.db import models
from django.contrib.auth.models import AbstractUser #장고의 추상화 유저 모델 지원!
# Create your models here.

class User(AbstractUser):
    website_url=models.URLField(blank=True)
    bio=models.TextField(blank=True)
