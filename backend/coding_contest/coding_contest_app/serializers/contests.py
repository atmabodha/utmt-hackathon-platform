
from rest_framework import serializers
from ..models import Contests, ContestDetails

class ContestsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contests
        fields = ['host', 'contest_name', 'organization_type', 'organization_name',
                  'start_date_time', 'end_date_time', 'contest_visibility',
                  'participant_limit', 'registration_deadline']
        

class ContestDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContestDetails
        fields = [
            'contest',
            'contest_banner_image',
            'contest_default_banner_image',
            'about',
            'eligibility',
            'rules',
            'others'
        ]
