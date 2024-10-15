from django.urls import path
from django.urls import re_path
from  ..views.contests import ContestsDetailsView, ContestsPrizesView, ContestsProblemsView, ContestCreateUpdateView, ProblemsCreateUpdateView

urlpatterns = [
    re_path(r'^contests/edit(?:/(?P<contest_id>[\w-]+))?(?:/(?P<user_id>[\w-]+))?/details/$', ContestsDetailsView.as_view(), name='contest_details'),
    path('contests/<int:contest_id>/edit/prizes/', ContestsPrizesView.as_view(), name='contest_prizes'),
    path('contests/registration/', ContestCreateUpdateView.as_view(), name='contest_registration'),
    path('contests/<int:contest_id>/registration/', ContestCreateUpdateView.as_view(), name='contest_update'),
    path('contests/edit/challenge/', ProblemsCreateUpdateView.as_view(), name='contest_challenge'),
    path('contests/<int:contest_id>/problems/', ContestsProblemsView.as_view(), name='contests_problems'),
    path('<str:user_id>/contests/', ContestsDetailsView.as_view(), name='contests'),
]
