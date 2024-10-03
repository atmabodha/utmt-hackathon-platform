from django.urls import path
from ..views import views

urlpatterns = [
    path('add-contest-details/', views.AddContestDetailsView.as_view(), name='add_contest_details'),
    path('contests/', views.ContestDetailsView.as_view(), name='contest_details'),
]
