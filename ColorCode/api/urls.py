from django.urls import path
from .views import tempDummy

urlpatterns = [
    path('', tempDummy)
]