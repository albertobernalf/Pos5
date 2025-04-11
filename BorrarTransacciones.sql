

-- delete from clinico_historiaresultados; -- ok
-- delete from clinico_historiaexamenes;  -- ok

-- delete from facturacion_refacturacion; -- ok
-- delete from facturacion_facturaciondetalle; -- ok
-- delete from facturacion_liquidaciondetalle; -- ok
 -- delete from facturacion_liquidacion; -- ok
-- delete from facturacion_facturacion; -- ok
-- delete from facturacion_facturaciondetalle; -- ok
-- delete from clinico_historialantecedentes; -- ok
-- delete from clinico_historialdiagnosticos; -- ok
-- delete from clinico_historialincapacidades; -- ok
-- delete from clinico_historialinterconsultas; -- ok
-- delete from clinico_historiamedicamentos; -- ok
-- delete from clinico_historiaoxigeno; -- ok
-- delete from clinico_historiarevisionsistemas; --ok
-- delete from clinico_historiasignosvitales; --ok
-- delete from clinico_historiarevisionsistemas; --ok
-- delete from clinico_historia; --ok
-- delete from sitios_historialdependencias; --ok
-- update sitios_dependencias set "tipoDoc_id" = null, documento_id=null,consec = null,"fechaLiberacion"=null,"fechaOcupacion"=null,disponibilidad='L' --ok
-- delete from cartera_pagos; --ok
-- delete cartera_glosas;
-- delete from admisiones_furips; --ok
-- delete from admisiones_ingresos; -- ok
-- delete from triage_triage - ok
-- delete from facturacion_conveniospacienteingresos;
-- delete from facturacion_conveniospaciente;
delete from facturacion_liquidaciondetalle;
delete from facturacion_liquidacion;
delete from facturacion_facturaciondetalle;
delete from facturacion_facturacion;
delete from facturacion_refacturacion;


delete from rips_ripsprocedimientos;
delete from rips_ripshospitalizacion;
delete from rips_ripscausaexterna;
delete from rips_ripstransaccion;
delete from rips_ripscausaexterna;
delete from rips_ripsmedicamentos;
delete from rips_ripsotrosservicios;
delete from rips_ripsreciennacidos;
delete from rips_ripsdetalleenvios;
delete from rips_ripsenvios;




-- Complementar con Rips, Autorizaciones


