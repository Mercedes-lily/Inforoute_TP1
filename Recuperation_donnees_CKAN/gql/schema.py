from graphene_django import DjangoObjectType
from Recuperation.models import Etablissement
import graphene

class EtablissementType(DjangoObjectType):
	class Meta:
		model = Etablissement
		fields = ("id", "codeOrg", "codeImm", "nom", "type")

class Query(graphene.ObjectType):
	all_etablissements = graphene.List(EtablissementType)
	etablissements_by_id = graphene.Field(EtablissementType, id=graphene.Int(required=True))

	def resolve_all_etablissements(root, info):
		return Etablissement.objects.all()

	def resolve_etablissements_by_id(root, info, id):
		try:
			return Etablissement.objects.get(pk=id)
		except Etablissement.DoesNotExist:
			return None



schema = graphene.Schema(query=Query)