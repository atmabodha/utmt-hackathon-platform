from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from ..serializers.users import UserCreateSerializer
from firebase_admin import auth
from django.http import JsonResponse
import firebase_admin
from firebase_admin import credentials
import os

current_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the full path to the service key file
service_key_path = os.path.join(current_dir, "firebase_service_key.json")
cred = credentials.Certificate(service_key_path)
firebase_admin.initialize_app(cred)

class FirebaseAuthMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Exclude public routes
        if request.path in ["/login/", "/signup/"]:
            return self.get_response(request)

        # Validate token for other routes
        token = request.headers.get("Authorization")
        if not token:
            return JsonResponse({"error": "Unauthorized", "message": "This resouce requires login"}, status=401)
        
        try:
            decoded_token = auth.verify_id_token(token)
            request.user = decoded_token  # Attach user info to request
        except Exception:
            return JsonResponse({"error": "Unauthorized", "message": "This resouce requires login"}, status=401)

        return self.get_response(request)


class SignUpView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    def post(self, request, *args, **kwargs):
        serializer = UserCreateSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({'status': 'success', 'message': 'User added successfully'}, status=200)
        else:
            return Response({'status': 'error', 'message': 'Validation error', 'errors': serializer.errors}, status=400)