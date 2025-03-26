select * from rips_ripsenvios; -- 47
select * from rips_ripsdetalle; -- glosaId = 12 // factura 42 // id de detalle = 76
select id,consecutivo, "itemFactura", * from rips_ripsprocedimientos where glosa_id=12; -- id= 529
select * from rips_ripsProcedimientos;
select * from rips_ripstipos;
select * from cartera_glosas;
select * from rips_ripstransaccion; -- 148
select * from rips_ripsusuarios;
select * from usuarios_tiposdocumento;

select * from cartera_glosas;
select * from rips_ripshospitalizacion;

begin transaction;
delete from rips_ripsProcedimientos where glosa_id = '12' and "notasCreditoGlosa" is null;
select * FROM rips_ripsProcedimientos 	 where "ripsTransaccion_id" = 141  order by consecutivo
-- rollback;
-- commit;


 SELECT   "codPrestador", "fechaInicioAtencion", "idMIPRES", "numAutorizacion","numDocumentoIdentificacion", "notasCreditoGlosa","valorPagoModerador", "numFEVPagoModerador",
	consecutivo, "fechaRegistro", "codComplicacion_id", "codDiagnosticoPrincipal_id","codDiagnosticoRelacionado_id", "codProcedimiento_id", "codServicio_id", 
	"conceptoRecaudo_id", "finalidadTecnologiaSalud_id",       "grupoServicios_id", "modalidadGrupoServicioTecSal_id","tipoDocumentoIdentificacion_id","usuarioRegistro_id",
	"viaIngresoServicioSalud_id",'76', "itemFactura", "ripsTipos_id",    "tipoPagoModerador_id",'149','12'
	FROM rips_ripsProcedimientos where glosa_id = '12'


 -- mañana este seria el query pero arregladola con el nro del rips nuevo de lña glosa, la factura y el risdetaell
	
            INSERT INTO rips_ripshospitalizacion ("codPrestador","viaIngresoServicioSalud_id","fechaInicioAtencion", "numAutorizacion","causaMotivoAtencion_id","codComplicacion_id", 
	"codDiagnosticoPrincipal_id", "codDiagnosticoPrincipalE_id",  "codDiagnosticoRelacionadoE1_id", "codDiagnosticoRelacionadoE2_id", "codDiagnosticoRelacionadoE3_id",
	"condicionDestinoUsuarioEgreso_id", "codDiagnosticoCausaMuerte_id","fechaEgreso",  consecutivo, "usuarioRegistro_id", "ripsDetalle_id", "ripsTipos_id", "ripsTransaccion_id",  
	"fechaRegistro")  
	SELECT ripshosp.id, "codPrestador","viaIngresoServicioSalud_id","fechaInicioAtencion", "numAutorizacion","causaMotivoAtencion_id","codComplicacion_id", 
	"codDiagnosticoPrincipal_id", "codDiagnosticoPrincipalE_id",  "codDiagnosticoRelacionadoE1_id", "codDiagnosticoRelacionadoE2_id", "codDiagnosticoRelacionadoE3_id",
	"condicionDestinoUsuarioEgreso_id", "codDiagnosticoCausaMuerte_id","fechaEgreso",  consecutivo, ripshosp."usuarioRegistro_id", "ripsDetalle_id", "ripsTipos_id", "ripsTransaccion_id",  
	ripshosp"fechaRegistro"
	FROM  rips_ripshospitalizacion ripshosp, rips_ripsdetalle det , rips_ripstransaccion ripstra
	where  ripstra."ripsEnvio_id" = det."ripsEnvios_id" and  
		ripshosp."ripsTransaccion_id" = ripstra.id and ripshosp."ripsDetalle_id" = det.id and cast(ripstra."numFactura" as float) =  det."numeroFactura_id" and
        cast(ripstra."numFactura" as float) =  40
      