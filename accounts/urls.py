from django.urls import path
from . import views
urlpatterns = [
    path('login/',views.login, name='login'), #
    path('logout/',views.logout, name='logout'),    
    path('signup/',views.signup,name='signup'), #usl에서 views로 이동하라고 설정!
    path('edit/',views.profile_edit,name='profile_edit'),
]
