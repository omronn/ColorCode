from rest_framework import serializers
from .models import UserPreferences

class UserPreferencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPreferences
        fields = ('id', 'user', 'light_dark', 'neon_pastel', 
                'one_many_hues', 'bold_subtle', 'num_colors', 'main_color')

class UpdateUserPreferencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPreferences
        fields = ('light_dark', 'neon_pastel', 'one_many_hues', 
                'bold_subtle', 'num_colors', 'main_color')