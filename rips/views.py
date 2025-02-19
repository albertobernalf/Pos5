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
from rips.models import RipsTransaccion, RipsUsuarios
import pickle
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
def load_dataEnviosRips(request, data):
    print("Entre load_data Envios Rips")

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

    enviosRips = []

    miConexionx = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",
                                   password="123456")
    curx = miConexionx.cursor()

    detalle = 'SELECT env.id,  env."fechaEnvio", env."fechaRespuesta", env."cantidadFacturas", env."cantidadPasaron", env."cantidadRechazadas",env."estadoPasoMinisterio",  case when env."estadoPasoMinisterio" = ' + "'" + str('P') + "'" + ' then ' + "'" + str('Pendiente') + "'" + ' when  env."estadoPasoMinisterio" = ' + "'" + str('E') + "'" + ' then ' + "'" + str('Enviada') + "'" + ' end estadoMinisterio, env."fechaRegistro", env."estadoReg", env."usuarioRegistro_id", env.empresa_id, env."sedesClinica_id" , sed.nombre nombreClinica, emp.nombre nombreEmpresa , usu.nombre nombreRegistra , env."tipoRips" tipo FROM public.rips_ripsenvios env, sitios_sedesclinica sed, facturacion_empresas emp, usuarios_usuarios usu where env."sedesClinica_id" = sed.id and env.empresa_id=emp.id AND usu.id = env."usuarioRegistro_id"'

    print(detalle)

    curx.execute(detalle)

    for id,  fechaEnvio, fechaRespuesta, cantidadFacturas, cantidadPasaron, cantidadRechazadas, estadoPasoMinisterio, estadoMinisterio ,fechaRegistro, estadoReg, usuarioRegistro_id, empresa_id, sedesClinica_id, nombreClinica, nombreEmpresa, nombreRegistra, tipo in curx.fetchall():
        enviosRips.append(
            {"model": "rips.ripsEnvios", "pk": id, "fields":
                {'id': id, 'fechaEnvio': fechaEnvio, 'fechaRespuesta': fechaRespuesta, 'cantidadFacturas': cantidadFacturas,
                 'cantidadPasaron': cantidadPasaron, 'cantidadRechazadas': cantidadRechazadas,
                 'estadoPasoMinisterio': estadoPasoMinisterio, 'estadoMinisterio':estadoMinisterio,  'fechaRegistro': fechaRegistro, 'estadoReg': estadoReg,'usuarioRegistro_id':usuarioRegistro_id, 'empresa_id':empresa_id, 'sedesClinica_id': sedesClinica_id, 'nombreClinica':nombreClinica, 'nombreEmpresa':nombreEmpresa,'nombreRegistra':nombreRegistra, 'tipo':tipo}})

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

    tipoRips = request.POST['tipoRips']
    print("tipoRips =", tipoRips)

    fechaEnvio = 'null'
    print ("fechaEnvio =", fechaEnvio)

    fechaRespuesta = 'null'
    print ("fechaRespuesta =", fechaRespuesta)

    cantidadFacturas = request.POST['cantidadFacturas']
    print ("cantidadFacturas =", cantidadFacturas)
    cantidadPasaron = request.POST['cantidadPasaron']
    print ("cantidadPasaron =", cantidadPasaron)
    cantidadRechazadas = request.POST['cantidadRechazadas']
    print ("cantidadRechazadas =", cantidadRechazadas)


    estadoPasoMinisterio = request.POST['estadoPasoMinisterio']
    print ("estadoPasoMinisterio =", estadoPasoMinisterio)
    usuarioRegistro_id = request.POST['usuarioRegistro_id']
    print ("usuarioRegistro_id =", usuarioRegistro_id)
    estadoReg = 'A'
    fechaRegistro = datetime.datetime.now()



    miConexion3 = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",  password="123456")
    cur3 = miConexion3.cursor()
    comando = 'insert into rips_ripsEnvios  ("fechaEnvio", "fechaRespuesta", "cantidadFacturas", "cantidadPasaron", "cantidadRechazadas","estadoPasoMinisterio", "fechaRegistro", "estadoReg", "usuarioRegistro_id", empresa_id, "sedesClinica_id", "tipoRips", "fechaCreacion") values ('  + str(fechaEnvio) + "," + str(fechaRespuesta) + "," +  "'" + str(cantidadFacturas) + "'" + ' , '  + "'" + str(cantidadPasaron) + "'" + ', ' + "'" + str(cantidadRechazadas) + "'" + '  , ' + "'" + str(estadoPasoMinisterio) + "'" + '  , '  "'" + str(fechaRegistro) + "','"   + str(estadoReg) + "'," + "'" + str(usuarioRegistro_id) + "','" + str(empresa_id) + "','" + str(sedesClinica_id) + "','" + str(tipoRips) +  "','" + str(fechaRegistro) + "');"
    print(comando)
    cur3.execute(comando)
    miConexion3.commit()
    miConexion3.close()



    return JsonResponse({'success': True, 'message': 'Envio realizado satisfactoriamente!'})


    #  DESDE AQUI EL DETALLE

def load_dataDetalleRips(request, data):
    print("Entre load_data Detalle Rips")

    context = {}
    d = json.loads(data)

    empresaId = d['empresaId']
    print("empresaId = ", empresaId)

    envioRipsId = d['envioRipsId']
    print("envioRipsId = ", envioRipsId)


    detalleRips = []

    miConexionx = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",
                                   password="123456")
    curx = miConexionx.cursor()

    detalle = 'SELECT id,  "numeroFactura_id"  numeroFactura_id , "cuv", "estadoPasoMinisterio","rutaJsonRespuesta", "rutaJsonFactura",  "fechaRegistro", "estadoReg", "ripsEnvios_id",  "usuarioRegistro_id", "rutaPdf", "rutaZip"  FROM public.rips_ripsDetalle WHERE "ripsEnvios_id" =  ' + "'" + str(envioRipsId) + "'"

    print(detalle)

    curx.execute(detalle)

    for id,  numeroFactura_id, cuv, estadoPasoMinisterio,rutaJsonRespuesta,rutaJsonFactura,  fechaRegistro, estadoReg, ripsEnvios_id, usuarioRegistro_id, rutaPdf, rutaZip in curx.fetchall():
        detalleRips.append(
            {"model": "rips.detalleRips", "pk": id, "fields":
                {'id': id, 'numeroFactura_id': numeroFactura_id , 'cuv': cuv, 'estadoPasoMinisterio': estadoPasoMinisterio, 'rutaJsonRespuesta':rutaJsonRespuesta, 'rutaJsonFactura':rutaJsonFactura,
                   'fechaRegistro': fechaRegistro, 'estadoReg': estadoReg, 'ripsEnvios_id' :ripsEnvios_id, 'usuarioRegistro_id':usuarioRegistro_id, 'rutaPdf':rutaPdf,
                 'rutaZip': rutaZip}})

    miConexionx.close()
    print("detalleRips "  , detalleRips)
    context['DetalleRips'] = detalleRips

    serialized1 = json.dumps(detalleRips, default=serialize_datetime)

    return HttpResponse(serialized1, content_type='application/json')


def GuardaDetalleRips(request):

    print ("Entre Guarda Detalle Rips" )

    detalleRipsId = request.POST['detalleRipsId']
    print("detalleRipsId =", detalleRipsId)


    numeroFactura_id = request.POST['numeroFacturaT']
    print("numeroFactura_id =", numeroFactura_id)

    cuv = request.POST['cuv']
    print("cuv =", cuv)

    estadoPasoMinisterio = request.POST['estadoPasoMinisterio']
    print ("estadoPasoMinisterio =", estadoPasoMinisterio)

    rutaJsonRespuesta = request.POST['rutaJsonRespuesta']
    print ("rutaJsonRespuesta =", rutaJsonRespuesta)

    rutaJsonFactura = request.POST['rutaJsonFactura']
    print ("rutaJsonFactura =", rutaJsonFactura)


    ripsEnvios_id = request.POST['ripsEnvios']
    print("ripsEnvios_id =", ripsEnvios_id)

    usuarioRegistro_id = request.POST['usuarioRegistro_id']
    print ("usuarioRegistro_id =", usuarioRegistro_id)


    estadoReg = 'A'
    fechaRegistro = datetime.datetime.now()

    ripsEnvios_id = request.POST['ripsEnvios']
    print("ripsEnvios_id =", ripsEnvios_id)

    rutaPdf = request.POST['rutaPdf']
    print("rutaPdf =", rutaPdf)

    rutaZip = request.POST['rutaZip']
    print("rutaZip =", rutaZip)


    miConexion3 = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",  password="123456")
    cur3 = miConexion3.cursor()
    comando = 'UPDATE  rips_ripsdetalle SET cuv =  ' +  "'" + str(cuv) + "'," +  '"estadoPasoMinisterio" = ' + "'" + str(estadoPasoMinisterio) +  "'," + '"rutaJsonRespuesta"  = ' + "'" + str(rutaJsonRespuesta) + "'" + ',"rutaJsonFactura" = '  + "'" + str(rutaJsonFactura) + "'," +  ' "fechaRegistro" = ' + "'" + str(fechaRegistro) + "',"   + ' "estadoReg" = ' + "'" + str('A') + "'," + '"usuarioRegistro_id" =' + "'" + str(usuarioRegistro_id) + "'," + '"rutaPdf" = ' + "'" +str(rutaPdf) + "'," + '"rutaZip" =  ' + "'" + str(rutaZip)  + "' WHERE id =" + detalleRipsId

    print(comando)
    cur3.execute(comando)
    miConexion3.commit()
    miConexion3.close()



    return JsonResponse({'success': True, 'message': 'Factura Adicionada al Envio satisfactoriamente!'})


def load_dataDetalleRipsAdicionar(request, data):
    print("Entre load_data Detalle Rips Adicionar")

    context = {}
    d = json.loads(data)

    empresaId = d['empresaId']
    print("empresaId = ", empresaId)
    tipoRips = d['tipoRips']
    print("tipoRips = ", tipoRips)

    detalleRipsAdicion = []

    miConexionx = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",
                                   password="123456")
    curx = miConexionx.cursor()

    if (tipoRips == 'FACTURA'):

        detalle = 'SELECT f.id,  f.id factura, f."fechaFactura", u.nombre paciente , f."totalFactura", f.estado  FROM public.facturacion_facturacion f, admisiones_ingresos i, usuarios_usuarios u  , contratacion_convenios c WHERE  i."tipoDoc_id" = f."tipoDoc_id" AND i.documento_id = f.documento_id AND f.convenio_id =  c.id AND   c.empresa_id = ' + "'" + str(empresaId) + "'" + ' AND f."ripsEnvio_id" IS NULL AND i."tipoDoc_id" = u."tipoDoc_id" AND i.documento_id = u.id AND i.consec = f."consecAdmision"'

    else:

        detalle = 'SELECT g.id,  g.id factura, g."fechaRecepcion" fechaFactura, u.nombre paciente , g."valorGlosa" totalFactura, g."estadoRecepcion_id" estado  FROM public.cartera_glosas g, facturacion_facturacion f , admisiones_ingresos i, usuarios_usuarios u  , contratacion_convenios c WHERE  g.factura_id  =  f.id and i."tipoDoc_id" = f."tipoDoc_id" AND i.documento_id = f.documento_id AND f.convenio_id =  c.id AND   c.empresa_id = ' + "'" + str(empresaId) + "'" + ' AND g."ripsEnvio_id" IS NULL AND i."tipoDoc_id" = u."tipoDoc_id" AND i.documento_id = u.id AND i.consec = f."consecAdmision"'

    print(detalle)

    curx.execute(detalle)

    for id,  factura, fechaFactura, paciente,totalFactura,estado in curx.fetchall():
        detalleRipsAdicion.append(
            {"model": "facturacion_facturacion", "pk": id, "fields":
                {'id': id, 'factura': factura , 'fechaFactura': fechaFactura, 'paciente': paciente, 'totalFactura':totalFactura, 'estado':estado
                }})

    miConexionx.close()
    print("detalleRipsAdicion "  , detalleRipsAdicion)
    context['DetalleRipsAdicion'] = detalleRipsAdicion

    serialized1 = json.dumps(detalleRipsAdicion, default=str)
    #serialized1 = json.dumps(detalleRipsAdicion)

    return HttpResponse(serialized1, content_type='application/json')




def ActualizarEmpresaDetalleRips(request):

    print ("Entre ActualzaEmpresaDetalleRips" )



    envioRipsId = request.POST['envioRipsId']
    print("envioRipsId =", envioRipsId)

    empresaId = request.POST['empresaId']
    print("empresaId =", empresaId)

    username_id = request.POST['username_id']
    print("username_id =", username_id)

    facturaId = request.POST['facturaId']
    print("facturaId =", facturaId)

    tipoRips = request.POST['tipoRips']
    print("tipoRips =", tipoRips)



    fechaRegistro = datetime.datetime.now()
    estadoReg = 'A'


    #Primero el UPDATE

    miConexion3 = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",
                                   password="123456")
    cur3 = miConexion3.cursor()

    if (tipoRips == 'FACTURA'):

        comando = 'UPDATE facturacion_facturacion SET "ripsEnvio_id" = ' + "'" + str(envioRipsId) + "'" + ' WHERE id =  ' + "'" + str(facturaId) + "'"
    else:
        comando = 'UPDATE cartera_glosas SET "ripsEnvio_id" = ' + "'" + str(envioRipsId) + "'" + ' WHERE id =  ' + "'" + str(facturaId) + "'"

    print(comando)
    cur3.execute(comando)

    miConexion3.commit()
    miConexion3.close()


    # Segundo eL INSERT A detalleRips

    miConexion3 = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",  password="123456")
    cur3 = miConexion3.cursor()

    empresa = []

    comando = 'INSERT INTO RIPS_RIPSDETALLE ("numeroFactura_id", "estadoPasoMinisterio", "fechaRegistro", "estadoReg", "ripsEnvios_id", "usuarioRegistro_id", estado) VALUES (' +  "'" + str(facturaId) + "','N'," + "'" + str(fechaRegistro) + "'," + "'" + str(estadoReg) + "',"  +  "'" + str(envioRipsId) + "'," +  "'" +str(username_id) + "'," + "'" + str('ELABORADA') + "')"

    print(comando)
    cur3.execute(comando)

    miConexion3.commit()
    miConexion3.close()

    return JsonResponse({'success': True, 'message': 'Factura Adicionada al Envio satisfactoriamente!'})


def TraeDetalleRips(request):
    print("Entre a TraerDetalleRips")

    detalleRipsId = request.POST['detalleRipsId']
    print("detalleRipsId =", detalleRipsId)

    context = {}

    enviarDetalleRips = []

    miConexionx = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",
                                   password="123456")
    curx = miConexionx.cursor()
    
    detalle = 'SELECT d.id, d.cuv, d."numeroFactura_id" numeroFactura, d."rutaJsonRespuesta", d."rutaJsonFactura" , d."fechaRegistro", d."ripsEnvios_id", d."usuarioRegistro_id", d.estado, d."rutaPdf", d."rutaZip"  FROM public.rips_ripsdetalle d WHERE  id = ' + "'" + str(detalleRipsId) + "'"

    print(detalle)

    curx.execute(detalle)

    for id, cuv, numeroFactura, rutaJsonRespuesta, rutaJsonFactura,fechaRegistro,ripsEnvios_id, usuarioRegistro_id, estado, rutaPdf, rutaZip in curx.fetchall():
        enviarDetalleRips.append(
            {"model": "facturacion_facturacion", "pk": id, "fields":
                {'id': id, 'cuv':cuv ,'numeroFactura': numeroFactura , 'rutaJsonRespuesta': rutaJsonRespuesta, 'rutaJsonFactura': rutaJsonFactura, 'fechaRegistro':fechaRegistro,
                 'ripsEnvios_id':ripsEnvios_id, 'estado':estado, 'rutaPdf':rutaPdf, 'rutaZip':rutaZip
                }})

    miConexionx.close()
    print("enviarDetalleRips "  , enviarDetalleRips)
    context['EnviarDetalleRips'] = enviarDetalleRips

    serialized1 = json.dumps(enviarDetalleRips, default=str)

    return HttpResponse(serialized1, content_type='application/json')


def GenerarJsonRips(request):
    print("Entre a GenerarJsonRips")

    envioRipsId = request.POST['envioRipsId']
    print("envioRipsId =", envioRipsId)

    sede = request.POST["sede"]
    print("sede =", sede)

    username_id = request.POST['username_id']
    print("username_id =", username_id)

    tipoRips = request.POST['tipoRips']
    print("tipoRips =", tipoRips)

    now = datetime.datetime.now()
    dnow = now.strftime("%Y-%m-%d %H:%M:%S")
    print("NOW  = ", dnow)

    fechaRegistro = dnow
    print("fechaRegistro = ", fechaRegistro)

    #Rutinas subir a tablas de rips todos la INFO MINISTERIO JSON RIPS

    # RIPS TRANSACCION


    miConexionx = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",
                                   password="123456")
    curx = miConexionx.cursor()

    if (tipoRips == 'FACTURA'):

        detalle = 'INSERT into rips_ripstransaccion ("numDocumentoIdObligado","numFactura",  "numNota","fechaRegistro", "tipoNota_id","usuarioRegistro_id"  , "ripsEnvio_id", "sedesClinica_id" ) select sed.nit, fac.id, 0, now(), null ' + ",'" +str(username_id) +"'"  + ', e.id, sed.id from sitios_sedesclinica sed, facturacion_facturacion fac, rips_ripsEnvios e  where e.id = ' + "'" + str(envioRipsId) +"'" +  ' and e."sedesClinica_id" = sed.id and fac."ripsEnvio_id" = e.id '

    else:

        detalle = 'INSERT into rips_ripstransaccion ("numDocumentoIdObligado","numFactura",  "numNota","fechaRegistro", "tipoNota_id","usuarioRegistro_id"  , "ripsEnvio_id", "sedesClinica_id" ) select sed.nit, 0, glo.id,  now(), null ' + ",'" +str(username_id) +"'"  + ', e.id, sed.id from sitios_sedesclinica sed, cartera_glosas glo fac, rips_ripsEnvios e  where e.id = ' + "'" + str(envioRipsId) +"'" +  ' and e."sedesClinica_id" = sed.id and fac."ripsEnvio_id" = e.id '

    resultado = curx.execute(detalle)

    print ("resultado = " , resultado)

    miConexionx.commit()

    miConexionx.close()

    transaccionIdU = RipsTransaccion.objects.all().aggregate(maximo=Coalesce(Max('id'), 0))
    transaccionId = (transaccionIdU['maximo']) + 0

    # RIPS USUARIOS


    miConexionx = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",
                                   password="123456")
    curx = miConexionx.cursor()

    detalle = 'INSERT INTO rips_ripsusuarios("tipoDocumentoIdentificacion", "tipoUsuario", "fechaNacimiento", "codSexo", "codZonaTerritorialResidencia", incapacidad, consecutivo, "fechaRegistro", "codMunicipioResidencia_id", "codPaisOrigen_id", "codPaisResidencia_id", "usuarioRegistro_id", "numDocumentoIdentificacion", "ripsDetalle_id", "ripsTransaccion_id")  select tipdoc.abreviatura, tipousu.codigo, u."fechaNacio" , u.genero, local.id, ' + "'" + str('NO') + "'" + ', row_number() OVER(ORDER BY det.id) AS consecutivo, now(), muni.id, pais.id, pais.id, ' + "'" + str(username_id) + "'" + ', u.documento, det.id, ' + "'" +str(transaccionId) + "'" + ' from rips_ripsenvios e, rips_ripsdetalle det, usuarios_tiposdocumento tipdoc, usuarios_usuarios u, sitios_paises  pais, sitios_municipios muni, sitios_localidades local, facturacion_facturacion fac, rips_ripstipousuario tipousu, admisiones_ingresos i where i.factura = fac.id and e.id = ' + "'" + str(envioRipsId) + "'" + ' and e.id=det."ripsEnvios_id" and det."numeroFactura_id" = fac.id and fac."tipoDoc_id" = u."tipoDoc_id" and fac.documento_id = u.id and fac."tipoDoc_id" = tipdoc.id and u.pais_id = pais.id and u.municipio_id = muni.id and u.localidad_id = local.id and tipousu.id = i."ripsTipoUsuario_id"'

    curx.execute(detalle)
    miConexionx.commit()

    miConexionx.close()

    # RIPS PROCEDIMIENTOS


    miConexionx = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",
                                   password="123456")
    curx = miConexionx.cursor()

    detalle = 'INSERT INTO rips_ripsprocedimientos ( "codPrestador", "fechaInicioAtencion", "idMIPRES", "numAutorizacion","numDocumentoIdentificacion", "vrServicio", "valorPagoModerador", "numFEVPagoModerador", consecutivo, "fechaRegistro", "codComplicacion_id", "codDiagnosticoPrincipal_id", "codDiagnosticoRelacionado_id", "codProcedimiento_id", "codServicio_id", "conceptoRecaudo_id", "finalidadTecnologiaSalud_id", "grupoServicios_id", "modalidadGrupoServicioTecSal_id", "tipoDocumentoIdentificacion_id",  "usuarioRegistro_id",  "viaIngresoServicioSalud_id", "ripsDetalle_id", "itemFactura", "ripsTipos_id", "tipoPagoModerador_id", "ripsTransaccion_id") SELECT sed."codigoHabilitacion", facdet."fecha", null,null,usu.documento, facdet."valorTotal", (select pagos.valor from cartera_pagos pagos, cartera_formaspagos formapago, rips_ripstipospagomoderador ripsmoderadora where i."tipoDoc_id" = pagos."tipoDoc_id" and i.documento_id = pagos.documento_id and i.consec = pagos.consec and pagos."formaPago_id" = formapago.id and ripsmoderadora."codigoAplicativo" = cast(formapago.id as text)), fac.id, row_number() OVER(ORDER BY facdet.id) AS consecutivo, now(), null, (select diag1.id from clinico_historialdiagnosticos histdiag1, clinico_diagnosticos diag1 where histdiag1.historia_id = histdiag.historia_id and histdiag1."tiposDiagnostico_id" = 2), (select diag3.id from clinico_historialdiagnosticos histdiag3, clinico_diagnosticos diag3 where histdiag3.historia_id = histdiag.historia_id and histdiag3."tiposDiagnostico_id" = 3), exa.id, serv.id, null, final.id, gru.id, mod.id, tipdocrips.id, ' + "'" + str(username_id) + "'" + ', ingreso.id, detrips.id, facdet."consecutivoFactura", ' + "'" + str('4') + "'" + ' , (select ripsmoderadora.id from cartera_pagos pagos, cartera_formaspagos formapago, rips_ripstipospagomoderador ripsmoderadora    where  i."tipoDoc_id" =  pagos."tipoDoc_id" and i.documento_id = pagos.documento_id and i.consec = pagos.consec and pagos."formaPago_id" = formapago.id and ripsmoderadora."codigoAplicativo" = cast(formapago.id as text))  , ' + "'" + str(transaccionId) + "'" + ' FROM sitios_sedesclinica sed, facturacion_facturacion fac, facturacion_facturaciondetalle facdet, clinico_examenes exa, admisiones_ingresos i, rips_ripsviasingresosalud ingreso, rips_ripsenvios e, rips_ripsdetalle detrips, rips_ripsmodalidadatencion mod, rips_ripsgruposervicios gru, rips_ripsServicios serv, rips_ripsfinalidadconsulta final, rips_ripstiposdocumento tipdocrips, usuarios_tiposdocumento tipdoc, usuarios_usuarios usu, clinico_historia his, clinico_historialdiagnosticos histdiag, clinico_diagnosticos diag where sed.id = ' + "'" + str(sede) + "'" + ' and e.id = ' + "'" + str(envioRipsId) + "'" + ' and sed.id = e."sedesClinica_id" and e.id = detrips."ripsEnvios_id" and detrips."numeroFactura_id" = fac.id and facdet.facturacion_id = fac.id and i.factura = fac.id and i."ripsViaIngresoServicioSalud_id" = ingreso.id and facdet."codigoCups_id" is not null and exa.id = facdet."codigoCups_id" and i."ripsmodalidadGrupoServicioTecSal_id" = mod.id and i."ripsGrupoServicios_id" = gru.id and serv.id = i."ripsGrupoServicios_id" and final.id = i."ripsFinalidadConsulta_id" and tipdoc.id = fac."tipoDoc_id" and fac."tipoDoc_id" = usu."tipoDoc_id" and fac.documento_id = usu.id and tipdoc."tipoDocRips_id" = tipdocrips.id and i."tipoDoc_id" = fac."tipoDoc_id" and i.documento_id = fac.documento_id and i.consec = fac."consecAdmision" and i."tipoDoc_id" = his."tipoDoc_id" and i.documento_id = his.documento_id and i.consec = his."consecAdmision" and histdiag.historia_id = his.id and histdiag."tiposDiagnostico_id" = 1 and diag.id = histdiag.diagnosticos_id '

    print ("detalle = " , detalle)

    curx.execute(detalle)
    miConexionx.commit()

    miConexionx.close()

    ### Aqui actualizar cosas de la tabla rips_ripsenvios

    miConexionx = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",
                                   password="123456")
    curx = miConexionx.cursor()

    detalle = 'UPDATE rips_ripsEnvios SET "fechaGeneracionjson" = ' + "'" + str(fechaRegistro) + "'" +', "usuarioGeneraJson_id" = ' + "'" + str(username_id) + "' WHERE id =" + "'" + str(envioRipsId) + "'"
    curx.execute(detalle)
    miConexionx.commit()

    miConexionx.close()

    # Aqui CURSOR que genere los JSON de cada factura-Glosa

    datosJson = []

    miConexionx = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",
                                   password="123456")
    curx = miConexionx.cursor()

    detalle = 'SELECT "numFactura" FROM public.rips_ripstransaccion  WHERE  "ripsEnvio_id" = ' + "'" + str(envioRipsId) + "'"

    print(detalle)

    curx.execute(detalle)

    for numFactura in curx.fetchall():
        datosJson.append({'numFactura': numFactura})

    miConexionx.close()

    print ("datosJson = ", datosJson)

    for i in datosJson[0]['numFactura']:
        print ("Factura = ",i)
        archivo = 'Fac' + str(i) + '.txt'
        nombreCarpeta = 'C:\\EntornosPython\\Pos3\\vulner\\JSONCLINICA\\' + str(archivo)

        print("ruta =", nombreCarpeta)
        # Aqui Actualiza la ruta en la tabla rips_ripsdetalle

        miConexiont = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",
                                       password="123456")
        curt = miConexiont.cursor()

        detalle = 'UPDATE rips_ripsDetalle SET "rutaJsonFactura" = ' + "'" + str(nombreCarpeta) + "'" + ' WHERE "ripsEnvios_id" = '  + "'" + str(envioRipsId) + "'" + '  AND "numeroFactura_id" = ' +"'" +str(i) + "'"
        curt.execute(detalle)
        miConexiont.commit()
        miConexiont.close()

        # Aqui Leeomos el JSON de la FUNCTION

        miConexiony = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",
                                       password="123456")
        cury = miConexiony.cursor()
        funcionJson = []

        detalle = 'SELECT generaJSON(' + str(envioRipsId) + ') dato'
        cury.execute(detalle)

        for dato in cury.fetchall():
            funcionJson.append({'dato': dato})

        miConexiony.close()

        for j in funcionJson[0]['dato']:
            print("tesxto funcionJson = ", j)

            # Aqui crea el archivo

            file = open(nombreCarpeta, "w")
            file.writelines(j)
            file.close()



    return JsonResponse({'success': True, 'message': 'Rips JSON generados satisfactoriamente!'})



def Load_tablaRipsTransaccion(request, data):
    print("Entre load_data Transaccion Rips")

    context = {}
    d = json.loads(data)


    envioRipsId = d['envioRipsId']
    print("envioRipsId = ", envioRipsId)


    transaccionRips = []

    miConexionx = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",
                                   password="123456")
    curx = miConexionx.cursor()

    detalle = 'SELECT id, "numDocumentoIdObligado", "numNota","fechaRegistro", "tipoNota_id","usuarioRegistro_id"  , "ripsEnvio_id", "sedesClinica_id"  FROM public.rips_ripstransaccion WHERE  "ripsEnvio_id" = ' + "'" + str(envioRipsId) + "'"

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

    serialized1 = json.dumps(transaccionRips, default=serialize_datetime)

    return HttpResponse(serialized1, content_type='application/json')


def Load_tablaRipsUsuarios(request, data):
    print("Entre load_data Transaccion Rips")

    context = {}
    d = json.loads(data)


    envioRipsId = d['envioRipsId']
    print("envioRipsId = ", envioRipsId)


    usuariosRips = []

    miConexionx = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",
                                   password="123456")
    curx = miConexionx.cursor()

    detalle = 'SELECT  ripsu.id, ripsu."tipoDocumentoIdentificacion", ripsu."tipoUsuario", ripsu."fechaNacimiento", ripsu."codSexo", "codZonaTerritorialResidencia", ripsu.incapacidad, ripsu.consecutivo, ripsu."fechaRegistro", "codMunicipioResidencia_id", "codPaisOrigen_id", "codPaisResidencia_id", ripsu."usuarioRegistro_id", "numDocumentoIdentificacion", ripsu."ripsDetalle_id", ripsu."ripsTransaccion_id"  FROM public.rips_ripsusuarios ripsu, public.rips_ripstransaccion ripstra  WHERE  ripstra."ripsEnvio_id" = ' + "'" + str(envioRipsId) + "'" + ' AND ripstra.id = ripsu."ripsTransaccion_id" '

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

    serialized1 = json.dumps(usuariosRips, default=serialize_datetime)

    return HttpResponse(serialized1, content_type='application/json')



def EnviarJsonRips(request):
    print("Entre a EnviarJsonRips")

    envioRipsId = request.POST['envioRipsId']
    print("envioRipsId =", envioRipsId)

    sede = request.POST["sede"]
    print("sede =", sede)

    username_id = request.POST['username_id']
    print("username_id =", username_id)

    tipoRips = request.POST['tipoRips']
    print("tipoRips =", tipoRips)

    now = datetime.datetime.now()
    dnow = now.strftime("%Y-%m-%d %H:%M:%S")
    print("NOW  = ", dnow)

    fechaRegistro = dnow
    print("fechaRegistro = ", fechaRegistro)

    ### Aqui actualizar cosas de la tabla rips_ripsenvios

    miConexionx = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",
                                   password="123456")
    curx = miConexionx.cursor()

    detalle = 'UPDATE rips_ripsEnvios SET "fechaEnvio" = ' + "'" + str(fechaRegistro) + "'" +', "cantidadFacturas" = 0 , "estadoPasoMinisterio" = ' + "'" + str('ENVIADA') + "' WHERE id =" + "'" + str(envioRipsId) + "'"
    curx.execute(detalle)
    miConexionx.commit()

    miConexionx.close()

    return JsonResponse({'success': True, 'message': 'Rips JSON marcados para Envio satisfactoriamente!'})


def Load_tablaRipsProcedimientos(request, data):
    print("Entre load_data Procedimientos Rips")

    context = {}
    d = json.loads(data)


    envioRipsId = d['envioRipsId']
    print("envioRipsId = ", envioRipsId)


    procedimientosRips = []

    miConexionx = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",
                                   password="123456")
    curx = miConexionx.cursor()

    detalle = 'SELECT  ripsproc.id, "codPrestador", "fechaInicioAtencion", "idMIPRES", "numAutorizacion", ripsproc."numDocumentoIdentificacion", "vrServicio", "valorPagoModerador", "numFEVPagoModerador", ripsproc.consecutivo, ripsproc."fechaRegistro", "codComplicacion_id", "codDiagnosticoPrincipal_id", "codDiagnosticoRelacionado_id", "codProcedimiento_id", "codServicio_id", "conceptoRecaudo_id", "finalidadTecnologiaSalud_id", "grupoServicios_id", "modalidadGrupoServicioTecSal_id", ripsproc."tipoDocumentoIdentificacion_id", ripsproc."usuarioRegistro_id", "viaIngresoServicioSalud_id", ripsproc."ripsDetalle_id", "itemFactura", ripsproc."ripsTipos_id", "tipoPagoModerador_id", ripsproc."ripsTransaccion_id"  FROM public.rips_ripsusuarios ripsu, public.rips_ripsprocedimientos ripsproc  WHERE  ripsproc."ripsEnvio_id" = ' + "'" + str(envioRipsId) + "'" + ' AND ripsproc.id = ripsu."ripsTransaccion_id" '

    print(detalle)

    curx.execute(detalle)

    for id,  codPrestador, fechaInicioAtencion, idMIPRES,numAutorizacion, numDocumentoIdentificacion,  vrServicio,  valorPagoModerador, numFEVPagoModerador, consecutivo , fechaRegistro,  codComplicacion_id, codDiagnosticoPrincipal_id, codDiagnosticoRelacionado_id, codProcedimiento_id, codServicio_id, conceptoRecaudo_id, finalidadTecnologiaSalud_id, grupoServicios_id, modalidadGrupoServicioTecSal_id, tipoDocumentoIdentificacion_id, usuarioRegistro_id, viaIngresoServicioSalud_id, ripsDetalle_id, itemFactura, ripsTipos_id, tipoPagoModerador_id, ripsTransaccion_id in curx.fetchall():
        procedimientosRips.append(
            {"model": "rips.RipsProcedimientos", "pk": id, "fields":
                {'id': id, 'codPrestador': codPrestador , 'fechaInicioAtencion': fechaInicioAtencion, 'idMIPRES': idMIPRES, 'numAutorizacion':numAutorizacion, 'numDocumentoIdentificacion':numDocumentoIdentificacion
                 }})



    miConexionx.close()
    print("procedimientosRips "  , procedimientosRips)
    #context['usuariosRips'] = usuariosRips

    serialized1 = json.dumps(procedimientosRips, default=serialize_datetime)

    return HttpResponse(serialized1, content_type='application/json')
