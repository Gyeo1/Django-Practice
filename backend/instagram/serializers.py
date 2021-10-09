from django.db.models import fields
from rest_framework import serializers
from .models import Post
from django.contrib.auth import get_user_model


# 작성자에 대한 정보를 보여주는 serializer.
class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ["username", "name", "avatar_url"]


class PostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = Post
        fields = "__all__"  # 원래는 전체 필드 지정하면 x, 개발 단계니깐 해보는것
