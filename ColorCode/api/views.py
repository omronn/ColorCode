from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def tempDummy(request):
    return HttpResponse('<h1> WELCOME TO THE DUMMY </h1>')