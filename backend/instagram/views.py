from django.shortcuts import render
from rest_framework import serializers
from .models import Post
from rest_framework.viewsets import ModelViewSet
from .serializers import PostSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.db.models import Q
from django.utils import timezone
from datetime import timedelta
# Create your views here.


class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    # FIXME: 모든 요청을 허락한다 , 추후에 바꾸기, 없으면 아무도 내용을 가져가지 못함
    # permission_classes = [IsAuthenticated]

    # def get_queryset(self):
    #     timesince = timezone.now()-timedelta(days=3)
    #     qs = super().get_queryset()
    #     qs = qs.filter(
    #         Q(author=self.request.user) |
    #         Q(author__in=self.request.user.following_set.all())
    #     )
    #     qs = qs.filter(created_at__gte=timesince)
    #     return
