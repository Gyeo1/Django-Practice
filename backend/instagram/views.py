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
    queryset = Post.objects.all().select_related(
        "author").prefetch_related("tag_set")  # manyTomany관계는 prefetch로 묶어준다

    serializer_class = PostSerializer
    # FIXME: 모든 요청을 허락한다 , 추후에 바꾸기, 없으면 아무도 내용을 가져가지 못함
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):  # 팔로인 중인 유저만 가져온다
        # timesince = timezone.now()-timedelta(days=3)
        qs = super().get_queryset()
        qs = qs.filter(
            Q(author=self.request.user) |
            Q(author__in=self.request.user.following_set.all())
        )
        # qs = qs.filter(created_at__gte=timesince)
        return qs

    def perform_create(self, serializer):
        # post=form.save(commit=False)
        # post.author=self.request.user
        # post.save
        serializer.save(author=self.request.user)  # 작성자도 같이 저장해준다.
        return super().perform_create(serializer)
