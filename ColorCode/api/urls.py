from django.urls import path
from .views import PreferencesView

urlpatterns = [
    path('UserPreferences', PreferencesView.as_view()),
]