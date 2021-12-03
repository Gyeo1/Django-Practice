from django.urls.conf import include, path
from rest_framework import routers
from rest_framework.routers import DefaultRouter
from . import views
from django.urls import include, path

router = DefaultRouter()
router.register('post', views.PostViewSet)  # post라는 기본 네이밍을 지어준다.

# /commnet라는 url로 접근시 호출하는데 pk에따라 다르게 하고 싶다
# 정규 표현식을 사용한다
router.register(r'post/(?P<post_pk>\d+)/comments', views.CommentViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
