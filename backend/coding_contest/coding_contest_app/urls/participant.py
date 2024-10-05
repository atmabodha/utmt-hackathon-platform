# coding_contest_app/urls/participant_urls.py

from django.urls import path
from ..views.contests import ContestsDetailsView

urlpatterns = [
    path('contests/', ContestsDetailsView.as_view(), name='contest_details'),
]

