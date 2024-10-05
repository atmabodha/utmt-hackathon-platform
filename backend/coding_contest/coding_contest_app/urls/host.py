from django.urls import path
from  ..views.contests import ContestsDetailsView, ContestsPrizesView, ContestsRegistrationView

urlpatterns = [
    path('contests/edit/details/', ContestsDetailsView.as_view(), name='contest_details'),
    path('contests/edit/prizes/', ContestsPrizesView.as_view(), name='contest_prizes'),
    path('contests/registration/', ContestsRegistrationView.as_view(), name='contest_registration'),
]
