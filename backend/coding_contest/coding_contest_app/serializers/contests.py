from rest_framework import serializers
from ..models import ContestDetails

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