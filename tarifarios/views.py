# Create your views here.
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
from facturacion.models import ConveniosPacienteIngresos, Liquidacion, LiquidacionDetalle, Facturacion, FacturacionDetalle, Conceptos
from cartera.models import TiposPagos, FormasPagos, Pagos, PagosFacturas, Glosas
from triage.models import Triage
from clinico.models import Servicios
from rips.models import RipsTransaccion, RipsUsuarios, RipsEnvios, RipsDetalle, RipsTiposNotas
from tarifarios.models import TiposTarifa, TiposTarifaProducto
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




def Load_dataTarifariosProcedimientos(request, data):
    print ("Entre load_data TarifariosProcedimientos")

    context = {}
    d = json.loads(data)

    username = d['username']
    sede = d['sede']
    username_id = d['username_id']

    nombreSede = d['nombreSede']
    print ("sede:", sede)
    print ("username:", username)
    print ("username_id:", username_id)
    

    #print("data = ", request.GET('data'))

    tarifariosProcedimientos = []


    
    miConexionx = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres", password="123456")
    curx = miConexionx.cursor()
   
    #detalle = 'select id, "codigoHomologado", "colValorBase", "colValor1", "colValor2", "colValor3", "colValor4", "colValor5", "colValor6", "colValor7", "colValor8", "colValor9", "colValor10", "fechaRegistro", "estadoReg", "codigoCups_id", concepto_id, "tiposTarifa_id", "usuarioRegistro_id" from tarifarios_tarifariosprocedimientos'
    detalle = 'select tarproc.id id, tiptar.nombre tipoTarifa, tarproc."codigoCups_id" cups, tarproc."codigoHomologado" codigoHomologado, exa.nombre exaNombre, tarproc."colValorBase", tarproc."colValor1", tarproc."colValor2" , tarproc."colValor3"	, tarproc."colValor4"	, tarproc."colValor5"	, tarproc."colValor6"	, tarproc."colValor7"	, tarproc."colValor8"	, tarproc."colValor9" , tarproc."colValor10"from tarifarios_tipostarifaProducto tarprod, tarifarios_tipostarifa tiptar, tarifarios_TarifariosDescripcion tardes, tarifarios_tarifariosprocedimientos tarproc, clinico_examenes exa where tarprod.id = tiptar."tiposTarifaProducto_id" and tiptar.id = tardes."tiposTarifa_id" and tarproc."tiposTarifa_id" = tiptar.id and tardes.columna=' + "'" + str('colValorBase') + "'" + ' and exa.id = tarproc."codigoCups_id"'


    print(detalle)

    curx.execute(detalle)

    for id, tipoTarifa, cups, codigoHomologado, exanombre, colValorBase, colValor1, colValor2, colValor3, colValor4, colValor5, colValor6, colValor7, colValor8, colValor9, colValor10  in curx.fetchall():
        tarifariosProcedimientos.append(
		{"model":"tarifarios.tarifariosProcedimientos","pk":id,"fields":
			{'id':id, 'tipoTarifa':tipoTarifa, 'cups':cups, 'codigoHomologado': codigoHomologado, 'exaNombre':exanombre, 'colValorBase': colValorBase, 'colValor1': colValor1, 'colValor2': colValor2,'colValor3': colValor3,'colValor4': colValor4,
			'colValor5': colValor5,'colValor6': colValor6,'colValor7': colValor7,'colValor8': colValor8,'colValor9': colValor9,'colValor10': colValor10
                         }})

    miConexionx.close()
    print(tarifariosProcedimientos)
    #context['Convenios'] = convenios
    #convenios.append({"model":"empresas.empresas","pk":id,"fields":{'Empresas':empresas}})
    #convenios.append({"model":"tiposTarifa.tiposTarifa","pk":id,"fields":{'TiposTarifa':tiposTarifa}})
    #convenios.append({"model":"cups.cups","pk":id,"fields":{'Cups':cups}})
    #convenios.append({"model":"conceptos.conceptos","pk":id,"fields":{'Conceptos':conceptos}})


    serialized1 = json.dumps(tarifariosProcedimientos, default=str)


    return HttpResponse(serialized1, content_type='application/json')



def Load_datatarifariosDescripcionProcedimientos(request, data):
    print ("Entre load_datatarifariosDescripcionProcedimientos")

    context = {}
    d = json.loads(data)

    username = d['username']
    sede = d['sede']
    username_id = d['username_id']

    nombreSede = d['nombreSede']
    print ("sede:", sede)
    print ("username:", username)
    print ("username_id:", username_id)
    


    tarifariosDescripcionProcedimientos = []


    
    miConexionx = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres", password="123456")
    curx = miConexionx.cursor()
   
    detalle = 'select tiptar.id  id,tarprod.nombre tipo, tiptar.nombre tipoTarifa, tardes.columna columna, tardes.descripcion descripcion from tarifarios_tipostarifaProducto tarprod, tarifarios_tipostarifa tiptar, tarifarios_TarifariosDescripcion tardes where tarprod.id = tiptar."tiposTarifaProducto_id" and tiptar.id = tardes."tiposTarifa_id"  and tarprod.nombre like ('  + "'%PROCE%')" + '  order by tarprod.nombre '

    print(detalle)

    curx.execute(detalle)

    for id, tipo, tipoTarifa, columna, descripcion in curx.fetchall():
        tarifariosDescripcionProcedimientos.append(
		{"model":"tarifarios.tarifariosDescripcion","pk":id,"fields":
			{'id':id, 'tipo': tipo, 'tipoTarifa': tipoTarifa, 'columna': columna, 'descripcion':descripcion }})

    miConexionx.close()
    print(tarifariosDescripcionProcedimientos)
    #context['Convenios'] = convenios
    #convenios.append({"model":"empresas.empresas","pk":id,"fields":{'Empresas':empresas}})
    #convenios.append({"model":"tiposTarifa.tiposTarifa","pk":id,"fields":{'TiposTarifa':tiposTarifa}})
    #convenios.append({"model":"cups.cups","pk":id,"fields":{'Cups':cups}})
    #convenios.append({"model":"conceptos.conceptos","pk":id,"fields":{'Conceptos':conceptos}})


    serialized1 = json.dumps(tarifariosDescripcionProcedimientos, default=str)


    return HttpResponse(serialized1, content_type='application/json')


def GuardarDescripcionProcedimientos(request):

    print ("Entre GuardarDescripcionProcedimientos" )

    tiposTarifa_id = request.POST.get('tiposTarifa_id')
    print ("tiposTarifa_id =", tiposTarifa_id)

    columna = request.POST["columna"]
    print ("columna =", columna)

    descripcion = request.POST["descripcion"]
    print ("descripcion =", descripcion)

    estadoReg = 'A'
    fechaRegistro = datetime.datetime.now()


    miConexion3 = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",  password="123456")
    cur3 = miConexion3.cursor()

    comando = 'INSERT INTO tarifarios_tarifariosDescripcion (columna, descripcion, "fechaRegistro", "estadoReg", "tiposTarifa_id") VALUES (' + "'" + str(columna) + "'," +   "'" + str(descripcion) + "',"  "'" + str(fechaRegistro) + "',"  "'" + str(estadoReg) + "',"  "'" + str(tiposTarifa_id) + "')"

    print(comando)
    cur3.execute(comando)
    miConexion3.commit()
    miConexion3.close()

    return JsonResponse({'success': True, 'message': 'Tarifario Descripcon Procedimientos Actualizado!'})

def CrearTarifarioProcedimientos(request):

    print ("Entre CrearTarifarioProcedimientos" )

    tiposTarifa_id = request.POST.get('tiposTarifa_id')
    print ("tiposTarifa_id =", tiposTarifa_id)

    username_id = request.POST.get('username_id')
    print ("username_id =", username_id)

    estadoReg = 'A'
    fechaRegistro = datetime.datetime.now()

    conceptoId =  Conceptos.objects.get(nombre='PROCEDIMIENTOS')

    miConexion3 = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",  password="123456")
    cur3 = miConexion3.cursor()

    comando = 'INSERT INTO tarifarios_tarifariosprocedimientos ("fechaRegistro", "estadoReg", "codigoCups_id", concepto_id , "tiposTarifa_id", "usuarioRegistro_id") SELECT ' + "'" + str(fechaRegistro) + "'," +   "'" + str(estadoReg) + "',"   + ' exa.id , ' +  "'" + str(conceptoId.id) + "','" +  str(tiposTarifa_id) + "','" +  str(username_id) + "'" + ' FROM clinico_examenes exa where exa."estadoReg" = ' + "'" + str('A') + "'"

    print(comando)
    cur3.execute(comando)
    miConexion3.commit()
    miConexion3.close()

    return JsonResponse({'success': True, 'message': 'Tarifario Sabana creado !'})



def CrearItemTarifario(request):

    print ("Entre Crear Item Tarifario" )

    codigoHomologadoItem = request.POST.get('codigoHomologadoItem')
    print ("codigoHomologadoItem =", codigoHomologadoItem)

    tiposTarifaItem_id = request.POST.get('tiposTarifaItem_id')
    print ("tiposTarifaItem_id =", tiposTarifaItem_id)

    codigoCupsItem_id = request.POST.get('codigoCupsItem_id')
    print ("codigoCupsItem_id =", codigoCupsItem_id)

    conceptoItem_id = request.POST.get('conceptoItem_id')
    print ("conceptoItem_id =", conceptoItem_id)



    colValorBaseItem = request.POST.get('colValorBaseItem')
    print ("colValorBaseItem =", colValorBaseItem)

    username_id = request.POST.get('username_id')
    print ("username_id =", username_id)

    estadoReg = 'A'
    fechaRegistro = datetime.datetime.now()

    conceptoId =  Conceptos.objects.get(nombre='PROCEDIMIENTOS')

    miConexion3 = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",  password="123456")
    cur3 = miConexion3.cursor()

    comando = 'INSERT INTO tarifarios_tarifariosprocedimientos ("codigoHomologado", "colValorBase", "fechaRegistro", "estadoReg", "codigoCups_id", concepto_id , "tiposTarifa_id", "usuarioRegistro_id") VALUES ( ' + "'" + str(codigoHomologadoItem) + "'," + "'" + str( colValorBaseItem) + "',"  + "'" + str( fechaRegistro) + "'," + "'" + str( estadoReg) + "'," + "'" + str( codigoCupsItem_id) + "'," + "'" + str( conceptoItem_id) + "',"  + "'" + str( tiposTarifaItem_id) + "'," + "'" + str( username_id) + "')"

    print(comando)
    cur3.execute(comando)
    miConexion3.commit()
    miConexion3.close()

    return JsonResponse({'success': True, 'message': 'Item Tarifario creado !'})

def AplicarTarifas(request):

    print ("Entre AplicarTarifas" )

    post_id = request.POST.get('post_id')
    print ("post_id =", post_id)

    tiposTarifaTarifario_id = request.POST.get('tiposTarifaTarifario_id')
    print ("tiposTarifaTarifario_id =", tiposTarifaTarifario_id)

    tiposTarifaProducto = TiposTarifaProducto.objects.get(nombre='PROCEDIMIENTOS')

    tipoTarifario = TiposTarifa.objects.get(nombre=tiposTarifaTarifario_id , tiposTarifaProducto_id = tiposTarifaProducto.id)

    porcentaje = request.POST.get('porcentaje')
    print ("porcentaje =", porcentaje)

    valorAplicar = request.POST.get('valorAplicar')
    print ("valorAplicar =", valorAplicar)

    columnaAplicar = request.POST.get('columnaAplicar')
    print ("columnaAplicar =", columnaAplicar)


    estadoReg = 'A'
    fechaRegistro = datetime.datetime.now()

    conceptoId =  Conceptos.objects.get(nombre='PROCEDIMIENTOS')

    miConexion3 = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",  password="123456")
    cur3 = miConexion3.cursor()

    comando = 'UPDATE tarifarios_tarifariosprocedimientos SET ' + '"' + str(columnaAplicar) + '"'  + ' = "colValorBase" +  "colValorBase" * ' + str(porcentaje) + '/100 WHERE "tiposTarifa_id" = ' + "'" + str(tipoTarifario.id) + "'"

    print(comando)
    cur3.execute(comando)
    miConexion3.commit()
    miConexion3.close()

    return JsonResponse({'success': True, 'message': 'Tarifario Sabana creado !'})

