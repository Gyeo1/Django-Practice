from django.urls import path
from . import views
app_name='instagram' #실제 url_reverse의 name_space가 된다.
urlpatterns = [
    path('post_new',views.post_new, name='post_new'),
]
