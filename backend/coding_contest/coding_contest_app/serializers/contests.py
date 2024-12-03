
from rest_framework import serializers
from ..models import ContestDetails, ContestPrizes, Contests, Problems, ContestProblems, ContestRegistration

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

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['prize_id'] = instance.prize_id  # Add problem_id here
        return representation

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
    class Meta:
        model = ContestProblems
        fields = ['contest', 'problem', 'order_of_problem_in_contest', 'weightage']

class ContestRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContestRegistration
        fields =['contest_submission_time', 'total_time_taken', 'participant', "contest", "registration_date_and_time"]

        # Override the to_representation method to add problem_id
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['registration_id'] = instance.registration_id  # Add problem_id here
        return representation
    
class ContestRegistrationUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContestRegistration
        fields = ['contest_submission_time', 'total_time_taken']