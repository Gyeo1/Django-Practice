from django.shortcuts import render
from rest_framework import serializers
from .models import Post
from rest_framework.viewsets import ModelViewSet
from .serializers import PostSerializer
from rest_framework.permissions import AllowAny
# Create your views here.


class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [AllowAny]  # FIXME: 모든 요청을 허락한다 , 추후에 바꾸기
