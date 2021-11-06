from rest_framework import serializers
from .models import PaletteModel, UserPreferences


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


class PaletteSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaletteModel
        fields = ('id', 'user', 'base_color', 'palette_list')


class UpdatePaletteSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaletteModel
        fields = ('base_color', 'palette_list')
