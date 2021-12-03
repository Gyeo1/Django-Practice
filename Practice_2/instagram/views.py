import django
from django.contrib import auth
from django.shortcuts import render,redirect,get_object_or_404
from django.contrib.auth.decorators import login_required
from .forms import PostForm,CommentForm
from django.contrib import messages
from django.contrib.auth import get_user_model
from .models import Post, Tag
from django.db.models import Q
from django.utils import timezone
from datetime import timedelta

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
    comment_form=CommentForm()#댓글 작성은 detail에 둠으로써 Ui상의 편리함 제공
    return render(request,"instagram/post_detail.html",{
        "post":post,
        "comment_form":comment_form,
    })

def user_page(request,username):

    page_user=get_object_or_404(get_user_model(),username=username, is_active=True)
    #user이름을 가져온다 실제이름 아님!

    post_list=Post.objects.filter(author=page_user)
    post_list_count=post_list.count() #실제 DB의 count 쿼리를 주게된다. len은 메모리상에서 동작
    #len을 쓰면 포스팅 갯수가 많아지는 경우에 느리게 동작할 수 있다.


    if request.user.is_authenticated:
        is_follow=request.user.following_set.filter(pk=page_user.pk).exists() 
        #로그인 됐을시 page_user가 followingset에 있는지 확인한다. 
        #즉 Follow하고 있으면 True
    else:
        is_follow=False

    return render(request,"instagram/user_page.html",{
        "page_user":page_user,
        "post_list":post_list,
        "post_list_count":post_list_count,
        "is_follow":is_follow,
    })

@login_required
def index(request):
    timesince=timezone.now()-timedelta(days=3) #최근시간에서 3일의 시간을뺌
    post_list=Post.objects.all().filter(
        Q(author=request.user)|
        Q(author__in=request.user.following_set.all()) 
        )
    #포스트 리스트를 가져오는데 팔로잉된 유저들의 내용만 가져온다.

    suggested_user_list=get_user_model().objects.all().\
        exclude(pk=request.user.pk).\
        exclude(pk__in=request.user.following_set.all())
        #현재 로그인 중인 유저와 이미 포함된 유저(pk__in) 제외
        #추천 친구 수를 제한하고 싶으면 [:3] 이렇게 표현 가능
    comment_form=CommentForm()
    return render(request,"instagram/index.html",{
        "suggested_user_list":suggested_user_list,
        "post_list":post_list,
        "comment_form":comment_form,
    })

@login_required
def post_like(request,pk):
    post=get_object_or_404(Post,pk=pk)#해당 pk의 포스트를 가져오는데 성공했다면
    post.like_user_set.add(request.user)#좋아요에 추가

    messages.success(request,f'포스팅 #{post.pk}를 좋아합니다.') 

    redirect_url=request.META.get("HTTP_REFERER","root")#account의 views에서 가져옴
    return redirect(redirect_url) 

@login_required
def post_dislike(request,pk):
    post=get_object_or_404(Post,pk=pk)#해당 pk의 포스트를 가져오는데 성공했다면
    post.like_user_set.remove(request.user)#좋아요에 삭제
    messages.success(request,f'포스팅 #{post.pk} 좋아요를 취소합니다.') 

    redirect_url=request.META.get("HTTP_REFERER","root")#account의 views에서 가져옴
    return redirect(redirect_url) 

@login_required
def comment_new(requset,post_pk):
    post=get_object_or_404(Post,pk=post_pk)#미리 포스트에 대한 검증 실지

    if requset.method=="POST":
        form=CommentForm(requset.POST, requset.FILES)
        if form.is_valid(): 
            comment=form.save(commit=False)#Why?==> fields가 messages만 있으므로 author와 post도 검증필요       
            comment.post= post
            comment.author=requset.user
            comment.save()
            # if requset.is_ajax():
            #     return render(requset,"instagram/_comment.html",{
            #         "comment":comment,
            #     })
            return redirect(comment.post)
    else:
        form=CommentForm()
    return render(requset,"instagram/comment_form.html",{
        "form":form,
    })
    