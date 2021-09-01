from re import template
import debug_toolbar
from django.conf import settings
from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
from django.urls.conf import include
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required
urlpatterns = [
    path('admin/', admin.site.urls),
    path('',login_required(TemplateView.as_view(template_name='root.html')) , name='root'),
    path('accounts/',include('accounts.urls')),
]
if settings.DEBUG: #만약 디버그 모드이면 작동, 미디어 파일에대한 스태틱 server 구현.
    
    urlpatterns+=[
        path('__debug__', include(debug_toolbar.urls)),
    
    ]
    urlpatterns+=static(settings.MEDIA_URL,
                document_root=settings.MEDIA_ROOT)