from django.urls import path
from . import views
urlpatterns = [
    path('signup/',views.signup,name='signup'), #usl에서 views로 이동하라고 설정!
    
]
