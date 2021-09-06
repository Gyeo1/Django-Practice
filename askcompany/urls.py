from re import template
import debug_toolbar
from django.conf import settings
from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
from django.urls.conf import include
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required
from django_pydenticon.views import image as pydenticon_image

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',login_required(TemplateView.as_view(template_name='root.html')) , name='root'),
    path('identicon/image/<path:data>', pydenticon_image, name='pydenticon_image'),  
    #순서가 중요하다 아이콘을 인스타그램url보다 아래에 놓으면 이미지가 하나도 안불러와짐!
    path('accounts/',include('accounts.urls')),
    path('',include('instagram.urls')),
    #저 주소 뒤에/아무 값을 입력하면 랜덤 아이콘이 나온다. 아이콘은 layout.html에서 처리를 해준다.
]
if settings.DEBUG: #만약 디버그 모드이면 작동, 미디어 파일에대한 스태틱 server 구현.
    
    urlpatterns+=[
        path('__debug__', include(debug_toolbar.urls)),
    
    ]
    urlpatterns+=static(settings.MEDIA_URL,
                document_root=settings.MEDIA_ROOT)