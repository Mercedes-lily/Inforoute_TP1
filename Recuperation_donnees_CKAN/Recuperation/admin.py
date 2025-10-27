from django.contrib import admin

from .models import Etablissement, Regroupement, IMSE, IDE, SFR, Coordonnee

# Register your models here.
admin.site.register(Regroupement)
admin.site.register(Etablissement)
admin.site.register(IMSE)
admin.site.register(SFR)
admin.site.register(IDE)
admin.site.register(Coordonnee)
