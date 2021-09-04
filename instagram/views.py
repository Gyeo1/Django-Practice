from django.shortcuts import render,redirect,get_object_or_404
from django.contrib.auth.decorators import login_required
from .forms import PostForm
from django.contrib import messages
from .models import Post, Tag
# Create your views here.
@login_required
def post_new(request):
    if request.method=='POST':
        form=PostForm(request.POST, request.FILES)
        if form.is_valid():
            post=form.save(commit=False)#모델의 대한 필수필드의 값이 지정 안될 수도 있으므로 Flase로 설정
                            #왜나면 form에서 다른 필수 값들은 필드에 지정했지만 author를 지정 안함!! 
            post.author=request.user #따라서 여기서 유저를 지정해주고 save 구현
            post.save()
            #post.tag_set은 blank=True라 상관은 없지만 구현은 아래처럼 한다
            post.tag_set.add(*post.extract_tag_list()) #태그 리스트 가져오는 함수를 tag_set에 추가

            messages.success(request,"포스팅을 저장 했습니다.")
            return redirect(post) 
    else:#GET요청 일 경우
        form=PostForm()
    return render(request,"instagram/post_form.html",{
        'form':form,
    })

def post_detail(request,pk): #pk는 포스트의 number정도라 생각==>몇번째 포스팅?
    post=get_object_or_404(Post,pk=pk)
    return render(request,"instagram/post_detail.html",{
        "post":post
    })