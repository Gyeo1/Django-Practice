from accounts.forms import SignupForm
from django.shortcuts import render

# Create your views here.

def signup(request):
    if request.method =='POST':
        form=  SignupForm(request.POST)
    else:
        form=SignupForm()
    return render(request,'accounts/signup_form.html',{
        'form':form
    })