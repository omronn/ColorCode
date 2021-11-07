from django.shortcuts import redirect
from rest_framework import generics, status
from rest_framework import serializers
from rest_framework.serializers import Serializer
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserPreferencesSerializer, UpdateUserPreferencesSerializer, PaletteSerializer, UpdatePaletteSerializer
from .models import UserPreferences, PaletteModel
from .generator import colorPalette

class PaletteView(APIView):
    update_serializer_class = UpdateUserPreferencesSerializer
    serializer_class = UserPreferencesSerializer

    def get(self, request, format=None):
        user = self.request.session.session_key
        # If a session exists for user, run palette generation
        if self.request.session.exists(user):
            # TODO return generation results

            queryset = UserPreferences.objects.filter(user=user)

            # check that what we need exists
            if queryset.exists():

                # get user preferences data from request and convert it into something that can be used (serialize it)
                preferences = queryset[0]
                pref_dict = UserPreferencesSerializer(preferences).data

                # THIS GENERATES THE PALETTE! see generator.py for details on the colorPalette class.
                # i think i may have made us a second database to hold it. sorry if that wasnt intended!
                userPalette = colorPalette(pref_dict)

                palettequeryset = PaletteModel.objects.filter(user=user)
                if palettequeryset.exists():
                    preferences = palettequeryset[0]
                    preferences.base_color = userPalette.getBaseColor()
                    preferences.palette_list = userPalette.getJsonPalettes()
                    # Save to db
                    preferences.save(
                        update_fields=['base_color', 'palette_list'])
                    # return updated preferences + ok
                    return Response(PaletteSerializer(preferences).data, status=status.HTTP_200_OK)
                else:
                    preferences = PaletteModel(
                        user=user, base_color=userPalette.getBaseColor(), palette_list=userPalette.getJsonPalettes())
                    preferences.save()
                    return Response(PaletteSerializer(preferences).data, status=status.HTTP_201_CREATED)
        # request not valid, return error
        return Response({'Bad Request': 'User Session does not exist, route to home'}, status=status.HTTP_400_BAD_REQUEST)


class PreferencesView(APIView):
    update_serializer_class = UpdateUserPreferencesSerializer
    serializer_class = UserPreferencesSerializer

    # If they send a get request
    def get(self, request, format=None):
        # If a session does not exist for user, create one
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        user = self.request.session.session_key

        queryset = UserPreferences.objects.filter(user=user)

        # If the user already has preferences saved, get them
        # else create a new, default db entry
        if queryset.exists():
            preferences = queryset[0]
            return Response(UserPreferencesSerializer(preferences).data, status=status.HTTP_200_OK)
        else:
            preferences = UserPreferences(user=user)
            preferences.save()
            return Response(UserPreferencesSerializer(preferences).data, status=status.HTTP_200_OK)

    # If they send a post request
    def post(self, request, format=None):
        # If a session does not exist for user, create one
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        # get data from request and convert it into something that can be used (serialize it)
        serializer = self.update_serializer_class(data=request.data)

        # check if what they want is valid
        if serializer.is_valid():
            light_dark = serializer.data.get('light_dark')
            neon_pastel = serializer.data.get('neon_pastel')
            one_many_hues = serializer.data.get('one_many_hues')
            bold_subtle = serializer.data.get('bold_subtle')
            num_colors = serializer.data.get('num_colors')
            main_color = serializer.data.get('main_color')
            user = self.request.session.session_key

            queryset = UserPreferences.objects.filter(user=user)

            # If the user already has preferences saved, update them
            # else create a new db entry
            if queryset.exists():
                preferences = queryset[0]
                preferences.light_dark = light_dark
                preferences.neon_pastel = neon_pastel
                preferences.one_many_hues = one_many_hues
                preferences.bold_subtle = bold_subtle
                preferences.num_colors = num_colors
                preferences.main_color = main_color
                # Save to db
                preferences.save(update_fields=['light_dark', 'neon_pastel', 'one_many_hues',
                                                'bold_subtle', 'num_colors', 'main_color'])
                # Return updated preferences and ok
                return Response(UserPreferencesSerializer(preferences).data, status=status.HTTP_200_OK)
            else:
                preferences = UserPreferences(user=user, light_dark=light_dark, neon_pastel=neon_pastel,
                                              one_many_hues=one_many_hues, bold_subtle=bold_subtle,
                                              num_colors=num_colors, main_color=main_color)
                preferences.save()
                return Response(UserPreferencesSerializer(preferences).data, status=status.HTTP_201_CREATED)

        # If request not valid, return error
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
