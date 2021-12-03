from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_jwt.views import obtain_jwt_token,refresh_jwt_token,verify_jwt_token
urlpatterns=[
    # path(r'api-token-auth/',obtain_auth_token), #토큰 응답을 얻기 위한 url
    path('api-jwt-auth/',obtain_jwt_token),
    path('api-jwt-auth/refresh/',refresh_jwt_token),
    path('api-jwt-auth/verify/',verify_jwt_token),
]