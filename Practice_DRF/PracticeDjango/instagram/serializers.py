from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Post

class AuthorSerializer(serializers.ModelSerializer):#Username 응답용이다.
    class Meta:
        model=get_user_model()
        fields=['username','email']

class PostSerializer(serializers.ModelSerializer):
    # author=AuthorSerializer()
    author_username=serializers.ReadOnlyField(source='author.username')

    class Meta:
        model=Post
        fields=[
            'author_username',
            'pk',
            'message',
            'created_at',
            'updated_at',
            'is_public',
            'ip',
        ]