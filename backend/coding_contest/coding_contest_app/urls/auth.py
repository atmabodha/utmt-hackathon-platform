from django.urls import path
from ..views import authentications

urlpatterns = [
    path('signup/', authentications.SignUpView.as_view(), name='signup'),
]