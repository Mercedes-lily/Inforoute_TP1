from django.urls import path
from .views import EtablissementAPIView

urlpatterns = [
    path('ecole/', EtablissementAPIView.as_view(), name = 'ecole_api'),
]
