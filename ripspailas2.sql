select * from rips_ripsenvios;
select * from rips_RIPSDETALLE;
update RIPS_ripsenvios set "estadoPasoMinisterio" = 'PENDIENTE'

SELECT * from facturacion_facturacion;
SELECT * from rips_ripstransaccion;
SELECT * from rips_ripsusuarios;
SELECT "idMIPRES" , COALESCE ("idMIPRES", null) ,  * from rips_ripsprocedimientos;

--delete from rips_ripstransaccion
delete from rips_ripsusuarios;
delete from rips_ripsprocedimientos;



update facturacion_facturacion set "ripsEnvio_id" = null

delete from  rips_RIPSDETALLE;
insert into rips_ripsEnvios  ("fechaEnvio", "fechaRespuesta", "cantidadFacturas", "cantidadPasaron", "cantidadRechazadas","estadoPasoMinisterio", "fechaRegistro", "estadoReg", "usuarioRegistro_id", empresa_id, "sedesClinica_id", "tipoRips", "fechaCreacion")
	values (null,null,'0' , '0', '0'  , 'PENDIENTE'  , '2025-02-19 08:57:55.666555','A','1','5','1','NOTA','2025-02-19 08:57:55.666555');

select * from cartera_glosas;
select * from admisiones_ingressos;
select substring(cast("fechaNacio" as text),1,19) , cast("fechaNacio" as text),to_char("fechaNacio" ,'yyyy-mm-dd hh:mm:ss'),* from usuarios_usuarios;

update usuarios_usuarios set "fechaNacio" ='1959-11-25 00:00:00' where id=25;
select * from rips_ripsusuarios;

 INSERT INTO rips_ripsprocedimientos ( "codPrestador", "fechaInicioAtencion", "idMIPRES", "numAutorizacion","numDocumentoIdentificacion", "vrServicio", "valorPagoModerador", "numFEVPagoModerador", consecutivo, "fechaRegistro", "codComplicacion_id", "codDiagnosticoPrincipal_id", "codDiagnosticoRelacionado_id", "codProcedimiento_id", "codServicio_id", "conceptoRecaudo_id", "finalidadTecnologiaSalud_id", "grupoServicios_id", "modalidadGrupoServicioTecSal_id", "tipoDocumentoIdentificacion_id",  "usuarioRegistro_id",  "viaIngresoServicioSalud_id", "ripsDetalle_id", "itemFactura", "ripsTipos_id", "tipoPagoModerador_id") SELECT sed."codigoHabilitacion", facdet."fecha", null,null,usu.documento, facdet."valorTotal", (select pagos.valor from cartera_pagos pagos, cartera_formaspagos formapago, rips_ripstipospagomoderador ripsmoderadora where i."tipoDoc_id" = pagos."tipoDoc_id" and i.documento_id = pagos.documento_id and i.consec = pagos.consec and pagos."formaPago_id" = formapago.id and ripsmoderadora."codigoAplicativo" = cast(formapago.id as text)), fac.id, row_number() OVER(ORDER BY facdet.id) AS consecutivo, now(), null, (select diag1.id from clinico_historialdiagnosticos histdiag1, clinico_diagnosticos diag1 where histdiag1.historia_id = histdiag.historia_id and histdiag1."tiposDiagnostico_id" = 2), (select diag3.id from clinico_historialdiagnosticos histdiag3, clinico_diagnosticos diag3 where histdiag3.historia_id = histdiag.historia_id and histdiag3."tiposDiagnostico_id" = 3), exa.id, serv.id, null, final.id, gru.id, mod.id, tipdocrips.id, '1', ingreso.id, detrips.id, facdet."consecutivoFactura", '4' , (select ripsmoderadora.id from cartera_pagos pagos, cartera_formaspagos formapago, rips_ripstipospagomoderador ripsmoderadora    where  i."tipoDoc_id" =  pagos."tipoDoc_id" and i.documento_id = pagos.documento_id and i.consec = pagos.consec and pagos."formaPago_id" = formapago.id and ripsmoderadora."codigoAplicativo" = cast(formapago.id as text)) FROM sitios_sedesclinica sed, facturacion_facturacion fac, facturacion_facturaciondetalle facdet, clinico_examenes exa, admisiones_ingresos i, rips_ripsviasingresosalud ingreso, rips_ripsenvios e, rips_ripsdetalle detrips, rips_ripsmodalidadatencion mod, rips_ripsgruposervicios gru, rips_ripsServicios serv, rips_ripsfinalidadconsulta final, rips_ripstiposdocumento tipdocrips, usuarios_tiposdocumento tipdoc, usuarios_usuarios usu, clinico_historia his, clinico_historialdiagnosticos histdiag, clinico_diagnosticos diag where sed.id = '1' and e.id = '17' and sed.id = e."sedesClinica_id" and e.id = detrips."ripsEnvios_id" and detrips."numeroFactura_id" = fac.id and facdet.facturacion_id = fac.id and i.factura = fac.id and i."ripsViaIngresoServicioSalud_id" = ingreso.id and facdet."codigoCups_id" is not null and exa.id = facdet."codigoCups_id" and i."ripsmodalidadGrupoServicioTecSal_id" = mod.id and i."ripsGrupoServicios_id" = gru.id and serv.id = i."ripsGrupoServicios_id" and final.id = i."ripsFinalidadConsulta_id" and tipdoc.id = fac."tipoDoc_id" and fac."tipoDoc_id" = usu."tipoDoc_id" and fac.documento_id = usu.id and tipdoc."tipoDocRips_id" = tipdocrips.id and i."tipoDoc_id" = fac."tipoDoc_id" and i.documento_id = fac.documento_id and i.consec = fac."consecAdmision" and i."tipoDoc_id" = his."tipoDoc_id" and i.documento_id = his.documento_id and i.consec = his."consecAdmision" and histdiag.historia_id = his.id and histdiag."tiposDiagnostico_id" = 1 and diag.id = histdiag.diagnosticos_id
select * from sitios_municipios;
select * from rips_ripspaises;



update rips_ripsprocedimientos set "ripsTransaccion_id" = 44
	
-- falta colocar ripsTransaccion_id en procedimientos OJOOOO

select * from rips_ripsprocedimientos;
--  Query genera JSON

SELECT * from rips_ripstransaccion;
SELECT * from rips_ripsusuarios;

	
SELECT '{"numDocumentoIdObligado": ""' || "numDocumentoIdObligado" ||'",' || '"numFactura": ""' || "numFactura" || '"", "TipoNota": null,"numNota": null,"usuarios": ['
		||'"tipoDocumentoIdentificacion": '|| '"' || u."tipoDocumentoIdentificacion" || '",'||'"numDocumentoIdentificacion": '|| '"' || u."numDocumentoIdentificacion" || '",'
		||'"tipoUsuario": '|| '"' || u."tipoUsuario" || '",'||'"fechaNacimiento": '|| '"' || u."fechaNacimiento" || '",'
		||'"codSexo": '|| '"' || u."codSexo" || '",'||'"codPaisResidencia": '|| '"' || pais.codigo || '",'||'"codMunicipioResidencia": '|| '"' ||muni."municipioCodigoDian" || '",'
		||'"codZonaTerritorialResidencia": '|| '"' || u."codZonaTerritorialResidencia" || '",'||'"incapacidad": '|| '"' || u."incapacidad" || '",'
		||'"consecutivo": '|| '"' || u."consecutivo" || '",'||'"codPaisOrigen": '|| '"' || pais.codigo || '",' DATO1
from rips_ripstransaccion, rips_ripsusuarios u, rips_ripspaises pais, sitios_municipios muni --, rips_ripsprocedimientos proc
where  rips_ripstransaccion."ripsEnvio_id" = 16 and u."ripsTransaccion_id" = rips_ripstransaccion.id and u."codPaisResidencia_id" = pais.id and muni.id = u."codMunicipioResidencia_id" 
	-- and    proc."ripsTransaccion_id" = rips_ripstransaccion.id

--	SELECT * FROM rips_ripsprocedimientos;
union
SELECT '"servicios": {"procedimientos": [{"codPrestador": '|| '"' || proc."codPrestador" || '",'  ||'"fechaInicioAtencion": '|| '"' || proc."fechaInicioAtencion" || '",'

	||'"valorPagoModerador": '|| '"' ||   CASE WHEN trim(cast(proc."valorPagoModerador" as text)) is null THEN 0 ELSE proc."valorPagoModerador"  END  || '",'	

	||'"numFEVPagoModerador": '|| '"' || proc."numFEVPagoModerador" || '",'
	||'"consecutivo": '|| '"' || proc."consecutivo" || '",'	
	||'	},],'
	||'"idMIPRES": '|| '"' ||  CASE WHEN trim(proc."idMIPRES") is null THEN 'null' ELSE proc."idMIPRES"  END || '",'  	
	 ||'"numAutorizacion": '|| '"' || CASE WHEN trim(proc."numAutorizacion") is null THEN 'null' ELSE proc."numAutorizacion"  END || '",'	

	||'"codProcedimiento": '|| '"' || proc."codProcedimiento_id" || '",'	
		||'"viaIngresoServicioSalud": '|| '"' ||proc."viaIngresoServicioSalud_id"  || '",'	
		||'"modalidadGrupoServicioTecSal": '|| '"' || proc."modalidadGrupoServicioTecSal_id"  || '",'	
		||'"finalidadTecnologiaSalud": '|| '"' ||proc."finalidadTecnologiaSalud_id"  || '",'	
	||'"tipoDocumentoIdentificacion": '|| '"' || proc."tipoDocumentoIdentificacion_id"  || '",'	

	||'"numDocumentoIdentificacion": '|| '"' || CASE WHEN trim(proc."numDocumentoIdentificacion") is null THEN 'null' ELSE proc."numDocumentoIdentificacion"  END  || '",'	

	||'"codDiagnosticoPrincipal": '|| '"' || CASE WHEN trim(cast(proc."codDiagnosticoPrincipal_id" as text)) is null THEN 0 ELSE proc."codDiagnosticoPrincipal_id"  END || '",'	

	||'"codDiagnosticoRelacionado": '|| '"' ||  CASE WHEN trim(cast(proc."codDiagnosticoRelacionado_id" as text)) is null THEN 0 ELSE proc."codDiagnosticoRelacionado_id"  END    || '",'	
/*
	||'"codComplicacion": '|| '"' || proc."codComplicacion_id"    || '",'	
	||'"vrProcedimiento": '|| '"' || proc."vrServicio"  || '",'	
	||'"tipoPagoModerador": '|| '"' || proc."tipoPagoModerador_id" || '",'	
	||'"consecutivo": '|| '"' || proc."consecutivo"  || '",'	
	||'	},],'
*/
dato1
from rips_ripstransaccion, rips_ripsprocedimientos proc
where  rips_ripstransaccion."ripsEnvio_id" = 16 and proc."ripsTransaccion_id" = rips_ripstransaccion.id 


drop function generaJSON;

CREATE OR REPLACE FUNCTION generaJSON(envioRipsId numeric)
  RETURNS character varying  AS
$BODY$ 

DECLARE valorJson character(50000);


BEGIN

	valorJson= 'vale';

SELECT '{"numDocumentoIdObligado": ""' || "numDocumentoIdObligado" ||'",' || '"numFactura": ""' || "numFactura" || '"", "TipoNota": null,"numNota": null,"usuarios": ['
		||'"tipoDocumentoIdentificacion": '|| '"' || u."tipoDocumentoIdentificacion" || '",'
		||'"numDocumentoIdentificacion": '|| '"' || u."numDocumentoIdentificacion" || '",'
		||'"tipoUsuario": '|| '"' || u."tipoUsuario" || '",'
		||'"fechaNacimiento": '|| '"' || u."fechaNacimiento" || '",'
		||'"codSexo": '|| '"' || u."codSexo" || '",'
		||'"codPaisResidencia": '|| '"' || pais.codigo || '",'
		||'"codMunicipioResidencia": '|| '"' ||muni."municipioCodigoDian" || '",'
		||'"codZonaTerritorialResidencia": '|| '"' || u."codZonaTerritorialResidencia" || '",'
		||'"incapacidad": '|| '"' || u."incapacidad" || '",'
		||'"consecutivo": '|| '"' || u."consecutivo" || '",'
	||'"codPaisOrigen": '|| '"' || pais.codigo || '",'
	||  '"servicios": {"procedimientos": [{'
	||'"codPrestador": '|| '"' || proc."codPrestador" || '",'	
	||'"fechaInicioAtencion": '|| '"' || proc."fechaInicioAtencion" || '",'	
/*	
	||'"idMIPRES": '|| '"' || proc."idMIPRES" || '",'	
		
	||'"numAutorizacion": '|| '"' || proc."numAutorizacion" || '",'	
	||'"codProcedimiento": '|| '"' || proc."codProcedimiento_id" || '",'	
		||'"viaIngresoServicioSalud": '|| '"' || proc."viaIngresoServicioSalud_id" || '",'	
		||'"modalidadGrupoServicioTecSal": '|| '"' || proc."modalidadGrupoServicioTecSal_id" || '",'	
		||'"finalidadTecnologiaSalud": '|| '"' || proc."finalidadTecnologiaSalud_id" || '",'	
		||'"tipoDocumentoIdentificacion": '|| '"' || proc."tipoDocumentoIdentificacion_id" || '",'	
		||'"numDocumentoIdentificacion": '|| '"' || proc."numDocumentoIdentificacion" || '",'	
		||'"codDiagnosticoPrincipal": '|| '"' || proc."codDiagnosticoPrincipal_id" || '",'	
	||'"codDiagnosticoRelacionado": '|| '"' || proc."codDiagnosticoRelacionado_id" || '",'	
	||'"codComplicacion": '|| '"' || proc."codComplicacion_id" || '",'	
	||'"vrProcedimiento": '|| '"' || proc."vrServicio" || '",'	
	||'"tipoPagoModerador": '|| '"' || proc."tipoPagoModerador_id" || '",'	
	||'"valorPagoModerador": '|| '"' || proc."valorPagoModerador" || '",'	
	||'"numFEVPagoModerador": '|| '"' || proc."numFEVPagoModerador" || '",'	
	||'"consecutivo": '|| '"' || proc."consecutivo" || '",'	
	||'	},],'
*/
	INTO valorJson
from rips_ripstransaccion, rips_ripsusuarios u, rips_ripspaises pais, sitios_municipios muni , rips_ripsprocedimientos proc
where  rips_ripstransaccion."ripsEnvio_id" = 16 and u."ripsTransaccion_id" = rips_ripstransaccion.id and u."codPaisResidencia_id" = pais.id and muni.id = u."codMunicipioResidencia_id" and
     proc."ripsTransaccion_id" = rips_ripstransaccion.id;

   
   RETURN valorJson ;
END $BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION generaJSON
  OWNER TO postgres;

select generaJSON(16)
