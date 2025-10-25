from rest_framework.views import APIView, status, Response
from Recuperation.models import Etablissement
from .serializers import EtablissementSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


class EtablissementAPIView(APIView):
    @swagger_auto_schema(tags=['Etablissements'],
    operation_description="Récupérer toutes les écoles",
    responses= {200 : EtablissementSerializer(many=True)})
    def get(self, request):
        etablissements = Etablissement.objects.all()
        etablissements_serializer = EtablissementSerializer(etablissements, many=True)
        return Response(etablissements_serializer.data, status = status.HTTP_200_OK)
    
    @swagger_auto_schema(tags=['Etablissements'],
    operation_description="Ajouter une école",
    responses= {201 : "Établissement créé", 400:"Bad Request"})
    def post(self, request):
        etablissements_serializer = EtablissementSerializer(data=request.data)
        if etablissements_serializer.is_valid():
            etablissements_serializer.save()
            return Response({"message" : "Valide"}, status = status.HTTP_201_CREATED)
        else:
           return Response(etablissements_serializer.errors, status = status.HTTP_400_BAD_REQUEST)



class EtablissementDeleteAPIView(APIView):    
    @swagger_auto_schema(
        tags=['Etablissements'],
        operation_description="Supprimé une école par son ID",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                "id": openapi.Schema(
                    type=openapi.TYPE_INTEGER,
                    description="ID de l'école à supprimer",
                )
            },
            required=["id"], 
        ),
        responses= {204 : "Établissement supprimé", 404:"Not Found"}
    )

    def delete(self, request, etablissement_id):
        try:
            etablissement = Etablissement.objects.get(id=etablissement_id)
        except: 
            return Response({"error" : "Établissement non trouvé"}, status = status.HTTP_404_NOT_FOUND)

        etablissement.delete()
        return Response({"message" : "Établissement supprimée"}, status = status.HTTP_204_NO_CONTENT)
