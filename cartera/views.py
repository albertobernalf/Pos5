from django.shortcuts import render
import json
from django import forms
import cv2
import numpy as np
from django.core.serializers import serialize
from django.db.models.functions import Cast, Coalesce
from django.utils.timezone import now
from django.db.models import Avg, Max, Min, Sum

from django.contrib import messages
from django.shortcuts import render, get_object_or_404, redirect, HttpResponse, HttpResponseRedirect
from django.core.exceptions import ValidationError
from django.urls import reverse, reverse_lazy
# from django.core.urlresolvers import reverse_lazy
from django.views.generic import ListView, CreateView, TemplateView
from django.http import JsonResponse
#import MySQLdb
import pyodbc
import psycopg2
import json
import datetime
from decimal import Decimal
from admisiones.models import Ingresos
from facturacion.models import ConveniosPacienteIngresos, Liquidacion, LiquidacionDetalle, Facturacion, FacturacionDetalle
from cartera.models import TiposPagos, FormasPagos, Pagos, PagosFacturas
from triage.models import Triage
from clinico.models import Servicios
import pickle


# Function to convert dictionary keys and values
def convert_keys_and_values(d):
    return {str(k) if isinstance(k, Decimal) else k: (float(v) if isinstance(v, Decimal) else v)
            for k, v in d.items()}


def decimal_serializer(obj):
    if isinstance(obj, Decimal):
        return str(obj)
    raise TypeError("Type not serializable")

def serialize_datetime(obj):
    if isinstance(obj, datetime.datetime):
        return obj.isoformat()
    raise TypeError("Type not serializable")


# Create your views here.
def load_dataGlosas(request, data):
    print("Entre load_data Glosas")

    context = {}
    d = json.loads(data)

    username = d['username']
    sede = d['sede']
    username_id = d['username_id']

    nombreSede = d['nombreSede']
    print("sede:", sede)
    print("username:", username)
    print("username_id:", username_id)

    # Combo Indicadores

    miConexiont = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",
                                   password="123456")
    curt = miConexiont.cursor()

    comando = 'SELECT ser.nombre, count(*) total FROM admisiones_ingresos i, usuarios_usuarios u, sitios_dependencias dep , clinico_servicios ser ,usuarios_tiposDocumento tp , sitios_dependenciastipo deptip  , clinico_Diagnosticos diag , sitios_serviciosSedes sd  WHERE sd."sedesClinica_id" = i."sedesClinica_id"  and sd.servicios_id  = ser.id and i."sedesClinica_id" = dep."sedesClinica_id" AND i."sedesClinica_id" = ' + "'" + str(
        sede) + "'" + ' AND  deptip.id = dep."dependenciasTipo_id" and i."serviciosActual_id" = ser.id AND dep.disponibilidad = ' + "'" + str(
        'O') + "'" + ' AND i."salidaDefinitiva" = ' + "'" + str('N') + "'" + ' and tp.id = u."tipoDoc_id" and  i."tipoDoc_id" = u."tipoDoc_id" and u.id = i."documento_id" and diag.id = i."dxActual_id" and i."fechaSalida" is null and dep."serviciosSedes_id" = sd.id and dep.id = i."dependenciasActual_id"  group by ser.nombre UNION SELECT ser.nombre, count(*) total FROM triage_triage t, usuarios_usuarios u, sitios_dependencias dep , usuarios_tiposDocumento tp , sitios_dependenciastipo deptip  , sitios_serviciosSedes sd, clinico_servicios ser WHERE sd."sedesClinica_id" = t."sedesClinica_id"  and t."sedesClinica_id" = dep."sedesClinica_id" AND  t."sedesClinica_id" =  ' + "'" + str(sede) + "'" + ' AND dep."sedesClinica_id" =  sd."sedesClinica_id" AND dep.id = t.dependencias_id AND  t."serviciosSedes_id" = sd.id  AND deptip.id = dep."dependenciasTipo_id" and  tp.id = u."tipoDoc_id" and  t."tipoDoc_id" = u."tipoDoc_id" and u.id = t."documento_id"  and ser.id = sd.servicios_id and  dep."serviciosSedes_id" = sd.id and t."serviciosSedes_id" = sd.id and dep."tipoDoc_id" = t."tipoDoc_id" and  t."consecAdmision" = 0 and dep."documento_id" = t."documento_id" and ser.nombre = ' + "'" + str(
        'TRIAGE') + "'" + ' group by ser.nombre'

    print("comando = ", comando)

    curt.execute(comando)
    print(comando)

    indicadores = []

    for id, nombre in curt.fetchall():
        indicadores.append({'id': id, 'nombre': nombre})

    miConexiont.close()
    print(indicadores)

    context['Indicadores'] = indicadores

    # Fin combo Indicadores

    glosas = []

    miConexionx = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",
                                   password="123456")
    curx = miConexionx.cursor()

    detalle = 'SELECT glo.id, "fechaRecepcion", "saldoFactura", "totalSoportado", "totalAceptado", observaciones, glo."fechaRegistro", glo."estadoReg", convenio_id,  conv.nombre nombreConvenio,glo."usuarioRegistro_id", factura_id, "fechaRespuesta", "tipoGlosa_id", tipglo.nombre nombreTipoGlosa,  "usuarioRecepcion_id", "usuarioRespuesta_id", "valorGlosa", "estadoRadicacion_id", "estadoRecepcion_id", estGlosa.nombre estadoGlosaRecepcion, glo."sedesClinica_id", "ripsEnvio_id" FROM public.cartera_glosas glo, cartera_estadosglosas estGlosa , contratacion_convenios conv, cartera_tiposglosas tipglo WHERE glo."sedesClinica_id" = ' + "'" + str(sede) + "'" + 'AND tipglo.id = glo."tipoGlosa_id"   AND  conv.id = glo.convenio_id AND estGlosa.id =  glo."estadoRecepcion_id" AND estGlosa.tipo = ' + "'" + str('RECEPCION') + "'"

    print(detalle)

    curx.execute(detalle)

    for id,  fechaRecepcion, saldoFactura, totalSoportado, totalAceptado, observaciones, fechaRegistro, estadoReg, convenio_id, nombreConvenio, usuarioRegistro_id, factura_id,  fechaRespuesta, tipoGlosa_id,nombreTipoGlosa, usuarioRecepcion_id, usuarioRespuesta_id,  valorGlosa, estadoRadicacion_id , estadoRecepcion_id, estadoGlosaRecepcion,  sedesClinica_id, ripsEnvio_id in curx.fetchall():
        glosas.append(
            {"model": "cartera.glosas", "pk": id, "fields":
                {'id': id, 'fechaRecepcion': fechaRecepcion, 'saldoFactura': saldoFactura, 'totalSoportado': totalSoportado,'totalAceptado':totalAceptado,
                 'observaciones': observaciones, 'fechaRegistro': fechaRegistro,'estadoReg': estadoReg, 'convenio_id': convenio_id,'nombreConvenio':nombreConvenio, 'usuarioRegistro_id': usuarioRegistro_id, 'factura_id' : factura_id,
                 'factura_id': factura_id, 'fechaRespuesta': fechaRespuesta,
                 'tipoGlosa_id': tipoGlosa_id,'nombreTipoGlosa' :nombreTipoGlosa, 'usuarioRecepcion_id': usuarioRecepcion_id,'estadoGlosaRecepcion':estadoGlosaRecepcion, 'usuarioRespuesta_id': usuarioRespuesta_id,
                 'valorGlosa': valorGlosa, 'estadoRadicacion_id': estadoRadicacion_id, 'estadoRecepcion_id': estadoRecepcion_id,
                 'sedesClinica_id': sedesClinica_id,'ripsEnvio_id':ripsEnvio_id}})

    miConexionx.close()
    print("glosas "  , glosas)
    context['Glosas'] = glosas

    serialized1 = json.dumps(glosas,  default=str)

    return HttpResponse(serialized1, content_type='application/json')


def GuardaGlosas(request):

    print ("Entre Guarda Glosas" )

    convenio_id = request.POST['convenio_id']
    print("convenio_id =", convenio_id)

    sedesClinica_id = request.POST['sedesClinica_id']
    print("sedesClinica_id =", sedesClinica_id)

    fechaRecepcion = request.POST["fechaRecepcion"]
    print("fechaRecepcion =", fechaRecepcion)


    observaciones = request.POST["observaciones"]
    print("observaciones =", observaciones)


    factura_id = request.POST['factura_id']
    print ("factura_id =", factura_id)

    fechaRespuesta = request.POST["fechaRespuesta"]
    print("fechaRespuesta =", fechaRespuesta)


    tipoGlosa_id = request.POST["tipoGlosa_id"]
    print ("tipoGlosa_id =", tipoGlosa_id)

    valorGlosa = request.POST['valorGlosa']
    print ("valorGlosa =", valorGlosa)

    estadoRecepcion_id = request.POST['estadoRecepcion_id']
    print ("estadoRecepcion_id =", estadoRecepcion_id)


    usuarioRegistro_id = request.POST['usuarioRegistro_id']
    print ("usuarioRegistro_id =", usuarioRegistro_id)

    estadoReg = 'A'
    fechaRegistro = datetime.datetime.now()

    miConexion3 = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",  password="123456")
    cur3 = miConexion3.cursor()

    comando = 'INSERT INTO cartera_glosas ("fechaRecepcion", "saldoFactura", "totalSoportado", "totalAceptado", observaciones, "fechaRegistro", "estadoReg", convenio_id, "usuarioRegistro_id", factura_id,  "tipoGlosa_id", "usuarioRecepcion_id",  "valorGlosa", "estadoRadicacion_id", "estadoRecepcion_id","sedesClinica_id", "ripsEnvio_id" ) VALUES (' + "'" + str(fechaRecepcion) + "'" + ', 0,0,0,' + "'" + str(observaciones) + "','" + str(fechaRegistro) + "','" + str(estadoReg) + "','" + str(convenio_id) + "','"  + str(usuarioRegistro_id) + "', '" + str(factura_id) + "', '" + str(tipoGlosa_id) + "', '" + str(usuarioRegistro_id) + "','" + str(valorGlosa) + "', null, '" + str(estadoRecepcion_id) + "', '" + str(sedesClinica_id)  + "',null)"

    print(comando)
    cur3.execute(comando)
    miConexion3.commit()
    miConexion3.close()



    return JsonResponse({'success': True, 'message': 'Envio realizado satisfactoriamente!'})


def Load_tablaGlosasProcedimientos(request, data):

    print("Entre load_data Procedimientos Glosas")

    context = {}
    d = json.loads(data)

    sedesClinica_id = d['sedesClinica_id']
    print("sedesClinica_id = ", sedesClinica_id)

    facturaId = d['facturaId']
    print("facturaId = ", facturaId)

    procedimientosRips = []

    miConexionx = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",
                                   password="123456")
    curx = miConexionx.cursor()

    detalle = 'SELECT  ripsproc.id id, "codPrestador", cast("fechaInicioAtencion" as date), "idMIPRES", "numAutorizacion", ripsproc."numDocumentoIdentificacion", "vrServicio", "valorPagoModerador", ripsproc.consecutivo, ripsproc."fechaRegistro", "codComplicacion_id", "codDiagnosticoPrincipal_id", "codDiagnosticoRelacionado_id", "codProcedimiento_id", "codServicio_id", "conceptoRecaudo_id", "finalidadTecnologiaSalud_id", "grupoServicios_id", "modalidadGrupoServicioTecSal_id", ripsproc."tipoDocumentoIdentificacion_id", ripsproc."usuarioRegistro_id", "viaIngresoServicioSalud_id", ripsproc."ripsDetalle_id", "itemFactura", ripsproc."ripsTipos_id", "tipoPagoModerador_id", ripsproc."ripsTransaccion_id"  FROM public.rips_ripstransaccion ripstra, public.rips_ripsprocedimientos ripsproc WHERE  ripstra."sedesClinica_id" = ' + "'" + str(sedesClinica_id) + "'" + ' AND ripstra.id = ripsproc."ripsTransaccion_id"  AND cast(ripstra."numFactura" as numeric) = ' +  str(facturaId)

    print ("detalle = ", detalle)

    curx.execute(detalle)

    for id,  codPrestador, fechaInicioAtencion, idMIPRES,numAutorizacion, numDocumentoIdentificacion,  vrServicio,  valorPagoModerador,  consecutivo , fechaRegistro,  codComplicacion_id, codDiagnosticoPrincipal_id, codDiagnosticoRelacionado_id, codProcedimiento_id, codServicio_id, conceptoRecaudo_id, finalidadTecnologiaSalud_id, grupoServicios_id, modalidadGrupoServicioTecSal_id, tipoDocumentoIdentificacion_id, usuarioRegistro_id, viaIngresoServicioSalud_id, ripsDetalle_id, itemFactura, ripsTipos_id, tipoPagoModerador_id, ripsTransaccion_id in curx.fetchall():
        procedimientosRips.append(
            {"model": "rips.RipsProcedimientos", "pk": id, "fields":
                {'id': id, 'codPrestador': codPrestador , 'fechaInicioAtencion': fechaInicioAtencion, 'idMIPRES': idMIPRES, 'numAutorizacion':numAutorizacion,
                 'numDocumentoIdentificacion':numDocumentoIdentificacion, 'vrServicio':vrServicio, 'valorPagoModerador':valorPagoModerador,
                 consecutivo:consecutivo, 'fechaRegistro':fechaRegistro, 'codComplicacion_id':codComplicacion_id, 'codDiagnosticoPrincipal_id':codDiagnosticoPrincipal_id,
                 'codDiagnosticoRelacionado_id':codDiagnosticoRelacionado_id, 'codProcedimiento_id':codProcedimiento_id,'codServicio_id':codServicio_id,
                 'conceptoRecaudo_id':conceptoRecaudo_id,'finalidadTecnologiaSalud_id':finalidadTecnologiaSalud_id, 'grupoServicios_id':grupoServicios_id,
                 'modalidadGrupoServicioTecSal_id':modalidadGrupoServicioTecSal_id,'tipoDocumentoIdentificacion_id':tipoDocumentoIdentificacion_id,
                 'usuarioRegistro_id':usuarioRegistro_id,'viaIngresoServicioSalud_id':viaIngresoServicioSalud_id,'ripsDetalle_id':ripsDetalle_id,
                 'itemFactura': itemFactura,'ripsTipos_id ':ripsTipos_id,'tipoPagoModerador_id':tipoPagoModerador_id , 'ripsTransaccion_id':ripsTransaccion_id
                 }})



    miConexionx.close()
    print("procedimientosRips "  , procedimientosRips)

    procedimientosRips_converted = [convert_keys_and_values(d) for d in procedimientosRips]

    serialized1 = json.dumps(procedimientosRips_converted, default=str)

    return HttpResponse(serialized1, content_type='application/json')



def Load_tablaGlosasTransaccion(request, data):
    print("Entre load_data Transaccion Glosas")

    context = {}
    d = json.loads(data)


    sedesClinica_id = d['sedesClinica_id']
    print("sedesClinica_id = ", sedesClinica_id)

    facturaId = d['facturaId']
    print("facturaId = ", facturaId)


    transaccionRips = []

    miConexionx = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",
                                   password="123456")
    curx = miConexionx.cursor()

    detalle = 'SELECT id, "numDocumentoIdObligado", "numNota","fechaRegistro", "tipoNota_id","usuarioRegistro_id"  , "ripsEnvio_id", "sedesClinica_id"  FROM public.rips_ripstransaccion ripstra WHERE  cast(ripstra."numFactura" as integer) =' +  str(facturaId)
    print(detalle)

    curx.execute(detalle)

    for id,  numDocumentoIdObligado, numNota, fechaRegistro,tipoNota_id, usuarioRegistro_id,  ripsEnvio_id,  sedesClinica_id in curx.fetchall():
        transaccionRips.append(
            {"model": "rips.RipsTransaccion", "pk": id, "fields":
                {'id': id, 'numDocumentoIdObligado': numDocumentoIdObligado , 'numNota': numNota, 'fechaRegistro': fechaRegistro, 'tipoNota_id':tipoNota_id, 'usuarioRegistro_id':usuarioRegistro_id,
                   'ripsEnvio_id': ripsEnvio_id, 'sedesClinica_id' :sedesClinica_id}})



    miConexionx.close()
    print("transaccionRips "  , transaccionRips)
    #context['TransaccionRips'] = transaccionRips

    serialized1 = json.dumps(transaccionRips, default=str)

    return HttpResponse(serialized1, content_type='application/json')

def Load_tablaGlosasUsuarios(request, data):
    print("Entre load_data Usuarios Glosas")

    context = {}
    d = json.loads(data)


    sedesClinica_id = d['sedesClinica_id']
    print("sedesClinica_id = ", sedesClinica_id)

    facturaId = d['facturaId']
    print("facturaId = ", facturaId)


    usuariosRips = []

    miConexionx = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",
                                   password="123456")
    curx = miConexionx.cursor()

    detalle = 'SELECT  ripsu.id, ripsu."tipoDocumentoIdentificacion", ripsu."tipoUsuario", ripsu."fechaNacimiento", ripsu."codSexo", ripsu."codZonaTerritorialResidencia", ripsu.incapacidad, ripsu.consecutivo, ripsu."fechaRegistro", ripsu."codMunicipioResidencia_id", ripsu."codPaisOrigen_id",ripsu."codPaisResidencia_id", ripsu."usuarioRegistro_id", ripsu."numDocumentoIdentificacion", ripsu."ripsDetalle_id", ripsu."ripsTransaccion_id"  FROM public.rips_ripsusuarios ripsu, public.rips_ripstransaccion ripstra  WHERE ripstra.id = ripsu."ripsTransaccion_id" and cast(ripstra."numFactura" as integer) =' + "'" + str(facturaId) + "'"

    print(detalle)

    curx.execute(detalle)

    for id,  tipoDocumentoIdentificacion, tipoUsuario, fechaNacimiento,codSexo, codZonaTerritorialResidencia,  incapacidad,  consecutivo, fechaRegistro, codMunicipioResidencia_id , codPaisOrigen_id, codPaisResidencia_id, usuarioRegistro_id , numDocumentoIdentificacion,ripsDetalle_id, ripsTransaccion_id in curx.fetchall():
        usuariosRips.append(
            {"model": "rips.RipsTransaccion", "pk": id, "fields":
                {'id': id, 'tipoDocumentoIdentificacion': tipoDocumentoIdentificacion , 'tipoUsuario': tipoUsuario, 'fechaNacimiento': fechaNacimiento, 'codSexo':codSexo, 'codZonaTerritorialResidencia':codZonaTerritorialResidencia,
                   'incapacidad': incapacidad, 'consecutivo' :consecutivo ,'fechaRegistro':fechaRegistro, 'codMunicipioResidencia_id':codMunicipioResidencia_id,'codPaisOrigen_id':codPaisOrigen_id,'codPaisResidencia_id':codPaisResidencia_id,'usuarioRegistro_id':usuarioRegistro_id ,'numDocumentoIdentificacion':numDocumentoIdentificacion,
                    'ripsDetalle_id':ripsDetalle_id,'ripsTransaccion_id':ripsTransaccion_id
                 }})



    miConexionx.close()
    print("usuariosRips "  , usuariosRips)
    #context['usuariosRips'] = usuariosRips

    serialized1 = json.dumps(usuariosRips, default=str)

    return HttpResponse(serialized1, content_type='application/json')


def Load_tablaGlosasMedicamentos(request, data):
    print("Entre  Load_tablaGlosasMedicamentos Glosas")

    context = {}
    d = json.loads(data)


    sedesClinica_id = d['sedesClinica_id']
    print("sedesClinica_id = ", sedesClinica_id)

    facturaId = d['facturaId']
    print("facturaId = ", facturaId)


    medicamentosRips = []

    miConexionx = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",
                                   password="123456")
    curx = miConexionx.cursor()

    detalle = 'SELECT  ripsmed.id,"itemFactura", "nomTecnologiaSalud", cums.nombre cums,"concentracionMedicamento", "cantidadMedicamento",  "vrUnitMedicamento", "vrServicio",  consecutivo,  "tipoMedicamento_id", "unidadMedida_id", "cantidadGlosada", "cantidadAceptada", "cantidadSoportado", "valorGlosado","vAceptado",	 "valorSoportado","motivoGlosa_id", "notasCreditoGlosa", "notasCreditoOtras", "notasDebito" FROM public.rips_ripstransaccion ripstra , public.rips_ripsmedicamentos ripsmed , public.rips_ripscums cums  WHERE   ripstra.id = ripsmed."ripsTransaccion_id" AND cum ="nomTecnologiaSalud" and cast(ripstra."numFactura" as integer) =' +  str(facturaId)

    print(detalle)

    curx.execute(detalle)

    for  id, itemFactura, nomTecnologiaSalud, idMIPRES, fechaDispensAdmon, nomTecnologiaSalud, cums, concentracionMedicamento, cantidadMedicamento, vrUnitMedicamento, vrServicio,  consecutivo, tipoMedicamento_id, unidadMedida_id, cantidadGlosada, cantidadAceptada, cantidadSoportado, valorGlosado,vAceptado, valorSoportado , motivoGlosa_id, notasCreditoGlosa, notasCreditoOtras, notasDebito in curx.fetchall():
        medicamentosRips.append(
            {"model": "rips.RipsMedicamentos", "pk": id, "fields":
                {'id': id, 'itemFactura': itemFactura , 'nomTecnologiaSalud': nomTecnologiaSalud,  'cums':cums,'concentracionMedicamento':concentracionMedicamento,'cantidadMedicamento':cantidadMedicamento,
		 'vrUnitMedicamento':vrUnitMedicamento, 'vrServicio':vrServicio, 'consecutivo':consecutivo,'tipoMedicamento_id':tipoMedicamento_id,'unidadMedida_id':unidadMedida_id,'cantidadGlosada':cantidadGlosada,'cantidadAceptada':cantidadAceptada,'cantidadSoportado':cantidadSoportado,'valorGlosado':valorGlosado,'vAceptado':vAceptado,'valorSoportado':valorSoportado,'motivoGlosa_id':motivoGlosa_id,'notasCreditoGlosa':notasCreditoGlosa, 'notasCreditoOtras':notasCreditoOtras, 'notasDebito':notasDebito
                 }})



    miConexionx.close()
    print("medicamentosRips "  , medicamentosRips)


    serialized1 = json.dumps(medicamentosRips,  default=str)

    return HttpResponse(serialized1, content_type='application/json')


def ConsultaGlosasRipsMedicamentos(request, data):
    print("Entre consultaGlosasRipsMedicamentos")

    context = {}
    d = json.loads(data)

    facturaId = d['facturaId']
    print("facturaId = ", facturaId)

    id= d['id']
    print("id= ", id)


    medicamentosRipsUnRegistro = []

    miConexionx = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",
                                   password="123456")
    curx = miConexionx.cursor()

    detalle = 'SELECT med.id,"itemFactura", "nomTecnologiaSalud", cums.nombre cums,"concentracionMedicamento", "cantidadMedicamento",  "vrUnitMedicamento", "vrServicio",  consecutivo,  "tipoMedicamento_id", "unidadMedida_id", "cantidadGlosada", "cantidadAceptada", "cantidadSoportado", "valorGlosado","vAceptado",	 "valorSoportado","motivoGlosa_id", "notasCreditoGlosa", "notasCreditoOtras", "notasDebito" FROM public.rips_ripsmedicamentos med, public.rips_ripscums cums where med.id= ' + "'" + str(id) + "'" + ' and cum ="nomTecnologiaSalud"'

    print(detalle)

    curx.execute(detalle)

    for id, itemFactura, nomTecnologiaSalud, cums, concentracionMedicamento, cantidadMedicamento, vrUnitMedicamento, vrServicio,  consecutivo, tipoMedicamento_id, unidadMedida_id, cantidadGlosada, cantidadAceptada, cantidadSoportado, valorGlosado,vAceptado, valorSoportado , motivoGlosa_id, notasCreditoGlosa, notasCreditoOtras, notasDebito   in curx.fetchall():
     medicamentosRipsUnRegistro.append(
            {"model": "rips.RipsMedicamentos", "pk": id, "fields":
                {'id': id, 'itemFactura': itemFactura , 'nomTecnologiaSalud': nomTecnologiaSalud,  'cums':cums,'concentracionMedicamento':concentracionMedicamento,'cantidadMedicamento':cantidadMedicamento,
		 'vrUnitMedicamento':vrUnitMedicamento, 'vrServicio':vrServicio,'consecutivo':consecutivo,'tipoMedicamento_id':tipoMedicamento_id,'unidadMedida_id':unidadMedida_id,'cantidadGlosada':cantidadGlosada,'cantidadAceptada':cantidadAceptada,'cantidadSoportado':cantidadSoportado,'valorGlosado':valorGlosado,'vAceptado':vAceptado,'valorSoportado':valorSoportado,'motivoGlosa_id':motivoGlosa_id,'notasCreditoGlosa':notasCreditoGlosa, 'notasCreditoOtras':notasCreditoOtras, 'notasDebito':notasDebito
                 }})


    miConexionx.close()
    print("medicamentosRipsUnRegistro "  , medicamentosRipsUnRegistro)
    context['MedicamentosRipsUnRegistro'] = medicamentosRipsUnRegistro

    serialized1 = json.dumps(medicamentosRipsUnRegistro, default=serialize_datetime)

    return HttpResponse(serialized1, content_type='application/json')



def GuardarGlosasMedicamentos(request):

    print ("Entre Guardar Glosas Medicamentos" )

    convenio_id = request.POST['convenio_id']
    print("convenio_id =", convenio_id)

    sedesClinica_id = request.POST['sedesClinica_id']
    print("sedesClinica_id =", sedesClinica_id)


    observaciones = request.POST["observaciones"]
    print("observaciones =", observaciones)


    id = request.POST['id']
    print ("id =", id)



    motivoGlosa_id= request.POST["motivoGlosa_id"]
    print ("motivoGlosa_id =", motivoGlosa_id)

    valorGlosa = request.POST['valorGlosa']
    print ("valorGlosa =", valorGlosa)

    cantidadGlosada = request.POST['cantidadGlosada']
    print ("cantidadGlosada =", cantidadGlosada)
    cantidadAceptada = request.POST['cantidadAceptada']
    print ("cantidadAceptada =", cantidadAceptada)
    cantidadSoportado = request.POST['cantidadSoportado']
    print ("cantidadSoportado =", cantidadSoportado)
    valorGlosado = request.POST['valorGlosado']
    print ("valorGlosado =", valorGlosado)
    vAceptado = request.POST['vAceptado']
    print ("vAceptado =", vAceptado)
    valorSoportado = request.POST['valorSoportado']
    print ("valorSoportado=",valorSoportado)
    notasCreditoGlosa = request.POST['notasCreditoGlosa']
    print ("notasCreditoGlosa=",notasCreditoGlosa)
    notasCreditoOtras = request.POST['notasCreditoOtras']
    print ("notasCreditoOtras=",notasCreditoOtras)
    notasDebito = request.POST['notasDebito']
    print ("notasDebito=",notasDebito)




    usuarioRegistro_id = request.POST['usuarioRegistro_id']
    print ("usuarioRegistro_id =", usuarioRegistro_id)

    estadoReg = 'A'
    fechaRegistro = datetime.datetime.now()

    miConexion3 = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",  password="123456")
    cur3 = miConexion3.cursor()

    comando = 'UPDATE rips_ripsmedicamentos SET "cantidadGlosada"= ' +"'" + str(cantidadGlosada) + "'," + ' "cantidadAceptada" = ' + "'" +str(cantidadAceptada) + "'," + '"cantidadSoportado" = ' + "'" + str(cantidadSoportado) + "'," + '"valorGlosado"= ' + "'" + str(valorGlosado) + "'," + '"vAceptado" = ' + "'" + str(vAceptado) + "',"  + '"valorSoportado" = ' + "'" + str(valorSoportado) + "'," +  '"notasCreditoGlosa" = ' + "'" + str(notasCreditoGlosa) + "'," + '"notasCreditoOtras "= ' + "'" + str(notasCreditoOtras ) + "'," +  '"notasDebito" = ' + "'" + str(notasDebito) + "'" + '  WHERE id = ' + str(id)

    print(comando)
    cur3.execute(comando)
    miConexion3.commit()
    miConexion3.close()



    return JsonResponse({'success': True, 'message': 'Glosa Actualizado satisfactoriamente!'})

