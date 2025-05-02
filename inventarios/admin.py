from django.contrib import admin

# Register your models here.


from inventarios.models import Kardex, Movimientos


@admin.register(Kardex)
class kardexAdmin(admin.ModelAdmin):

   list_display = ("id", "sedesClinica", "bodegas", "suministros","cantidadEntrada","valorEntrada","cantidadSalida","valorSalida")
   search_fields =  ("id", "sedesClinica", "bodegas", "suministros","cantidadEntrada","valorEntrada","cantidadSalida","valorSalida")
   # Filtrar
   list_filter =  ("id", "sedesClinica", "bodegas", "suministros","cantidadEntrada","valorEntrada","cantidadSalida","valorSalida")


@admin.register(Movimientos)
class movimientosAdmin(admin.ModelAdmin):

   list_display = ("id", "sedesClinica", "tipo", "bodegasEntrada", "bodegasSalida","suministros","cantidad","valor")
   search_fields =  ("id", "sedesClinica", "tipo", "bodegasEntrada", "bodegasSalida","suministros","cantidad","valor")
   # Filtrar
   list_filter =  ("id", "sedesClinica", "tipo", "bodegasEntrada", "bodegasSalida","suministros","cantidad","valor")


