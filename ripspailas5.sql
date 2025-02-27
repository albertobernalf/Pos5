select * from autorizaciones_autorizaciones;
select * from autorizaciones_autorizacionesdetalle;
select * from facturacion_empresas;
select * from usuarios_usuarios;
select  * from planta_planta

select 
 id,"sedesClinica_id","fechaSolicitud",historia_id,justificacion,"numeroAutorizacion","fechaAutorizacion",
observaciones,"estadoAutorizacion","numeroSolicitud","fechaVigencia",empresa_id,emp.nombre,
"plantaOrdena_id","usuarioRegistro_id"
FROM autorizaciones_autorizaciones;

-- primer

select aut.id id ,aut."sedesClinica_id" ,sed.nombre sede ,
 usu.nombre paciente,historia_id folio,"fechaSolicitud",aut.justificacion,"numeroAutorizacion","fechaAutorizacion", pla.nombre medico,
aut.observaciones,"estadoAutorizacion","numeroSolicitud","fechaVigencia",empresa_id,emp.nombre empresa,"plantaOrdena_id",aut."usuarioRegistro_id"
FROM autorizaciones_autorizaciones aut, sitios_sedesClinica sed, facturacion_empresas emp, clinico_historia historia, usuarios_usuarios usu, planta_planta pla
where historia.id = aut.historia_id and sed.id = aut."sedesClinica_id" and emp.id = aut.empresa_id and usu."tipoDoc_id" = historia."tipoDoc_id" and usu.id = historia.documento_id and pla.id = aut."plantaOrdena_id"


detalle ='select aut.id id ,aut."sedesClinica_id" ,sed.nombre sede,usu.nombre paciente,historia_id folio,"fechaSolicitud",aut.justificacion,"numeroAutorizacion","fechaAutorizacion", pla.nombre medico,
aut.observaciones,"estadoAutorizacion","numeroSolicitud","fechaVigencia",empresa_id,emp.nombre empresa,"plantaOrdena_id",aut."usuarioRegistro_id" FROM autorizaciones_autorizaciones aut, sitios_sedesClinica sed, facturacion_empresas emp, clinico_historia historia, usuarios_usuarios usu, planta_planta pla
where historia.id = aut.historia_id and sed.id = aut."sedesClinica_id" and emp.id = aut.empresa_id and usu."tipoDoc_id" = historia."tipoDoc_id" and usu.id = historia.documento_id and pla.id = aut."plantaOrdena_id"'
	
--segundo

	select * from autorizaciones_autorizacionesdetalle;

select aut.id,aut."sedesClinica_id",sed.nombre sede,aut2."cantidadSolicitada", aut2."cantidadAutorizada",aut2."valorSolicitado", aut2."valorAutorizado",
	(select exa."codigoCups" ||' '||exa.nombre
	from autorizaciones_autorizacionesdetalle aut3, clinico_examenes exa
	where aut3.id = aut2.id and exa.id = aut2.examenes_id
	) ,
	(select sum.cums ||' '||sum.nombre
	from autorizaciones_autorizacionesdetalle aut3, facturacion_suministros sum
	where aut3.id = aut2.id and sum.id = aut2.cums_id
	), aut2.autorizado
FROM autorizaciones_autorizaciones aut, sitios_sedesClinica sed, autorizaciones_autorizacionesdetalle aut2
where aut.id = aut2.autorizaciones_id    and sed.id = aut."sedesClinica_id" 
        
