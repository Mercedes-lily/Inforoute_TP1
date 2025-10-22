from rest_framework.views import APIView, status, Response

class EtablissementAPIView(APIView):
    def get(self, request):
        return Response({"message" : "Liste de regroupement"}, status = status.HTTP_200_OK)
    
    def post(self, request):
        return Response({"message" : "Liste de regroupement"}, status = status.HTTP_200_OK)
    
    def delete(self, request):
        return Response({"message" : "Liste de regroupement"}, status = status.HTTP_200_OK)
