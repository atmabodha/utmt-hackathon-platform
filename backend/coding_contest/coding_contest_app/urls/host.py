from django.urls import path
from ..views.contests import ContestsRegistrationView
from  ..views.contests import ContestsDetailsView

urlpatterns = [
    path('contests/registration/', ContestsRegistrationView.as_view(), name='contest_registration'),
    path('contests/details/', ContestsDetailsView.as_view(), name='contest_details'),
]
