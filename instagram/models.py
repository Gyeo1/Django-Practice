from django.db import models
from django.conf  import settings

# Create your models here.
class Post(models.Model):
    author=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)#작성자 모델과 1:N관계 N측에 작성
    photo=models.ImageField()
    caption=models.CharField(max_length=500)
    tag_set=models.ManyToManyField('Tag',blank=True)#아래 태그 클래스와 M2M필드 연관관계 
    location=models.CharField(max_length=100)

    def __str__(self):
        return self.caption

class Tag(models.Model):
    name=models.CharField(max_length=50, unique=True)
    def __str__(self):
        return self.name

