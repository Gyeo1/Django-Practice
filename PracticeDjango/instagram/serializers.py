from django.contrib.auth import get_user_model
from rest_framework.serializers import ModelSerializer
from .models import Post

class AuthorSerializer(ModelSerializer):
    class Meta:
        model=get_user_model()
        fields=['username','email']

class PostSerializer(ModelSerializer):
    author=AuthorSerializer()
    class Meta:
        model=Post
        fields=[
            'author',
            'pk',
            'message',
            'created_at',
            'updated_at',
        ]