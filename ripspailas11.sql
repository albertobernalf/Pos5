SELECT id, "codPrestador", "fechaInicioAtencion", "fechaEgreso", consecutivo, "fechaRegistro", "causaMotivoAtencion_id", "codDiagnosticoCausaMuerte_id", "codDiagnosticoPrincipal_id", "codDiagnosticoPrincipalE_id", "codDiagnosticoRelacionadoE1_id", "codDiagnosticoRelacionadoE2_id", "codDiagnosticoRelacionadoE3_id", "condicionDestinoUsuarioEgreso_id", "usuarioRegistro_id", "ripsDetalle_id", "ripsTipos_id", "ripsTransaccion_id"
	FROM public.rips_ripsurgenciasobservacion;

select * from rips_ripshospitalizacion;

select * from rips_ripsenvios;
select * from cartera_tiposnotas;
select * from cartera_glosas;
select * from facturacion_empresas;
select * from contratacion_convenios;



"compensar eps" 1
	"SURA EPS"  2
   glosa	fact   ripstransaccion
	5  -->  42   --  98
	6  -->  40   -- 111


select * from rips_ripsenvios;
select * from rips_ripsdetalle;
select * from rips_ripstiposnotas;

INSERT INTO RIPS_RIPSDETALLE ("numeroFactura_id", "estadoPasoMinisterio", "fechaRegistro", "estadoReg", "ripsEnvios_id", "usuarioRegistro_id", estado)
	VALUES ('5','N','2025-03-20 10:20:13.300987','A','32','1','ELABORADA')

SELECT * FROM CARTERA_GLOSAS;
update CARTERA_GLOSAS set "ripsEnvio_id" = null where id in (5,6);

select * from rips_ripstransaccion;
select * from rips_ripstiposnotas;
select * from rips_ripsenvios;
select * from cartera_glosas;
select * from rips_ripstiposnotas;


INSERT into rips_ripstransaccion ("numDocumentoIdObligado","numFactura",  "numNota","fechaRegistro", "tipoNota_id","usuarioRegistro_id" , "ripsEnvio_id",
	"sedesClinica_id" )
	
	select sed.nit,  glo.id, now(), tipnot.codigo, '1', e.id, sed.id , glo.factura_id
	from sitios_sedesclinica sed, cartera_glosas glo, rips_ripsEnvios e  , rips_ripsdetalle det ,rips_ripstiposnotas tipnot
	where e.id = 32 and e."sedesClinica_id" = sed.id and glo."ripsEnvio_id" = e.id and
			det."ripsEnvios_id" = e.id -- and cast(det."numeroFactura" as float) = glo.factura_id
	and e."ripsTiposNotas_id" = tipnot.id and tipnot.nombre='Glosa'
	


