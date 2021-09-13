from django.urls import include, path
from rest_framework.routers import DefaultRouter
from . import views

router=DefaultRouter()
router.register('post',views.PostViewSet) #2개의 url 패턴을 생성해준다. 어디에? ==>router.urls에 리스트 형태로
#리스트 형태의 url은 include를 통해 넣어준다.
urlpatterns=[
    path('',include(router.urls)),

]