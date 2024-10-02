from django.contrib import admin

# Register your models here.
from .models import Contests, ContestDetails, ContestPrizes, ContestRegistration, Users, SocialMediaLink, Samples
from .models import UserDetails, UserAddress, Problems, ContestProblems, SubmissionResult, Submissions, Ranking, Language, TestCases

admin.site.register(Contests)
admin.site.register(ContestRegistration)
admin.site.register(ContestDetails)
admin.site.register(ContestPrizes)
admin.site.register(Users)
admin.site.register(SocialMediaLink)
admin.site.register(Samples)
admin.site.register(UserAddress)
admin.site.register(UserDetails)
admin.site.register(Problems)
admin.site.register(ContestProblems)
admin.site.register(SubmissionResult)
admin.site.register(Submissions)
admin.site.register(Ranking)
admin.site.register(Language)
admin.site.register(TestCases)