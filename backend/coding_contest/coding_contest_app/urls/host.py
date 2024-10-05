from django.urls import path
from  ..views.contests import ContestsDetailsView, ContestsPrizesView

urlpatterns = [
    path('contests/edit/details/', ContestsDetailsView.as_view(), name='contest_details'),
    path('contests/edit/prizes/', ContestsPrizesView.as_view(), name='contest_prizes'),
]
