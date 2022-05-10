from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import Post, Comment, Tag
# Register your models here.


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['photo_tag', 'caption']
    list_display_links = ['caption']

    def photo_tag(self, post):
        # mark safe는 제한전 안정석을 부여함
        return mark_safe(f"<img src={post.photo.url} style='width:100px;' />")
        # 함수로 막 쓰면 안된다. 다른 사람이 악성 코드 유출할 수 있기 때문


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    pass


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    pass
