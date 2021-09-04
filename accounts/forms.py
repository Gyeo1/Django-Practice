from django.forms import fields
from .models import User
from django import forms
from django.contrib.auth.forms import (UserCreationForm, PasswordChangeForm as AuthPasswordChangeForm)

# class SignupForm(forms.ModelForm):#로그인을 구현하는 form이 필요
#     class Meta:
#         model=User
#         fields=['username', 'password'] 
        #여기서 password라고 해버리면 유저가 입력한 값을 그대로! 보내버림
        #암호는 암호화 되서 저장되어야 하므로 큰 Error이다. 원래는 set_password를 통해 암호화를 해야된다
        #따라서 위처럼 하지말고 아래처럼 이미 구현이 된 UserCreationForm을 활용할 것

class SignupForm(UserCreationForm):#로그인을 구현하는 formd을 제공해준다.
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['email'].required=True #반드시 입력하라고 강제할 수 있다.
        self.fields['first_name'].required=True #반드시 입력하라고 강제할 수 있다.
        self.fields['last_name'].required=True #반드시 입력하라고 강제할 수 있다.

    class Meta(UserCreationForm.Meta):#그대로 Meta를 쓰면 제공되는 form의 MEata를 Overwrite하기 때문
        model=User
        fields=['username', 'email', 'first_name', 'last_name']
    
    def clean_email(self): #이메일 중복을 막기 위한 함수
        email=self.cleaned_data.get('email') #이메일을 가져옴
        if email:   #이메일이 있다면
            qs=User.objects.filter(email=email) #이메일과 같은 내용을 filtering
            if qs.exists():#존재 한다면?
                raise forms.ValidationError("이미 등록된 이메일 주소입니다")#에러 발생
            return email
    
class ProfileForm(forms.ModelForm):
    class Meta:
        model=User
        fields=['avatar','last_name','first_name','website_url','bio','phone_number','gender'] #Model에서 지원할 영역

class PasswordChageForm(AuthPasswordChangeForm):
    #PasswordChangeForm은 clean_password를 활용해 password가 같은지 검사
    def clean_new_password2(self):
        old_password=self.cleaned_data.get('old_password') #old password를 가져오고
        new_password2=super().clean_new_password2()#부모클래스에서 new password를 받아온다.
        #이때 new_password_2는 아랫쪽 칸에서 에러메시지발생 위로 올리고싶다면 1을 써야됨
        #하지만 super즉 부모에서는 1이 없으므로 self의 cleaned_data에서 password_1을 받아온다 아래는 예시
        #new_password1=self.cleaned_data.get('new_password1')
        if old_password==new_password2:#비번이 같다면 에러 발생
            raise forms.ValidationError("이전 암호화 동일합니다! 다르게 입력해 주세요")
        return new_password2