from re import A, T
from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractUser  # 장고의 추상화 유저 모델 지원!
from django.core.mail import send_mail
from django.db.models.enums import Choices
from django.db.models.fields import BLANK_CHOICE_DASH
from django.db.models.lookups import Regex
from django.shortcuts import resolve_url
from django.template.loader import render_to_string
from django.core.validators import RegexValidator
# Create your models here.


class User(AbstractUser):
    class GenderChoices(models.TextChoices):  # textChoice의 문법은 아래와 같다.
        Male = "M", "Male"  # 앞의 M은 DB에 저장되는 값, Male은 실제 보여지는 값이다
        Female = "F", "Female"  # 번역을 생각할 시 _("Female") 이렇게 적어 주자

    # 아래 줄은 Timeline에 Follow 기능 추가를 위해 구현
    follower_set = models.ManyToManyField("self", blank=True)
    following_set = models.ManyToManyField(
        "self", blank=True)  # for request.user

    website_url = models.URLField(blank=True)
    bio = models.TextField(blank=True)
    phone_number = models.CharField(max_length=13, blank=True,
                                    validators=[RegexValidator(r'^010-?[0-9]\d{3}-?\d{4}$')])
    # 정규 표현식의 유효성 검증 -?은 -가 나올수도 있다를 의미하고 [0-9]까지의 숫자가 3번, 4번 나온다란 의미다
    gender = models.CharField(
        max_length=1, choices=GenderChoices.choices, blank=True)
    # 년/월/일로 구분해서 업로드 한다.
    avatar = models.ImageField(
        blank=True, upload_to="accounts/avatar/%Y/%m/%d", help_text='지정된 px 크기로 업로드 해주세요')

    @property  # name으로 접근시 발동
    def name(self):
        return f"{self.first_name} {self.last_name}"

    @property
    def avatar_url(self):  # 아바타 호출시 아바타가 없으면 pydenticon 랜덤 이미지 배포
        if self.avatar:
            return self.avatar.url
        else:
            return resolve_url("pydenticon_image", self.username)

    # ImageField를 사용하면 반드시 HTML의 form에 multipart/form-data가 있는지 확인!+View단에서도 request.File 필요

    # def send_welcome_email(self):
    #     subject=render_to_string("accounts/welcome_email_subject.txt",{
    #         "user":self,
    #     })
    #     content=render_to_string("accounts/welcome_email_content.txt",{
    #         "user":self,
    #     })
    #     sender_email='rlatjdruf99@naver.com'
    #     send_mail(subject ,content ,sender_email, [self.email], fail_silently=False )#send_mail
