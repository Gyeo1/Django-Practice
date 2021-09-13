from django.shortcuts import render

from rest_framework.viewsets import ModelViewSet
from .serializers import PostSerializer
from .models import Post
# Create your views here.

#아래 두가지를 한번에 해주는게 ModelViewSet이다!
# def post_list(request):
#     pass
# def post_detail(request,pk):
#     pass

class PostViewSet(ModelViewSet):
    #모델 ViewSet의 기본 구성, post_list의 2개분기, Post_detail의 3개분기를 두개로 간단히 정리가능
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    