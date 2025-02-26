select "requiereAutorizacion" from clinico_examenes where "TiposExamen_id" = 1; ;

update facturacion_suministros set "requiereAutorizacion" = 'N'
select * from clinico_historiaexamenes;
select * from usuarios_usuarios;

update clinico_examenes set "requiereAutorizacion" = 'S' WHERE ID =487 -- ALDOLASA / 114 GLUCOMETRIA

select * from clinico_historia; -- id  585 folio  5 / orden medica 7502, mipres = 55555
select * from clinico_historiaexamenes where historia_id = 585; cups : 903402 // M19275
delete from autorizaciones_autorizaciones where id>=11;
	select * from autorizaciones_autorizaciones;  -- creo la aut 9
select * from autorizaciones_autorizacionesdetalle; -- en estado pendiente el examenes_id = 487 PERFECTOPOLIS
select * from facturacion_liquidacion; -- ops hay dos cabezotes para elusernbame_id = 26 astrid, la que sirve es el id = 117
select * from facturacion_liquidaciondetalle; -- creo un examen_id = 114 ops
select * from facturacion_suministros where id=679;
update facturacion_suministros set "requiereAutorizacion" = 'S' where id=681;

select * from facturacion_suministros where id in ( 679,680,681,684);;
    ripsCums_id
"N"	"11492-4"	153			679	"AMOXICILINA POLVO PARA SUSPENSIoN 500 MG  5 ML."	"AMOXICILINA POLVO PARA SUSPENSIoN 500 MG  5 ML."
"S"	"11837-6"	154			680	"FLUCONAZOL 200 MG. CAPSULAS"	"FLUCONAZOL 200 MG. CAPSULAS"
"N"	"12773-1"	156			681	"ALPRAZOLAM TABLETAS 0,5 MG."	"ALPRAZOLAM TABLETAS 0,5 MG."
"N"	"17351-3"	189			684	"METADOXIL INYECTABLE 300 MG 5 ML"	"METADOXIL INYECTABLE 300 MG 5 ML"

select cum,nombre,administracion,* from rips_ripscums where id in (153,154,156,189);

"11492-4"	"AMOXICILINA POLVO PARA SUSPENSIoN 500 MG  5 ML."	"ORAL"	153
"11837-6"	"FLUCONAZOL 200 MG. CAPSULAS"	"ORAL"	154
"12773-1"	"ALPRAZOLAM TABLETAS 0,5 MG."	"ORAL"	156
"17351-3"	"METADOXIL INYECTABLE 300 MG 5 ML"	"INTRAMUSCULAR INTRAVENOSA"	189
	

select * from facturacion_suministros where id in ( 4667,680,5547);;	-- ripscums= 14067
select * from clinico_historia;
select "requiereAutorizacion",cums, "ripsCums_id",*  from facturacion_suministros where id in (679,680,681,684);
select * from clinico_historiamedicamentos;
delete from clinico_historiamedicamentos where id>=31;
delete from clinico_historia where id=587;
select "fechaExpedicion",* from facturacion_suministros where id = 679
update facturacion_suministros set "fechaExpedicion" = '2024-10-23 00:00:00'  where id = 679;

select * from facturacion_conveniospacienteingresos;
select * from contratacion_conveniossuministros;
select * from facturacion_facturacion;
select * from facturacion_facturaciondetalle;
--delete from facturacion_facturaciondetalle where facturacion_id =46
delete from facturacion_facturacion where id =45

	select * from facturacion_liquidacion;
select * from facturacion_liquidaciondetalle;
select * from sitios_dependencias;
	


SELECT convIngreso.convenio_id convenio ,sum.suministro_id sum, sum.valor tarifaValor
	FROM contratacion_convenios conv ,facturacion_conveniospacienteingresos convIngreso, contratacion_conveniossuministros sum
	WHERE conv.id = convIngreso.convenio_id and convIngreso."tipoDoc_id" = '3' AND convIngreso.documento_id = '26' AND convIngreso."consecAdmision" = '1' AND convIngreso.convenio_id = sum.convenio_id 

insert into 	contratacion_conveniossuministros ("codigoHomologado", valor, "fechaRegistro", "estadoReg", convenio_id, suministro_id, "tipoTarifa_id", "usuarioRegistro_id", concepto_id) values
('11492-44',85600,now(),'A',10,679,5,1,6)	

select * from cartera_pagos;
	
select * from admisiones_ingresos where id =50104
update admisiones_ingresos set "salidaClinica" = 'S', "fechaSalida" = null where id =50104;
update admisiones_ingresos set "salidaClinica" = 'S'  where id =50104;

SELECT ser.nombre, count(*) total FROM admisiones_ingresos i, usuarios_usuarios u, sitios_dependencias dep , clinico_servicios ser ,usuarios_tiposDocumento tp , sitios_dependenciastipo deptip  , clinico_Diagnosticos diag , sitios_serviciosSedes sd  WHERE sd."sedesClinica_id" = i."sedesClinica_id"  and sd.servicios_id  = ser.id and i."sedesClinica_id" = dep."sedesClinica_id" AND i."sedesClinica_id" = '1' AND  deptip.id = dep."dependenciasTipo_id" and i."serviciosActual_id" = ser.id AND dep.disponibilidad = 'O' AND i."salidaDefinitiva" = 'N' and tp.id = u."tipoDoc_id" and  i."tipoDoc_id" = u."tipoDoc_id" and u.id = i."documento_id" and diag.id = i."dxActual_id" and i."fechaSalida" is null and dep."serviciosSedes_id" = sd.id and dep.id = i."dependenciasActual_id"  group by ser.nombre UNION SELECT ser.nombre, count(*) total FROM triage_triage t, usuarios_usuarios u, sitios_dependencias dep , usuarios_tiposDocumento tp , sitios_dependenciastipo deptip  , sitios_serviciosSedes sd, clinico_servicios ser WHERE sd."sedesClinica_id" = t."sedesClinica_id"  and t."sedesClinica_id" = dep."sedesClinica_id" AND  t."sedesClinica_id" =  '1' AND dep."sedesClinica_id" =  sd."sedesClinica_id" AND dep.id = t.dependencias_id AND  t."serviciosSedes_id" = sd.id  AND deptip.id = dep."dependenciasTipo_id" and  tp.id = u."tipoDoc_id" and  t."tipoDoc_id" = u."tipoDoc_id" and u.id = t."documento_id"  and ser.id = sd.servicios_id and  dep."serviciosSedes_id" = sd.id and t."serviciosSedes_id" = sd.id and dep."tipoDoc_id" = t."tipoDoc_id" and  t."consecAdmision" = 0 and dep."documento_id" = t."documento_id" and ser.nombre = 'TRIAGE' group by ser.nombre
