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
	||'"codComplicacion": '|| '"' ||CASE WHEN trim(cast(proc."codComplicacion_id" as text)) is null THEN 0 ELSE proc."codComplicacion_id"  END   || '",'
	||'"vrProcedimiento": '|| '"' || proc."vrServicio"  || '",'	
	||'"tipoPagoModerador": '|| '"' || CASE WHEN trim(cast(proc."tipoPagoModerador_id" as text)) is null THEN 0 ELSE proc."tipoPagoModerador_id"  END  || '",'	
	||'"consecutivo": '|| '"' || proc."consecutivo"  || '",'	
	||'	},],'
dato1
from rips_ripstransaccion, rips_ripsprocedimientos proc
where  rips_ripstransaccion."ripsEnvio_id" = 31 and proc."ripsTransaccion_id" = rips_ripstransaccion.id 

select * from rips_ripsprocedimientos;
select * from rips_ripshospitalizacion;
select * from rips_ripscausaexterna;
select * from rips_ripstransaccion;
select * from rips_ripscausaexterna;
select * from clinico_diagnosticos;
select * from clinico_historia;

-- hospitalizaCION


		   
SELECT '{"hospitalizacion": [{"codPrestador": ' ||  '"' || hosp."codPrestador"|| '",'  ||
		   '"viaIngresoServicioSalud": ' || '"'  ||hosp."viaIngresoServicioSalud_id"|| '",'  ||
	    '"fechaInicioAtencion": ' || '"'  ||hosp."fechaInicioAtencion"|| '",'  || 
		 '"numAutorizacion": ' || '"'  ||hosp."numAutorizacion"|| '",'   || 
	 '"causaMotivoAtencion": ' || '"'  ||cauext.codigo|| '",'   || 
	 '"codDiagnosticoPrincipal": ' || '"'  ||dxppal.cie10|| '",'   || 
		  '"codDiagnosticoPrincipalE": ' || '"'  ||dxppale.cie10|| '",'    ||

	'"codDiagnosticoRelacionadoE1": ' || '"'  ||coalesce(dxrel1.cie10,'null')|| '",'  ||

		 '"codDiagnosticoRelacionadoE2": ' || '"'  ||coalesce(dxrel2.cie10,'null')|| '",'  ||
	'"codDiagnosticoRelacionadoE3": ' || '"'  ||coalesce(dxrel3.cie10,'null')|| '",'  ||
	'"codComplicacion": ' || '"'  ||'null'|| '",'  ||
		 '"condicionDestinoUsuarioEgreso": ' || '"'  ||cauext.codigo|| '",'   || 
		'"codDiagnosticoMuerte": ' || '"'  ||'null'|| '",'  ||
		 '"fechaEgreso": ' || '"'  ||hosp."fechaEgreso"|| '",'   || 
	'"consecutivo": ' || '"'  ||hosp.consecutivo|| '",'   || 
'}]}'
from rips_ripstransaccion
	left join rips_ripshospitalizacion hosp on (hosp."ripsTransaccion_id" = rips_ripstransaccion.id)
	left join rips_ripscausaexterna cauext on (cauext.id =hosp."causaMotivoAtencion_id" )
	left join clinico_diagnosticos dxppal on (dxppal.id =hosp."codDiagnosticoPrincipal_id")
	left join clinico_diagnosticos dxppale on (dxppale.id =hosp."codDiagnosticoPrincipalE_id")
	left join clinico_diagnosticos dxrel1 on (dxrel1.id = hosp."codDiagnosticoRelacionadoE1_id")
	left join clinico_diagnosticos dxrel2 on (dxrel2.id =  hosp."codDiagnosticoRelacionadoE2_id")
	left join clinico_diagnosticos dxrel3 on (dxrel3.id =  hosp."codDiagnosticoRelacionadoE3_id")
	left join rips_ripsDestinoEgreso egreso on (egreso.id = hosp."condicionDestinoUsuarioEgreso_id" )
where  rips_ripstransaccion."ripsEnvio_id" = 31 and   rips_ripstransaccion."numFactura" =cast ('41' as text)

	

	
-- Urgencias

	select * from rips_ripsprocedimientos;
select * from rips_ripshospitalizacion;
select * from rips_ripscausaexterna;
select * from rips_ripstransaccion;
select * from rips_ripscausaexterna;
select * from clinico_diagnosticos;
select * from clinico_historia;
select * from rips_ripsurgenciasobservacion;

select count(*) from rips_ripstransaccion ripstra, rips_ripsurgenciasobservacion urg where ripstra."ripsEnvio_id" = 31 and ripstra."numFactura" =cast('41' as text ) and urg."ripsTransaccion_id" = ripstra.id
		   
SELECT '{"urgencias": [{"codPrestador": ' ||  '"' || urg."codPrestador"|| '",'  ||
	   	    '"fechaInicioAtencion": ' || '"'  ||urg."fechaInicioAtencion"|| '",'  || 	
	 '"causaMotivoAtencion": ' || '"'  ||cauext.codigo|| '",'   || 
	 '"codDiagnosticoPrincipal": ' || '"'  ||dxppal.cie10|| '",'   || 
		  '"codDiagnosticoPrincipalE": ' || '"'  ||dxppale.cie10|| '",'    ||
	
	'"codDiagnosticoRelacionadoE1": ' || '"'  ||coalesce(dxrel1.cie10,'null')|| '",'  ||
		 '"codDiagnosticoRelacionadoE2": ' || '"'  ||coalesce(dxrel2.cie10,'null')|| '",'  ||
	'"codDiagnosticoRelacionadoE3": ' || '"'  ||coalesce(dxrel3.cie10,'null')|| '",'  ||
		 '"condicionDestinoUsuarioEgreso": ' || '"'  ||cauext.codigo|| '",'   || 
		'"codDiagnosticoCausaMuerte": ' || '"'  ||'null'|| '",'  ||

		 '"fechaEgreso": ' || '"'  ||urg."fechaEgreso"|| '",'   || 
	'"consecutivo": ' || '"'  ||urg.consecutivo|| '",'   || 
'}]}'
from rips_ripstransaccion
	left join rips_ripsurgenciasobservacion urg on (urg."ripsTransaccion_id" = rips_ripstransaccion.id)
	left join rips_ripscausaexterna cauext on (cauext.id =urg."causaMotivoAtencion_id" )
	left join clinico_diagnosticos dxppal on (dxppal.id =urg."codDiagnosticoPrincipal_id")
	left join clinico_diagnosticos dxppale on (dxppale.id =urg."codDiagnosticoPrincipalE_id")
	left join clinico_diagnosticos dxrel1 on (dxrel1.id = urg."codDiagnosticoRelacionadoE1_id")
	left join clinico_diagnosticos dxrel2 on (dxrel2.id =  urg."codDiagnosticoRelacionadoE2_id")
	left join clinico_diagnosticos dxrel3 on (dxrel3.id =  urg."codDiagnosticoRelacionadoE3_id")
	left join rips_ripsDestinoEgreso egreso on (egreso.id = urg."condicionDestinoUsuarioEgreso_id" )
where  rips_ripstransaccion."ripsEnvio_id" = 31 and   rips_ripstransaccion."numFactura" =cast ('41' as text)

