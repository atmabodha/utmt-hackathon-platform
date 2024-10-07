from django.urls import path
from  ..views.contests import ContestsDetailsView, ContestsPrizesView, ContestsRegistrationView, ContestsChallengesView

urlpatterns = [
    path('contests/edit/details/', ContestsDetailsView.as_view(), name='contest_details'),
    path('contests/edit/prizes/', ContestsPrizesView.as_view(), name='contest_prizes'),
    path('contests/registration/', ContestsRegistrationView.as_view(), name='contest_registration'),
    path('contests/edit/challenge/', ContestsChallengesView.as_view(), name='contest_challenge'),
    path('contests/', ContestsRegistrationView.as_view(), name='contests'),

]
