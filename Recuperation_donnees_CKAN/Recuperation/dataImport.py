import requests
import json
from Recuperation import models


def importData():
#Jeu de données: Liste des commissions scolaires francophones de Québec
	url='https://www.donneesquebec.ca/recherche/api/3/action/datastore_search?resource_id=7dd945bf-c9f4-4dd6-852c-bf3b8d3e0120&limit=10000&filters={"NOM_MUNCP_GDUNO":"Québec"}'
	response=requests.get(url)
	api_data=response.json()
	records=api_data['result']['records']
	listeCode = []
	for data in records:
		#data = dictionnaire

		coor = models.Coordonnee(
			#Get pour éviter les erreurs si jamais il n'y a pas de clé trouvée. Valeur par défaut sinon
			#Pour une string, valeur par défaut est une string vide. Pour autres types, ça dépend
			adresse = data.get('ADRS_GEO_L1_GDUNO',''),
			municipalite = data.get('NOM_MUNCP_GDUNO', ''),
			code_postal = data.get('CD_POSTL_GDUNO', ''),
			site = data.get('NOM_SITE_WEB_GDUNO', ''),
			telephone = data.get('NO_TEL', ''))
		coor.save()
		cs = models.Regroupement(
			code = int(data.get('CD_CS_FRA')),
			nom = data.get('NOM_LONG',''),
			nom_court = data.get('NOM_OFFCL_CS_FRA',''),
			superficie = int(data.get('VALR_SUPRF_KM2',0)), #Valeur par défaut aurait pu être null aussi
			perimetre = int(data.get('VALR_PERMT_KM',0)),
			langue = 'Fr',
			coordonnee = coor)
		cs.save()
		if data.get('CD_CS_FRA') not in listeCode:
			listeCode.append(data.get('CD_CS_FRA'))

	#Jeu de données : Indice de défavorisation des écoles primaires
	url = 'https://www.donneesquebec.ca/recherche/api/3/action/datastore_search?resource_id=6c5d4a5d-ba3b-40a6-b570-916f43ab622c&limit=10000'
	response=requests.get(url)
	api_data=response.json()
	records=api_data['result']['records']
	dictIDE = {}
	for data in records:
		#data = dictionnaire
		if data.get('Code_Cs') in listeCode and data.get('Diffusion') == 'OUI':
			imseObject = models.IMSE(
				indice=float(data.get('IMSE', 0)),
				rang = int(data.get('Rang_Decile_IMSE',0))
			)
			imseObject.save()
			sfrObject = models.SFR(
				indice = float(data.get('SFR',0)),
				rang = int(data.get('Rang_Decile_SFR',0))
			)
			sfrObject.save()
			ide = models.IDE(
				sfr = sfrObject,
				imse = imseObject,
				defavorisation = bool(int(data.get('',0)))
			)
			ide.save()
			dictIDE[data.get('Code_Org')] = ide

	#Jeu de données : Indice de défavorisation des écoles secondaires
	url = 'https://www.donneesquebec.ca/recherche/api/3/action/datastore_search?resource_id=3e9aa43a-c32b-4779-b258-8407db716813&limit=10000'
	response=requests.get(url)
	api_data=response.json()
	records=api_data['result']['records']
	for data in records:
		#data = dictionnaire
		if data.get('Code_Cs') in listeCode and data.get('Diffusion') == 'OUI':
			imseObject = models.IMSE(
				indice=float(data.get('IMSE', 0)),
				rang = int(data.get('Rang_Decile_IMSE',0))
			)
			imseObject.save()
			sfrObject = models.SFR(
				indice = float(data.get('SFR',0)),
				rang = int(data.get('Rang_Decile_SFR',0))
			)
			sfrObject.save()

			defavorise = imseObject.rang >= 8

			ide = models.IDE(
				sfr = sfrObject,
				imse = imseObject,
				defavorisation = defavorise
			)
			ide.save()
			dictIDE[data.get('Code_Org')] = ide

	#Jeu de données : Liste des écoles publiques
	url='https://www.donneesquebec.ca/recherche/api/3/action/datastore_search?resource_id=c6640a54-bc4b-43ec-864e-6c325dce61bc&limit=10000&filters={"NOM_MUNCP":"Québec"}'
	response=requests.get(url)
	api_data=response.json()
	records=api_data['result']['records']
	for data in records:
		#data = dictionnaire
		if data.get('CD_CS') in listeCode:
			coor = models.Coordonnee(
				adresse = data.get('ADRS_GEO_L1_GDUNO_ORGNS',''),
				municipalite = data.get('NOM_MUNCP_GDUNO_ORGNS',''),
				code_postal = data.get('CD_POSTL_GDUNO_ORGNS',''),
				site = data.get('SITE_WEB_ORGNS',''),
				telephone = data.get('NO_TEL_ORGNS','')) #Pas de tel... Chercher ailleurs?
			coor.save()
			
			regroupementEcole = models.Regroupement.objects.get(code=int(data.get('CD_CS')))
			
			if data.get('CD_IMM') is data.get('CD_ORGNS'):
				ideRegroupement = dictIDE.get(data.get('CD_IMM'))
			else:
				ideRegroupement = dictIDE.get(data.get('CD_ORGNS'))
			if ideRegroupement is None: #Si pas présent, on passe au suivant
				continue
			ecole = models.Etablissement(
				codeOrg = int(data.get('CD_ORGNS',0)),
				codeImm = int(data.get('CD_IMM', 0)),
				nom = data.get('NOM_OFFCL_ORGNS',''),
				prescolaire = bool(int(data.get('PRESC',0))),
				primaire = bool(int(data.get('PRIM',0))),
				secondaire =  bool(int(data.get('SEC',0))),
				professionel =  bool(int(data.get('FORM_PRO',0))),
				adulte  =  bool(int(data.get('ADULTE',0))),
				type = data.get('ORDRE_ENS',''),
				ide = ideRegroupement,
				regroupement = regroupementEcole,
				coordonnee = coor
			)
			ecole.save()

def cleanDb():
	regs = models.Regroupement.objects.all()
	regs.delete()
	coords = models.Coordonnee.objects.all()
	coords.delete()
	ides = models.IDE.objects.all()
	ides.delete()
	sfrs = models.SFR.objects.all()
	sfrs.delete()
	imses = models.IMSE.objects.all()
	imses.delete()
	etabs = models.Etablissement.objects.all()
	etabs.delete()


