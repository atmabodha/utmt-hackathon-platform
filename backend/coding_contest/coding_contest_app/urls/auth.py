from django.urls import path
from ..views import authentications

urlpatterns = [
    path('signup/', authentications.signup, name='signup'),
    path('login/', authentications.login, name='login'),
    path('logout/', authentications.logout, name='logout'),
]