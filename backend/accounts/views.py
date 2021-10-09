from django.contrib.auth.models import Permission
from django.db import models
from django.shortcuts import render
from rest_framework.generics import CreateAPIView, ListAPIView
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny
from .serializers import SignupSerializer, SuggestionSerializer
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
