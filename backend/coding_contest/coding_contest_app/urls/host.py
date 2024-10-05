from django.urls import path
from ..views.contests import ContestsRegistrationView

urlpatterns = [
    path('contests/registration/', ContestsRegistrationView.as_view(), name='contest_registration'),
]
