from django.shortcuts import render

# Create your views here.
def statistiques(request):
	return render(request, "statistiques.html")