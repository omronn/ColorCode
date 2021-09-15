from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
# Started using a function, will probably swap to classes
# That was we can compartmentalize aspects of the page more effectively
# ie constructing a color wheel may require some additional code
def home(request):
  return render(request, 'HomePage/home.html', context = None)
