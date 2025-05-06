from django.shortcuts import render
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
import io
import pandas as pd
from cirugia.models import EstadosCirugias, EstadosSalas


# Create your views here.


def Load_dataProgramacionCirugia(request, data):
    print("Entre Load_dataProgramacionCirugia")

    context = {}
    d = json.loads(data)

    username = d['username']
    sede = d['sede']
    username_id = d['username_id']

    nombreSede = d['nombreSede']
    print("sede:", sede)
    print("username:", username)
    print("username_id:", username_id)

    # print("data = ", request.GET('data'))

    programacionCirugias = []

    miConexionx = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",
                                   password="123456")
    curx = miConexionx.cursor()


    detalle = 'SELECT prog.id id,  u."tipoDoc_id" tipoDoc_id , u.documento documento, i.consec consecutivo, u.nombre paciente,estprog.nombre estadoProg,sala.numero, sala.nombre sala, prog."fechaProgramacionInicia" inicia, prog."horaProgramacionInicia" horaInicia, prog."fechaProgramacionFin" Termina, prog."horaProgramacionFin" horaTermina,prog.cups1_id, exa1.nombre examen1 , prog.cups2_id,exa2.nombre examen2 , prog.cups3_id, exa3.nombre examen3 FROM cirugia_programacioncirugias prog INNER JOIN sitios_sedesclinica sed	on (sed.id = prog."sedesClinica_id") INNER JOIN admisiones_ingresos i ON (i."tipoDoc_id" =prog."tipoDoc_id" AND i.documento_id =  prog.documento_id AND i.consec= prog."consecAdmision" ) INNER JOIN usuarios_usuarios u ON (u.id = i.documento_id ) INNER JOIN cirugia_estadosprogramacion estprog ON (estprog.id = prog."estadoProgramacion_id" ) INNER JOIN sitios_salas sala ON (sala.id =prog.sala_id ) LEFT JOIN CLINICO_EXAMENES exa1 ON (exa1.id= prog.cups1_id) LEFT JOIN CLINICO_EXAMENES exa2 ON (exa2.id= prog.cups2_id) LEFT JOIN CLINICO_EXAMENES exa3 ON (exa3.id= prog.cups3_id) WHERE sed.id = ' + "'" + str(sede) + "' order by sala.numero, inicia"

    print(detalle)

    curx.execute(detalle)

    for id, tipoDoc_id, documento, consecutivo, paciente, estadoProg, numero, sala, inicia, horaInicia, Termina, horaTermina, cups1_id, examen1, cups2_id, examen2, cups3_id, examen3  in curx.fetchall():
        programacionCirugias.append(
            {"model": "cirugia.programcioncirugias", "pk": id, "fields":
                {'id': id, 'tipoDoc_id': tipoDoc_id, 'documento': documento, 'consecutivo': consecutivo,
                 'paciente': paciente, 'estadoProg': estadoProg, 'numero': numero, 'sala': sala,
                 'inicia': inicia, 'horaInicia': horaInicia,
                 'Termina': Termina, 'horaTermina': horaTermina, 'cups1_id': cups1_id, 'examen1': examen1,
                 'cups2_id': examen2, 'cups3_id': examen3
                 }})

    miConexionx.close()
    print(programacionCirugias)
    # context['Convenios'] = convenios
    # convenios.append({"model":"empresas.empresas","pk":id,"fields":{'Empresas':empresas}})
    # convenios.append({"model":"tiposTarifa.tiposTarifa","pk":id,"fields":{'TiposTarifa':tiposTarifa}})
    # convenios.append({"model":"cups.cups","pk":id,"fields":{'Cups':cups}})
    # convenios.append({"model":"conceptos.conceptos","pk":id,"fields":{'Conceptos':conceptos}})

    serialized1 = json.dumps(programacionCirugias, default=str)

    return HttpResponse(serialized1, content_type='application/json')


def Load_dataSalasCirugia(request, data):
    print("Entre Load_dataSalasCirugia")

    context = {}
    d = json.loads(data)

    username = d['username']
    sede = d['sede']
    username_id = d['username_id']

    nombreSede = d['nombreSede']
    print("sede:", sede)
    print("username:", username)
    print("username_id:", username_id)

    # print("data = ", request.GET('data'))

    salasCirugia = []

    miConexionx = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",
                                   password="123456")
    curx = miConexionx.cursor()


    detalle = 'SELECT sal.id id, sal.numero numero, sal.nombre nombre, ubi.nombre ubicacion, serv.nombre servicio, est.nombre estado FROM sitios_salas sal, sitios_ubicaciones ubi, cirugia_estadossalas est, sitios_serviciosadministrativos serv WHERE sal."sedesClinica_id" = ' + "'" + str(sede) + "'" + ' AND sal."serviciosAdministrativos_id" = serv.id AND ubi.id = sal.ubicaciones_id AND sal."estadoSala_id" = est.id ORDER BY sal.numero'

    print(detalle)

    curx.execute(detalle)

    for id, numero, nombre, ubicacion, servicio, estado  in curx.fetchall():
        salasCirugia.append(
            {"model": "sitios.salas", "pk": id, "fields":
                {'id': id, 'numero': numero, 'nombre': nombre, 'ubicacion': ubicacion,
                 'servicio': servicio, 'estado': estado    }})

    miConexionx.close()
    print(salasCirugia)
    # context['Convenios'] = convenios
    # convenios.append({"model":"empresas.empresas","pk":id,"fields":{'Empresas':empresas}})
    # convenios.append({"model":"tiposTarifa.tiposTarifa","pk":id,"fields":{'TiposTarifa':tiposTarifa}})
    # convenios.append({"model":"cups.cups","pk":id,"fields":{'Cups':cups}})
    # convenios.append({"model":"conceptos.conceptos","pk":id,"fields":{'Conceptos':conceptos}})

    serialized1 = json.dumps(salasCirugia, default=str)

    return HttpResponse(serialized1, content_type='application/json')


def CrearProgramacionCirugia(request):

    print ("Entre CrearProgramacionCirugia" )

    serviciosAdministrativos = request.POST('serviciosAdministrativos')
    print ("serviciosAdministrativos =", serviciosAdministrativos)

    sala = request.POST["sala"]
    print ("sala =", sala)

    fechaProgramacionInicia = request.POST["fechaProgramacionInicia"]
    print ("fechaProgramacionInicia =", fechaProgramacionInicia)

    horaProgramacionInicia = request.POST["horaProgramacionInicia"]
    print ("horaProgramacionInicia =", horaProgramacionInicia)

    fechaProgramacionFin = request.POST["fechaProgramacionFin"]
    print ("fechaProgramacionFin =", fechaProgramacionFin)

    horaProgramacionFin = request.POST["horaProgramacionFin"]
    print ("horaProgramacionFin =", horaProgramacionFin)

    ingresosCirugia = request.POST["ingresosCirugia"]
    print ("ingresosCirugia =", ingresosCirugia)

    registroIngreso = Ingresos.objetcs.get(id=ingresosCirugia)

    cups1_id = request.POST["cups1_id"]
    print ("cups1_id =", cups1_id)

    cups2_id = request.POST["cups1_2d"]
    print ("cups2_id =", cups2_id)

    cups3_id = request.POST["cups3_id"]
    print ("cups3_id =", cups3_id)

    sedesClinica_id = request.POST["sedesClinica_id"]
    print("sedesClinica_id =", sedesClinica_id)


    estadoProgramacion = request.POST["estadoProgramacion_id"]
    print("estadoProgramacion =", estadoProgramacion)



    estadoCirugia = EstadosCirugias.objetcs.get(nombre='PENDIENTE')
    estadoSala = EstadosSalas.objetcs.get(nombre='OCUPADA')
    estadoReg = 'A'
    fechaRegistro = datetime.datetime.now()


    miConexion3 = None
    try:

        miConexion3 = psycopg2.connect(host="192.168.79.133", database="vulner2", port="5432", user="postgres",  password="123456")
        cur3 = miConexion3.cursor()

        comando = 'INSERT INTO cirugia_programacioncirugias ("horaProgramacionFin", "consecAdmision", "fechaRegistro", "estadoReg", cups1_id, cups2_id, cups3_id, documento_id, "sedesClinica_id", "tipoDoc_id", "usuarioRegistro_id", "fechaProgramacionFin", "fechaProgramacionInicia", "horaProgramacionInicia", sala_id,  "estadoProgramacion_id") VALUES (' + "'" + str(horaProgramacionFin) + "'," +  str(registroIngreso.consec) + ",'" + str(fechaRegistro) + "','" + str(estadoReg) + "','" + str(cups1_id) + "','" + str(cups2_id) + "','" + str(cups3_id) + "','" + str(registroIngreso.documento_id) + "','"  + str(sedesClinica) + "','" + str(registroIngreso.tipoDoc_id) + "','" + str(username_id) + "','" + str(fechaProgramacionFin) + "','" + str(fechaProgramacionInicia) + "','" + str(horaProgramacionInicia) + "','" + str(sala) + "','" + str(estadoProgramacion) + "')"

        print(comando)
        cur3.execute(comando)







        miConexion3.commit()
        cur3.close()
        miConexion3.close()

        return JsonResponse({'success': True, 'message': 'Programacion Actualizada satisfactoriamente!'})


    except psycopg2.DatabaseError as error:
        print ("Entre por rollback" , error)
        if miConexion3:
            print("Entro ha hacer el Rollback")
            miConexion3.rollback()
        raise error

    finally:
        if miConexion3:
            cur3.close()
            miConexion3.close()

