from rest_framework.views import APIView, status, Response
from Recuperation.models import Etablissement
from .serializers import EtablissementSerializer

class EtablissementAPIView(APIView):
    def get(self, request):
        etablissements = Etablissement.objects.all()
        etablissements_serializers = EtablissementSerializer(etablissements, many=True)
        return Response(etablissements_serializers.data, status = status.HTTP_200_OK)
    
    def post(self, request):
        return Response({"message" : "Liste de regroupement"}, status = status.HTTP_200_OK)
    
    def delete(self, request):
        return Response({"message" : "Liste de regroupement"}, status = status.HTTP_200_OK)
