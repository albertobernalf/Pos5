select "requiereAutorizacion" , * from clinico_examenes where "TiposExamen_id" = 1 order by "requiereAutorizacion" desc;
select "requiereAutorizacion" , * from clinico_examenes where "TiposExamen_id" = 2 order by "requiereAutorizacion" desc;
select "requiereAutorizacion" , * from clinico_examenes where "TiposExamen_id" = 3 order by "requiereAutorizacion" desc;

update facturacion_suministros set "requiereAutorizacion" = 'N'
select * from clinico_historiaexamenes;
select * from usuarios_usuarios;

update clinico_examenes set "requiereAutorizacion" = 'S' WHERE ID =114 -- ALDOLASA / 114 GLUCOMETRIA
	update clinico_examenes set "requiereAutorizacion" = 'S' WHERE ID = 2692 -- terapia de fgiltros sod
	update clinico_examenes set "requiereAutorizacion" = 'S' WHERE ID = 2487 --fotofersis

select * from clinico_historia; -- id  585 folio  5 / orden medica 7502, mipres = 55555
select * from clinico_historiaexamenes where historia_id = 585; cups : 903402 // M19275
delete from autorizaciones_autorizaciones where id>=11;
	select * from autorizaciones_autorizaciones;  -- creo la aut 9
select * from autorizaciones_autorizacionesdetalle; -- en estado pendiente el examenes_id = 487 PERFECTOPOLIS
select * from facturacion_liquidacion; -- ops hay dos cabezotes para elusernbame_id = 26 astrid, la que sirve es el id = 117
select * from facturacion_liquidaciondetalle where liquidacion_id = 121; -- creo un examen_id = 114 ops  /7 ojo ME CREO UN CABEZOPTE MAS
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
update sitios_dependencias set consec=0,documento_id=null,"tipoDoc_id" =  null, "fechaLiberacion"= null where id =10;
	 
select * from sitios_historialdependencioas

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

-- febrero 28/2025
--------------------------------------------
	-------------------------------------------
	select * from usuarios_usuarios; -- 26,,, 1567 astrid  hab 204
                                 -- 24, 51017luis ernesto bernal romeo  --urg02
select * from facturacion_tipossuministro;

select * from autorizaciones_autorizaciones;
select * from autorizaciones_autorizacionesdetalle;
DELETE FROM autorizaciones_autorizacionesdetalle where autorizaciones_id >= 16;
DELETE FROM autorizaciones_autorizaciones where id >= 16;
delete from clinico_historiaexamenes where historia_id >=626
	delete from clinico_historia where id >=626



select * from clinico_historia;
select * from clinico_historiaexamenes;
	

INSERT INTO autorizaciones_autorizacionesdetalle ("estadoAutorizacion_id", "cantidadSolicitada", "cantidadAutorizada", "fechaRegistro", "estadoReg", autorizaciones_id,
	"usuarioRegistro_id", "clinicoExamenes_id",
	cums_id, "tiposExamen_id", "valorSolicitado", "valorTotal")  VALUES ('1','2' ,0, now(),'A','0','1','487',null, '1',null,null)


 INSERT INTO autorizaciones_autorizaciones ("estadoAutorizacion_id","fechaModifica", "fechaRegistro", "estadoReg",empresa_id, "plantaOrdena_id", "sedesClinica_id",
	"usuarioRegistro_id", historia_id )  SELECT '1', now(), now(), 'A', conv.empresa_id,  '1','1','1','616' 
	FROM facturacion_conveniospacienteingresos convIngreso, contratacion_conveniosprocedimientos proc, contratacion_convenios conv
	WHERE conv.id = convIngreso.convenio_id 
	AND convIngreso."tipoDoc_id" = '3' AND convIngreso.documento_id = '26' AND convIngreso."consecAdmision" = '2' AND conv.id = proc.convenio_id AND proc.cups_id = '487'


	
select * from contratacion_conveniosprocedimientos where cups_id = '487';
select * from facturacion_conveniospacienteingresos;
INSERT INTO facturacion_conveniospacienteingresos ("consecAdmision","fechaRegistro","estadoReg", convenio_id,documento_id,"tipoDoc_id","usuarioRegistro_id") values (2,now(),'A',10,26,3,1)
INSERT INTO facturacion_conveniospacienteingresos ("consecAdmision","fechaRegistro","estadoReg", convenio_id,documento_id,"tipoDoc_id","usuarioRegistro_id") values (1,now(),'A',10,24,3,1)


select "requiereAutorizacion" , * from clinico_examenes where "TiposExamen_id" = 2; ;

select * from clinico_historia;
update clinico_historia set "ordenMedicaLab" = 555, mipres=55555 where id=617


select * from clinico_historia; -- id  622 folio  35 / orden medicaRad 678/ ordenmedicamedicame=212121 , mipres = null
select * from clinico_historiaexamenes where historia_id = 622; cups : 903402 // M19275

select * from autorizaciones_autorizaciones;  -- creo la aut 19
select * from autorizaciones_autorizacionesdetalle; --  cums 681 , NOI DEBERIA IR A LIQUIDACIONDETALLE
select * from facturacion_suministros where id in ( 681,12945) ; -- -- sipalprazolam
select * from clinico_historiamedicamentos  -- 622 hay (2) 681 y el 12945

SELECT * from facturacion_liquidacion; -- 118
SELECT * from facturacion_liquidaciondetalle where liquidacion_id = 120;
SELECT * from facturacion_liquidaciondetalle where liquidacion_id = 119;
update facturacion_liquidaciondetalle set liquidacion_id= 119 where liquidacion_id = 118;
select EMPRESA_ID,* from admisiones_ingresos;
select * from facturacion_conveniospacienteingresos;
select * from clinico_historia;
select * from clinico_historiaexamenes;
select * from clinico_tiposexamen;

	order by consecutivo
SELECT * from facturacion_liquidaciondetalle where liquidacion_id = 119;

select * from facturacion_facturacion;
select * from facturacion_facturaciondetalle where facturacion_id = 47;
SELECT * from facturacion_liquidaciondetalle where liquidacion_id = 119;
SELECT * from facturacion_liquidacion where id = 119;

select * from contratacion_conveniossuministros
	select * from contratacion_convenios
	select * from facturacion_empresas;
	

SELECT convIngreso.convenio_id convenio ,sum.suministro_id sum, sum.valor tarifaValor
	FROM facturacion_conveniospacienteingresos convIngreso, contratacion_conveniossuministros sum 
	WHERE convIngreso."tipoDoc_id" = '3' AND convIngreso.documento_id = '24' AND convIngreso."consecAdmision" = '1' AND 
	convIngreso.convenio_id = sum.convenio_id AND sum.suministro_id = '680'

insert into 	contratacion_conveniossuministros ("codigoHomologado", valor, "fechaRegistro", "estadoReg", convenio_id, suministro_id, "tipoTarifa_id", 
	"usuarioRegistro_id", concepto_id) 
	values ('xxxxx-44',89000,now(),'A',10,680,5,1,6)	

insert into 	contratacion_conveniossuministros ("codigoHomologado", valor, "fechaRegistro", "estadoReg", convenio_id, suministro_id, "tipoTarifa_id", "usuarioRegistro_id", concepto_id) values
('11492-44',85600,now(),'A',10,679,5,1,6)	

select * from rips_ripsenvios;;
select * from rips_ripsdetalle;
delete from rips_ripsdetalle where id =50

SELECT '1', now(), now(), 'A', conv.empresa_id,  '1','1','1','635' 
	FROM facturacion_conveniospacienteingresos convIngreso, contratacion_conveniosprocedimientos proc, contratacion_convenios conv 
	WHERE conv.id = convIngreso.convenio_id AND convIngreso."tipoDoc_id" = '1' AND convIngreso.documento_id = '17' AND
	convIngreso."consecAdmision" = '1' AND conv.id = proc.convenio_id AND proc.cups_id = '487'

select * from usuarios_usuarios;
	select * from  admisiones_ingresos;
	select * from contratacion_conveniosprocedimientos;
select * from clinico_historia;
select * from clinico_historiaexamenes where historia_id = 635
select * from autorizaciones_autorizaciones;
delete from  clinico_historiaexamenes where historia_id = 635
delete from  clinico_historia where id = 635

INSERT INTO facturacion_conveniospacienteingresos ("consecAdmision","fechaRegistro","estadoReg", convenio_id,documento_id,"tipoDoc_id","usuarioRegistro_id") values (1,now(),'A',10,17,1,1)

-- Vampos a validar :

select * from clinico_historia;
select * from clinico_historiaexamenes where historia_id = 636;
-- cups : "901219","903402", "M19275"
select * from clinico_examenes where "codigoCups" in ('901219','903402','M19275') ids = 251,114,487 --  se suonse el 251 sin autorizaion
select * from clinico_historiaexamenes where historia_id = 636
select * from facturacion_liquidacion;
select * from facturacion_liquidaciondetalle;
select * from autorizaciones_autorizaciones;  -- aut = 20
select * from autorizaciones_autorizacionesdetalle where autorizaciones_id = 20;

select * from autorizaciones_estadosautorizacion;

select * from admisiones_ingresos;

select * from rips_ripsestados;
select * from rips_ripsenvios;
UPDATE rips_ripsenvios set "ripsEstados_id" = 1;

SELECT env.id,  env."fechaEnvio", env."fechaRespuesta", env."cantidadFacturas", env."cantidadPasaron", env."cantidadRechazadas",env."ripsEstados_id",
	estrips.nombre estadoMinisterio, env."fechaRegistro", env."estadoReg", env."usuarioRegistro_id", env.empresa_id, env."sedesClinica_id" ,
	sed.nombre nombreClinica, emp.nombre nombreEmpresa , usu.nombre nombreRegistra , tiposNotas.nombre tipoNota 
	FROM public.rips_ripsenvios env, sitios_sedesclinica sed, facturacion_empresas emp, usuarios_usuarios usu , rips_ripstiposnotas tiposNotas ,
	rips_ripsestados estrips where env."sedesClinica_id" = sed.id and env.empresa_id=emp.id 
	AND usu.id = env."usuarioRegistro_id" AND env."ripsTiposNotas_id" = tiposNotas.id AND estrips.id = env."ripsEstados_id"

select convenio_id,* from facturacion_liquidacion where id=121;
select * from facturacion_liquidaciondetalle where liquidacion_id in (121,122);

select * from clinico_historia;
select * from clinico_historiaexamenes where historia_id = 664;

delete from facturacion_liquidacion where id =124;


select * from autorizaciones_autorizaciones; 
select * from autorizaciones_autorizacionesdetalle; 