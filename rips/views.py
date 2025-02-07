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
def load_dataEnviosRips(request, data):
    print("Entre load_data Envios Rips")

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

    enviosRips = []

    miConexionx = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",
                                   password="123456")
    curx = miConexionx.cursor()

    detalle = 'SELECT id,  "fechaEnvio", "fechaRespuesta", "cantidadFacturas", "cantidadPasaron", "cantidadRechazadas", "estadoPasoMinisterio", "fechaRegistro", "estadoReg", "usuarioRegistro_id", empresa_id, "sedesClinica_id"  FROM public.rips_ripsenvios'

    print(detalle)

    curx.execute(detalle)

    for id,  fechaEnvio, fechaRespuesta, cantidadFacturas, cantidadPasaron, cantidadRechazadas, estadoPasoMinisterio, fechaRegistro, estadoReg, usuarioRegistro_id, empresa_id, sedesClinica_id in curx.fetchall():
        enviosRips.append(
            {"model": "rips.ripsEnvios", "pk": id, "fields":
                {'id': id, 'fechaEnvio': fechaEnvio, 'fechaRespuesta': fechaRespuesta, 'cantidadFacturas': cantidadFacturas,
                 'cantidadPasaron': cantidadPasaron, 'cantidadRechazadas': cantidadRechazadas,
                 'estadoPasoMinisterio': estadoPasoMinisterio,  'fechaRegistro': fechaRegistro, 'estadoReg': estadoReg,'usuarioRegistro_id':usuarioRegistro_id, 'empresa_id':empresa_id, 'sedesClinica_id': sedesClinica_id}})

    miConexionx.close()
    print("EnviosRips "  , enviosRips)
    context['EnviosRips'] = enviosRips

    serialized1 = json.dumps(enviosRips, default=serialize_datetime)

    return HttpResponse(serialized1, content_type='application/json')


def GuardaEnviosRips(request):

    print ("Entre Guarda Envios Rips" )

    empresa_id = request.POST['empresa_id']
    print("empresa_id =", empresa_id)

    sedesClinica_id = request.POST['sedesClinica_id']
    print("sedesClinica_id =", sedesClinica_id)

    fechaEnvio = request.POST['fechaEnvio']
    print ("fechaEnvio =", fechaEnvio)

    fechaRespuesta = request.POST["fechaRespuesta"]
    print ("fechaRespuesta =", fechaRespuesta)

    cantidadFacturas = request.POST['cantidadFacturas']
    print ("cantidadFacturas =", cantidadFacturas)
    cantidadPasaron = request.POST['cantidadPasaron']
    print ("cantidadPasaron =", cantidadPasaron)
    cantidadRechazadas = request.POST['cantidadRechazadas']
    print ("cantidadRechazadas =", cantidadRechazadas)


    estadoPasoMinisterio = request.POST['estadoPasoMinisterio']
    print ("estadoPasoMinisterio =", estadoPasoMinisterio)
    jsonError = request.POST['jsonError']
    print ("jsonError =", jsonError)
    jsonAprobado = request.POST['jsonAprobado']
    print ("jsonAprobado =", jsonAprobado)
    usuarioRegistro_id = request.POST['usuarioRegistro_id']
    print ("usuarioRegistro_id =", usuarioRegistro_id)
    estadoReg = 'A'
    fechaRegistro = datetime.datetime.now()



    miConexion3 = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",  password="123456")
    cur3 = miConexion3.cursor()
    comando = 'insert into rips_ripsEnvios  ("fechaEnvio", "fechaRespuesta", "cantidadFacturas", "cantidadPasaron", "cantidadRechazadas","estadoPasoMinisterio", "jsonError", "jsonAprobado", "fechaRegistro", "estadoReg", "usuarioRegistro_id", empresa_id, "sedesClinica_id") values ('  +  "'" + str(fechaEnvio) + "'," + "'" + str(fechaRespuesta) + "'," +  "'" + str(cantidadFacturas) + "'" + ' , '  + "'" + str(cantidadPasaron) + "'" + ', ' + "'" + str(cantidadRechazadas) + "'" + '  , ' + "'" + str(estadoPasoMinisterio) + "'" + '  , ' + "'" + str(jsonError) + "'" + ', ' + "'" + str(jsonAprobado) + "',"   + "'" + str(fechaRegistro) + "','"   + str(estadoReg) + "'," + "'" + str(usuarioRegistro_id) + "','" + str(empresa_id) + "','" + str(sedesClinica_id) + "');"
    print(comando)
    cur3.execute(comando)
    miConexion3.commit()
    miConexion3.close()



    return JsonResponse({'success': True, 'message': 'Envio realizado satisfactoriamente!'})
