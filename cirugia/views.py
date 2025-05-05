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


    detalle = 'SELECT prog.id id,  u."tipoDoc_id" tipoDoc_id , u.documento documento, i.consec consecutivo, u.nombre paciente,estprog.nombre estadoProg,sala.numero, sala.nombre sala, prog."fechaProgramacionInicia" inicia, prog."horaProgramacionInicia" horaInicia, prog."fechaProgramacionFin" Termina, prog."horaProgramacionFin" horaTermina,prog.cups1_id, exa1.nombre examen1 , prog.cups2_id,exa2.nombre examen2 , prog.cups3_id, exa3.nombre examen3 FROM cirugia_programacioncirugias prog INNER JOIN sitios_sedesclinica sed	on (sed.id = prog."sedesClinica_id") INNER JOIN admisiones_ingresos i ON (i."tipoDoc_id" =prog."tipoDoc_id" AND i.documento_id =  prog.documento_id AND i.consec= prog."consecAdmision" ) INNER JOIN usuarios_usuarios u ON (u.id = i.documento_id ) INNER JOIN cirugia_estadosprogramacion estprog ON (estprog.id = prog."estadoProgramacion_id" ) INNER JOIN sitios_salas sala ON (sala.id =prog.sala_id ) LEFT JOIN CLINICO_EXAMENES exa1 ON (exa1.id= prog.cups1_id) LEFT JOIN CLINICO_EXAMENES exa2 ON (exa2.id= prog.cups2_id) LEFT JOIN CLINICO_EXAMENES exa3 ON (exa3.id= prog.cups3_id) WHERE sed.id = ' + "'" + str(sede) + "'"

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

