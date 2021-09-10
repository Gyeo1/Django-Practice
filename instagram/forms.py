from django import forms
from django.db import models
from django.forms import fields
from django.forms.widgets import Widget 
from .models import Comment, Post 

class PostForm(forms.ModelForm):
    class Meta:
        model=Post
        fields=['photo','caption','location',] #해당 form이 책임을 질 Fields
        widgets={
            "caption":forms.Textarea,
        }

class CommentForm(forms.ModelForm):
    class Meta:
        model= Comment
        fields=["message"] # 댓글 작성시에는 메시지만 있으면 된다.
        widgets={
            "message" : forms.Textarea(attrs={"rows": 3}),
        }