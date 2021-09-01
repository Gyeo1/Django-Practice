from accounts.forms import SignupForm
from django.shortcuts import redirect, render
from django.contrib import messages
# Create your views here.

def signup(request):
    if request.method =='POST':
        form=SignupForm(request.POST)
        if form.is_valid():
            user=form.save()
            messages.success(request,"회원 가입을 환영합니다.")
            return redirect("root")
    else:
        form=SignupForm()
    return render(request,'accounts/signup_form.html',{
        'form':form
    })