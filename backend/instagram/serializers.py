from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"  # 원래는 전체 필드 지정하면 x, 개발 단계니깐 해보는것
