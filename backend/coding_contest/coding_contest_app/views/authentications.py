from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from ..serializers.users import UserCreateSerializer

class SignUpView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        serializer = UserCreateSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({'status': 'success', 'message': 'User added successfully'}, status=200)
        else:
            return Response({'status': 'error', 'message' : 'Internal server error'}, status=400)