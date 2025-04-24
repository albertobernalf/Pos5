select convenio_id,* from facturacion_liquidacion;
select convenio_id,* from facturacion_liquidacion where documento_id=16;
select * from facturacion_liquidacionDetalle where liquidacion_id= 143;
select * from facturacion_liquidacionDetalle where liquidacion_id= 138;

update facturacion_liquidacionDetalle set "estadoRegistro"= 'A' where liquidacion_id= 138;
select * from facturacion_liquidacionDetalle;
select * from usuarios_usuarios;
select * from usuarios_tiposdocumento
update facturacion_liquidacion
set "sedesClinica_id" = 1

select * from facturacion_liquidacionDetalle where liquidacion_id=141;
select dependencias_id, documento_id,* from triage_triage;

select * from sitios_dependencias;
select documento_id,* from admisiones_ingresos;
select documento_id,* from triage_triage;

select * from contratacion_convenios;

select * from cartera_pagos;
select * from tarifarios_tarifariosdescripcion;
select * from contratacion_convenios;

SELECT descrip.columna columnaProced 
FROM facturacion_liquidacion liq,contratacion_convenios conv,tarifarios_tarifariosdescripcion descrip 
where liq.id =      '143' AND liq.convenio_id = conv.id and descrip.id = conv."tarifariosDescripcionProc_id"

select * from sitios_dependencias;
select * from sitios_historialdependencias;

select documento_id,* from admisiones_ingresos;

select * from planta_planta;
select * from facturacion_empresas;

SELECT * FROM rips_ripsenvios;
select * from rips_ripstiposnotas;
select * from planta_planta;
select * from sitios_sedesclinica
	select * from rips_ripsestados;
SELECT * FROM rips_ripsdetalle;

select * from facturacion_facturaciondetalle where facturacion_id=58;

select * from facturacion_facturacion;
update facturacion_facturacion set "ripsEnvio_id" = null;
SELECT env.id,  env."fechaEnvio", env."fechaRespuesta", env."cantidadFacturas", env."cantidadPasaron", env."cantidadRechazadas",env."ripsEstados_id", 
	estrips.nombre estadoMinisterio, env."fechaRegistro", env."estadoReg", env."usuarioRegistro_id", env.empresa_id, env."sedesClinica_id" ,
	sed.nombre nombreClinica, emp.nombre nombreEmpresa , pla.nombre nombreRegistra , tiposNotas.nombre tipoNota
	FROM public.rips_ripsenvios env, sitios_sedesclinica sed, facturacion_empresas emp, planta_planta pla , rips_ripstiposnotas tiposNotas ,
	rips_ripsestados estrips
	where env."sedesClinica_id" = sed.id and env.empresa_id=emp.id AND pla.id = env."usuarioRegistro_id" AND
	env."ripsTiposNotas_id" = tiposNotas.id AND estrips.id = env."ripsEstados_id" 
	AND env."sedesClinica_id" ='2'