from django.shortcuts import render,redirect
from django.contrib.auth.decorators import login_required
from .forms import PostForm
from django.contrib import messages

# Create your views here.
@login_required
def post_new(request):
    if request.method=='POST':
        form=PostForm(request.POST, request.FILES)
        if form.is_valid():
            post=form.save(commit=False)#모델의 대한 필수필드의 값이 지정 안될 수도 있으므로 Flase로 설정
                            #왜나면 form에서 다른 필수 값들은 필드에 지정했지만 author를 지정 안함!! 
            post.author=request.user #따라서 여기서 유저를 지정해주고 save 구현
            #post.tag_set은 blank=True라 나중에 처리해 보자.
            post.save()
            messages.success(request,"포스팅을 저장 했습니다.")
            return redirect('/') #TODO: get_absolute_url을 나중에 활용한다.
    else:#GET요청 일 경우
        form=PostForm()
    return render(request,"instagram/post_form.html",{
        'form':form,
    })