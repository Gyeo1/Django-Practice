from django.forms import fields
from .models import User
from django import forms

class SignupForm(forms.ModelForm):#로그인을 구현하는 form이 필요
    class Meta:
        model=User
        fields=['username','password']