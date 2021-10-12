from django.db import models
from django.db.models import fields
from rest_framework import request, serializers
from .models import Post, Comment
from django.contrib.auth import get_user_model


# 작성자에 대한 정보를 보여주는 serializer.
class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ["username", "name", "avatar_url"]


class PostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    is_like = serializers.SerializerMethodField("is_like_field")  # 호출

    def is_like_field(self, post):
        # post로 판단을 해야된다. 그러려면 user 정보가 필요하다(로그인중인)
        # 어떻게 로그인 중인 유저를 알 수 있나==>context로 임의의 값을 serializer에서 받기 가능
        # 접근은 self.context로 접근 가능
        if 'request' in self.context:
            user = self.context['request'].user
            return post.like_user_set.filter(pk=user.pk).exists()
        return False

    class Meta:
        model = Post
        fields = ["id", "author", "created_at", "photo", "location",
                  "tag_set", "caption", "is_like"]  # 원래는 전체 필드 지정하면 x, 개발 단계니깐 해보는것


class CommentSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = "__all__"
