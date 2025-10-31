from django.shortcuts import render
from .dataImport import Stats

# Create your views here.
def homeView(request):
	return render(request, "home.html")

def statistiquesView(request):
	stats = Stats()
	return render(request, "Recuperation/statistiques.html", {"stats": stats})