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
from rips.models import RipsTransaccion
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
    usuarioRegistro_id = request.POST['usuarioRegistro_id']
    print ("usuarioRegistro_id =", usuarioRegistro_id)
    estadoReg = 'A'
    fechaRegistro = datetime.datetime.now()



    miConexion3 = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",  password="123456")
    cur3 = miConexion3.cursor()
    comando = 'insert into rips_ripsEnvios  ("fechaEnvio", "fechaRespuesta", "cantidadFacturas", "cantidadPasaron", "cantidadRechazadas","estadoPasoMinisterio", "fechaRegistro", "estadoReg", "usuarioRegistro_id", empresa_id, "sedesClinica_id") values ('  +  "'" + str(fechaEnvio) + "'," + "'" + str(fechaRespuesta) + "'," +  "'" + str(cantidadFacturas) + "'" + ' , '  + "'" + str(cantidadPasaron) + "'" + ', ' + "'" + str(cantidadRechazadas) + "'" + '  , ' + "'" + str(estadoPasoMinisterio) + "'" + '  , '  "'" + str(fechaRegistro) + "','"   + str(estadoReg) + "'," + "'" + str(usuarioRegistro_id) + "','" + str(empresa_id) + "','" + str(sedesClinica_id) + "');"
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


    detalleRipsAdicion = []

    miConexionx = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",
                                   password="123456")
    curx = miConexionx.cursor()

    detalle = 'SELECT f.id,  f.id factura, f."fechaFactura", u.nombre paciente , f."totalFactura", f.estado  FROM public.facturacion_facturacion f, admisiones_ingresos i, usuarios_usuarios u  , contratacion_convenios c WHERE  i."tipoDoc_id" = f."tipoDoc_id" AND i.documento_id = f.documento_id AND f.convenio_id =  c.id AND   c.empresa_id = ' + "'" + str(empresaId) + "'" + ' AND f."ripsEnvio_id" IS NULL AND i."tipoDoc_id" = u."tipoDoc_id" AND i.documento_id = u.id AND i.consec = f."consecAdmision"'

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




    fechaRegistro = datetime.datetime.now()
    estadoReg = 'A'


    #Primero el UPDATE

    miConexion3 = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",
                                   password="123456")
    cur3 = miConexion3.cursor()

    comando = 'UPDATE facturacion_facturacion SET "ripsEnvio_id" = ' + "'" + str(envioRipsId) + "'" + ' WHERE id =  ' + "'" + str(facturaId) + "'"

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


    #Rutinas subir a tablas de rips todos la INFO MINISTERIO JSON RIPS

    # RIPS TRANSACCION


    miConexionx = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",
                                   password="123456")
    curx = miConexionx.cursor()

    detalle = 'INSERT into rips_ripstransaccion ("numDocumentoIdObligado", "numNota","fechaRegistro", "tipoNota_id","usuarioRegistro_id"  , "ripsEnvio_id", "sedesClinica_id" ) select sed.nit, fac.id, now(), tip.id ' + ",'" +str(username_id) +"'"  + ', e.id, sed.id from sitios_sedesclinica sed, facturacion_facturacion fac, rips_ripsEnvios e, cartera_tiposnotas tip  where e.id = ' + "'" + str(envioRipsId) +"'" +  ' and e."sedesClinica_id" = sed.id and fac."ripsEnvio_id" = e.id and tip.nombre = ' + "'" + str('Factura') + "'"

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

    detalle = 'INSERT INTO rips_ripsusuarios("tipoDocumentoIdentificacion", "tipoUsuario", "fechaNacimiento", "codSexo", "codZonaTerritorialResidencia", incapacidad, consecutivo, "fechaRegistro", "codMunicipioResidencia_id", "codPaisOrigen_id", "codPaisResidencia_id", "usuarioRegistro_id", "numDocumentoIdentificacion", "ripsDetalle_id", "ripsTransaccion_id")  select tipdoc.abreviatura, tipousu.codigo, u."fechaNacio", u.genero, local.id, ' + "'" + str('NO') + "'" + ', row_number() OVER(ORDER BY det.id) AS consecutivo, now(), muni.id, pais.id, pais.id, ' + "'" + str(username_id) + "'" + ', u.documento, det.id, ' + "'" +str(transaccionId) + "'" + ' from rips_ripsenvios e, rips_ripsdetalle det, usuarios_tiposdocumento tipdoc, usuarios_usuarios u, sitios_paises  pais, sitios_municipios muni, sitios_localidades local, facturacion_facturacion fac, rips_ripstipousuario tipousu, admisiones_ingresos i where i.factura = fac.id and e.id = ' + "'" + str(envioRipsId) + "'" + ' and e.id=det."ripsEnvios_id" and det."numeroFactura_id" = fac.id and fac."tipoDoc_id" = u."tipoDoc_id" and fac.documento_id = u.id and fac."tipoDoc_id" = tipdoc.id and u.pais_id = pais.id and u.municipio_id = muni.id and u.localidad_id = local.id and tipousu.id = i."ripsTipoUsuario_id"'

    curx.execute(detalle)
    miConexionx.commit()

    miConexionx.close()



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

    detalle = 'SELECT id, "numDocumentoIdObligado", "numNota","fechaRegistro", "tipoNota_id","usuarioRegistro_id"  , "ripsEnvio_id", "sedesClinica_id"  FROM public.rips_ripstransaccion WHERE  id = ' + "'" + str(envioRipsId) + "'"

    print(detalle)

    curx.execute(detalle)

    for id,  numDocumentoIdObligado, numNota, fechaRegistro,tipoNota_id,usuarioRegistro_id,  ripsEnvio_id, estadoReg,  sedesClinica_id in curx.fetchall():
        transaccionRips.append(
            {"model": "rips.RipsTransaccion", "pk": id, "fields":
                {'id': id, 'numDocumentoIdObligado': numDocumentoIdObligado , 'numNota': numNota, 'fechaRegistro': fechaRegistro, 'tipoNota_id':tipoNota_id, 'usuarioRegistro_id':usuarioRegistro_id,
                   'ripsEnvio_id': ripsEnvio_id, 'estadoReg': estadoReg, 'sedesClinica_id' :sedesClinica_id}})



    miConexionx.close()
    print("transaccionRips "  , transaccionRips)
    #context['TransaccionRips'] = transaccionRips

    serialized1 = json.dumps(transaccionRips, default=serialize_datetime)

    return HttpResponse(serialized1, content_type='application/json')
