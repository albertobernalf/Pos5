select "requiereAutorizacion" from clinico_examenes where "TiposExamen_id" = 1; ;

update facturacion_suministros set "requiereAutorizacion" = 'N'
select * from clinico_historiaexamenes;
select * from usuarios_usuarios;

update clinico_examenes set "requiereAutorizacion" = 'S' WHERE ID =487 -- ALDOLASA / 114 GLUCOMETRIA

select * from clinico_historia; -- id  585 folio  5 / orden medica 7502, mipres = 55555
select * from clinico_historiaexamenes where historia_id = 585; cups : 903402 // M19275
select * from autorizaciones_autorizaciones;  -- creo la aut 9
select * from autorizaciones_autorizacionesdetalle; -- en estado pendiente el examenes_id = 487 PERFECTOPOLIS
select * from facturacion_liquidacion; -- ops hay dos cabezotes para elusernbame_id = 26 astrid, la que sirve es el id = 117
select * from facturacion_liquidaciondetalle; -- creo un examen_id = 114 ops

update facturacion_suministros set "requiereAutorizacion" = 'S' where id=680;
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
	

select "requiereAutorizacion",cums, "ripsCums_id",*  from facturacion_suministros where id in (679,680,681,684);
select * from clinico_historiamedicamentos;
delete from clinico_historiamedicamentos where id>=31;
delete from clinico_historia where id=587;
select "fechaExpedicion",* from facturacion_suministros where id = 679
update facturacion_suministros set "fechaExpedicion" = '2024-10-23 00:00:00'  where id = 679;

select * from facturacion_conveniospacienteingresos;
select * from contratacion_conveniossuministros;
select *

SELECT convIngreso.convenio_id convenio ,sum.suministro_id sum, sum.valor tarifaValor
	FROM contratacion_convenios conv ,facturacion_conveniospacienteingresos convIngreso, contratacion_conveniossuministros sum
	WHERE conv.id = convIngreso.convenio_id and convIngreso."tipoDoc_id" = '3' AND convIngreso.documento_id = '26' AND convIngreso."consecAdmision" = '1' AND convIngreso.convenio_id = sum.convenio_id 

insert into 	contratacion_conveniossuministros ("codigoHomologado", valor, "fechaRegistro", "estadoReg", convenio_id, suministro_id, "tipoTarifa_id", "usuarioRegistro_id", concepto_id) values
('11492-44',85600,now(),'A',10,679,5,1,6)	
	