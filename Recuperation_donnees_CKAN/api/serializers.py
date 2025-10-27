##On fait quoi il est dans le regroupement et ici

from rest_framework import serializers
from Recuperation.models import Etablissement, Coordonnee, Regroupement, IDE, IMSE, SFR

class CoordonneeSerializer(serializers.ModelSerializer):
	class Meta:
		model = Coordonnee
		fields =("adresse", "municipalite", "code_postal", "site", "telephone")

class RegroupementSerializer(serializers.ModelSerializer):
	coordonnee = CoordonneeSerializer() #lors de l<ajouy de regroupement, on ne peut ajouter de coordonnee
	class Meta:
		model = Regroupement
		fields = ("code", "nom", "nom_court", "coordonnee", "superficie", "perimetre", "langue")

class SFRSerializer(serializers.ModelSerializer):
	class Meta:
		model = SFR
		fields = ("indice", "rang")

class IMSESerializer(serializers.ModelSerializer):
	class Meta:
		model = IMSE
		fields = ("indice", "rang")
	

class IDESerializer(serializers.ModelSerializer):
	imse = IMSESerializer()
	sfr = SFRSerializer()
	class Meta:
		model = IDE
		fields = ("sfr", "imse", "defavorisation")	

class EtablissementSerializer(serializers.ModelSerializer):
	coordonnee = CoordonneeSerializer()
	ide = IDESerializer()
	regroupement = RegroupementSerializer()
	class Meta:
		model = Etablissement
		fields = ("id", "codeOrg", "codeImm", "nom", "coordonnee", "prescolaire", "primaire", "secondaire", "professionnel", "adulte", "type", "ide", "regroupement")
	
	def create(self, validated_data):
		#IDE
		ide = validated_data.pop('ide')
		sfr = ide.pop('sfr')
		imse = ide.pop('imse')
		sfr_obj = SFR(indice=sfr['indice'],rang=sfr['rang'])
		sfr_obj.save()
		imse_obj = IMSE(indice=imse['indice'],rang=imse['rang'])
		imse_obj.save()
		if imse_obj.rang >= 8 or sfr_obj.rang >= 8:
			ide_obj = IDE(sfr = sfr_obj, imse = imse_obj, defavorisation = True )
		else:
			ide_obj = IDE(sfr = sfr_obj, imse = imse_obj, defavorisation = False )
		ide_obj.save()


		#Coordonne
		coordonnee = validated_data.pop('coordonnee')
		coordonne_existante = Coordonnee.objects.filter(
        	adresse=coordonnee['adresse'],
        	municipalite=coordonnee['municipalite'],
        	code_postal=coordonnee['code_postal'],
    		site = ['site'],
    		telephone = ['telephone'])
		if	coordonne_existante:
			coordonee_ecole_obj = coordonne_existante.first()
		else :
			coordonnee_ecole_obj = Coordonnee(
				adresse=coordonnee['adresse'],
        		municipalite=coordonnee['municipalite'],
        		code_postal=coordonnee['code_postal'],
    			site = coordonnee['site'],
    			telephone = coordonnee['telephone'])
			coordonnee_ecole_obj.save()


		#regroupement
		regroupement = validated_data.pop('regroupement')
		regroupement_existant = Regroupement.objects.filter(code=regroupement['code'])
		if	regroupement_existant:
			regroupement_obj = regroupement_existant.first()
		else :
			coordonee = regroupement.pop('coordonnee')
			coordonne_existante = Coordonnee.objects.filter(
        		adresse=coordonnee['adresse'],
        		municipalite=coordonnee['municipalite'],
        		code_postal=coordonnee['code_postal'],
    			site = ['site'],
    			telephone = ['telephone'])
			if	coordonne_existante:
				coordonee_regroupement_obj = coordonne_existante.first()
			else :
				coordonnee_regroupement_obj = Coordonnee(
					adresse=coordonnee['adresse'],
					municipalite=coordonnee['municipalite'],
					code_postal=coordonnee['code_postal'],
					site = ['site'],
					telephone = ['telephone'])
				coordonnee_regroupement_obj.save()
			regroupement_obj = Regroupement(
				code=regroupement['code'],
				nom=regroupement['nom'],
				nom_court=regroupement['nom_court'],
				coordonnee=coordonnee_regroupement_obj,
				superficie=regroupement['superficie'],
				perimetre=regroupement['perimetre'],
				langue=regroupement['langue'],)
			regroupement_obj.save()

		#etablissement
		etablissement = Etablissement(
			codeOrg = validated_data['codeOrg'],
			codeImm = validated_data['codeImm'],
			nom = validated_data['nom'],
			coordonnee = coordonnee_ecole_obj,
			prescolaire = validated_data['prescolaire'],
			primaire = validated_data['primaire'],
			secondaire = validated_data['secondaire'],
			professionnel = validated_data['professionnel'],
			adulte  = validated_data['adulte'],
			type = validated_data['type'],
			ide = ide_obj,
			regroupement = regroupement_obj)

		etablissement.save()
		return etablissement