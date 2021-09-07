from re import template
import re
from django.contrib.auth.decorators import login_required
# from django.contrib.auth.forms import PasswordChangeForm
from django.urls import reverse_lazy
from accounts.forms import SignupForm,ProfileForm,PasswordChageForm
from django.shortcuts import get_object_or_404, redirect, render
from django.contrib import messages
from django.contrib.auth import login as auth_login
from django.core.mail import send_mail,BadHeaderError
from django.http import HttpResponse
from django.contrib.auth.views import (LoginView, logout_then_login,
        PasswordChangeView as AuthPasswordChangeView, )
from django.conf import settings
from django.contrib.auth.mixins import LoginRequiredMixin
from .models import User
# Create your views here.

def signup(request):
    if request.method =='POST':
        form=SignupForm(request.POST)
        if form.is_valid():
            signed_user=form.save()
            #중요한거? signed_user는 forms.py의 SignupForm 내용을 저장, SignupForm Model.py의 User를 계승함!
            auth_login(request,signed_user) #회원 가입하자마자 로그인
            messages.success(request,"회원 가입을 환영합니다.")
            # signed_user.send_welcome_email() #FIXME: Celery로 처리하는 것을 추천?
            #try파트는 회원 가입 성공시 이메일을 보내는 내용이다.
            try :
                subject="Congraturation!"
                content="회원 가입을 환영합니다."
                admin_email='rlatjdruf99@naver.com'
                send_mail(subject,content ,admin_email, [signed_user.email], fail_silently=False )#send_mail
                next_url=request.GET.get('next','/')#만약 next라는 url이 없다면 root 로
            except BadHeaderError:
                return HttpResponse('Invalid header found.')
            return redirect(next_url)
                
    else:
        form=SignupForm()
    return render(request,'accounts/signup_form.html',{
        'form':form
    })

login=LoginView.as_view(template_name="accounts/login_form.html") #settings에 LOGIN_REDIRECT_URL=''로 설정해두기
                                    #안해놓으면 profile로 가서 profile.html만들기 전까지는 루트로 보낸다


# logout=LogoutView.as_view(next_page="/",template_name="accounts/logout_form.html")
def logout(request):
    messages.success(request,"로그아웃 되셨습니다.")
    return logout_then_login(request)#로그아웃 하자마자 로그인 페이지로 보낸다!

@login_required
def profile_edit(request): #프로필 
    if request.method=='POST':
        form= ProfileForm(request.POST, request.FILES, instance=request.user)
        if form.is_valid():
            form.save()
            messages.success(request,"프로필을 수정/저장했습니다")
            return redirect("profile_edit")
    else:
        form=ProfileForm(instance=request.user) #만약 GET이라면 새로 빈걸 만들지 말고 user를 보낸다
    return render(request,"accounts/profile_edit_form.html",{'form':form})



#비밀 번호변경 view를 상속받아서 success_url을 지정해 준다.
class PasswordChangeView(LoginRequiredMixin,AuthPasswordChangeView):
    form_class=PasswordChageForm #forms.py에서 받아옴
    #아래처럼 하면old와 new 패스워드가 같아도 암호를 변경! 막기 위해선 passwordchangeForm의 상속 받아라
    success_url=reverse_lazy("password_change")
    template_name="accounts/password_change_form.html"
    def form_valid(self, form):
        messages.success(self.request,"암호를 변경 했습니다.")
        return super().form_valid(form) 
        
password_change=PasswordChangeView.as_view()


#follow and unfollow 구현
@login_required
def user_follow(request,username):
    follow_user=get_object_or_404(User,username=username, is_active=True)
    request.user.following_set.add(follow_user)
    #Request의 user가 follow_user를 follow하려 한다.
    
    messages.success(request,f"{follow_user}님을 팔로우 했습니다.")
    redirect_url=request.META.get("HTTP_REFERER","root")#http Refere가 있으면 가져오고 없으면 root로 가라
    return redirect(redirect_url) 

@login_required
def user_unfollow(request,username):
    unfollow_user=get_object_or_404(User,username=username, is_active=True)
    messages.success(request,f"{unfollow_user}님을 언팔로우 했습니다.")
    redirect_url=request.META.get("HTTP_REFERER","root")#http Refere가 있으면 가져오고 없으면 root로 가라
    return redirect(redirect_url) 