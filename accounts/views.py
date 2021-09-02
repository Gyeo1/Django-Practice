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
            messages.success(request,"회원 가입을 환영합니다.")
            # signed_user.send_welcome_email() #FIXME: Celery로 처리하는 것을 추천?
            try :
                subject="Congraturation!"
                content="회원 가입을 환영합니다."
                admin_email='rlatjdruf99@naver.com'
                send_mail(subject,content ,admin_email, [admin_email], fail_silently=False )#send_mail
                next_url=request.GET.get('next','/')#만약 next라는 url이 없다면 root 로
            except BadHeaderError:
                return HttpResponse('Invalid header found.')
            return redirect(next_url)
                
    else:
        form=SignupForm()
    return render(request,'accounts/signup_form.html',{
        'form':form
    })