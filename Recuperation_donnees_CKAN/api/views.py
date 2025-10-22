from rest_framework.views import APIView, status, Response
from Recuperation.models import Etablissement
from .serializers import EtablissementSerializer

class EtablissementAPIView(APIView):
    def get(self, request):
        etablissements = Etablissement.objects.all()
        etablissements_serializer = EtablissementSerializer(etablissements, many=True)
        return Response(etablissements_serializer.data, status = status.HTTP_200_OK)
    
    def post(self, request):
        etablissements_serializer = EtablissementSerializer(data=request.data)
        if etablissements_serializer.is_valid():
            etablissements_serializer.save()
            return Response({"message" : "Valide"}, status = status.HTTP_201_CREATED)
        else:
           return Response(etablissements_serializer.errors, status = status.HTTP_400_BAD_REQUEST)
         
    def delete(self, request):
        return Response({"message" : "Liste de regroupement"}, status = status.HTTP_200_OK)
