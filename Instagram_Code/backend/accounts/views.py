from django.contrib.auth.models import Permission
from django.db import models
from django.shortcuts import get_object_or_404, render
from rest_framework.generics import CreateAPIView, ListAPIView, get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny
from .serializers import SignupSerializer, SuggestionSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
# Create your views here.


class SignupView(CreateAPIView):
    models = get_user_model()
    serializer_class = SignupSerializer
    permission_classes = [
        AllowAny,
    ]


class SuggestionListAPIView(ListAPIView):  # 추천 인물들을 보여주는 LIST 제공하는 뷰
    queryset = get_user_model().objects.all()
    serializer_class = SuggestionSerializer

    def get_queryset(self):  # 유저 개개인별로 쿼리셋을 따로 만들기 위해 하는 작업
        qs = super().get_queryset()
        qs = qs.exclude(pk=self.request.user.pk)
        # 팔로우 중인 유저는 안겨저온다.
        qs = qs.exclude(pk__in=self.request.user.following_set.all())
        return qs


@api_view(['POST'])
def user_follow(request):
    username = request.data['username']
    follow_user = get_object_or_404(
        get_user_model(), username=username, is_active=True)
    request.user.following_set.add(follow_user)
    follow_user.follower_set.add(request.user)
    return Response(status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def user_unfollow(request):
    username = request.data['username']
    follow_user = get_object_or_404(
        get_user_model(), username=username, is_active=True)
    request.user.following_set.remove(follow_user)
    follow_user.follower_set.remove(request.user)
    return Response(status.HTTP_204_NO_CONTENT)
