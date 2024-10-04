from django.http import JsonResponse
from appwrite.client import Client
from appwrite.id import ID
from appwrite.services.account import Account
from django.views.decorators.csrf import csrf_exempt

client = Client()
client.set_endpoint("https://cloud.appwrite.io/v1")
client.set_project("66fba8ac0000b1157c1b")
client.set_key("YOUR_API_KEY")

account = Account(client)

@csrf_exempt
def get_current_user(request):
    try:
        user = account.get()
        return JsonResponse({'user': user})
    except:
        return JsonResponse({'error': 'User not authenticated'}, status=401)

@csrf_exempt
def signup(request):
    if request.method == "POST":
        email = request.POST.get('email')
        password = request.POST.get('password')
        name = request.POST.get('name')

        try:
            result = account.create(ID.unique(), email=email, password=password, name=name)
            print("result: ", result)
            return JsonResponse({'status': 'success', 'user_id': result['$id']})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)

@csrf_exempt
def login(request):
    if request.method == "POST":
        data = request.POST
        email = data.get('email')
        password = data.get('password')
        print(password)

        try:
            result = account.create_email_password_session(email = email, password = password )
            print("login data: ", result)
            return JsonResponse({'status': 'success', 'session_id': result['$id']})
        except Exception as e:
            print("exception: ", e)
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)

@csrf_exempt
def logout(request):
    if request.method == "POST":
        session_id = request.POST.get('session_id')
        try:
            account.delete_session(session_id)
            return JsonResponse({'status': 'success', 'message': 'Logged out successfully'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)