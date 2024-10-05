
from rest_framework import serializers
from ..models import Users

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['user_id', 'email', 'name']