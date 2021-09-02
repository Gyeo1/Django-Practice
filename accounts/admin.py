from re import U
from django.contrib import admin
from .models import User
# Register your models here.

@admin.register(User) #모델을 등록하는 모습
class UserAdmin(admin.ModelAdmin):
    list_display=['username', 'email', 'website_url','is_active', 'is_superuser', 'is_staff']
    