
from rest_framework import serializers
from .models import Contests

class ContestsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contests
        fields = ['contest_name', 'organisation_type', 'organisation_name',
                  'start_date_time', 'end_date_time', 'contest_visibility',
                  'participant_limit', 'contest_image']
