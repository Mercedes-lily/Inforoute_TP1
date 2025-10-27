from graphene_django import DjangoObjectType
from Recuperation.models import IDE, IMSE, SFR, Coordonnee, Etablissement, Regroupement
import graphene

class CoordonneeType(DjangoObjectType):
	class Meta:
		model = Coordonnee
		fields = ("id", "adresse", "municipalite", "code_postal", 
			"site", "telephone")

class QueryCoordonnee(graphene.ObjectType):
	all_coordonnees = graphene.List(CoordonneeType)
	coordonnee_by_id = graphene.Field(CoordonneeType, 
										id=graphene.Int(required=True))
	
	def resolve_all_coordonnees(root, info):
		return Coordonnee.objects.all()
	def resolve_coordonnee_by_id(root, info, id):
		try:
			return Coordonnee.objects.get(pk=id)
		except Coordonnee.DoesNotExist:
			return None

class IMSEType(DjangoObjectType):
	class Meta:
		model = IMSE
		fields = ("id", "indice", "rang")

class QueryIMSE(graphene.ObjectType):
	all_imse = graphene.List(IMSEType)
	imse_by_id = graphene.Field(IMSEType, 
										id=graphene.Int(required=True))

	def resolve_all_imse(root, info):
		return IMSE.objects.all()
	def resolve_imse_by_id(root, info, id):
		try:
			return IMSE.objects.get(pk=id)
		except IMSE.DoesNotExist:
			return None

class SFRType(DjangoObjectType):
	class Meta:
		model = SFR
		fields = ("id", "indice", "rang")

class QuerySFR(graphene.ObjectType):
	all_sfr = graphene.List(SFRType)
	sfr_by_id = graphene.Field(SFRType, 
										id=graphene.Int(required=True))

	def resolve_all_sfr(root, info):
		return SFR.objects.all()
	def resolve_sfr_by_id(root, info, id):
		try:
			return SFR.objects.get(pk=id)
		except SFR.DoesNotExist:
			return None

class IDEType(DjangoObjectType):
	class Meta:
		model = IDE
		fields = ("id", "sfr", "imse", "defavorisation")

class QueryIDE(graphene.ObjectType):
	all_ide = graphene.List(IDEType)
	ide_by_id = graphene.Field(IDEType, 
										id=graphene.Int(required=True))
	
	def resolve_all_ide(root, info):
		return IDE.objects.all()
	def resolve_ide_by_id(root, info, id):
		try:
			return IDE.objects.get(pk=id)
		except IDE.DoesNotExist:
			return None

class RegroupementType(DjangoObjectType):
	class Meta:
		model = Regroupement
		fields = ("id", "code", "nom", "nom_court", "coordonnee", 
			"superficie", "perimetre", "langue")
		
class QueryRegroupement(graphene.ObjectType):
	all_regroupements = graphene.List(RegroupementType)
	regroupement_by_id = graphene.Field(RegroupementType, 
										id=graphene.Int(required=True))
	
	def resolve_all_regroupements(root, info):
		return Regroupement.objects.all()
	def resolve_regroupement_by_id(root, info, id):
		try:
			return Regroupement.objects.get(pk=id)
		except Regroupement.DoesNotExist:
			return None

class EtablissementType(DjangoObjectType):
	class Meta:
		model = Etablissement
		fields = ("id", "codeOrg", "codeImm", "nom", "coordonnee", 
			"prescolaire", "primaire", "secondaire", "professionnel", 
			"adulte", "type", "ide", "regroupement")

class QueryEtablissement(graphene.ObjectType):
	all_etablissements = graphene.List(EtablissementType)
	etablissements_by_id = graphene.Field(EtablissementType, 
										id=graphene.Int(required=True))

	def resolve_all_etablissements(root, info):
		return Etablissement.objects.all()

	def resolve_etablissements_by_id(root, info, id):
		try:
			return Etablissement.objects.get(pk=id)
		except Etablissement.DoesNotExist:
			return None

class CreateCoordonnee(graphene.Mutation):
	class Arguments:
		adresse = graphene.String(required=True)
		municipalite = graphene.String(required=True)
		code_postal = graphene.String(required=True)
		site = graphene.String()
		telephone = graphene.String()

	coordonnee = graphene.Field(CoordonneeType)

	def mutate(root, info, adresse, municipalite, code_postal, site=None, telephone=None):
		coordonnee = Coordonnee(
			adresse=adresse,
			municipalite=municipalite,
			code_postal=code_postal,
			site=site,
			telephone=telephone
		)
		coordonnee.save()
		return CreateCoordonnee(coordonnee=coordonnee)

class DeleteCoordonnee(graphene.Mutation):
	class Arguments:
		id = graphene.Int(required=True)

	success = graphene.Boolean()

	def mutate(root, info, id):
		try:
			coordonnee = Coordonnee.objects.get(pk=id)
			coordonnee.delete()
			return DeleteCoordonnee(success=True)
		except Coordonnee.DoesNotExist:
			return DeleteCoordonnee(success=False)
		
class CreateIDE(graphene.Mutation):
	class Arguments:
		sfr = graphene.Argument(graphene.ID, required=True)
		imse = graphene.Argument(graphene.ID, required=True)
		defavorisation = graphene.Boolean(required=True)

	ide = graphene.Field(IDEType)

	def mutate(root, info, sfr, imse, defavorisation):
		ide = IDE(
			sfr=sfr,
			imse=imse,
			defavorisation=defavorisation
		)
		ide.save()
		return CreateIDE(ide=ide)

class DeleteIDE(graphene.Mutation):
	class Arguments:
		id = graphene.Int(required=True)

	success = graphene.Boolean()

	def mutate(root, info, id):
		try:
			ide = IDE.objects.get(pk=id)
			ide.delete()
			return DeleteIDE(success=True)
		except IDE.DoesNotExist:
			return DeleteIDE(success=False)
		
class CreateIMSE(graphene.Mutation):
	class Arguments:
		indice = graphene.Float(required=True)
		rang = graphene.Int(required=True)

	imse = graphene.Field(IMSEType)

	def mutate(root, info, indice, rang):
		imse = IMSE(
			indice=indice,
			rang=rang
		)
		imse.save()
		return CreateIMSE(imse=imse)
	
class DeleteIMSE(graphene.Mutation):
	class Arguments:
		id = graphene.Int(required=True)

	success = graphene.Boolean()

	def mutate(root, info, id):
		try:
			imse = IMSE.objects.get(pk=id)
			imse.delete()
			return DeleteIMSE(success=True)
		except IMSE.DoesNotExist:
			return DeleteIMSE(success=False)

class CreateSFR(graphene.Mutation):
	class Arguments:
		indice = graphene.Float(required=True)
		rang = graphene.Int(required=True)

	sfr = graphene.Field(SFRType)

	def mutate(root, info, indice, rang):
		sfr = SFR(
			indice=indice,
			rang=rang
		)
		sfr.save()
		return CreateSFR(sfr=sfr)

class DeleteSFR(graphene.Mutation):
	class Arguments:
		id = graphene.Int(required=True)

	success = graphene.Boolean()

	def mutate(root, info, id):
		try:
			sfr = SFR.objects.get(pk=id)
			sfr.delete()
			return DeleteSFR(success=True)
		except SFR.DoesNotExist:
			return DeleteSFR(success=False)
		
class CreateRegroupement(graphene.Mutation):
	class Arguments:
		code = graphene.Int(required=True)
		nom = graphene.String(required=True)
		nom_court = graphene.String(required=True)
		coordonnee = graphene.Argument(graphene.ID, required=True)
		superficie = graphene.Int(required=True)
		perimetre = graphene.Int(required=True)
		langue = graphene.String(required=True)

	regroupement = graphene.Field(RegroupementType)

	def mutate(root, info, code, nom, nom_court, coordonnee, superficie, perimetre, langue):
		regroupement = Regroupement(
			code=code,
			nom=nom,
			nom_court=nom_court,
			coordonnee=coordonnee,
			superficie=superficie,
			perimetre=perimetre,
			langue=langue
		)
		regroupement.save()
		return CreateRegroupement(regroupement=regroupement)
	
class DeleteRegroupement(graphene.Mutation):
	class Arguments:
		id = graphene.Int(required=True)

	success = graphene.Boolean()

	def mutate(root, info, id):
		try:
			regroupement = Regroupement.objects.get(pk=id)
			regroupement.delete()
			return DeleteRegroupement(success=True)
		except Regroupement.DoesNotExist:
			return DeleteRegroupement(success=False)

class CreateEtablissement(graphene.Mutation):
	class Arguments:
		codeOrg = graphene.Int(required=True)
		codeImm = graphene.Int(required=True)
		nom = graphene.String(required=True)
		type = graphene.String(required=True)
		coordonnee = graphene.Argument(graphene.ID, required=True)
		prescolaire = graphene.Boolean(required=True)
		primaire = graphene.Boolean(required=True)
		secondaire = graphene.Boolean(required=True)
		professionnel = graphene.Boolean(required=True)
		adulte = graphene.Boolean(required=True)
		ide = graphene.Argument(graphene.ID, required=False)
		regroupement = graphene.Argument(graphene.ID, required=True)

	etablissement = graphene.Field(EtablissementType)

	def mutate(root, info, codeOrg, codeImm, nom, coordonnee, type, prescolaire, primaire, 
			secondaire, professionnel, adulte, ide, regroupement):
		etablissement = Etablissement(
			codeOrg=codeOrg,
			codeImm=codeImm,
			nom=nom,
			coordonnee=coordonnee,
			type=type,
			prescolaire=prescolaire,
			primaire=primaire,
			secondaire=secondaire,
			professionnel=professionnel,
			adulte=adulte,
			ide=ide,
			regroupement=regroupement
		)
		etablissement.save()
		return CreateEtablissement(etablissement=etablissement)

class DeleteEtablissement(graphene.Mutation):
	class Arguments:
		id = graphene.Int(required=True)

	success = graphene.Boolean()

	def mutate(root, info, id):
		try:
			etablissement = Etablissement.objects.get(pk=id)
			etablissement.delete()
			return DeleteEtablissement(success=True)
		except Etablissement.DoesNotExist:
			return DeleteEtablissement(success=False)

class Query(QueryEtablissement, QueryCoordonnee, QueryIDE, 
			QueryIMSE, QuerySFR, QueryRegroupement, graphene.ObjectType):
	test = graphene.String(default_value="Hello, GraphQL!") #query for testing endpoint

class Mutation(graphene.ObjectType):
	create_etablissement = CreateEtablissement.Field()
	delete_etablissement = DeleteEtablissement.Field()
	create_coordonnee = CreateCoordonnee.Field()
	delete_coordonnee = DeleteCoordonnee.Field()
	create_ide = CreateIDE.Field()
	delete_ide = DeleteIDE.Field()
	create_imse = CreateIMSE.Field()
	delete_imse = DeleteIMSE.Field()
	create_sfr = CreateSFR.Field()
	delete_sfr = DeleteSFR.Field()
	create_regroupement = CreateRegroupement.Field()
	delete_regroupement = DeleteRegroupement.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)