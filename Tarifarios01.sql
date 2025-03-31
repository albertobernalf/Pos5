select * from tarifas_tipostarifa;
select * from contratacion_conveniosprocedimientos;
SELECT * FROM bak_contratacion_conveniosprocedimientos;
select * from contratacion_conveniossuministros;
create table bak_contratacion_conveniosprocedimientos as select * from contratacion_conveniosprocedimientos;
create table bak_contratacion_conveniossuministros as select * from contratacion_conveniossuministros;

SELECT * FROM CLINICO_EXAMENES WHERE ID IN (238,360);

SELECT * FROM TARIFARIOS_tarifariosprocedimientos;
SELECT * FROM TARIFAS_tiposhonorarios;

select * from bak_contratacion_conveniosprocedimientos where cups_id=238 ;
delete from TARIFARIOS_tarifariosprocedimientos

insert into tarifarios_tarifariosprocedimientos ("tiposTarifa_id", "codigoCups_id", "codigoHomologado", concepto_id, "colValorBase", "usuarioRegistro_id", "fechaRegistro", "estadoReg") 
select "tipoTarifa_id",cups_id, "codigoHomologado", concepto_id, cast(valor as numeric), "usuarioRegistro_id", now(), "estadoReg"
from bak_contratacion_conveniosprocedimientos
where cups_id != 238 ;

select count(*) from contratacion_conveniosprocedimientos; -- 1751
select count(*) from tarifarios_tarifariosprocedimientos; -- 1749
 

--delete from contratacion_conveniosprocedimientos;
select *  from contratacion_conveniosprocedimientos;

SELECT * FROM CONTRATACION_CONVENIOS;
select * from facturacion_conveniospacienteingresos

-- qUERY CONVENIOS DE LOS pACIENMTES

SeLECT 	ing.id,ing."tipoDoc_id", ing.documento_id,ing."consecAdmision",usu.nombre, ing.convenio_id, conv.nombre
FROM facturacion_conveniospacienteingresos ing, contratacion_convenios conv, usuarios_usuarios usu
WHERE usu."tipoDoc_id" = ing."tipoDoc_id" and usu.id = ing.documento_id AND conv.id = ing.convenio_id
	order by documento_id,ing."consecAdmision"

select * from tarifarios_TarifariosDescripcion;
select * from tarifarios_tipostarifa;
select * from tarifarios_tipostarifaProducto;
select * from contratacion_ConveniosProcedimientos;
select * from contratacion_convenios;
select * from facturacion_ConveniosPaciente;

