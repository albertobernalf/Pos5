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
import io


def decimal_serializer(obj):
    if isinstance(obj, Decimal):
        return str(obj)
    raise TypeError("Type not serializable")

def serialize_datetime(obj):
    if isinstance(obj, datetime.datetime):
        return obj.isoformat()
    raise TypeError("Type not serializable")



# Create your views here.

# Create your views here.
def load_dataAutorizaciones(request, data):
    print("Entre load_dataAutorizaciones")

    print("llegue bien01")

    context = {}
    d = json.loads(data)

    print("llegue bien02")

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
        'O') + "'" + ' AND i."salidaDefinitiva" = ' + "'" + str(
        'N') + "'" + ' and tp.id = u."tipoDoc_id" and  i."tipoDoc_id" = u."tipoDoc_id" and u.id = i."documento_id" and diag.id = i."dxActual_id" and i."fechaSalida" is null and dep."serviciosSedes_id" = sd.id and dep.id = i."dependenciasActual_id"  group by ser.nombre UNION SELECT ser.nombre, count(*) total FROM triage_triage t, usuarios_usuarios u, sitios_dependencias dep , usuarios_tiposDocumento tp , sitios_dependenciastipo deptip  , sitios_serviciosSedes sd, clinico_servicios ser WHERE sd."sedesClinica_id" = t."sedesClinica_id"  and t."sedesClinica_id" = dep."sedesClinica_id" AND  t."sedesClinica_id" =  ' + "'" + str(
        sede) + "'" + ' AND dep."sedesClinica_id" =  sd."sedesClinica_id" AND dep.id = t.dependencias_id AND  t."serviciosSedes_id" = sd.id  AND deptip.id = dep."dependenciasTipo_id" and  tp.id = u."tipoDoc_id" and  t."tipoDoc_id" = u."tipoDoc_id" and u.id = t."documento_id"  and ser.id = sd.servicios_id and  dep."serviciosSedes_id" = sd.id and t."serviciosSedes_id" = sd.id and dep."tipoDoc_id" = t."tipoDoc_id" and  t."consecAdmision" = 0 and dep."documento_id" = t."documento_id" and ser.nombre = ' + "'" + str(
        'TRIAGE') + "'" + ' group by ser.nombre'

    curt.execute(comando)
    print(comando)

    indicadores = []

    for id, nombre in curt.fetchall():
        indicadores.append({'id': id, 'nombre': nombre})

    miConexiont.close()
    print(indicadores)

    context['Indicadores'] = indicadores

    # Fin combo Indicadores

    autorizaciones = []

    miConexionx = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",
                                   password="123456")
    curx = miConexionx.cursor()


    detalle = 'select aut.id id ,aut."sedesClinica_id" ,sed.nombre sede,usu.nombre paciente,historia_id folio,"fechaSolicitud",aut.justificacion,"numeroAutorizacion","fechaAutorizacion", pla.nombre medico, aut.observaciones, estado.nombre estadoAutorizacion, "numeroSolicitud", "fechaVigencia", empresa_id, emp.nombre empresaNombre, "plantaOrdena_id", aut."usuarioRegistro_id" FROM autorizaciones_autorizaciones aut, sitios_sedesClinica sed, facturacion_empresas emp, clinico_historia historia, usuarios_usuarios usu, planta_planta pla , autorizaciones_estadosAutorizacion estado  where historia.id = aut.historia_id and sed.id = aut."sedesClinica_id" and emp.id = aut.empresa_id and usu."tipoDoc_id" = historia."tipoDoc_id" and usu.id = historia.documento_id and pla.id = aut."plantaOrdena_id" and estado.id = aut."estadoAutorizacion_id"          '


    print(detalle)

    curx.execute(detalle)

    for id ,sedesClinica_id,sede,paciente,folio,fechaSolicitud,justificacion,numeroAutorizacion,fechaAutorizacion, medico,observaciones,estadoAutorizacion,numeroSolicitud,fechaVigencia,empresa_id, empresaNombre,plantaOrdena_id,usuarioRegistro_id in curx.fetchall():
        autorizaciones.append(
            {"model": "autorizaciones_autorizaciones", "pk": id, "fields":
                {'id': id, 'sedesClinica_id': sedesClinica_id, 'sede': sede,'paciente': paciente,'folio': folio,'fechaSolicitud': fechaSolicitud,'justificacion':justificacion,   'numeroAutorizacion':numeroAutorizacion,'fechaAutorizacion':fechaAutorizacion,
                   'numeroAutorizacion': numeroAutorizacion, 'fechaAutorizacion':fechaAutorizacion,  'medico': medico, 'observaciones': observaciones,'estadoAutorizacion':estadoAutorizacion, 'numeroSolicitud':numeroSolicitud,
                 'fechaVigencia': fechaVigencia, 'empresa_id':empresa_id, 'empresaNombre':empresaNombre, 'plantaOrdena_id':plantaOrdena_id,'usuarioRegistro_id':usuarioRegistro_id}})
    miConexionx.close()
    print("autorizaciones "  , autorizaciones)
    context['Autorizaciones'] = autorizaciones

    serialized1 = json.dumps(autorizaciones, default=serialize_datetime)

    return HttpResponse(serialized1, content_type='application/json')


def load_dataAutorizacionesDetalle(request, data):
    print("Entre load_dataAutorizacionesDetalle")

    print("llegue bien01")

    context = {}
    d = json.loads(data)

    print("llegue bien02")

    username = d['username']
    sede = d['sede']
    username_id = d['username_id']

    nombreSede = d['nombreSede']
    print("sede:", sede)
    print("username:", username)
    print("username_id:", username_id)

    autorizacionId = d['autorizacionId']
    print("autorizacionId:", autorizacionId)

    # Combo Indicadores

    miConexiont = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",
                                   password="123456")
    curt = miConexiont.cursor()

    comando = 'SELECT ser.nombre, count(*) total FROM admisiones_ingresos i, usuarios_usuarios u, sitios_dependencias dep , clinico_servicios ser ,usuarios_tiposDocumento tp , sitios_dependenciastipo deptip  , clinico_Diagnosticos diag , sitios_serviciosSedes sd  WHERE sd."sedesClinica_id" = i."sedesClinica_id"  and sd.servicios_id  = ser.id and i."sedesClinica_id" = dep."sedesClinica_id" AND i."sedesClinica_id" = ' + "'" + str(
        sede) + "'" + ' AND  deptip.id = dep."dependenciasTipo_id" and i."serviciosActual_id" = ser.id AND dep.disponibilidad = ' + "'" + str(
        'O') + "'" + ' AND i."salidaDefinitiva" = ' + "'" + str(
        'N') + "'" + ' and tp.id = u."tipoDoc_id" and  i."tipoDoc_id" = u."tipoDoc_id" and u.id = i."documento_id" and diag.id = i."dxActual_id" and i."fechaSalida" is null and dep."serviciosSedes_id" = sd.id and dep.id = i."dependenciasActual_id"  group by ser.nombre UNION SELECT ser.nombre, count(*) total FROM triage_triage t, usuarios_usuarios u, sitios_dependencias dep , usuarios_tiposDocumento tp , sitios_dependenciastipo deptip  , sitios_serviciosSedes sd, clinico_servicios ser WHERE sd."sedesClinica_id" = t."sedesClinica_id"  and t."sedesClinica_id" = dep."sedesClinica_id" AND  t."sedesClinica_id" =  ' + "'" + str(
        sede) + "'" + ' AND dep."sedesClinica_id" =  sd."sedesClinica_id" AND dep.id = t.dependencias_id AND  t."serviciosSedes_id" = sd.id  AND deptip.id = dep."dependenciasTipo_id" and  tp.id = u."tipoDoc_id" and  t."tipoDoc_id" = u."tipoDoc_id" and u.id = t."documento_id"  and ser.id = sd.servicios_id and  dep."serviciosSedes_id" = sd.id and t."serviciosSedes_id" = sd.id and dep."tipoDoc_id" = t."tipoDoc_id" and  t."consecAdmision" = 0 and dep."documento_id" = t."documento_id" and ser.nombre = ' + "'" + str(
        'TRIAGE') + "'" + ' group by ser.nombre'

    curt.execute(comando)
    print(comando)

    indicadores = []

    for id, nombre in curt.fetchall():
        indicadores.append({'id': id, 'nombre': nombre})

    miConexiont.close()
    print(indicadores)

    context['Indicadores'] = indicadores

    # Fin combo Indicadores

    autorizacionesDetalle = []

    miConexionx = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",
                                   password="123456")
    curx = miConexionx.cursor()


    detalle = 'select autdet.id id ,tipoexa.nombre tipoExamen,exa.nombre examen,autdet."cantidadSolicitada", autdet."cantidadAutorizada",autdet."valorSolicitado", autdet."valorAutorizado", estado.nombre autorizado from autorizaciones_autorizacionesdetalle autdet, clinico_tiposexamen tipoexa, clinico_examenes exa , autorizaciones_estadosAutorizacion estado where autdet.autorizaciones_id = ' + "'" + str(autorizacionId) + "'" + ' and autdet."tiposExamen_id" = tipoexa.id and autdet.examenes_id = exa.id and autdet.examenes_id is not null and estado.id=autdet."estadoAutorizacion_id" union select autdet.id id, tiposum.nombre tiposum, sum.nombre suministro, autdet."cantidadSolicitada", autdet."cantidadAutorizada", autdet."valorSolicitado", autdet."valorAutorizado" , estado.nombre  from autorizaciones_autorizacionesdetalle autdet, facturacion_tipossuministro tiposum, facturacion_suministros sum , autorizaciones_estadosAutorizacion estado where autdet.autorizaciones_id = ' + "'" + str(autorizacionId) + "'" + ' and autdet."tipoSuministro_id" = tiposum.id and autdet.cums_id = sum.id and autdet.cums_id is not null and estado.id=autdet."estadoAutorizacion_id" '

    print(detalle)

    curx.execute(detalle)

    for id , tipoExamen, examen,cantidadSolicitada, cantidadAutorizada, valorSolicitado,valorAutorizado,autorizado in curx.fetchall():
        autorizacionesDetalle.append(
            {"model": "autorizaciones_autorizacionesDetalle", "pk": id, "fields":
                {'id': id, 'tipoExamen': tipoExamen, 'examen': examen,'cantidadSolicitada': cantidadSolicitada,'cantidadAutorizada': cantidadAutorizada,'valorSolicitado': valorSolicitado,'valorAutorizado':valorAutorizado,
                 'autorizado':autorizado}})
    miConexionx.close()
    print("autorizacionesDetalle "  , autorizacionesDetalle)

    serialized1 = json.dumps(autorizacionesDetalle, default=str)

    return HttpResponse(serialized1, content_type='application/json')


def ActualizarAutorizacionDetalle(request):

    print ("Entre ActualizarAutorizacionDetalle" )



    autorizacionDetalleId = request.POST['autorizacionDetalleId']
    print("autorizacionDetalleId =", autorizacionDetalleId)

    estadoAutorizacion = request.POST['estadoAutorizacion']
    print("estadoAutorizacion =", estadoAutorizacion)

    numeroAutorizacion = request.POST['numeroAutorizacion']
    print("numeroAutorizacion =", numeroAutorizacion)



    cantidadAutorizada = request.POST['cantidadAutorizada']
    print("cantidadAutorizada =", cantidadAutorizada)

    valorAutorizado = request.POST['valorAutorizado']
    print("valorAutorizado =", valorAutorizado)

    now = datetime.datetime.now()
    dnow = now.strftime("%Y-%m-%d %H:%M:%S")
    print("NOW  = ", dnow)

    fechaRegistro = dnow
    print("fechaRegistro = ", fechaRegistro)



    # ACTUALIZA DETALLE AUTORIZACION

    miConexionx = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",
                                   password="123456")
    curx = miConexionx.cursor()

    detalle = 'UPDATE autorizaciones_autorizacionesdetalle SET  "estadoAutorizacion_id" =   ' + "'" + str(estadoAutorizacion) + "'," + ' "numeroAutorizacion" = '   + "'" + str(numeroAutorizacion) + "'," + ' "valorAutorizado" = ' + "'" + str(valorAutorizado) + "'," +   ' "fechaRegistro" = ' + "'" + str(fechaRegistro) + "',"  + ' "cantidadAutorizada" = ' + "'" + str(cantidadAutorizada) +  "'" +  ' WHERE id = ' + "'" + str(autorizacionDetalleId) + "'"

    print("detalle = ", detalle)

    curx.execute(detalle)
    miConexionx.commit()
    miConexionx.close()

    # RUTINA SI ESTA AUTORIZADO DEBE CREAR EN FACTURACONDETALLE, OPS CON TARIFA ?????? o el valor lo trae de la autoprizacion mejor


    # Aqui crear rutina consigue CABEZOTE DE facturacion_liquidacion, para colocar el valor

    # Aqui RUTINA busca consecutivo de liquidacion

    #miConexiont = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",
    #                               password="123456")
    #curt = miConexiont.cursor()

    #comando = 'SELECT (max(p.consecutivo) + 1) cons FROM facturacion_liquidaciondetalle p WHERE liquidacion_id = ' + liquidacionId

    #curt.execute(comando)

    #print(comando)

    #consecLiquidacion = []

    #for cons in curt.fetchall():
    #    consecLiquidacion.append({'cons': cons})

    #miConexiont.close()
    #print("consecLiquidacion = ", consecLiquidacion[0])

    #consecLiquidacion = consecLiquidacion[0]['cons']
    #consecLiquidacion = str(consecLiquidacion)
    #print("consecLiquidacion = ", consecLiquidacion)

    #consecLiquidacion = consecLiquidacion.replace("(", ' ')
    #consecLiquidacion = consecLiquidacion.replace(")", ' ')
    #consecLiquidacion = consecLiquidacion.replace(",", ' ')




    #miConexiont = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",
     #                              password="123456")
    #curt = miConexiont.cursor()
    ##comando = 'INSERT INTO facturacion_liquidaciondetalle (consecutivo,fecha, cantidad, "valorUnitario", "valorTotal",cirugia,"fechaCrea", "fechaRegistro", "estadoRegistro", "examen_id",  "usuarioRegistro_id", liquidacion_id, "tipoRegistro") VALUES (' + "'" + str(
    #    consecLiquidacion) + "','" + str(fechaRegistro) + "','" + str(cantidad) + "','" + str(
    #    tarifaValor) + "','" + str(TotalTarifa) + "','" + str('N') + "','" + str(fechaRegistro) + "','" + str(
    #    fechaRegistro) + "','" + str(estadoReg) + "','" + str(codigoCupsId[0].id) + "','" + str(
    #    usuarioRegistro) + "'," + liquidacionId + ",'SISTEMA')"
    #curt.execute(comando)
    #miConexiont.commit()
    #miConexiont.close()

    # FIN FACTURACIONDETALLE


    return JsonResponse({'success': True, 'message': 'Detalle de Autorizacion actualizado satisfactoriamente!'})


def LeerDetalleAutorizacion(request):

    autorizacionDetalleId = request.POST['autorizacionDetalleId']
    print("autorizacionDetalleId =", autorizacionDetalleId)


    #Lee detalle Autorizacion

    context = {}

    autorizacionDetalle = []

    miConexionx = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",
                                   password="123456")
    curx = miConexionx.cursor()

    detalle = 'select id, "cantidadSolicitada", "cantidadAutorizada", "fechaRegistro", "estadoReg", autorizaciones_id, "usuarioRegistro_id", examenes_id, cums_id, "valorAutorizado", "valorSolicitado", "tiposExamen_id", "tipoSuministro_id", "estadoAutorizacion_id", "numeroAutorizacion" FROM autorizaciones_autorizacionesdetalle   WHERE id =' + "'" + str(autorizacionDetalleId) + "'"

    print(detalle)

    curx.execute(detalle)

    for id, cantidadSolicitada, cantidadAutorizada, fechaRegistro, estadoReg, autorizaciones_id, usuarioRegistro_id, examenes_id, cums_id, valorAutorizado,	valorSolicitado, tiposExamen_id, tipoSuministro_id, estadoAutorizacion_id, numeroAutorizacion in curx.fetchall():
        autorizacionDetalle.append(
            {"model": "rips_ripsdetalle", "pk": id, "fields":
                {'id':id, 'cantidadSolicitada':cantidadSolicitada,'cantidadAutorizada':cantidadAutorizada,'fechaRegistro':fechaRegistro,'estadoReg':estadoReg,
                 'autorizaciones_id':autorizaciones_id,'usuarioRegistro_id':usuarioRegistro_id,'examenes_id':examenes_id,'cums_id':cums_id,'valorAutorizado':valorAutorizado,
                 'valorSolicitado':valorSolicitado,'tiposExamen_id':tiposExamen_id,'tipoSuministro_id':tipoSuministro_id,'estadoAutorizacion_id':estadoAutorizacion_id,'numeroAutorizacion':id,'numeroAutorizacion':numeroAutorizacion}})

    miConexionx.close()
    print("autorizacionDetalle ", autorizacionDetalle)


    serialized1 = json.dumps(autorizacionDetalle, default=str)

    return HttpResponse(serialized1, content_type='application/json')
