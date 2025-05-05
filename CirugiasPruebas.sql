select * from admisiones_ingresos;
SELECT * FROM cirugia_programacioncirugias;
select * FROM USUARIOS_USUARIOS;
select * FROM CIRUGIA_ESTADOScIRUGIAS;
select * FROM CIRUGIA_ESTADOSPROGRAMACION;
select * From sitios_salas;

SELECT prog.id,  u."tipoDoc_id", u.documento, u.nombre paciente,estprog.nombre estado,sala.numero, sala.nombre sala,
	 prog."fechaProgramacionInicia" inicia, prog."horaProgramacionInicia" horaInicia, prog."fechaProgramacionFin" Termina, prog."horaProgramacionFin" horaTermina,
	 prog.cups1_id, exa1.nombre, prog.cups2_id,exa2.nombre, prog.cups3_id, exa3.nombre
FROM cirugia_programacioncirugias prog
INNER JOIN sitios_sedesclinica sed	on (sed.id = prog."sedesClinica_id")
INNER JOIN admisiones_ingresos i ON (i."tipoDoc_id" =prog."tipoDoc_id" AND i.documento_id =  prog.documento_id AND i.consec= prog."consecAdmision" )
INNER JOIN usuarios_usuarios u ON (u.id = i.documento_id )
INNER JOIN cirugia_estadosprogramacion estprog ON (estprog.id = prog."estadoProgramacion_id" )
INNER JOIN sitios_salas sala ON (sala.id =prog.sala_id )
LEFT JOIN CLINICO_EXAMENES exa1 ON (exa1.id= prog.cups1_id)
LEFT JOIN CLINICO_EXAMENES exa2 ON (exa2.id= prog.cups2_id)
LEFT JOIN CLINICO_EXAMENES exa3 ON (exa3.id= prog.cups3_id)
WHERE sed.id = '2' 


comando = 'SELECT prog.id,  u."tipoDoc_id", u.documento, u.nombre paciente,estprog.nombre estado,sala.numero, sala.nombre sala, prog."fechaProgramacionInicia" inicia, prog."horaProgramacionInicia" horaInicia, prog."fechaProgramacionFin" Termina, prog."horaProgramacionFin" horaTermina,prog.cups1_id, exa1.nombre, prog.cups2_id,exa2.nombre, prog.cups3_id, exa3.nombre FROM cirugia_programacioncirugias prog INNER JOIN sitios_sedesclinica sed	on (sed.id = prog."sedesClinica_id") INNER JOIN admisiones_ingresos i ON (i."tipoDoc_id" =prog."tipoDoc_id" AND i.documento_id =  prog.documento_id AND i.consec= prog."consecAdmision" ) INNER JOIN usuarios_usuarios u ON (u.id = i.documento_id ) INNER JOIN cirugia_estadosprogramacion estprog ON (estprog.id = prog."estadoProgramacion_id" ) INNER JOIN sitios_salas sala ON (sala.id =prog.sala_id ) LEFT JOIN CLINICO_EXAMENES exa1 ON (exa1.id= prog.cups1_id) LEFT JOIN CLINICO_EXAMENES exa2 ON (exa2.id= prog.cups2_id)  LEFT JOIN CLINICO_EXAMENES exa3 ON (exa3.id= prog.cups3_id) WHERE sed.id = ' + "'" + str(sede) + "'"