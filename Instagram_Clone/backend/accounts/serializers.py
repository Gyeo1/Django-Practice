from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth import get_user_model


User = get_user_model()


class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # password 입력 받기

    def create(self, validated_data):
        user = User.objects.create(username=validated_data['username'])
        user.set_password(validated_data['password'])  # password의 암호화
        user.save()
        return user

    class Meta:
        model = User
        fields = ['pk', 'username', 'password']  # password를 암호화 해줘야된다.
        # 암호화된 password는 admin에 가서 user 확인해 보면 된다.


class SuggestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "name", "avatar_url"]  # 유저 이름만 보여주면 ok!
