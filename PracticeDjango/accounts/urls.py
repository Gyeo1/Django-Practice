from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns=[
    path(r'api-token-auth/',obtain_auth_token), #토큰 응답을 얻기 위한 url
]