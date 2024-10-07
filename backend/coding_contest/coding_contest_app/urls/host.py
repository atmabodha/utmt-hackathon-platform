from django.urls import path
from  ..views.contests import ContestsDetailsView, ContestsPrizesView, ContestsProblemsView, ContestCreateUpdateView, ProblemsCreateUpdateView

urlpatterns = [
    path('contests/edit/details/', ContestsDetailsView.as_view(), name='contest_details'),
    path('contests/edit/prizes/', ContestsPrizesView.as_view(), name='contest_prizes'),
    path('contests/registration/', ContestCreateUpdateView.as_view(), name='contest_registration'),
    path('contests/edit/challenge/', ProblemsCreateUpdateView.as_view(), name='contest_challenge'),
    path('contests/<int:contest_id>/problems/', ContestsProblemsView.as_view(), name='contests_problems'),
    path('<str:user_id>/contests/', ContestsDetailsView.as_view(), name='contests'),
]
