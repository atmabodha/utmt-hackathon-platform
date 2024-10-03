from django.http import JsonResponse
from appwrite.client import Client
from appwrite.services.account import Account
from appwrite.exceptions import AppwriteException

# Initialize Appwrite Client
client = Client()
client.set_endpoint("https://cloud.appwrite.io/v1")  # Replace with your Appwrite endpoint
client.set_project("66fba8ac0000b1157c1b")       # Replace with your project ID
client.set_key("YOUR_API_KEY")              # Replace with your API Key

# Account service instance
account = Account(client)

def signup(request):
    if request.method == "POST":
        data = request.POST
        email = data.get('email')
        password = data.get('password')
        name = data.get('name')

        try:
            result = account.create(email=email, password=password, name=name)
            print("signup -------------------  success")
            return JsonResponse({'status': 'success', 'user_id': result['$id']})
        except AppwriteException as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)


def login(request):
    if request.method == "POST":
        data = request.POST
        email = data.get('email')
        password = data.get('password')

        try:
            result = account.create_session(email=email, password=password)
            print("login ---------------- success ")
            return JsonResponse({'status': 'success', 'session_id': result['$id']})
        except AppwriteException as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)


def logout(request):
    if request.method == "POST":
        session_id = request.POST.get('session_id')
        try:
            account.delete_session(session_id)
            return JsonResponse({'status': 'success', 'message': 'Logged out successfully'})
        except AppwriteException as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)