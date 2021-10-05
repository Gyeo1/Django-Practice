from django.contrib.auth.models import Permission
from django.db import models
from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny
from .serializers import SignupSerializer
# Create your views here.


class SignupView(CreateAPIView):
    models = get_user_model()
    serializer_class = SignupSerializer
    permission_classes = [
        AllowAny,
    ]
