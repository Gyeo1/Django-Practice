from django.shortcuts import render
from rest_framework.decorators import api_view, action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from .permissions import IsAuthorOrReadOnly
from rest_framework.viewsets import ModelViewSet
from .serializers import PostSerializer
from .models import Post
from rest_framework import generics
# Create your views here.

#아래 두가지를 한번에 해주는게 ModelViewSet이다!
# def post_list(request):
#     pass
# def post_detail(request,pk):
#     pass

class PostViewSet(ModelViewSet):
    #모델 ViewSet의 기본 구성, post_list의 2개분기, Post_detail의 3개분기를 두개로 간단히 정리가능
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    # authentication_classes = [] #세션인증 토큰인증 방법 설정 가능
    permission_classes = [IsAuthenticated,IsAuthorOrReadOnly]#@login_required 같은 개념이다. 자료 참고

    filter_backends = [SearchFilter,OrderingFilter] #필터 사용
    search_fields=['message'] #검색할 필드명 입력, 여러개 적용 가능
    ordering_fields=['id']# 정렬할 필드명 입력 설정안하면 모든 필드에 대한 정렬 가능
    ordering=['-id'] #-는 역순 정렬이다

    def perform_create(self, serializer):
        author = self.request.user  # 왜 지정이 필요한가? ==> 사용자는 필수 모델 field, But 입력칸이 없다. 따라서 .user로 받아오는것.
        ip = self.request.META['REMOTE_ADDR'] #ip도 마찬가지.
        serializer.save(ip=ip,author=author)

    @action(detail=False,methods=['GET']) #action의 detail?==> pk값을 받아야할 경우 True이다.
    def public(self,request):
        qs=self.get_queryset().filter(is_public=True)
        # serializer=PostSerializer(qs,many=True) #PostSerializer도 가능하지만 지원해주는게 있다.
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)
    @action(detail=True, methods=['PATCH'])
    def set_public(self,request,pk):#pk번째 포스트에 대한 request 내용을 적용한다란 느낌
        instance=self.get_object()#get_object_or_404 대신 Generic에서 지원해준다.
        instance.is_public=True
        instance.save()
        serializer=self.get_serializer(instance)
        return Response(serializer.data)



#generic에 있는 ListAPIView로 PostList구현
# class PostListAPIView(generics.ListAPIView):
#     queryset = Post.objects.all().filter(is_public=True) #공개된 개시물만 가져온다.
#     serializer_class = PostSerializer

#APIView로 PostList구현하기
# class PostListAPIView(APIView):
#     def get(self,request):
#         queryset = Post.objects.all().filter(is_public=True) #보여줄 데이터 쿼리셋 형식으로 가져오기
#         serializer = PostSerializer(queryset,many=True)   #쿼리셋의 유효성 검사 및 데이터 반환
#         return Response(serializer.data)  #직렬화 해주기
# post_list=PostListAPIView.as_view() #class 기반 뷰에서 사용

#함수기반뷰로 PostList 구현하기
@api_view(['GET','POST']) #GET과 POST를 지원하겠다.
def post_list(request):
    if request.method=='GET':
        serializer=PostSerializer(Post.objects.all().filter(is_public=True),many=True)
        return Response(serializer.data)
    else:#POST인 경우
        serializer=PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=201)
        return Response(serializer.errors, status=400)


class PostDetailAPIView(RetrieveAPIView):
    queryset = Post.objects.all()
    renderer_classes = [TemplateHTMLRenderer]
    template_name='instagram/post_detail.html'
    def get(self,request,*args,**kwargs):
        post=self.get_object()

        return Response({
            'post': post,
        })