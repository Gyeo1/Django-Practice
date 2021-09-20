from rest_framework import permissions

class IsAuthorOrReadOnly(permissions.BasePermission): #작성자 아니면 읽기전용 모드인 커스텀 Permission 만들기
    #요약: 로그인 되어있고 객체의 주인이 요청을 보내면 전부다 True다.

    def has_permission(self, request, view):
        return request.user.is_authenticated #로그인 되어 있다면 True 반환

    def has_object_permission(self, request, view, obj):
        if request in permissions.SAFE_METHODS: #SAFE_METHOD는 GET,HEAD, OPTIONS이다
            return True

        return obj.author==request.user #PUT, DELETE 요청시엔 객체의 주인이 요청을 보낸사람과 같은지 확인