from django.urls.conf import include, path
from rest_framework import routers
from rest_framework.routers import DefaultRouter
from . import views
from django.urls import include, path

router = DefaultRouter()
router.register('post', views.PostViewSet)  # post라는 기본 네이밍을 지어준다.

urlpatterns = [
    path('api/', include(router.urls)),
]
