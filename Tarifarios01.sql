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

select * from facturacion_conceptos;

SELECT * FROM CONTRATACION_CONVENIOS;
select * from facturacion_conveniospacienteingresos

-- qUERY CONVENIOS DE LOS pACIENMTES

SeLECT 	ing.id,ing."tipoDoc_id", ing.documento_id,ing."consecAdmision",usu.nombre, ing.convenio_id, conv.nombre
FROM facturacion_conveniospacienteingresos ing, contratacion_convenios conv, usuarios_usuarios usu
WHERE usu."tipoDoc_id" = ing."tipoDoc_id" and usu.id = ing.documento_id AND conv.id = ing.convenio_id
	order by documento_id,ing."consecAdmision"

select * from tarifarios_TarifariosDescripcion;
--delete from tarifarios_TarifariosDescripcion where id=14;
select * from tarifarios_tipostarifa;
select * from tarifarios_tipostarifaProducto;
select * from tarifarios_tarifariosprocedimientos; -- 1749
select * from tarifarios_tarifariosprocedimientos where "codigoHomologado" = '19729'

select * from tarifarios_tarifariosprocedimientos order by "colValor1"; 
select * from clinico_examenes;
select * from contratacion_convenios;
select * from facturacion_ConveniosPaciente;
select * from tarifarios_tipostarifa where "tiposTarifaProducto_id" in (select id from tarifarios_tipostarifaProducto where nombre like ('%PROCED%'));

SELECT x.id id, x.nombre  nombre
	FROM  tarifas_tipostarifa x
	where x."tiposTarifaProducto_id" in (select id from tarifarios_tipostarifaProducto where nombre like ('%PROCED%'))

select tiptar.id  id,tarprod.nombre tipo, tiptar.nombre tipoTarifa, tardes.columna columna, tardes.descripcion descripcion
	from tarifarios_tipostarifaProducto tarprod, tarifarios_tipostarifa tiptar, tarifarios_TarifariosDescripcion tardes
	where tarprod.id = tiptar."tiposTarifaProducto_id" and tiptar.id = tardes."tiposTarifa_id"  and tarprod.nombre like ('%PROCE%') 
	order by tarprod.nombre
 
-- QUerys valiosos :

-- 1 er Query

select tiptar.id  id,tarprod.nombre tipo, tiptar.nombre tipoTarifa, tardes.columna columna, tardes.descripcion descripcion
from tarifarios_tipostarifaProducto tarprod, tarifarios_tipostarifa tiptar, tarifarios_TarifariosDescripcion tardes
where tarprod.id = tiptar."tiposTarifaProducto_id" and tiptar.id = tardes."tiposTarifa_id" and tarprod.nombre like ('%PROCE%')
order by tarprod.nombre 


-- do Query El detalle
	
select tarprod.nombre, tiptar.nombre , tardes.columna, tardes.descripcion , tarproc."codigoHomologado", exa.nombre, tarproc."colValorBase", tarproc."colValor1", tarproc."colValor2"
from tarifarios_tipostarifaProducto tarprod, tarifarios_tipostarifa tiptar, tarifarios_TarifariosDescripcion tardes, tarifarios_tarifariosprocedimientos tarproc,
	 clinico_examenes exa
where tarprod.id = tiptar."tiposTarifaProducto_id" and tiptar.id = tardes."tiposTarifa_id" and tarproc."tiposTarifa_id" = tiptar.id 
	and tardes.columna='colValorBase' and exa.id = tarproc."codigoCups_id"

-- Query detalle_1

	select tarprod.nombre, tiptar.nombre ,  tarproc."codigoHomologado", exa.nombre, tarproc."colValorBase", tarproc."colValor1", tarproc."colValor2"
	, tarproc."colValor3"	, tarproc."colValor4"	, tarproc."colValor5"	, tarproc."colValor6"	, tarproc."colValor7"	, tarproc."colValor8"	, tarproc."colValor9" , tarproc."colValor10"	
from tarifarios_tipostarifaProducto tarprod, tarifarios_tipostarifa tiptar, tarifarios_TarifariosDescripcion tardes, tarifarios_tarifariosprocedimientos tarproc,
	 clinico_examenes exa
where tarprod.id = tiptar."tiposTarifaProducto_id" and tiptar.id = tardes."tiposTarifa_id" and tarproc."tiposTarifa_id" = tiptar.id 
	and tardes.columna='colValorBase' and exa.id = tarproc."codigoCups_id"

-- Query detalle_2

select tiptar.nombre , tarproc."codigoCups_id" cups, tarproc."codigoHomologado", exa.nombre, tarproc."colValorBase", tarproc."colValor1", tarproc."colValor2"
	, tarproc."colValor3"	, tarproc."colValor4"	, tarproc."colValor5"	, tarproc."colValor6"	, tarproc."colValor7"	, tarproc."colValor8"	, tarproc."colValor9" , tarproc."colValor10"	
from tarifarios_tipostarifaProducto tarprod, tarifarios_tipostarifa tiptar, tarifarios_TarifariosDescripcion tardes, tarifarios_tarifariosprocedimientos tarproc,
	 clinico_examenes exa
where tarprod.id = tiptar."tiposTarifaProducto_id" and tiptar.id = tardes."tiposTarifa_id" and tarproc."tiposTarifa_id" = tiptar.id 
	and tardes.columna='colValorBase' and exa.id = tarproc."codigoCups_id"


	
-- Otro query	

select tarprod.nombre, tiptar.nombre , tardes.columna, tardes.descripcion , tarproc."codigoHomologado", tarproc."colValorBase",
	tarproc."colValor1", tarproc."colValor2"
from tarifarios_tipostarifaProducto tarprod, tarifarios_tipostarifa tiptar, tarifarios_TarifariosDescripcion tardes, tarifarios_tarifariosprocedimientos tarproc
where tarprod.id = tiptar."tiposTarifaProducto_id" and tiptar.id = tardes."tiposTarifa_id" and tarproc."tiposTarifa_id" = tiptar.id 
and tardes.columna='colValor1'

-- delete

-- delete from tarifarios_tarifariosprocedimientos where "codigoCups_id" = 2692;
select * from clinico_examenes where id = 2692

select * from tarifarios_tarifariosprocedimientos order by "codigoCups_id"
	DELETE FROM tarifarios_tarifariosprocedimientos  WHERE "tiposTarifa_id" = 2;
select * from tarifas_tipostarifa;


select count(*) from tarifarios_tarifariosprocedimientos -- 3876
select * from tarifarios_tarifariosdescripcion;
delete from tarifarios_tarifariosdescripcion
	where id >= 5;
select empresa_id,* from contratacion_convenios order by id;

select * from facturacion_conveniospacienteingresos;

UPDATE contratacion_convenios set "tarifariosDescripcionProc_id" = null where id !=1;

SELECT p.id id, p.nombre  nombre 
	FROM  tarifarios_tipostarifa  p
	where p."tiposTarifaProducto_id" in (select id from tarifarios_tipostarifaProducto where nombre like ('%PROCED%'))
   
	select * from tarifarios_tipostarifaproducto;
select * from tarifarios_tarifariosdescripcion; -- tiposTarifa_id
select * from tarifarios_tipostarifa;


select * from tarifarios_tarifariosprocedimientos order by "codigoCups_id", "tiposTarifa_id"
	select * from tarifarios_tarifariosprocedimientos where "tiposTarifa_id" = 2 order by "codigoCups_id", "tiposTarifa_id" -- 3876
	
begin transaction;
delete from tarifarios_tarifariosprocedimientos where "tiposTarifa_id" = 2 
	-- rollback;
	--commit;
	select * from contratacion_convenios;
	
		select * from tarifarios_tarifariosprocedimientos where "tiposTarifa_id" = 1 order by "codigoCups_id", "tiposTarifa_id" -- 3876

	select * from tarifas_TiposHonorarios;

SELECT * FROM contratacion_convenios order by id;
select  * from tarifarios_tarifariosprocedimientos;

select * from clinico_examenes;
select * from facturacion_conceptos;
select * from tarifarios_tipostarifa;
select * from contratacion_convenios;

select
codigoHomologado, colValorBase, fechaRegistro, estadoReg  ,exa.id  , concepto,    tiposTarifa_id
from tarifarios_tarifariosprocedimientos
where 

select '' codigoHomologado, "colValorBase" colValorBase , now() fechaRegistro, 'A' estadoReg  ,  exa.id codigoCups_id , 4 concepto,    2 tiposTarifa_id
from clinico_examenes exa, tarifarios_tarifariosprocedimientos tar
where tar."tiposTarifa_id" = 1 AND tar."codigoCups_id" = exa.id order by exa.id --  3876 registros

