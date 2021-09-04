from django import forms
from django.db import models 
from .models import Post 

class PostForm(forms.ModelForm):
    class Meta:
        model=Post
        fields=['photo','caption','location',] #해당 form이 책임을 질 Fields
        widgets={
            "caption":forms.Textarea,
        }