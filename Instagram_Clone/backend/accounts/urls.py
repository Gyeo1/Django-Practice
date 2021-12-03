from django.urls import path
from . import views
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token
urlpatterns = [
    path('signup/', views.SignupView.as_view(), name='login'),
    path('token/', obtain_jwt_token),
    path("token/refresh/", refresh_jwt_token),
    path("token/verifiy/", verify_jwt_token),

    path("suggestions/", views.SuggestionListAPIView.as_view(),
         name="suggest_user_list"),

    path("follow/", views.user_follow, name="user_follow"),
    path("unfollow/", views.user_unfollow, name="user_unfollow"),
]
