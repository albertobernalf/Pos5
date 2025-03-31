from django.contrib import admin

# Register your models here.

from tarifarios.models import TiposHonorarios, TiposTarifaProducto,TiposTarifa,TarifariosDescripcion,TarifariosProcedimientos,TarifariosSuministros, TarifariosProcedimientosHonorarios


@admin.register(TiposTarifa)
class tiposTarifaAdmin(admin.ModelAdmin):

   list_display = ("id", "tiposTarifaProducto","nombre","fechaRegistro")
   search_fields = ("id", "tiposTarifaProducto", "nombre","fechaRegistro")
   # Filtrar
   list_filter = ("id", "tiposTarifaProducto", "nombre","fechaRegistro")

@admin.register(TiposTarifaProducto)
class tiposTarifaProductoAdmin(admin.ModelAdmin):

   list_display = ("id", "nombre","fechaRegistro")
   search_fields = ("id", "nombre","fechaRegistro")
   # Filtrar
   list_filter = ("id", "nombre","fechaRegistro")

@admin.register(TiposHonorarios)
class tiposHonorariosAdmin(admin.ModelAdmin):

   list_display = ("id", "nombre")
   search_fields = ("id", "nombre")
   # Filtrar
   list_filter = ("id", "nombre")

@admin.register(TarifariosDescripcion)
class TarifariosDescripcionAdmin(admin.ModelAdmin):

   list_display = ("id","tiposTarifa", "columna",  "descripcion","fechaRegistro")
   search_fields = ("id","tiposTarifa", "columna",  "descripcion","fechaRegistro")
   # Filtrar
   list_filter = ("id","tiposTarifa", "columna",  "descripcion","fechaRegistro")


@admin.register(TarifariosProcedimientos)
class tarifariosProcedimientosAdmin(admin.ModelAdmin):

   list_display = ("id","tiposTarifa", "codigoCups",  "codigoHomologado", "colValorBase", "colValor1", "colValor2", "colValor3","colValor1", "fechaRegistro")
   search_fields = ("id","tiposTarifa", "codigoCups",  "codigoHomologado", "colValorBase", "colValor1", "colValor2", "colValor3","colValor1", "fechaRegistro")
   # Filtrar
   list_filter = ("id","tiposTarifa", "codigoCups",  "codigoHomologado", "colValorBase", "colValor1", "colValor2", "colValor3","colValor1", "fechaRegistro")




@admin.register(TarifariosSuministros)
class tarifariosSuministrosAdmin(admin.ModelAdmin):

   list_display = ("id","tiposTarifa", "codigoCum",  "codigoHomologado", "colValorBase", "colValor1", "colValor2", "colValor3","colValor1", "fechaRegistro")
   search_fields = ("id","tiposTarifa", "codigoCum", "codigoHomologado", "colValorBase", "colValor1", "colValor2", "colValor3","colValor1", "fechaRegistro")
   # Filtrar
   list_filter = ("id","tiposTarifa", "codigoCum",  "codigoHomologado", "colValorBase", "colValor1", "colValor2", "colValor3","colValor1", "fechaRegistro")



@admin.register(TarifariosProcedimientosHonorarios)
class tarifariosProcedimientosHonorariosAdmin(admin.ModelAdmin):

   list_display = ("id","tiposTarifa", "codigoCups", "tipoHonorario", "codigoHomologado", "colValorBase", "colValor1", "colValor2", "colValor3","colValor1", "fechaRegistro")
   search_fields = ("id","tiposTarifa", "codigoCups","tipoHonorario",  "codigoHomologado", "colValorBase", "colValor1", "colValor2", "colValor3","colValor1", "fechaRegistro")
   # Filtrar
   list_filter = ("id","tiposTarifa", "codigoCups", "tipoHonorario", "codigoHomologado", "colValorBase", "colValor1", "colValor2", "colValor3","colValor1", "fechaRegistro")
