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
            post=form.save()
            messages.success(request,"포스팅을 저장 했습니다.")
            return redirect('/') #TODO: get_absolute_url을 나중에 활용한다.
    else:#GET요청 일 경우
        form=PostForm()
    return render(request,"instagram/post_form.html",{
        'form':form,
    })