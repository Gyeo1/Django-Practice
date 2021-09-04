from django.db import models
from django.conf  import settings
from django.urls import reverse
import re
# Create your models here.
class Post(models.Model):
    author=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)#작성자 모델과 1:N관계 N측에 작성
    photo=models.ImageField(upload_to="instgram/post/%Y/%m/%d") #필드에 대해 적용되는게 아닌 파일 저장시 활용
    caption=models.CharField(max_length=500)
    tag_set=models.ManyToManyField('Tag',blank=True)#아래 태그 클래스와 M2M필드 연관관계 
    location=models.CharField(max_length=100)

    def __str__(self):
        return self.caption


    def extract_tag_list(self): #이 함수는 tag의 모든 값을 뽑아오기 위해 사용한다.
        tag_name_list= re.findall(r"#([a-zA-Z\dㄱ-힇]+)", self.caption) #알파벳과 한글을 뽑아낸다
        tag_list=[]
        for tag_name in tag_name_list: #tag_name_list의 리스트 값을 하나씩 가져옴
            tag,_=Tag.objects.get_or_create(name=tag_name)#리스트 값을 tag란 이름의 값으로 만든다?
            tag_list.append(tag)#tag_list에 값 할당
        return tag_list

    def get_absolute_url(self): #post_detail을 사용할때 강력히 추천되는 함수다
        return reverse("instagram:post_detail", args=[self.pk])
    

class Tag(models.Model):
    name=models.CharField(max_length=50, unique=True)
    def __str__(self):
        return self.name

