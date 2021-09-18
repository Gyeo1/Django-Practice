from django.urls import include, path
from rest_framework.routers import DefaultRouter
from . import views

router=DefaultRouter()
router.register('post',views.PostViewSet) #2개의 url 패턴을 생성해준다. 어디에? ==>router.urls에 리스트 형태로
#한마디로 두개 이상의 url 패턴을 하날 묶기위해 사용? 'post'란 Prefix로 views의 PostViewset의 2개의 url에 대한 패턴 생성.
#리스트 형태의 url은 include를 통해 넣어준다.

urlpatterns=[
    # path('public/',views.post_list),
    path('',include(router.urls)), #prefix는 post이기 때문에 /post가 들어가 있다고 볼 수 있다.
    path('mypost/<int:pk>/',views.PostDetailAPIView.as_view()),
]