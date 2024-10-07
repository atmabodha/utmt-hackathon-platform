from django.urls import path
from  ..views.contests import ContestsDetailsView, ContestsPrizesView, ContestsRegistrationView, ContestsChallengesView, ContestsProblemsView

urlpatterns = [
    path('contests/edit/details/', ContestsDetailsView.as_view(), name='contest_details'),
    path('contests/edit/prizes/', ContestsPrizesView.as_view(), name='contest_prizes'),
    path('contests/registration/', ContestsRegistrationView.as_view(), name='contest_registration'),
    path('contests/edit/challenge/', ContestsChallengesView.as_view(), name='contest_challenge'),
    path('contests/', ContestsRegistrationView.as_view(), name='contests'),
path('contests/<int:contest_id>/problems/', ContestsProblemsView.as_view(), name='contests_problems'),
]
