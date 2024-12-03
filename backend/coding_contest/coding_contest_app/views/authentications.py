from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from ..serializers.users import UserCreateSerializer
from firebase_admin import auth
from django.http import JsonResponse
# import firebase_admin
# from firebase_admin import credentials
# import os

# current_dir = os.path.dirname(os.path.abspath(__file__))

# # Construct the full path to the service key file
# service_key_path = os.path.join(current_dir, "firebase_service_key.json")
# cred = credentials.Certificate(service_key_path)
# firebase_admin.initialize_app(cred)

# from rest_framework.authentication import BaseAuthentication
# from rest_framework.exceptions import AuthenticationFailed
# # from django.contrib.auth.models import User  # You can customize this if you have a custom user model

# class FirebaseAuthentication(BaseAuthentication):
#     def authenticate(self, request):
#         # Get the Authorization header
#         auth_header = request.headers.get("Authorization")
#         if not auth_header:
#             return None  # No token, so no authentication is performed

#         # Check if the header contains the Bearer token
#         parts = auth_header.split()
#         if len(parts) != 2 or parts[0] != "Bearer":
#             raise AuthenticationFailed("Invalid token header. No credentials provided.")

#         id_token = parts[1]

#         try:
#             # Verify the token with Firebase Admin SDK
#             decoded_token = auth.verify_id_token(id_token)
#             uid = decoded_token.get("uid")
#             email = decoded_token.get("email")
#         except Exception as e:
#             raise AuthenticationFailed(f"Invalid Firebase token: {str(e)}")

#         return uid, None  # DRF expects a user and optional auth


class SignUpView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    def post(self, request, *args, **kwargs):
        serializer = UserCreateSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({'status': 'success', 'message': 'User added successfully'}, status=200)
        else:
            return Response({'status': 'error', 'message': 'Validation error', 'errors': serializer.errors}, status=400)