from django.contrib import admin

# Register your models here.


from autorizaciones.models import  Autorizaciones, AutorizacionesDetalle, AutorizacionesCirugias


@admin.register(Autorizaciones)
class autorizacionesAdmin(admin.ModelAdmin):
    list_display = ("id", "sedesClinica", "historia", "fechaSolicitud","empresa","fechaAutorizacion")
    search_fields = ("id", "sedesClinica", "historia", "fechaSolicitud","empresa","fechaAutorizacion")
    # Filtrar
    list_filter = ("id", "sedesClinica", "historia", "fechaSolicitud","empresa","fechaAutorizacion")


@admin.register(AutorizacionesDetalle)
class autorizacionesDetalleAdmin(admin.ModelAdmin):
    list_display = ("id",  "autorizaciones", "autorizado","cantidadSolicitada","cantidadAutorizada")
    search_fields = ("id", "autorizaciones", "autorizado","cantidadSolicitada","cantidadAutorizada")
    # Filtrar
    # list_filter =("id",  "autorizaciones","autorizado","cantidadSolicitada","cantidadAutorizada")



@admin.register(AutorizacionesCirugias)
class autorizacionesCirugiasAdmin(admin.ModelAdmin):

   list_display = ("id", "sedesClinica", "tipoDoc","documento","hClinica","consec", "autorizacionesId","fechaRegistro","usuarioRegistro")
   search_fields = ("id", "sedesClinica", "tipoDoc","documento","hClinica","consec", "autorizacionesId","fechaRegistro","usuarioRegistro")
   # Filtrar
   # list_filter = ("id", "sedesClinica", "tipoDoc","documento","hClinica","consec", "autorizacionesId","fechaRegistro","usuarioRegistro")

