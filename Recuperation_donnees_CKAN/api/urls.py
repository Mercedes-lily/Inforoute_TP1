from django.urls import path
from .views import EtablissementAPIView
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


schema_view = get_schema_view(
    openapi.Info(
        title="API Établissement Scolaire publique francophone de la ville de Québec",
        default_version='v1',
        description="API de documentaion sur les écoles de la ville de Québec francophone et publique"
    ),
    public=True,
)


urlpatterns = [
    path('ecole/', EtablissementAPIView.as_view(), name = 'ecole_api'),
    path('ecole/<int:etablissement_id>/', EtablissementAPIView.as_view(), name = 'ecole_api_delete'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]
