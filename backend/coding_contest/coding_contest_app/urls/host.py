from django.urls import path
from  ..views.contests import ContestsDetailsView

urlpatterns = [
    path('contests/details/', ContestsDetailsView.as_view(), name='contest_details'),
]
