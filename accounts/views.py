from accounts.forms import SignupForm
from django.shortcuts import redirect, render
from django.contrib import messages
from django.core.mail import send_mail,BadHeaderError
from django.http import HttpResponse
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