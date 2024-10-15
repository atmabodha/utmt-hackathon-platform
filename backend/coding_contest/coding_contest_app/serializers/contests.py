
from rest_framework import serializers
from ..models import ContestDetails, ContestPrizes, Contests, Problems, ContestProblems

class ContestsCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contests
        fields = ['host', 'contest_name', 'organization_type', 'organization_name',
                  'start_date_time', 'end_date_time', 'contest_visibility',
                  'participant_limit', 'registration_deadline']
        
        
class ContestViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contests
        fields = ['contest_id', 'host', 'contest_name', 'organization_type', 'organization_name',
                  'start_date_time', 'end_date_time', 'contest_visibility',
                  'participant_limit', 'registration_deadline']
        
class ContestDetailsSerializer(serializers.ModelSerializer):
    # contest = ContestViewSerializer(read_only=True)
    class Meta:
        model = ContestDetails
        fields = [
            'contest_banner_image',
            'contest_banner_image_name',
            'contest_default_banner_image',
            'about',
            'eligibility',
            'rules',
            'others'
        ]


class ContestPrizesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContestPrizes
        fields = ['contest', 'prize_position', 'prize_description', 'prize_amount', 'others']


### Problems Serialiser
class ProblemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problems
        fields = ['host', 'name', 'description', 'input_format', 'output_format', 
                  'constraints', 'difficulty_level', 'doc_references', 'weightage', 'tags']
    
    # Override the to_representation method to add problem_id
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['problem_id'] = instance.problem_id  # Add problem_id here
        return representation
    

class ContestProblemsSerializer(serializers.ModelSerializer):
    problem = ProblemsSerializer(read_only=True)  # Nested serializer for Problem
    class Meta:
        model = ContestProblems
        fields = ['contest', 'problem', 'order_of_problem_in_contest', 'weightage']