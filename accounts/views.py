from re import template
from accounts.forms import SignupForm
from django.shortcuts import redirect, render
from django.contrib import messages
from django.core.mail import send_mail,BadHeaderError
from django.http import HttpResponse
from django.contrib.auth.views import LoginView, logout_then_login #로그인 전용 CBV
from django.conf import settings
# Create your views here.

def signup(request):
    if request.method =='POST':
        form=SignupForm(request.POST)
        if form.is_valid():
            signed_user=form.save()
            #중요한거? signed_user는 forms.py의 SignupForm 내용을 저장, SignupForm Model.py의 User를 계승함!
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
    return logout_then_login(request)#로그아웃 하자마자 로그인 페이지로 보낸다!