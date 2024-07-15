# coding_contest_app/urls/participant_urls.py

from django.urls import path
from coding_contest_app import views

urlpatterns = [
    path('contests/', views.ContestDetailsView.as_view(), name='contest_details'),

]

