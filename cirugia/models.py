from django.db import models
from datetime import date

# Create your models here.

class Cirugias(models.Model):
    id = models.AutoField(primary_key=True)
    tipoDoc = models.ForeignKey('usuarios.TiposDocumento', blank=True, null=True, editable=True,    on_delete=models.PROTECT)
    documento = models.ForeignKey('usuarios.Usuarios', blank=True, null=True, editable=True, on_delete=models.PROTECT,    related_name='DocumentoHistoria54')
    consecAdmision = models.IntegerField(default=0)
    folio = models.IntegerField(default=0)
    sedesClinica_id = models.ForeignKey('sitios.Sedesclinica', blank=True, null=True, editable=True,     on_delete=models.PROTECT)
    serviciosSedes_id = models.ForeignKey('sitios.Serviciossedes', blank=True, null=True, editable=True,      on_delete=models.PROTECT)
    subServiciosSedes_id = models.ForeignKey('sitios.Subserviciossedes', blank=True, null=True, editable=True,  on_delete=models.PROTECT)
    numero = models.CharField(max_length=50, blank=True, null=True, editable=True)
    especialidad = models.ForeignKey('clinico.Especialidades', blank=True, null=True, editable=True,    on_delete=models.PROTECT)
    urgente = models.CharField(max_length=1, blank=True, null=True, editable=True)
    tipoQx = models.CharField(max_length=20, blank=True, null=True, editable=True)
    anestesia = models.ForeignKey('cirugia.TiposAnestesia', blank=True, null=True, editable=True,  on_delete=models.PROTECT)
    autorizacion =  models.ForeignKey('autorizaciones.Autorizaciones', blank=True, null=True, editable=True, on_delete=models.PROTECT,    related_name='DocumentoHistoria54')
    usuarioSolicita = models.ForeignKey('planta.Planta', blank=True, null=True, editable=True, on_delete=models.PROTECT,    related_name='Usuario40')
    fechaSolicia = models.DateTimeField()
    solicitaHospitalizacion = models.CharField(max_length=1, blank=True, null=True, editable=True)
    solicitaAyudante = models.CharField(max_length=1, blank=True, null=True, editable=True)
    solicitaTiempoQx = models.DecimalField(max_digits=5, decimal_places=0)
    solicitatipoQx = models.CharField(max_length=20, blank=True, null=True, editable=True)
    solicitaAnestesia = models.CharField(max_length=20, blank=True, null=True, editable=True)
    solicitaSangree = models.CharField(max_length=1, blank=True, null=True, editable=True)
    describeSangre = models.CharField(max_length=2000, blank=True, null=True, editable=True)
    cantidadSangre = models.DecimalField(max_digits=5, decimal_places=0)
    solicitaCamaUci = models.CharField(max_length=1, blank=True, null=True, editable=True)
    solicitaMicroscopio = models.CharField(max_length=1, blank=True, null=True, editable=True)
    solicitaRx = models.CharField(max_length=1, blank=True, null=True, editable=True)
    solicitaAutoSutura = models.CharField(max_length=1, blank=True, null=True, editable=True)
    solicitaOsteosintesis = models.CharField(max_length=2000, blank=True, null=True, editable=True)
    soliictaSoporte = models.CharField(max_length=1, blank=True, null=True, editable=True)
    solicitaBiopsia = models.CharField(max_length=1, blank=True, null=True, editable=True)
    solicitaMalla = models.CharField(max_length=1, blank=True, null=True, editable=True)
    solicitaOtros = models.CharField(max_length=1, blank=True, null=True, editable=True)
    describeOtros = models.CharField(max_length=2000, blank=True, null=True, editable=True)
    fechaProg = models.DateField(default=date.today,  editable=True)
    HoraProg = models.CharField(max_length=5, blank=True, null=True, editable=True)
    fechaQxInicial = models.DateField(default=date.today,  editable=True)
    horaQxInicial = models.CharField(max_length=5, blank=True, null=True, editable=True)
    fechaQxFinal = models.DateField(default=date.today,  editable=True)
    horaQxFinal = models.CharField(max_length=5, blank=True, null=True, editable=True)
    fechaIniAnestesia = models.DateField(default=date.today,  editable=True)
    HoraIniAnestesia = models.CharField(max_length=5, blank=True, null=True, editable=True)
    fechaFinAnestesia = models.DateField(default=date.today,  editable=True)
    horaFinAnestesia = models.CharField(max_length=5, blank=True, null=True, editable=True)
    intervencion = models.CharField(max_length=100, blank=True, null=True, editable=True)
    riesgos = models.CharField(max_length=3000, blank=True, null=True, editable=True)
    observaciones = models.CharField(max_length=5000, blank=True, null=True, editable=True)
    dxPreQx = models.ForeignKey('clinico.Diagnosticos', blank=True, null=True, editable=True, on_delete=models.PROTECT,    related_name='Dx51')
    dxPostQx = models.ForeignKey('clinico.Diagnosticos', blank=True, null=True, editable=True, on_delete=models.PROTECT ,    related_name='Dx52')
    dxPrinc = models.ForeignKey('clinico.Diagnosticos', blank=True, null=True, editable=True, on_delete=models.PROTECT ,    related_name='Dx53')
    dxRel1 = models.ForeignKey('clinico.Diagnosticos', blank=True, null=True, editable=True, on_delete=models.PROTECT,    related_name='Dx54')
    dxRel2 = models.ForeignKey('clinico.Diagnosticos', blank=True, null=True, editable=True, on_delete=models.PROTECT,    related_name='Dx55')
    dxRel3 = models.ForeignKey('clinico.Diagnosticos', blank=True, null=True, editable=True, on_delete=models.PROTECT,    related_name='Dx56')
    descripcionQx = models.CharField(max_length=10000, blank=True, null=True, editable=True)
    dxComplicacion = models.CharField(max_length=4, blank=True, null=True, editable=True)
    complicaciones = models.CharField(max_length=3000, blank=True, null=True, editable=True)
    patologia = models.CharField(max_length=500, blank=True, null=True, editable=True)
    formaRealiza = models.CharField(max_length=15, blank=True, null=True, editable=True)
    estadoCirugia = models.ForeignKey('cirugia.EstadosCirugias', blank=True, null=True, editable=True,   on_delete=models.PROTECT)
    estadoSalida = models.CharField(max_length=1, default='A', editable=False)
    vboAdmon = models.CharField(max_length=1, blank=True, null=True, editable=True)
    hallazgos = models.CharField(max_length=5000, blank=True, null=True, editable=True)
    osteosintesis = models.CharField(max_length=300, blank=True, null=True, editable=True)
    auxiliar = models.CharField(max_length=200, blank=True, null=True, editable=True)
    materialEspecial = models.CharField(max_length=300, blank=True, null=True, editable=True)
    reprogramada = models.CharField(max_length=1, blank=True, null=True, editable=True)
    motivoReprogramada = models.CharField(max_length=500, blank=True, null=True, editable=True)
    tipoCancela = models.CharField(max_length=15, blank=True, null=True, editable=True)
    motivoCancela = models.CharField(max_length=500, blank=True, null=True, editable=True)
    timepoMaxQx = models.CharField(max_length=10, blank=True, null=True, editable=True)
    observacionesProgramacion = models.CharField(max_length=500, blank=True, null=True, editable=True)
    usuarioPrograma = models.ForeignKey('planta.Planta', blank=True, null=True, editable=True, on_delete=models.PROTECT,    related_name='Usuario41')
    fechaPrograma = models.DateTimeField()
    usuarioCancela = models.ForeignKey('planta.Planta', blank=True, null=True, editable=True, on_delete=models.PROTECT ,    related_name='Usuario42')
    fechaCancela = models.DateTimeField()
    usuarioReprograma = models.ForeignKey('planta.Planta', blank=True, null=True, editable=True,   on_delete=models.PROTECT,    related_name='Usuario43')
    fechaReprograma = models.DateTimeField()
    intensificador = models.CharField(max_length=1, blank=True, null=True, editable=True)
    tipofactura = models.CharField(max_length=30, blank=True, null=True, editable=True)
    recomendacionenfermeria = models.CharField(max_length=2000, blank=True, null=True, editable=True)
    fechaRegistro = models.DateTimeField(editable=True, null=True, blank=True)
    usuarioRegistro = models.ForeignKey('planta.Planta', blank=True, null=True, editable=True, on_delete=models.PROTECT,    related_name='planta39')
    estadoReg = models.CharField(max_length=1, default='A', editable=False)

    def __str__(self):
        return str(self.id)


class CirugiasProcedimientos(models.Model):
    id = models.AutoField(primary_key=True)
    cirugia = models.ForeignKey('cirugia.Cirugias', blank=True, null=True, editable=True, on_delete=models.PROTECT,    related_name='cirugias12')
    cups = models.ForeignKey('clinico.TiposExamen', blank=True, null=True, editable=True, on_delete=models.PROTECT,    related_name='Cups102')
    finalidad = models.ForeignKey('cirugia.FinalidadCirugia', blank=True, null=True, editable=True, on_delete=models.PROTECT,    related_name='Final004')
    fechaRegistro = models.DateTimeField(editable=True, null=True, blank=True)
    usuarioRegistro = models.ForeignKey('planta.Planta', blank=True, null=True, editable=True, on_delete=models.PROTECT,    related_name='planta67')
    estadoReg = models.CharField(max_length=1, default='A', editable=False)

    def __str__(self):
        return str(self.cups)


class CirugiasParticipantes(models.Model):
    id = models.AutoField(primary_key=True)
    cirugia = models.ForeignKey('cirugia.Cirugias', blank=True, null=True, editable=True, on_delete=models.PROTECT,    related_name='cirugias13')
    tipoHonorarios = models.ForeignKey('tarifarios.TiposHonorarios', blank=True, null=True, editable=True, on_delete=models.PROTECT,    related_name='TipoHonorario12')
    finalidad =  models.ForeignKey('cirugia.FinalidadCirugia', blank=True, null=True, editable=True, on_delete=models.PROTECT,    related_name='Final005')
    fechaRegistro = models.DateTimeField(editable=True, null=True, blank=True)
    usuarioRegistro = models.ForeignKey('planta.Planta', blank=True, null=True, editable=True, on_delete=models.PROTECT,    related_name='planta68')
    estadoReg = models.CharField(max_length=1, default='A', editable=False)

    def __str__(self):
        return str(self.cups)


class EstadosCirugias(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30, blank=True, null=True, editable=True)
    fechaRegistro = models.DateTimeField(editable=True, null=True, blank=True)
    estadoReg = models.CharField(max_length=1, default='A', editable=False)

    def __str__(self):
        return str(self.id)

class TiposAnestesia(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30, blank=True, null=True, editable=True)
    fechaRegistro = models.DateTimeField(editable=True, null=True, blank=True)
    estadoReg = models.CharField(max_length=1, default='A', editable=False)

    def __str__(self):
        return str(self.id)

class CirugiasMaterialQx(models.Model):
    id = models.AutoField(primary_key=True)
    cirugia = models.ForeignKey('cirugia.Cirugias', blank=True, null=True, editable=True,   on_delete=models.PROTECT)
    suministro = models.ForeignKey('facturacion.Suministros', blank=True, null=True, editable=True,  on_delete=models.PROTECT)
    cantidad = models.DecimalField(max_digits=10, decimal_places=3)
    fechaRegistro = models.DateTimeField(editable=True, null=True, blank=True)
    usuarioRegistro = models.ForeignKey('planta.Planta', blank=True, null=True, editable=True,    on_delete=models.PROTECT)
    estadoReg = models.CharField(max_length=1, default='A', editable=False)

    def __str__(self):
        return str(self.id)

class RecordAnestesico(models.Model):
    id = models.AutoField(primary_key=True)
    cirugia = models.ForeignKey('cirugia.Cirugias', blank=True, null=True, editable=True,   on_delete=models.PROTECT)
    #tipoDoc = models.ForeignKey('usuarios.TiposDocumento', blank=True, null=True, editable=True, on_delete=models.PROTECT)
    #documento = models.ForeignKey('usuarios.Usuarios', blank=True, null=True, editable=True,   on_delete=models.PROTECT, related_name='DocumentoHistoria122')
    #consecAdmision = models.IntegerField(default=0)
    fecha = models.DateTimeField()
    fechaRegistro = models.DateTimeField(editable=True, null=True, blank=True)
    usuarioRegistro = models.ForeignKey('planta.Planta', blank=True, null=True, editable=True, on_delete=models.PROTECT)
    estadoReg = models.CharField(max_length=1, default='A', editable=False)

    def __str__(self):
        return str(self.id)


class HojasDeGastos(models.Model):
    id = models.AutoField(primary_key=True)
    cirugia = models.ForeignKey('cirugia.Cirugias', blank=True, null=True, editable=True, on_delete=models.PROTECT,    related_name='cirugias17')

    fechaRegistro = models.DateTimeField(editable=True, null=True, blank=True)
    usuarioRegistro = models.ForeignKey('planta.Planta', blank=True, null=True, editable=True, on_delete=models.PROTECT)
    estadoReg = models.CharField(max_length=1, default='A', editable=False)

    def __str__(self):
        return str(self.id)

class EstadosSalas(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30, blank=True, null=True, editable=True)
    fechaRegistro = models.DateTimeField(editable=True, null=True, blank=True)
    estadoReg = models.CharField(max_length=1, default='A', editable=False)

    def __str__(self):
        return str(self.id)

class EstadosProgramacion(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30, blank=True, null=True, editable=True)
    fechaRegistro = models.DateTimeField(editable=True, null=True, blank=True)
    estadoReg = models.CharField(max_length=1, default='A', editable=False)

    def __str__(self):
        return str(self.id)


class ProgramacionCirugias(models.Model):
    id = models.AutoField(primary_key=True)
    sedesClinica_id = models.ForeignKey('sitios.Sedesclinica', blank=True, null=True, editable=True,   on_delete=models.PROTECT)
    sala = models.ForeignKey('sitios.Salas', blank=True, null=True, editable=True,   on_delete=models.PROTECT)
    #estadoSala = models.ForeignKey('cirugia.EstadosSalas', blank=True, null=True, editable=True,   on_delete=models.PROTECT) 
    estadoProgramacion = models.ForeignKey('cirugia.EstadosProgramacion', blank=True, null=True, editable=True,   on_delete=models.PROTECT) 
    fechaProgramacionInicia = models.DateTimeField(default=date.today,  editable=True)
    horaProgramacionInicia = models.CharField(max_length=5, blank=True, null=True, editable=True)
    fechaProgramacionFin = models.DateTimeField(default=date.today,  editable=True)
    horaProgramacionFin = models.CharField(max_length=5, blank=True, null=True, editable=True)
    tipoDoc = models.ForeignKey('usuarios.TiposDocumento', blank=True, null=True, editable=True, on_delete=models.PROTECT)
    documento = models.ForeignKey('usuarios.Usuarios', blank=True, null=True, editable=True,  on_delete=models.PROTECT, related_name='DocumentoHistoria123')
    consecAdmision = models.IntegerField(default=0)
    cups1 = models.ForeignKey('clinico.TiposExamen', blank=True, null=True, editable=True,   on_delete=models.PROTECT, related_name='Cups80')
    cups2 = models.ForeignKey('clinico.TiposExamen', blank=True, null=True, editable=True,  on_delete=models.PROTECT, related_name='Cups81')
    cups3 = models.ForeignKey('clinico.TiposExamen', blank=True, null=True, editable=True,       on_delete=models.PROTECT, related_name='Cups82')
    cups4 = models.ForeignKey('clinico.TiposExamen', blank=True, null=True, editable=True,   on_delete=models.PROTECT, related_name='Cups83')
    cups5 = models.ForeignKey('clinico.TiposExamen', blank=True, null=True, editable=True,             on_delete=models.PROTECT, related_name='Cups84')
    cups6 = models.ForeignKey('clinico.TiposExamen', blank=True, null=True, editable=True,  on_delete=models.PROTECT, related_name='Cups85')
    cups7 = models.ForeignKey('clinico.TiposExamen', blank=True, null=True, editable=True,  on_delete=models.PROTECT, related_name='Cups86')
    cups8 = models.ForeignKey('clinico.TiposExamen', blank=True, null=True, editable=True,  on_delete=models.PROTECT, related_name='Cups87')
    cups9 = models.ForeignKey('clinico.TiposExamen', blank=True, null=True, editable=True,  on_delete=models.PROTECT, related_name='Cups88')
    cups10 = models.ForeignKey('clinico.TiposExamen', blank=True, null=True, editable=True,  on_delete=models.PROTECT, related_name='Cups89')
    fechaRegistro = models.DateTimeField(default=date.today,  editable=True, null=True, blank=True)
    usuarioRegistro = models.ForeignKey('planta.Planta', blank=True, null=True, editable=True,    on_delete=models.PROTECT)
    estadoReg = models.CharField(max_length=1, default='A', editable=False)


    def __str__(self):
        return str(self.id)


class OrganosCirugias(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30, blank=True, null=True, editable=True)
    fechaRegistro = models.DateTimeField(editable=True, null=True, blank=True)
    estadoReg = models.CharField(max_length=1, default='A', editable=False)

    def __str__(self):
        return str(self.id)


class IntervencionCirugias(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30, blank=True, null=True, editable=True)
    fechaRegistro = models.DateTimeField(editable=True, null=True, blank=True)
    estadoReg = models.CharField(max_length=1, default='A', editable=False)

    def __str__(self):
        return str(self.id)

class TiposHeridasOperatorias(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30, blank=True, null=True, editable=True)
    fechaRegistro = models.DateTimeField(editable=True, null=True, blank=True)
    estadoReg = models.CharField(max_length=1, default='A', editable=False)

    def __str__(self):
        return str(self.id)

class FinalidadCirugia(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30, blank=True, null=True, editable=True)
    fechaRegistro = models.DateTimeField(editable=True, null=True, blank=True)
    estadoReg = models.CharField(max_length=1, default='A', editable=False)

    def __str__(self):
        return str(self.id)

class PlanificacionCirugia(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30, blank=True, null=True, editable=True)
    fechaRegistro = models.DateTimeField(editable=True, null=True, blank=True)
    estadoReg = models.CharField(max_length=1, default='A', editable=False)

    def __str__(self):
        return str(self.id)

class ZonasCirugia(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30, blank=True, null=True, editable=True)
    fechaRegistro = models.DateTimeField(editable=True, null=True, blank=True)
    estadoReg = models.CharField(max_length=1, default='A', editable=False)

    def __str__(self):
        return str(self.id)


class GravedadCirugia(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30, blank=True, null=True, editable=True)
    fechaRegistro = models.DateTimeField(editable=True, null=True, blank=True)
    estadoReg = models.CharField(max_length=1, default='A', editable=False)

    def __str__(self):
        return str(self.id)
