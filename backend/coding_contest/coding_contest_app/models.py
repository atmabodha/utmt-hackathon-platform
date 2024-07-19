from django.db import models


class Contests(models.Model):
    contest_name = models.CharField(max_length=100)
    organisation_type = models.CharField(max_length=100)
    organisation_name = models.CharField(max_length=100)
    start_date_time = models.DateTimeField()
    end_date_time = models.DateTimeField()
    contest_visibility = models.CharField(max_length=50)
    participant_limit = models.IntegerField(null=True, blank=True)
    contest_image = models.ImageField(upload_to="coding-images", null=True, blank=True)

    def __str__(self):
        return self.contest_name
