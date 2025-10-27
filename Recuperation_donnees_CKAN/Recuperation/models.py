from django.db import models

class Etablissement(models.Model):
    id = models.AutoField(primary_key=True)
    codeOrg = models.IntegerField()
    codeImm = models.IntegerField()
    nom = models.CharField(max_length = 100)
    coordonnee = models.ForeignKey("Coordonnee", on_delete=models.CASCADE)
    prescolaire = models.BooleanField(default=False)
    primaire = models.BooleanField(default=False)
    secondaire = models.BooleanField(default=False)
    professionnel = models.BooleanField(default=False)
    adulte  = models.BooleanField(default=False)
    type = models.CharField(max_length = 50)
    ide = models.ForeignKey("IDE", on_delete=models.SET_NULL, null = True, blank=True)
    regroupement = models.ForeignKey("Regroupement", on_delete=models.CASCADE)


class Regroupement(models.Model):

    id = models.AutoField(primary_key=True)
    code = models.IntegerField()
    nom = models.CharField(max_length = 100)
    nom_court = models.CharField(max_length = 50)
    coordonnee = models.ForeignKey("Coordonnee", on_delete=models.CASCADE)
    superficie = models.IntegerField()
    perimetre = models.IntegerField()
    langue = models.CharField(max_length=3)

#Terminee

class IMSE(models.Model):
    id = models.AutoField(primary_key=True)
    indice = models.FloatField()
    rang = models.IntegerField() 
    
class SFR(models.Model):
    id = models.AutoField(primary_key=True)
    indice = models.FloatField()
    rang = models.IntegerField() 

class IDE(models.Model) :
    id = models.AutoField(primary_key=True)
    sfr = models.OneToOneField("SFR", on_delete=models.CASCADE)
    imse = models.OneToOneField("IMSE", on_delete=models.CASCADE)
    defavorisation = models.BooleanField()

class Coordonnee(models.Model):
    id = models.AutoField(primary_key=True)
    adresse = models.CharField(max_length = 100)
    municipalite = models.CharField(max_length = 20)
    code_postal = models.CharField(max_length = 7)
    site = models.CharField(max_length=100, null=True, blank=True)
    telephone = models.CharField(max_length=12, null=True, blank=True)
