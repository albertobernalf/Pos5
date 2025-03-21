select * from rips_ripsdetalle;
select * from contratacion_convenios;
delete from rips_ripsdetalle where id=67;
select * from facturacion_facturacion;
select * from cartera_glosas;
update cartera_glosas set "ripsEnvio_id" = null where id=6;


SELECT f.id,  f.id factura,0 glosaId, f."fechaFactura", u.nombre paciente , f."totalFactura", f.estado  
	FROM public.facturacion_facturacion f, admisiones_ingresos i, usuarios_usuarios u  , contratacion_convenios c 
	WHERE  i."tipoDoc_id" = f."tipoDoc_id" AND i.documento_id = f.documento_id AND f.convenio_id =  c.id AND   c.empresa_id = 1
	AND f."ripsEnvio_id" IS NULL AND i."tipoDoc_id" = u."tipoDoc_id" AND i.documento_id = u.id AND i.consec = f."consecAdmision"
 

SELECT f.id,  f.id factura,glo.id glosaId, f."fechaFactura", u.nombre paciente , f."totalFactura", f.estado  
	FROM public.cartera_glosas glo ,public.facturacion_facturacion f, admisiones_ingresos i, usuarios_usuarios u  , contratacion_convenios c 
	WHERE  i."tipoDoc_id" = f."tipoDoc_id" AND i.documento_id = f.documento_id AND f.convenio_id =  c.id AND   c.empresa_id = 1
	AND glo."ripsEnvio_id" IS NULL AND i."tipoDoc_id" = u."tipoDoc_id" AND i.documento_id = u.id AND i.consec = f."consecAdmision"
	and glo.factura_id = f.id and glo."valorGlosa" > 0

SELECT g.id,  g.factura_id factura,g.id glosaId, g."fechaRecepcion" fechaFactura, u.nombre paciente , g."valorGlosa" totalFactura, g."estadoRecepcion_id" estado 
	FROM public.cartera_glosas g, facturacion_facturacion f , admisiones_ingresos i, usuarios_usuarios u  , contratacion_convenios c 
	WHERE  g.factura_id  =  f.id and i."tipoDoc_id" = f."tipoDoc_id" AND i.documento_id = f.documento_id AND f.convenio_id =  c.id AND   c.empresa_id = '1'
	AND g."ripsEnvio_id" IS NULL AND i."tipoDoc_id" = u."tipoDoc_id" AND i.documento_id = u.id AND i.consec = f."consecAdmision" and g."valorGlosa" >0


	-- hacer pruebas el dia martes 25
	-- upddate faturacion_facturacion ripsenvios_id
	-- upddate cartera_glosas ripsenvios_id

select * from rips_ripsenvios;
	
select * from rips_ripsdetalle;
select * from rips_ripsprocedimientos;
select * from rips_ripsmedicamentos;
select * from rips_ripshospitalizacion;
select * from rips_ripsurgenciasobservacion;
select * from rips_ripsreciennacido;
select * from rips_ripsconsultas;
select * from rips_ripsusuarios;
select * from rips_ripstransaccion;


delete from rips_ripsprocedimientos;
delete from rips_ripsmedicamentos;
delete from rips_ripshospitalizacion;
delete from rips_ripsurgenciasobservacion;
delete from rips_ripsreciennacido;
delete from rips_ripsotrosservicios;
delete from rips_ripsconsultas;
delete from rips_ripsusuarios;
delete from rips_ripstransaccion;
update facturacion_facturacion set "ripsEnvio_id" =null;
update cartera_glosas set "ripsEnvio_id" =null;
delete from rips_ripsdetalle;
delete from rips_ripsenvios;

select id,convenio_id,* from facturacion_facturacion;
select * from facturacion_facturaciondetalle;
select * from contratacion_convenios;

select fac.id idFact, fac.convenio_id, conv.id idConvenio, conv.nombre
from facturacion_facturacion fac, contratacion_convenios conv
where  fac.convenio_id = conv.id

select * from cartera_glosas;

select glo.id idFact, glo.convenio_id, conv.id idConvenio, conv.nombre
from facturacion_facturacion glo, contratacion_convenios conv
where  glo.convenio_id = conv.id

delete from cartera_glosas;
