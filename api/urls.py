from django.urls import path
from .views import PreferencesView, PaletteView

urlpatterns = [
    path('UserPreferences', PreferencesView.as_view()),
    path('Palette', PaletteView.as_view()),
]