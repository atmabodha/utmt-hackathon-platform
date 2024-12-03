# coding_contest_app/urls/participant_urls.py

from django.urls import path
from  ..views.contests import ContestsDetailsView, ContestRegistrationView, ContestsPrizesView, ContestsProblemsView, ContestCreateUpdateView, ProblemsCreateUpdateView, ContestDeleteView

urlpatterns = [
    path('contests/', ContestsDetailsView.as_view(), name='contest_details'),
    path('contests/registration/', ContestRegistrationView.as_view(), name='contest_details'),
]
