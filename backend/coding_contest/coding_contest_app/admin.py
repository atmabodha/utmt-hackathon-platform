from django.contrib import admin

# Register your models here.
from .models import Contests, ContestDetails, ContestPrizes, ContestRegistration, Users

admin.site.register(Contests)
admin.site.register(ContestRegistration)
admin.site.register(ContestDetails)
admin.site.register(ContestPrizes)
admin.site.register(Users)