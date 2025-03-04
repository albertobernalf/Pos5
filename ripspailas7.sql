select * from rips_ripsdetalle;
select * from rips_ripsenvios;

select * from autorizaciones_autorizaciones;
select * from autorizaciones_autorizacionesdetalle;

select * from facturacion_liquidaciondetalle;

select * from clinico_historia;

select * from clinico_tiposExamen;

select * from clinico_historiamedicamentos;

select * from rips_ripstransaccion;
select * from rips_ripsusuarios;
select * from rips_ripsprocedimientos;
select * from rips_ripshospitalizacion;
select * from rips_ripsmedicamentos;
select * from rips_ripsenvios;
select * from rips_ripstipos;
select * from cartera_tiposnotas;
select * from cartera_tiposglosas;
select * from clinico_historialincapacidades;


INSERT INTO rips_ripsusuarios("tipoDocumentoIdentificacion", "tipoUsuario", "fechaNacimiento", "codSexo", "codZonaTerritorialResidencia", incapacidad, consecutivo, "fechaRegistro", "codMunicipioResidencia_id", "codPaisOrigen_id", "codPaisResidencia_id", "usuarioRegistro_id", "numDocumentoIdentificacion", "ripsDetalle_id", "ripsTransaccion_id")
	
	select tipdoc.abreviatura, tipousu.codigo, u."fechaNacio" , u.genero, local.id, 
	(select case when inca.id is not null  then 'SI' else 'NO' end incap
	 from clinico_historia hist, clinico_historialincapacidades inca
	 where hist."tipoDoc_id" = fac."tipoDoc_id"  and hist.documento_id = fac.documento_id  and hist."consecAdmision" = fac."consecAdmision"  and 
      hist.id = inca.historia_id) 	 ,
	 row_number() OVER(ORDER BY det.id) AS consecutivo, now(), muni.id, pais.id, pais.id, '1',
	u.documento, det.id, 'xxx ' 
	from rips_ripsenvios e, rips_ripsdetalle det, usuarios_tiposdocumento tipdoc, usuarios_usuarios u, sitios_paises  pais, sitios_municipios muni, sitios_localidades local,
	facturacion_facturacion fac, rips_ripstipousuario tipousu, admisiones_ingresos i 
	where i.factura = fac.id and e.id = 31 and e.id=det."ripsEnvios_id" and det."numeroFactura_id" = fac.id and 
	fac."tipoDoc_id" = u."tipoDoc_id" and fac.documento_id = u.id and fac."tipoDoc_id" = tipdoc.id and u.pais_id = pais.id and u.municipio_id = muni.id and
	u.localidad_id = local.id and tipousu.id = i."ripsTipoUsuario_id"
-- ingresar el case de la INCAPACIDDA
	
-- Rips de procedimientos
	select * from rips_ripsprocedimientos;
select * from autorizaciones_autorizaciones;
select * from autorizaciones_autorizacionesdetalle;
select * from clinico_historia;
select * from clinico_historiaExamenes;


INSERT INTO rips_ripsprocedimientos ( "codPrestador", "fechaInicioAtencion", "idMIPRES", "numAutorizacion","numDocumentoIdentificacion", "vrServicio", "valorPagoModerador", 
	"numFEVPagoModerador", consecutivo, "fechaRegistro", "codComplicacion_id", "codDiagnosticoPrincipal_id", "codDiagnosticoRelacionado_id", "codProcedimiento_id",
	"codServicio_id", "conceptoRecaudo_id", "finalidadTecnologiaSalud_id", "grupoServicios_id", "modalidadGrupoServicioTecSal_id", "tipoDocumentoIdentificacion_id", 
	"usuarioRegistro_id",  "viaIngresoServicioSalud_id", "ripsDetalle_id", "itemFactura", "ripsTipos_id", "tipoPagoModerador_id", "ripsTransaccion_id") 
	
	SELECT sed."codigoHabilitacion", facdet."fecha", his.mipres,autdet."numeroAutorizacion" ,usu.documento, facdet."valorTotal",
--	(select pagos.valor from cartera_pagos pagos, cartera_formaspagos formapago, rips_ripstipospagomoderador ripsmoderadora 
--	where i."tipoDoc_id" = pagos."tipoDoc_id" and i.documento_id = pagos.documento_id and i.consec = pagos.consec and pagos."formaPago_id" = formapago.id and 
--	ripsmoderadora."codigoAplicativo" = cast(formapago.id as text)),
	fac.id, row_number() OVER(ORDER BY facdet.id) AS consecutivo, now(), 
	(select diag4.id from  clinico_diagnosticos diag4 where diag4.id = i."dxComplicacion_id"), -- Aqui cambio
	(select diag1.id from clinico_historialdiagnosticos histdiag1, clinico_diagnosticos diag1 where histdiag1.historia_id = histdiag.historia_id and histdiag1."tiposDiagnostico_id" = 2),
	(select diag3.id from clinico_historialdiagnosticos histdiag3, clinico_diagnosticos diag3 where histdiag3.historia_id = histdiag.historia_id and histdiag3."tiposDiagnostico_id" = 3), 
	exa.id, serv.id, null, final.id, gru.id, mod.id, tipdocrips.id, '1', ingreso.id, detrips.id,
	facdet."consecutivoFactura", '4' ,
--	(select ripsmoderadora.id from cartera_pagos pagos, cartera_formaspagos formapago, rips_ripstipospagomoderador ripsmoderadora where  i."tipoDoc_id" =  pagos."tipoDoc_id" and 
--	i.documento_id = pagos.documento_id and i.consec = pagos.consec and pagos."formaPago_id" = formapago.id and ripsmoderadora."codigoAplicativo" = cast(formapago.id as text))  ,
	 'xxxxxx' 
	FROM sitios_sedesclinica sed
	inner join facturacion_facturacion fac ON (fac."sedesClinica_id" = sed.id)
	inner join  facturacion_facturaciondetalle facdet ON (facdet.facturacion_id = fac.id and facdet."examen_id" is not null  )
	inner join clinico_examenes exa ON (exa.id = facdet."examen_id")
	inner join admisiones_ingresos i on (i.factura = fac.id and i."tipoDoc_id" = fac."tipoDoc_id" and i.documento_id = fac.documento_id and i.consec = fac."consecAdmision")
	left join rips_ripsviasingresosalud ingreso ON (ingreso.id = i."ripsViaIngresoServicioSalud_id")
	left join rips_ripsenvios e ON (e."sedesClinica_id" =  sed.id)
	left join rips_ripsdetalle detrips ON (detrips."ripsEnvios_id" = e.id and detrips."numeroFactura_id" = fac.id)
	left join rips_ripsmodalidadatencion mod ON ( mod.id = i."ripsmodalidadGrupoServicioTecSal_id"  )
	left join rips_ripsgruposervicios gru ON (gru.id = i."ripsGrupoServicios_id") 
	left join rips_ripsServicios serv ON (serv.id = i."ripsGrupoServicios_id")
	left join rips_ripsfinalidadconsulta final on (final.id = i."ripsFinalidadConsulta_id")
	left join rips_ripstiposdocumento tipdocrips on (1=1)
	left join usuarios_tiposdocumento tipdoc ON (tipdoc.id = fac."tipoDoc_id" and tipdoc."tipoDocRips_id" = tipdocrips.id)
	left join usuarios_usuarios usu ON (usu."tipoDoc_id" = fac."tipoDoc_id" and usu.id  =  fac.documento_id )
	inner join clinico_historia his ON (his."tipoDoc_id" =  i."tipoDoc_id" and  his.documento_id = i.documento_id and his."consecAdmision" = i.consec )
   left join clinico_historialdiagnosticos histdiag on (histdiag.historia_id = his.id  and histdiag."tiposDiagnostico_id" = 1 )
--	left join clinico_diagnosticos diag on (diag.id = histdiag.diagnosticos_id )
	left join autorizaciones_autorizaciones aut  on (aut.historia_id =his.id)
	inner join autorizaciones_autorizacionesdetalle autdet on (autdet.autorizaciones_id = aut.id and autdet.examenes_id = facdet.examen_id)
	where sed.id = 1 and e.id >= 25

	


	
select * from admisiones_ingresos;	
	- 1er cambio codigocupa_id a examen

-- tipopagomoderador_id ??
-- conceptorecaudo_id ??
-- vlr pago moderado

