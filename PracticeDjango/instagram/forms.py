from django.forms import ModelForm
from .models import Post

class PostForm(ModelForm):
    class Meta:
        model=Post
        fields=['message','is_public'] #나머지 값들은 아래서 지정

#form의 경우 예시. form의 경우에는 이렇게
# form=PostForm(request.POST)
# if form.is_valid():
#     post=form.save(commit=False)
#     post.author=request.user
#     post.ip=request.META['REMOTE_ADDR']
#     post.save()


#Serializer의 예시
# serializer.is_vaild(...)
# serializer.save(author=request.user, ip=request.META['REMOTE_ADDR']) #업데이트하고 싶은 필드를 한번에 정의
#.update()==>self.instance 인자를 지정했을때 사용
#.create()==>instance를 지정하지 않았을때 사용
