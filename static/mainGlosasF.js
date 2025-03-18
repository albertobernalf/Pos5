console.log('Hola Alberto Hi!')

let dataTable;
let dataTableA;
let dataTableB;
let dataTableC;
let dataTableD;
let dataTableF;
let dataTableG;
let dataTableH;

let dataTableGlosasInitialized = false;
let dataTableGlosasDetalleInitialized = false;
let dataTableGlosasTransaccionInitialized = false;
let dataTableGlosasUsuariosInitialized = false;
let dataTableGlosasProcedimientosInitialized = false;
let dataTableGlosasHospitalizacionInitialized = false;
let dataTableGlosasMedicamentosInitialized = false;


$(document).ready(function() {
    var table = $('#tablaGlosas').DataTable();
    
       $('#search').on('keyup', function() {
        var searchValue = this.value.split(' '); // Supongamos que los términos de búsqueda están separados por espacios
        
        // Aplica la búsqueda en diferentes columnas
        table
            .columns([3]) // Filtra en la primera columna
            .search(searchValue[0]) // Primer término de búsqueda
            .draw();

	  table
            .columns([9]) // Filtra en la segunda columna
            .search(searchValue[1]) // Segundo término de búsqueda
            .draw();


        
        table
            .columns([14]) // Filtra en la segunda columna
            .search(searchValue[1]) // Segundo término de búsqueda
            .draw();
    });
});


function arrancaGlosas(valorTabla,valorData)
{
    data = {}
    data = valorData;

    if (valorTabla == 1)
    {
        let dataTableOptionsGlosas  ={
  dom: 'Bfrtilp',
  buttons: [
    {
      extend: 'excelHtml5',
      text: '<i class="fas fa-file-excel"></i> ',
      titleAttr: 'Exportar a Excel',
      className: 'btn btn-success',
    },
    {
      extend: 'pdfHtml5',
      text: '<i class="fas fa-file-pdf"></i> ',
      titleAttr: 'Exportar a PDF',
      className: 'btn btn-danger',
    },
    {
      extend: 'print',
      text: '<i class="fa fa-print"></i> ',
      titleAttr: 'Imprimir',
      className: 'btn btn-info',
    },
  ],
  lengthMenu: [2, 4, 15],
           processing: true,
            serverSide: false,
            scrollY: '275px',
	    scrollX: true,
	    scrollCollapse: true,
            paging:false,
            columnDefs: [
		{ className: 'centered', targets: [0, 1, 2, 3, 4, 5] },
	    { width: '10%', targets: [2,3] },

		{     "render": function ( data, type, row ) {
                        var btn = '';
        		     btn = btn + " <input type='radio' name='glosa' class='miGlosa form-check-input ' data-pk='"  + row.pk + "'>" + "</input>";
                       return btn;
                    },

                    "targets": 23
               }
            ],
	 pageLength: 3,
	  destroy: true,
	  language: {
		    processing: 'Procesando...',
		    lengthMenu: 'Mostrar _MENU_ registros',
		    zeroRecords: 'No se encontraron resultados',
		    emptyTable: 'Ningún dato disponible en esta tabla',
		    infoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
		    infoFiltered: '(filtrado de un total de _MAX_ registros)',
		    search: 'Buscar:',
		    infoThousands: ',',
		    loadingRecords: 'Cargando...',
		    paginate: {
			      first: 'Primero',
			      last: 'Último',
			      next: 'Siguiente',
			      previous: 'Anterior',
		    }
			},


           ajax: {
                 url:"/load_dataGlosas/" +  data,
                 type: "POST",
                 dataSrc: ""
            },
            columns: [
                { data: "fields.id"},
                { data: "fields.fechaRecepcion"},
                { data: "fields.saldoFactura"},
                { data: "fields.totalSoportado"},
                { data: "fields.totalAceptado"},
                { data: "fields.observaciones"},
                { data: "fields.fechaRegistro"},
                { data: "fields.estadoReg"},
		{ data: "fields.convenio_id"},
		{ data: "fields.nombreConvenio"},
                { data: "fields.usuarioRegistro_id"},
		 { data: "fields.factura_id"},
		 { data: "fields.fechaRespuesta"},
		 { data: "fields.tipoGlosa_id"},
		 { data: "fields.nombreTipoGlosa"},
		  { data: "fields.usuarioRecepcion_id"},
                { data: "fields.usuarioRespuesta_id"},    
                { data: "fields.valorGlosa"},    
                { data: "fields.estadoRadicacion_id"},    
                { data: "fields.estadoRecepcion_id"},    
                { data: "fields.estadoGlosaRecepcion"},    
                { data: "fields.sedesClinica_id"},    
                { data: "fields.ripsEnvio_id"},    

       ]
            }
	        dataTable = $('#tablaGlosas').DataTable(dataTableOptionsGlosas);




  }

    if (valorTabla == 2)
    {

      }


// la tres

    if (valorTabla == 3)
    {

      }


// la cuatro

    if (valorTabla == 4)
    {

        let dataTableOptionsGlosasTransaccion  ={
  dom: 'Bfrtilp',
  buttons: [
    {
      extend: 'excelHtml5',
      text: '<i class="fas fa-file-excel"></i> ',
      titleAttr: 'Exportar a Excel',
      className: 'btn btn-success',
    },
    {
      extend: 'pdfHtml5',
      text: '<i class="fas fa-file-pdf"></i> ',
      titleAttr: 'Exportar a PDF',
      className: 'btn btn-danger',
    },
    {
      extend: 'print',
      text: '<i class="fa fa-print"></i> ',
      titleAttr: 'Imprimir',
      className: 'btn btn-info',
    },
  ],
  lengthMenu: [2, 4, 15],
           processing: true,
            serverSide: false,
            scrollY: '275px',
	    scrollX: true,
	    scrollCollapse: true,
            paging:false,
            columnDefs: [
		{ className: 'centered', targets: [0, 1, 2, 3, 4, 5] },
		{     "render": function ( data, type, row ) {
                        var btn = '';
                          btn = btn + " <input type='radio' class='miTransaccion form-check-input ' data-pk='"  + row.pk + "'>" + "</input>";

                       return btn;
                    },
                    "targets": 8
               }
            ],
	 pageLength: 3,
	  destroy: true,
	  language: {
		    processing: 'Procesando...',
		    lengthMenu: 'Mostrar _MENU_ registros',
		    zeroRecords: 'No se encontraron resultados',
		    emptyTable: 'Ningún dato disponible en esta tabla',
		    infoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
		    infoFiltered: '(filtrado de un total de _MAX_ registros)',
		    search: 'Buscar:',
		    infoThousands: ',',
		    loadingRecords: 'Cargando...',
		    paginate: {
			      first: 'Primero',
			      last: 'Último',
			      next: 'Siguiente',
			      previous: 'Anterior',
		    }
			},
           ajax: {
                 url:"/load_tablaGlosasTransaccion/" +  data,
                 type: "POST",
                 dataSrc: ""
            },
            columns: [
	 { data: "fields.id"},
             	 { data: "fields.id"},
                { data: "fields.numDocumentoIdObligado"},
                { data: "fields.numNota"},
                { data: "fields.fechaRegistro"},
                { data: "fields.tipoNota_id"},
                { data: "fields.usuarioRegistro_id"},
                { data: "fields.ripsEnvio_id"},
                { data: "fields.sedesClinica_id"},
                     ]
            }

            if  (dataTableGlosasTransaccionInitialized)  {

		            dataTableD = $("#tablaGlosasTransaccion").dataTable().fnDestroy();

                    }

                dataTableD = $('#tablaGlosasTransaccion').DataTable(dataTableOptionsGlosasTransaccion);

	            dataTableGlosasTransaccionInitialized  = true;
      }



// la cinco

    if (valorTabla == 5)
    {

        let dataTableOptionsGlosasUsuarios  ={
  dom: 'Bfrtilp',
  buttons: [
    {
      extend: 'excelHtml5',
      text: '<i class="fas fa-file-excel"></i> ',
      titleAttr: 'Exportar a Excel',
      className: 'btn btn-success',
    },
    {
      extend: 'pdfHtml5',
      text: '<i class="fas fa-file-pdf"></i> ',
      titleAttr: 'Exportar a PDF',
      className: 'btn btn-danger',
    },
    {
      extend: 'print',
      text: '<i class="fa fa-print"></i> ',
      titleAttr: 'Imprimir',
      className: 'btn btn-info',
    },
  ],
  lengthMenu: [2, 4, 15],
           processing: true,
            serverSide: false,
            scrollY: '275px',
	    scrollX: true,
	    scrollCollapse: true,
            paging:false,
            columnDefs: [
		{ className: 'centered', targets: [0, 1, 2, 3, 4, 5] },
		{     "render": function ( data, type, row ) {
                        var btn = '';
                          btn = btn + " <input type='radio' class='miUsuarios form-check-input ' data-pk='"  + row.pk + "'>" + "</input>";

                       return btn;
                    },
                    "targets": 16
               }
            ],
	 pageLength: 3,
	  destroy: true,
	  language: {
		    processing: 'Procesando...',
		    lengthMenu: 'Mostrar _MENU_ registros',
		    zeroRecords: 'No se encontraron resultados',
		    emptyTable: 'Ningún dato disponible en esta tabla',
		    infoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
		    infoFiltered: '(filtrado de un total de _MAX_ registros)',
		    search: 'Buscar:',
		    infoThousands: ',',
		    loadingRecords: 'Cargando...',
		    paginate: {
			      first: 'Primero',
			      last: 'Último',
			      next: 'Siguiente',
			      previous: 'Anterior',
		    }
			},
           ajax: {
                 url:"/load_tablaGlosasUsuarios/" +  data,
                 type: "POST",
                 dataSrc: ""
            },
            columns: [
	 { data: "fields.id"},
             	 { data: "fields.id"},
                { data: "fields.tipoDocumentoIdentificacion"},
                { data: "fields.tipoUsuario"},
                { data: "fields.fechaNacimiento"},
                { data: "fields.codSexo"},
                { data: "fields.codZonaTerritorialResidencia"},
                { data: "fields.incapacidad"},
                { data: "fields.consecutivo"},
                { data: "fields.fechaRegistro"},
                { data: "fields.codMunicipioResidencia_id"},
                { data: "fields.codPaisOrigen_id"},
                { data: "fields.codPaisResidencia_id"},
                { data: "fields.usuarioRegistro_id"},
                { data: "fields.numDocumentoIdentificacion"},
                { data: "fields.ripsDetalle_id"},
                { data: "fields.ripsTransaccion_id"},

                     ]
            }

            if  (dataTableGlosasUsuariosInitialized)  {

		            dataTableE = $("#tablaGlosasUsuarios").dataTable().fnDestroy();

                    }

                dataTableE = $('#tablaGlosasUsuarios').DataTable(dataTableOptionsGlosasUsuarios);

	            dataTableGlosasUsuariosInitialized  = true;
      }


// la seis

    if (valorTabla == 6)
    {

        let dataTableOptionsGlosasProcedimientos  ={
  dom: 'Bfrtilp',
  buttons: [
    {
      extend: 'excelHtml5',
      text: '<i class="fas fa-file-excel"></i> ',
      titleAttr: 'Exportar a Excel',
      className: 'btn btn-success',
    },
    {
      extend: 'pdfHtml5',
      text: '<i class="fas fa-file-pdf"></i> ',
      titleAttr: 'Exportar a PDF',
      className: 'btn btn-danger',
    },
    {
      extend: 'print',
      text: '<i class="fa fa-print"></i> ',
      titleAttr: 'Imprimir',
      className: 'btn btn-info',
    },
  ],
  lengthMenu: [2, 4, 15],
           processing: true,
            serverSide: false,
            scrollY: '275px',
	    scrollX: true,
	    scrollCollapse: true,
            paging:false,
            columnDefs: [
		{ className: 'centered', targets: [0, 1, 2, 3, 4, 5] },
		{     "render": function ( data, type, row ) {
                        var btn = '';
                          btn = btn + " <input type='radio' class='miProcedimientos form-check-input ' data-pk='"  + row.pk + "'>" + "</input>";

                       return btn;
                    },
                    "targets": 23
               }
            ],
	 pageLength: 3,
	  destroy: true,
	  language: {
		    processing: 'Procesando...',
		    lengthMenu: 'Mostrar _MENU_ registros',
		    zeroRecords: 'No se encontraron resultados',
		    emptyTable: 'Ningún dato disponible en esta tabla',
		    infoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
		    infoFiltered: '(filtrado de un total de _MAX_ registros)',
		    search: 'Buscar:',
		    infoThousands: ',',
		    loadingRecords: 'Cargando...',
		    paginate: {
			      first: 'Primero',
			      last: 'Último',
			      next: 'Siguiente',
			      previous: 'Anterior',
		    }
			},
           ajax: {
                 url:"/load_tablaGlosasProcedimientos/" +  data,
                 type: "POST",
                 dataSrc: ""
            },
            columns: [
	 { data: "fields.id"},
              	 { data: "fields.id"},
                { data: "fields.codPrestador"},
                { data: "fields.fechaInicioAtencion"},
                { data: "fields.idMIPRES"},
                { data: "fields.numAutorizacion"},
                { data: "fields.numDocumentoIdentificacion"},
                { data: "fields.vrServicio"},
                { data: "fields.valorPagoModerador"},
                { data: "fields.consecutivo"},
                { data: "fields.codComplicacion_id"},
                { data: "fields.codDiagnosticoPrincipal_id"},
                { data: "fields.codDiagnosticoRelacionado_id"},
                { data: "fields.codProcedimiento_id"},
                { data: "fields.codServicio_id"},
                { data: "fields.conceptoRecaudo_id"},
                { data: "fields.finalidadTecnologiaSalud_id"},
                { data: "fields.grupoServicios_id"},
                { data: "fields.modalidadGrupoServicioTecSal_id"},
                { data: "fields.tipoDocumentoIdentificacion_id"},
                { data: "fields.usuarioRegistro_id"},
                { data: "fields.viaIngresoServicioSalud_id"},
                { data: "fields.ripsDetalle_id"},
                { data: "fields.tipoPagoModerador_id"},



                     ]
            }

            if  (dataTableGlosasProcedimientosInitialized)  {

		            dataTableF = $("#tablaGlosasProcedimientos").dataTable().fnDestroy();

                    }

                dataTableF = $('#tablaGlosasProcedimientos').DataTable(dataTableOptionsGlosasProcedimientos);

	            dataTableGlosasProcedimientosInitialized  = true;
      }



// la siete

    if (valorTabla == 7)
    {

        let dataTableOptionsGlosasHospitalizacion  ={
  dom: 'Bfrtilp',
  buttons: [
    {
      extend: 'excelHtml5',
      text: '<i class="fas fa-file-excel"></i> ',
      titleAttr: 'Exportar a Excel',
      className: 'btn btn-success',
    },
    {
      extend: 'pdfHtml5',
      text: '<i class="fas fa-file-pdf"></i> ',
      titleAttr: 'Exportar a PDF',
      className: 'btn btn-danger',
    },
    {
      extend: 'print',
      text: '<i class="fa fa-print"></i> ',
      titleAttr: 'Imprimir',
      className: 'btn btn-info',
    },
  ],
  lengthMenu: [2, 4, 15],
           processing: true,
            serverSide: false,
            scrollY: '275px',
	    scrollX: true,
	    scrollCollapse: true,
            paging:false,
            columnDefs: [
		{ className: 'centered', targets: [0, 1, 2, 3, 4, 5] },
		{     "render": function ( data, type, row ) {
                        var btn = '';
                          btn = btn + " <input type='radio' class='miHospitalizacion form-check-input ' data-pk='"  + row.pk + "'>" + "</input>";

                       return btn;
                    },
                    "targets": 20
               }
            ],
	 pageLength: 3,
	  destroy: true,
	  language: {
		    processing: 'Procesando...',
		    lengthMenu: 'Mostrar _MENU_ registros',
		    zeroRecords: 'No se encontraron resultados',
		    emptyTable: 'Ningún dato disponible en esta tabla',
		    infoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
		    infoFiltered: '(filtrado de un total de _MAX_ registros)',
		    search: 'Buscar:',
		    infoThousands: ',',
		    loadingRecords: 'Cargando...',
		    paginate: {
			      first: 'Primero',
			      last: 'Último',
			      next: 'Siguiente',
			      previous: 'Anterior',
		    }
			},
           ajax: {
                 url:"/load_tablaGlosasHospitalizacion/" +  data,
                 type: "POST",
                 dataSrc: ""
            },
            columns: [
	 { data: "fields.id"},
  	 { data: "fields.id"},
                { data: "fields.codPrestador"},
                { data: "fields.fechaInicioAtencion"},
                { data: "fields.numAutorizacion"},
                { data: "fields.fechaEgreso"},
                { data: "fields.consecutivo"},
                { data: "fields.fechaRegistro"},
                { data: "fields.causaMotivoAtencion_id"},
                { data: "fields.codComplicacion_id"},
                { data: "fields.codDiagnosticoCausaMuerte_id"},
                { data: "fields.codDiagnosticoPrincipal_id"},
                { data: "fields.codDiagnosticoPrincipalE_id"},
                { data: "fields.codDiagnosticoRelacionadoE1_id"},
                { data: "fields.codDiagnosticoRelacionadoE2_id"},
                { data: "fields.codDiagnosticoRelacionadoE3_id"},
                { data: "fields.condicionDestinoUsuarioEgreso_id"},
                { data: "fields.usuarioRegistro_id"},
                { data: "fields.viaIngresoServicioSalud_id"},
                { data: "fields.ripsDetalle_id_id"},
                { data: "fields.ripsTiposNotas_id"},

                     ]
            }

            if  (dataTableGlosasHospitalizacionInitialized)  {

		            dataTableG = $("#tablaGlosasHospitalizacion").dataTable().fnDestroy();

                    }

                dataTableG = $('#tablaGlosasHospitalizacion').DataTable(dataTableOptionsGlosasHospitalizacion);

	            dataTableGlosasHospitalizacionInitialized  = true;
      }



// la ocho

    if (valorTabla == 8)
    {

        let dataTableOptionsGlosasMedicamentos  ={
  dom: 'Bfrtilp',
  buttons: [
    {
      extend: 'excelHtml5',
      text: '<i class="fas fa-file-excel"></i> ',
      titleAttr: 'Exportar a Excel',
      className: 'btn btn-success',
    },
    {
      extend: 'pdfHtml5',
      text: '<i class="fas fa-file-pdf"></i> ',
      titleAttr: 'Exportar a PDF',
      className: 'btn btn-danger',
    },
    {
      extend: 'print',
      text: '<i class="fa fa-print"></i> ',
      titleAttr: 'Imprimir',
      className: 'btn btn-info',
    },
  ],
  lengthMenu: [2, 4, 15],
           processing: true,
            serverSide: false,
            scrollY: '275px',
	    scrollX: true,
	    scrollCollapse: true,
            paging:false,
            columnDefs: [
		{ className: 'centered', targets: [0, 1, 2, 3, 4, 5] },
		{     "render": function ( data, type, row ) {
                        var btn = '';
                          btn = btn + " <input type='radio' class='miMedicamentos form-check-input ' data-pk='"  + row.pk + "'>" + "</input>";

                       return btn;
                    },
                    "targets": 22
               }
            ],
	 pageLength: 3,
	  destroy: true,
	  language: {
		    processing: 'Procesando...',
		    lengthMenu: 'Mostrar _MENU_ registros',
		    zeroRecords: 'No se encontraron resultados',
		    emptyTable: 'Ningún dato disponible en esta tabla',
		    infoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
		    infoFiltered: '(filtrado de un total de _MAX_ registros)',
		    search: 'Buscar:',
		    infoThousands: ',',
		    loadingRecords: 'Cargando...',
		    paginate: {
			      first: 'Primero',
			      last: 'Último',
			      next: 'Siguiente',
			      previous: 'Anterior',
		    }
			},
           ajax: {
                 url:"/load_tablaGlosasMedicamentos/" +  data,
                 type: "POST",
                 dataSrc: ""
            },
            columns: [
		 { data: "fields.id"},
	 	  { data: "fields.itemFactura"},
	  { data: "fields.nomTecnologiaSalud"},
	  { data: "fields.idMIPRES"},
	  { data: "fields.cums"},
	  { data: "fields.concentracionMedicamento"},
	  { data: "fields.cantidadMedicamento"},
  	 { data: "fields.vrUnitMedicamento"},
	  { data: "fields.vrServicio"},
	  { data: "fields.consecutivo"},
	  { data: "fields.tipoMedicamento_id"},
	  { data: "fields.unidadMedida_id"},
	  { data: "fields.cantidadGlosada"},
	  { data: "fields.cantidadAceptada"},
	  { data: "fields.cantidadSoportado"},
	  { data: "fields.valorGlosado"},
	  { data: "fields.vAceptado"},
	  { data: "fields.valorSoportado"},
	  { data: "fields.motivoGlosa_id"},
	  { data: "fields.notasCreditoGlosa"},
	  { data: "fields.notasCreditoOtras"},
	  { data: "fields.notasDebito"},

                     ]
            }

            if  (dataTableGlosasMedicamentosInitialized)  {

		            dataTableH = $("#tablaGlosasMedicamentos").dataTable().fnDestroy();

                    }

                dataTableH = $('#tablaGlosasMedicamentos').DataTable(dataTableOptionsGlosasMedicamentos);

	            dataTableGlosassMedicamentosInitialized  = true;
      }

}

const initDataTableGlosas = async () => {
	if  (dataTableGlosasInitialized)  {
		dataTable.destroy();

}
    	var sedeSeleccionada = document.getElementById("sedeSeleccionada").value;
        var username = document.getElementById("username").value;
        var nombreSede = document.getElementById("nombreSede").value;
    	var sede = document.getElementById("sede").value;
        var username_id = document.getElementById("username_id").value;
         var data =  {}   ;
        data['username'] = username;
        data['sedeSeleccionada'] = sedeSeleccionada;
        data['nombreSede'] = nombreSede;
        data['sede'] = sede;
        data['username_id'] = username_id;
	sedesClinica_id = sede;
	data['sedesClinica_id'] = sedesClinica_id
	data['facturaId'] = 1

        data = JSON.stringify(data);

         arrancaGlosas(1,data);
	 dataTableGlosasInitialized = true;
         arrancaGlosas(4,data);
         dataTableGlosasTransaccionInitialized = true;
	 arrancaGlosas(5,data);
	 dataTableGlosasUsuariosInitialized = true;
         arrancaGlosas(8,data);
	 dataTableGlosasProcedimientos = true;

}

 // COMIENZA ONLOAD

window.addEventListener('load', async () => {
    await  initDataTableGlosas();
	 

});


 /* FIN ONLOAD */


 $('#tablaGlosas tbody').on('click', '.miGlosa', function() {

        var post_id = $(this).data('pk');
	var row = $(this).closest('tr'); // Encuentra la fila
	alert("Entre Glosa");


        var data =  {}   ;

 	var sedeSeleccionada = document.getElementById("sedeSeleccionada").value;
        var username = document.getElementById("username").value;
        var nombreSede = document.getElementById("nombreSede").value;
    	var sede = document.getElementById("sede").value;
        var username_id = document.getElementById("username_id").value;
        data['username'] = username;
        data['sedeSeleccionada'] = sedeSeleccionada;
        data['nombreSede'] = nombreSede;
        data['sede'] = sede;
        data['username_id'] = username_id;
	sedesClinica_id = sede;
	data['sedesClinica_id'] = sedesClinica_id

	var table = $('#tablaGlosas').DataTable();  // Inicializa el DataTable jquery 	      

  	        var rowindex = table.row(row).data(); // Obtiene los datos de la fila


	        console.log(" fila selecciona de vuelta AQUI PUEDE ESTAR EL PROBLEMA = " ,  table.row(row).data());
	        dato1 = Object.values(rowindex);
		console.log(" fila seleccionad d evuelta dato1 = ",  dato1);
	        dato3 = dato1[2];
		console.log(" fila selecciona de vuelta dato3 = ",  dato3);
	        console.log ( "dato10 factura_id = " , dato3.factura_id); 

		var facturaId = dato3.factura_id;  // jquery
		alert("facturaId = " + facturaId);

		data['facturaId'] = facturaId

	        data = JSON.stringify(data);

		// document.getElementById("facturaId").value = facturaId ;


	    arrancaGlosas(1,data);
	    dataTableGlosasTransaccionInitialized = true;

	        arrancaGlosas(4,data);
	    dataTableGlosasInitialized = true;

	        arrancaGlosas(5,data);
	    dataTableGlosasUsuariosInitialized = true;

        	arrancaGlosas(8,data);
	    dataTableGlosasMedicamentos = true;

	// AQUI tengo que colocar los datosde la Glosa en el Formulario de Medicamentos y demas

	document.getElementById("post_idMedGlo").value =post_id;
	document.getElementById("factura_idMed").value = dato3.factura_id;
	document.getElementById("fechaRecepcionMed").value = dato3.fechaRecepcion;
	document.getElementById("valorGlosaMed").value = dato3.valorGlosa;
	document.getElementById("estadoRegMed").value = dato3.estadoReg;
	document.getElementById("totalSoportadoMed").value = dato3.totalSoportado;
	document.getElementById("totalAceptadoMed").value = dato3.totalAceptado;
	document.getElementById("saldoFacturaMed").value = dato3.saldoFactura;
	document.getElementById("observacionesMed").value = dato3.observaciones;

	document.getElementById("convenio_idMed").value = dato3.convenio_id;
	document.getElementById("fechaRegistroMed").value = dato3.fechaRegistro;
	document.getElementById("usuarioRegistro_idMed").value = dato3.usuarioRegistro_id;
	document.getElementById("fechaRespuestaMed").value = dato3.fechaRespuesta;
	document.getElementById("tipoGlosa_idMed").value = dato3.tipoGlosa_id;
	document.getElementById("usuarioRecepcion_idMed").value = dato3.usuarioRecepcion_id;
	document.getElementById("usuarioRespuesta_idMed").value = dato3.usuarioRespuesta_id;
	document.getElementById("estadoRadicacion_idMed").value = dato3.estadoRadicacion_id;
	document.getElementById("estadoRecepcion_idMed").value = dato3.estadoRecepcion_id;

        	arrancaGlosas(6,data);
	    dataTableGlosasProcedimientos = true;


  });



 $('#tablaGlosasMedicamentos tbody').on('click', '.miMedicamentos', function() {

        var post_id = $(this).data('pk');
	var row = $(this).closest('tr'); // Encuentra la fila

     $.ajax({
		   data: {'id':post_id},
	        url: "/consultaGlosasRipsMedicamentos/",
                type: "POST",
                dataType: 'json',
                success: function (info) {
		   $("#mensajes").html(info.message);

	$('#postFormMedicamentos').trigger("reset");

  	$('#post_idRipsMed').val(info[0].fields.id);
  	$('#glosaRipsMed').val(document.getElementById("post_idMedGlo").value);


  	$('#itemFacturaRipsMed').val(info[0].fields.itemFactura);
  	$('#nomTecnologiaSaludRipsMed').val(info[0].fields.nomTecnologiaSalud);
  	$('#cumsRipsMed').val(info[0].fields.cums);
  	$('#concentracionMedicamentoRipsMed').val(info[0].fields.concentracionMedicamento);
  	$('#cantidadMedicamentoRipsMed').val(info[0].fields.cantidadMedicamento);
  	$('#vrUnitMedicamentoRipsMed').val(info[0].fields.vrUnitMedicamento);
  	$('#vrServicioRipsMed').val(info[0].fields.vrServicio);
  	$('#consecutivoRipsMed').val(info[0].fields.consecutivo);
  	$('#tipoMedicamento_idRipsMed').val(info[0].fields.tipoMedicamento_id);
  	$('#unidadMedida_idRipsMed').val(info[0].fields.unidadMedida_id);
  	$('#cantidadGlosadaRipsMed').val(info[0].fields.cantidadGlosada);
  	$('#cantidadAceptadaRipsMed').val(info[0].fields.cantidadAceptada);
  	$('#cantidadSoportadoRipsMed').val(info[0].fields.cantidadSoportado);

  	$('#valorGlosadoRipsMed').val(info[0].fields.valorGlosado);
  	$('#vAceptadoRipsMed').val(info[0].fields.vAceptado);
  	$('#valorSoportadoRipsMed').val(info[0].fields.valorSoportado);
  	$('#motivoGlosa_idRipsMed').val(info[0].fields.motivoGlosa_id);
  	$('#notasCreditoGlosaRipsMed').val(info[0].fields.notasCreditoGlosa);
  	$('#notasCreditoOtrasRipsMed').val(info[0].fields.notasCreditoOtras);
  	$('#notasDebitoRipsMed').val(info[0].fields.notasDebito);

		 $('#crearModelGlosasMedicamentos').modal('show');
                },
            error: function (request, status, error) {
	   			    $("#mensajes").html(" !  Reproduccion  con error !");
	   	    	}
            });

  });



function GuardarGlosasMedicamentos()
{
	
		var sedeSeleccionada = document.getElementById("sedeSeleccionada").value;
	        var username = document.getElementById("username").value;
	        var nombreSede = document.getElementById("nombreSede").value;
	    	var sede = document.getElementById("sede").value;
	        var username_id = document.getElementById("username_id").value;

            $.ajax({
                data: $('#postFormMedicamentos').serialize(),
	        url: "/guardarGlosasMedicamentos/",
                type: "POST",
                dataType: 'json',
                success: function (data2) {

			filtrodata = JSON.stringify(data2['Data']);
			filtrodata = filtrodata.replace ('[','');
			filtrodata = filtrodata.replace (']','');
			filtro = JSON.parse(filtrodata);

			alert("filtro = " + filtro.fields);
			alert("filtro = " + filtro.fields.totalSoportado);
			alert("filtro = " + filtro.fields.totalAceptado);
 

			if (data2['Error'] == 'Si' )
				{
		

				   $("#mensajesMed").html(data2['message']);
					return ;
				}
	
				if (data2['Error'] == 'No' )
				{

				 $('#postFormMedicamentos').trigger("reset");

		document.getElementById("valorGlosaMed").value = filtro.fields.valorGlosa;
		document.getElementById("totalSoportadoMed").value = filtro.fields.totalSoportado;
		document.getElementById("totalAceptadoMed").value = filtro.fields.totalAceptado;
		document.getElementById("saldoFacturaMed").value = filtro.fields.saldoFactura;
		document.getElementById("tipoGlosa_idMed").value = filtro.fields.tipoGlosa_id;
		document.getElementById("estadoRadicacion_idMed").value = filtro.fields.estadoRadicacion_id;
		document.getElementById("estadoRecepcion_idMed").value = filtro.fields.estadoRecepcion_id;

		var data =  {}   ;
	        data['username'] = username;
		data['username_id'] = username_id;
	        data['sedeSeleccionada'] = sedeSeleccionada;
	        data['nombreSede'] = nombreSede;
	        data['sede'] = sede;
	        data['sedesClinica_id'] = sede;

		var facturaId = dato3.factura_id;  // jquery
		data['facturaId'] = document.getElementById("factura_idMed").value;

	        data = JSON.stringify(data);
	
  		 if  (dataTableGlosasInitialized)  {

		            dataTableC = $("#tablaGlosas").dataTable().fnDestroy();

                    }

			 arrancaGlosas(1,data);
			    dataTableGlosasInitialized = true;
			 arrancaGlosas(8,data);
			    dataTableGlosasMedicamentosInitialized = true;


 		 $('#crearModelGlosasMedicamentos').modal('hide');


				}	// Cierra el if		

                },
            error: function (request, status, error) {
	   			    $("#mensajes").html(" !  Reproduccion  con error !");
	   	    	}
            });


}


function GuardaGlosasEstados()
{
	
		var sedeSeleccionada = document.getElementById("sedeSeleccionada").value;
	        var username = document.getElementById("username").value;
	        var nombreSede = document.getElementById("nombreSede").value;
	    	var sede = document.getElementById("sede").value;
	        var username_id = document.getElementById("username_id").value;
		alert("Entre Guardar Glosas Estado");

	        var post_idMedGlo = document.getElementById("post_idMedGlo").value;
	        var tipoGlosa_idMed = document.getElementById("tipoGlosa_idMed").value;
	        var tipoGlosa_idMed = document.getElementById("tipoGlosa_idMed").value;
	        var estadoRecepcion_idMed = document.getElementById("estadoRecepcion_idMed").value;
	        var sedesClinica_idMed = document.getElementById("sedesClinica_idMed").value;




            $.ajax({
                data: {'post_idMedGlo':post_idMedGlo,'tipoGlosa_idMed':tipoGlosa_idMed,'tipoGlosa_idMed':tipoGlosa_idMed, 'estadoRecepcion_idMed':estadoRecepcion_idMed, 'sedesClinica_idMed':sedesClinica_idMed  },
	        url: "/guardaGlosasEstados/",
                type: "POST",
                dataType: 'json',
                success: function (data2) {


		var data =  {}   ;
	        data['username'] = username;
		data['username_id'] = username_id;
	        data['sedeSeleccionada'] = sedeSeleccionada;
	        data['nombreSede'] = nombreSede;
	        data['sede'] = sede;
	        data['sedesClinica_id'] = sede;

		var facturaId = document.getElementById("factura_idMed").value;
		data['facturaId'] = document.getElementById("factura_idMed").value;

	        data = JSON.stringify(data);
	
  		 if  (dataTableGlosasInitialized)  {
		            dataTableC = $("#tablaGlosas").dataTable().fnDestroy();
                    }

			 arrancaGlosas(1,data);
			    dataTableGlosasInitialized = true;
			 arrancaGlosas(8,data);
			    dataTableGlosasMedicamentosInitialized = true;


		  $("#mensajes").html(data2.message);
                },
            error: function (request, status, error) {
	   			    $("#mensajes").html(" !  Reproduccion  con error !");
	   	    	}
            });


}



/*------------------------------------------
        --------------------------------------------
        ModalGlosas
        --------------------------------------------
        --------------------------------------------*/

function ModalGlosas()
{
    
	
	
            $('#post_id').val('');
            $('#postFormCrearEnviosRips').trigger("reset");
            $('#modelHeadingEnviosRips').html("Creacion Envios Rips");
            $('#crearModelEnviosRips').modal('show');
        
}

function Glosas()
{
    
	
	
            $('#post_id').val('');
            $('#postFormCrearGlosas').trigger("reset");
            $('#modelHeadingGlosas').html("Creacion Glosas");
            $('#crearModelGlosas').modal('show');
        
}



function CerrarModalJson()
{

            $('#crearModelRipsJson').modal('hide');
}


function CrearGlosas()
{
	
		var sedeSeleccionada = document.getElementById("sedeSeleccionada").value;
	        var username = document.getElementById("username").value;
	        var nombreSede = document.getElementById("nombreSede").value;
	    	var sede = document.getElementById("sede").value;
	        var username_id = document.getElementById("username_id").value;
		alert("Entre Guardar Glosas Estado");

	        
		var convenio_id = document.getElementById("convenio_id").value;
	        var sedesClinica_id = document.getElementById("sedesClinica_id").value;
	        var fechaRecepcion = document.getElementById("fechaRecepcion").value;
	        var observaciones = document.getElementById("observaciones").value;
	        var factura_id = document.getElementById("factura_id").value;
	        var fechaRespuesta = document.getElementById("fechaRespuesta").value;
	        var tipoGlosa_id = document.getElementById("tipoGlosa_id").value;
	        var valorGlosa = document.getElementById("valorGlosa").value;
	        var estadoRecepcion_id = document.getElementById("estadoRecepcion_id").value;
	        var usuarioRegistro_id = document.getElementById("usuarioRegistro_id").value;


            $.ajax({
                data: {'convenio_id':convenio_id,'sedesClinica_id':sedesClinica_id, 'fechaRecepcion':fechaRecepcion, 'observaciones':observaciones,'factura_id':factura_id,  'fechaRespuesta':fechaRespuesta, 'tipoGlosa_id':tipoGlosa_id, 'valorGlosa':valorGlosa, 'estadoRecepcion_id':estadoRecepcion_id, 'usuarioRegistro_id':usuarioRegistro_id },
	        url: "/guardaGlosas/",
                type: "POST",
                dataType: 'json',
                success: function (data2) {


		var data =  {}   ;
	        data['username'] = username;
		data['username_id'] = username_id;
	        data['sedeSeleccionada'] = sedeSeleccionada;
	        data['nombreSede'] = nombreSede;
	        data['sede'] = sede;
	        data['sedesClinica_id'] = sede;

		var facturaId = document.getElementById("factura_idMed").value;
		data['facturaId'] = document.getElementById("factura_idMed").value;

	        data = JSON.stringify(data);
	
  		 if  (dataTableGlosasInitialized)  {
		            dataTableC = $("#tablaGlosas").dataTable().fnDestroy();
                    }

			 arrancaGlosas(1,data);
			    dataTableGlosasInitialized = true;
			 arrancaGlosas(8,data);
			    dataTableGlosasMedicamentosInitialized = true;


		  $("#mensajes").html(data2.message);
                },
            error: function (request, status, error) {
	   			    $("#mensajes").html(" !  Reproduccion  con error !");
	   	    	}
            });


}


