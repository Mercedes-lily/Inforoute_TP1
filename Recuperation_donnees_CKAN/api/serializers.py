##On fait quoi il est dans le regroupement et ici

from rest_framework import serializers
from Recuperation.models import Etablissement, Coordonnee, Regroupement, IDE, IMSE, SFR

class CoordonneeSerializer(serializers.ModelSerializer):
	class Meta:
		model = Coordonnee
		fields =("adresse", "municipalite", "code_postal", "site", "telephone")

class RegroupementSerializer(serializers.ModelSerializer):
	coordonnee = CoordonneeSerializer(read_only=True) #lors de l<ajouy de regroupement, on ne peut ajouter de coordonnee
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
	imse = IMSESerializer(read_only=True)
	sfr = SFRSerializer(read_only=True)
	class Meta:
		model = IDE
		fields = ("sfr", "imse", "defavorisation")

class EtablissementSerializer(serializers.ModelSerializer):
	coordonnee = CoordonneeSerializer(read_only=True)
	ide = IDESerializer(read_only=True)
	regroupement = RegroupementSerializer(read_only=True)
	class Meta:
		model = Etablissement
		fields = ("codeOrg", "codeImm", "nom", "coordonnee", "prescolaire", "primaire", "secondaire", "professionnel", "adulte", "type", "ide", "regroupement")
