from django.shortcuts import render
from rest_framework import serializers, status
from rest_framework.response import Response
from .models import Comment, Post
from rest_framework.viewsets import ModelViewSet
from .serializers import CommentSerializer, PostSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.db.models import Q
from django.utils import timezone
from datetime import timedelta
from rest_framework.decorators import action
# Create your views here.


class PostViewSet(ModelViewSet):
    queryset = Post.objects.all().select_related(
        "author").prefetch_related("tag_set")  # manyTomany관계는 prefetch로 묶어준다

    serializer_class = PostSerializer
    # FIXME: 모든 요청을 허락한다 , 추후에 바꾸기, 없으면 아무도 내용을 가져가지 못함
    # permission_classes = [IsAuthenticated]

    def get_serializer_context(self):  # serializer의 context
        context = super().get_serializer_context()
        context["request"] = self.request
        return context

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

    @action(detail=True, methods=["POST"])
    def like(self, request, pk):
        post = self.get_object()
        post.like_user_set.add(self.request.user)
        return Response(status.HTTP_201_CREATED)

    @like.mapping.delete
    def unlike(self, request, pk):
        post = self.get_object()
        post.like_user_set.remove(self.request.user)
        return Response(status.HTTP_204_NO_CONTENT)


class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        # kwarg로 url에서 캡쳐된 값을 가져올 수 있다.
        # 사용하는 이유는 pk번째 post의 commnet를 가져오기 위해
        qs = qs.filter(post__pk=self.kwargs['post_pk'])
        return qs

    def perform_create(self, serializer):
        # post=form.save(commit=False)
        # post.author=self.request.user
        # post.save
        serializer.save(author=self.request.user)  # 작성자도 같이 저장해준다.
        return super().perform_create(serializer)
