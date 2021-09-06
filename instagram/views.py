from django.shortcuts import render,redirect,get_object_or_404
from django.contrib.auth.decorators import login_required
from .forms import PostForm
from django.contrib import messages
from django.contrib.auth import get_user_model
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

def user_page(request,username):
    page_user=get_object_or_404(get_user_model(),username=username, is_active=True)
    #user이름을 가져온다 실제이름 아님!
    post_list=Post.objects.filter(author=page_user)
    post_list_count=post_list.count() #실제 DB의 count 쿼리를 주게된다. len은 메모리상에서 동작
    #len을 쓰면 포스팅 갯수가 많아지는 경우에 느리게 동작할 수 있다.
    return render(request,"instagram/user_page.html",{
        "page_user":page_user,
        "post_list":post_list,
        "post_list_count":post_list_count,
    })

@login_required
def index(request):
    return render(request,"instagram/index.html",{

    })
