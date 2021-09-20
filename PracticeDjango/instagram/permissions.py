from rest_framework import permissions

class IsAuthorOrReadOnly(permissions.BasePermission): #작성자 아니면 읽기전용 모드인 커스텀 Permission 만들기
    #대부분 Permission Class는 has_permission과 has_object_permission 함수로 이뤄져 있음.

    def has_permission(self, request, view):
        return request.user.is_authenticated #로그인 되어 있다면 True 반환

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS: #SAFE_METHOD는 GET,HEAD, OPTIONS이다
            return True
        return obj.author==request.user #PUT, DELETE 요청시엔 객체의 주인이 요청을 보낸사람과 같은지 확인
    # 요약: 로그인 되어있고 객체의 주인이 PUT/DELETE 요청을 보내면 전부다 True다. 조회 요청은 아무나 상관없이 True 반환


class IsAuthorUpdateOrReadOnly(permissions.BasePermission):
    #작성자는 수정 권한만 주고 삭제는 오직 superuser만.
    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:#조회 요청
            return True

        if request.method=='DELETE':
            return request.user.is_superuser #만약 삭제 명령이 오면 superuser여야만 True 반환!
            #또는 request.is_staff

        return obj.author==request.user #수정시 작성자면 True 반환