from django.db import models

# Create your models here.
from django.db import models

class Etablissement(models.Model):
    id = models.AutoField(primary_key=True)
    code = models.IntegerField()
    nom = models.CharField(max_length = 100)
    coordonnee = models.ForeignKey("Coordonnee", on_delete=models.CASCADE)
    prescolaire = models.BooleanField()
    primaire = models.BooleanField()
    secondaire = models.BooleanField()
    professionel = models.BooleanField()
    adulte  = models.BooleanField()
    type = models.CharField(max_length = 50)
    ide = models.OneToOneField("IDE", on_delete=models.CASCADE)
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

class Municipalite(models.Model):
    id = models.AutoField(primary_key=True)
    Code = models.IntegerField()
    Nom = models.CharField(max_length=100)
    Statut = models.CharField(max_length=1)
    Region_administrative = models.CharField(max_length=50)




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
    municipalite = models.ForeignKey("Municipalite", on_delete=models.CASCADE)
    code_postal = models.CharField(max_length = 7)
    site = models.CharField(max_length = 100)
    telephone = models.CharField(max_length=12)
    