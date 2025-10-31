from django.urls import path
from .views import statistiquesView

app_name = 'Recuperation'

urlpatterns = [
    path('statistiques/', statistiquesView, name='statistiques'), 
]