from django.shortcuts import render
from rest_framework.decorators import api_view, action
from rest_framework.generics import RetrieveAPIView
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

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
    @action(detail=False,methods=['GET'])
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
    template_name='instagram/post_datail.html'
    def get(self,request,*args,**kwargs):
        post=self.get_object()

        return Response({
            'post':PostSerializer(post).data,
        })