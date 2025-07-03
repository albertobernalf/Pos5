from django.db import models

# Create your models here.

class Farmacia(models.Model):
    id = models.AutoField(primary_key=True)
    historia = models.ForeignKey('clinico.Historia', on_delete=models.PROTECT, blank=True, null=True,  editable=True,  related_name='HistoriaFarmacia01')
    serviciosAdministrativos = models.ForeignKey('sitios.ServiciosAdministrativos', blank=True,null= True, editable=True,  on_delete=models.PROTECT,   related_name='servAdmFarm01')
    tipoOrden = models.CharField(max_length=1, default='C', editable=False,  blank=True, null=True,)
    tipoMovimiento = models.CharField(max_length=1, default='F', editable=False,  blank=True, null=True,)
    fechaRegistro = models.DateTimeField(editable=True, null=True, blank=True)
    usuarioRegistro = models.ForeignKey('planta.Planta', blank=True, null=True, editable=True, on_delete=models.PROTECT   , related_name='Planta3450')
    estadoReg = models.CharField(max_length=1, default='A', editable=False,  blank=True, null=True,)

    def __str__(self):
        return str(self.id)

class FarmaciaDetalle(models.Model):
    id = models.AutoField(primary_key=True)
    farmacia = models.ForeignKey('farmacia.Farmacia', on_delete=models.PROTECT, blank=True, null=True,  editable=True,  related_name='Farmacia01')
    historiaMedicamentos = models.ForeignKey('clinico.HistoriaMedicamentos', blank=True,null= True, editable=True,  on_delete=models.PROTECT,   related_name='servAdmFarm01')
    #enfermeriaDetalle = models.ForeignKey('enfermeria.Detalle', blank=True,null= True, editable=True,  on_delete=models.PROTECT,   related_name='enfermeriaDetalle01')
    suministro = models.ForeignKey('facturacion.Suministros', blank=True, null=True, editable=True,   on_delete=models.PROTECT)
    dosisCantidad = models.DecimalField(max_digits=20, decimal_places=3)
    dosisUnidad = models.ForeignKey('clinico.UnidadesDeMedidaDosis', blank=True, null=True, editable=True,   on_delete=models.PROTECT)
    viaAdministracion = models.ForeignKey('clinico.ViasAdministracion', blank=True, null=True, editable=True,   on_delete=models.PROTECT)
    frecuencia = models.ForeignKey('clinico.FrecuenciasAplicacion', blank=True, null=True, editable=True,               on_delete=models.PROTECT)
    cantidadOrdenada = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True, editable=True)
    diasTratamiento =  models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True, editable=True)
    fechaRegistro = models.DateTimeField(editable=True, null=True, blank=True)
    usuarioRegistro = models.ForeignKey('planta.Planta', blank=True, null=True, editable=True, on_delete=models.PROTECT   , related_name='Planta3451')
    estadoReg = models.CharField(max_length=1, default='A', editable=False,  blank=True, null=True,)

    def __str__(self):
        return str(self.id)

class Despachos(models.Model):

    id = models.AutoField(primary_key=True)
    serviciosAdministrativos = models.ForeignKey('sitios.ServiciosAdministrativos', blank=True,null= True, editable=True,  on_delete=models.PROTECT,   related_name='servAdmFarm02')
    farmacia = models.ForeignKey('farmacia.Farmacia', blank=True,null= True, editable=True,  on_delete=models.PROTECT,   related_name='FarmaDespacho02')
    fechaRegistro = models.DateTimeField(editable=True, null=True, blank=True)
    usuarioRegistro = models.ForeignKey('planta.Planta', blank=True, null=True, editable=True, on_delete=models.PROTECT   , related_name='Planta3452')
    estadoReg = models.CharField(max_length=1, default='A', editable=False,  blank=True, null=True,)

    def __str__(self):
        return str(self.id)


class FarmaciaDispensa(models.Model):
    id = models.AutoField(primary_key=True)
    farmaciaDetalle = models.ForeignKey('farmacia.FarmaciaDetalle', on_delete=models.PROTECT, blank=True, null=True,  editable=True,  related_name='FarmaciaDetalle01')
    despacho = models.ForeignKey('farmacia.Despachos', on_delete=models.PROTECT, blank=True, null=True,  editable=True,  related_name='FarmaciaDespachos01')
    suministro = models.ForeignKey('facturacion.Suministros', blank=True, null=True, editable=True,   on_delete=models.PROTECT)
    dosisCantidad = models.DecimalField(max_digits=20, decimal_places=3)
    dosisUnidad = models.ForeignKey('clinico.UnidadesDeMedidaDosis', blank=True, null=True, editable=True,   on_delete=models.PROTECT)
    viaAdministracion = models.ForeignKey('clinico.ViasAdministracion', blank=True, null=True, editable=True,   on_delete=models.PROTECT)
    frecuencia = models.ForeignKey('clinico.FrecuenciasAplicacion', blank=True, null=True, editable=True,               on_delete=models.PROTECT)
    cantidadOrdenada = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True, editable=True)
    diasTratamiento =  models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True, editable=True)
    fechaRegistro = models.DateTimeField(editable=True, null=True, blank=True)
    usuarioRegistro = models.ForeignKey('planta.Planta', blank=True, null=True, editable=True, on_delete=models.PROTECT   , related_name='PlantaFarmacia3453')
    estadoReg = models.CharField(max_length=1, default='A', editable=False,  blank=True, null=True,)

    def __str__(self):
        return str(self.id)
