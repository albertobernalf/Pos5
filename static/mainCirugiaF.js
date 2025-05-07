console.log('Hola Alberto Hi!')

let dataTable;
let dataTableB;
let dataTableC;
let dataTableD;
let dataTableF;
let dataTableG;
let dataTableH;
let dataTableI;

let dataTableProgramacionCirugiaInitialized = false;
let dataTableSalasCirugiaInitialized = false;
let dataTableSolicitudCirugiaInitialized = false;
let dataTableIngresosCirugiaInitialized = false;
let dataTableProcedimientosCirugiaInitialized = false;
let dataTableParticipantesCirugiaInitialized = false;


$(document).ready(function() {
    var table = $('#tablaProgramacionCirugia').DataTable();
    
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


function arrancaCirugia(valorTabla,valorData)
{
    data = {}
    data = valorData;

    if (valorTabla == 1)
    {
        let dataTableOptionsSalasCirugia  ={
   dom: "<'row mb-1'<'col-sm-3'B><'col-sm-3'><'col-sm-6'f>>" + // B = Botones a la izquierda, f = filtro a la derecha
             "<'row'<'col-sm-12'tr>>" +
             "<'row mt-3'<'col-sm-5'i><'col-sm-7'p>>",
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
		{  
                    "targets": 7
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
                 url:"/load_dataSalasCirugia/" +  data,
                 type: "POST",
                 dataSrc: ""
            },
            columns: [
	{
	  "render": function ( data, type, row ) {
                        var btn = '';

		 btn = btn + " <input type='radio' name='miProgramacionCirugia' class='miProgCirugia form-check-input ' data-pk='"  + row.pk + "'>" + "</input>";


                       return btn;
                    },

	},

	{
	  "render": function ( data, type, row ) {
                        var btn = '';

	     btn = btn + " <button class='miEditaProgramacionCirugia btn-primary ' data-pk='" + row.pk + "'>" + '<i class="fa-duotone fa-regular fa-thumbs-up"></i>' + "</button>";


                       return btn;
                    },

	},

                { data: "fields.id"},
                { data: "fields.numero"},
		   { data: "fields.nombre"}, 
                { data: "fields.ubicacion"},
                { data: "fields.servicio"},
                { data: "fields.estado"},
                        ]
            }
	        
		   dataTable = $('#tablaSalasCirugia').DataTable(dataTableOptionsSalasCirugia);


  }

    if (valorTabla == 2)
    {
        let dataTableOptionsProgramacionCirugia  ={
   dom: "<'row mb-1'<'col-sm-3'B><'col-sm-3'><'col-sm-6'f>>" + // B = Botones a la izquierda, f = filtro a la derecha
             "<'row'<'col-sm-12'tr>>" +
             "<'row mt-3'<'col-sm-5'i><'col-sm-7'p>>",
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
		{  
                    "targets": 18
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
                 url:"/load_dataProgramacionCirugia/" +  data,
                 type: "POST",
                 dataSrc: ""
            },
            columns: [
	{
	  "render": function ( data, type, row ) {
                        var btn = '';

	     btn = btn + " <button class='miProgramacionCirugia btn-primary ' data-pk='" + row.pk + "'>" + '<i class="fa-duotone fa-regular fa-thumbs-up"></i>' + "</button>";

                       return btn;
                    },

	},

	{
	  "render": function ( data, type, row ) {
                        var btn = '';

	     btn = btn + " <button class='miEditaProgramacionCirugia btn-primary ' data-pk='" + row.pk + "'>" + '<i class="fa-duotone fa-regular fa-thumbs-up"></i>' + "</button>";


                       return btn;
                    },

	},



                { data: "fields.id"},
                { data: "fields.tipoDoc_id"},
		   { data: "fields.tipoNota"}, 
                { data: "fields.documento"},
                { data: "fields.paciente"},
                { data: "fields.estadoProg"},
                { data: "fields.numero"},
                { data: "fields.sala"},
                { data: "fields.inicia"},
		{ data: "fields.horaInicia"},
                { data: "fields.Termina"},
		 { data: "fields.horaTermina"},
		 { data: "fields.cups1_id"},
		 { data: "fields.examen1"},
		  { data: "fields.cups2_id"},
		 { data: "fields.examen2"},
		  { data: "fields.cups3_id"},
		 { data: "fields.examen3"},
                        ]
            }

		dataTable = $('#tablaProgramacionCirugia').DataTable(dataTableOptionsProgramacionCirugia);

  }


    if (valorTabla == 3)
    {
        let dataTableOptionsSolicitudCirugia  ={
   dom: "<'row mb-1'<'col-sm-3'B><'col-sm-3'><'col-sm-6'f>>" + // B = Botones a la izquierda, f = filtro a la derecha
             "<'row'<'col-sm-12'tr>>" +
             "<'row mt-3'<'col-sm-5'i><'col-sm-7'p>>",
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
		{  
                    "targets": 28
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
                 url:"/load_dataSolicitudCirugia/" +  data,
                 type: "POST",
                 dataSrc: ""
            },
            columns: [
	{
	  "render": function ( data, type, row ) {
                        var btn = '';

	    btn = btn + " <input type='radio' name='miSolicitudCirugia' class='miSolicitudCirugia2 form-check-input ' data-pk='"  + row.pk + "'>" + "</input>";


                       return btn;
                    },

	},


	{
	  "render": function ( data, type, row ) {
                        var btn = '';

	     btn = btn + " <button class='miAdicionarProcedimientos btn-primary ' data-pk='" + row.pk + "'>" + '<i class="fa-duotone fa-regular fa-thumbs-up"></i>' + "</button>";

                       return btn;
                    },

	},

	{
	  "render": function ( data, type, row ) {
                        var btn = '';

	     btn = btn + " <button class='miAdicionarParticipantes btn-primary ' data-pk='" + row.pk + "'>" + '<i class="fa-duotone fa-regular fa-thumbs-up"></i>' + "</button>";


                       return btn;
                    },

	},

		{ data: "fields.sede"},
                { data: "fields.cirugia"},
                { data: "fields.tipoDoc"},
                { data: "fields.documento"},
                { data: "fields.paciente"},
                { data: "fields.nacimiento"},
                { data: "fields.genero"},
                { data: "fields.edad"},
                { data: "fields.ingreso"},
                { data: "fields.solicita"},
                { data: "fields.cama"},
                { data: "fields.empresa"},
                { data: "fields.telefono"},
                { data: "fields.solicitaSangre"},
                { data: "fields.describeSangre"},
                { data: "fields.cantidadSangre"},
                { data: "fields.solicitaCamaUci"},
                { data: "fields.solicitaMicroscopio"},
                { data: "fields.solicitaRx"},
                { data: "fields.solicitaAutoSutura"},
                { data: "fields.solicitaOsteosintesis"},
                { data: "fields.solicitaBiopsia"},
                { data: "fields.solicitaMalla"},
                { data: "fields.solicitaOtros"},
                { data: "fields.estadoProg"},
                { data: "fields.anestesia"},

                        ]
            }

		dataTable = $('#tablaSolicitudCirugia').DataTable(dataTableOptionsSolicitudCirugia);

  }

    if (valorTabla == 4)
    {
        let dataTableOptionsIngresosCirugia  ={
	  lengthMenu: [2, 4, 15],
           processing: true,
            serverSide: false,
            scrollY: '150px',
	    scrollX: true,
	    scrollCollapse: true,
            paging:false,
            columnDefs: [
		{ className: 'centered', targets: [0, 1, 2, 3, 4, 5] },
	    { width: '10%', targets: [2,3] },
		{  
                    "targets": 11
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
                 url:"/load_dataIngresosCirugia/" +  data,
                 type: "POST",
                 dataSrc: ""
            },
            columns: [
	{
	  "render": function ( data, type, row ) {
                        var btn = '';

	    btn = btn + " <input type='radio' name='miSolicitudCirugia' class='miSolicitudCirugia2 form-check-input ' data-pk='"  + row.pk + "'>" + "</input>";


                       return btn;
                    },

	},


		{ data: "fields.id"},
                { data: "fields.tipoDoc_id"},
                { data: "fields.documento"},
                { data: "fields.paciente"},
                { data: "fields.consecutivo"},
                { data: "fields.genero"},
                { data: "fields.edad"},
                { data: "fields.nacimiento"},
                { data: "fields.cama"},
                { data: "fields.telefono"},
                { data: "fields.empresa"},
                        ]
            }

		dataTable = $('#tablaIngresosCirugia').DataTable(dataTableOptionsIngresosCirugia);

  }



    if (valorTabla == 5)
    {
        let dataTableOptionsProcedimientosCirugia  ={
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
		{  
                    "targets": 11
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
                 url:"/traerProcedimientosCirugia/" +  data,
                 type: "POST",
                 dataSrc: ""
            },
            columns: [
	{
	  "render": function ( data, type, row ) {
                        var btn = '';

	    btn = btn + " <input type='radio' name='miProcedimientoCirugia' class='miSolicitudCirugia2 form-check-input ' data-pk='"  + row.pk + "'>" + "</input>";


                       return btn;
                    },

	},


		{ data: "fields.id"},
                { data: "fields.cirugiaId"},
                { data: "fields.cups_id"},
                { data: "fields.exaNombre"},
                { data: "fields.finalNombre"},
                        ]
            }

		dataTable = $('#tablaProcedimientosCirugia').DataTable(dataTableOptionsProcedimientosCirugia);

  }


    if (valorTabla == 6)
    {
        let dataTableOptionsParticipantesCirugia  ={
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
		{  
                    "targets": 11
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
                 url:"/traerParticipantesCirugia/" +  data,
                 type: "POST",
                 dataSrc: ""
            },
            columns: [
	{
	  "render": function ( data, type, row ) {
                        var btn = '';

	    btn = btn + " <input type='radio' name='miParticipanteCirugia' class='miSolicitudCirugia2 form-check-input ' data-pk='"  + row.pk + "'>" + "</input>";


                       return btn;
                    },

	},


		{ data: "fields.id"},
                { data: "fields.cirugiaId"},
                { data: "fields.honNombre"},
                { data: "fields.medicoNombre"},
                { data: "fields.especialidadNombre"},
                        ]
            }

		dataTable = $('#tablaParticipantesCirugia').DataTable(dataTableOptionsParticipantesCirugia);

  }

}

const initDataTableProgramacionCirugia = async () => {
	if  (dataTableProgramacionCirugiaInitialized)  {
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
 	    data = JSON.stringify(data);

	alert("sede = " + sede);

        arrancaCirugia(2,data);
	    dataTableProgramacionCirugiaInitialized = true;

        arrancaCirugia(1,data);
	    dataTableSalasCirugiaInitialized = true;

        arrancaCirugia(3,data);
	    dataTableSolicitudCirugiaInitialized = true;

}


 // COMIENZA ONLOAD

window.addEventListener('load', async () => {
    await  initDataTableProgramacionCirugia();
	 $('#tablaProgramacionCirugia tbody tr:eq(0) .miSol').prop('checked', true);  // Checkprimera fila el checkbox creo solo javascript

});


 /* FIN ONLOAD */




$('#tablaProgramacionCirugia tbody').on('click', '.miProgramacionCirugia', function() {

		alert("ENTRE Programacion Cirugiaio");

	     var post_id = $(this).data('pk');
	var envioRipsId = document.getElementById("envioRipsId").value ;
	var row = $(this).closest('tr'); // Encuentra la fila

	// Nop estop toca por el DOM - html traer el valopr d ela columna



	tipoRips =   document.getElementById("tipoRips2").value ;
	alert("tipoRips = " +  tipoRips);

     
	$.ajax({

	        url: "/traerProgramacionCirugia/",
                data: {'envioRipsId':envioRipsId,'tipoRips':tipoRips},
                type: "POST",
                dataType: 'json',
                success: function (info) {

            $('#postFormRipsEnvioJson').trigger("reset");

  	
 				$('#valorJsonP').val(info[0].fields.valorJson);
				$('#envioRipsIdP').val(envioRipsId);


				

            $('#modelHeadingRipsEnvioJson').html("Detalle Envios Rips");
            $('#crearModelRipsEnvioJson').modal('show');

                },
                 error: function (request, status, error) {
			document.getElementById("mensajesError").innerHTML = 'Error Contacte a su Administrador' + ': ' + error
	   	    	}
            });
      
  });






// FIN DE LO NUEVO

// Solicitud Procedimientos


$('#tablaSolicitudCirugia tbody').on('click', '.miAdicionarProcedimientos', function() {

		alert("ENTRE miAdicionarProcedimientos");

	     var post_id = $(this).data('pk');
	
	var row = $(this).closest('tr'); // Encuentra la fila

	// Nop estop toca por el DOM - html traer el valopr d ela columna



	cirugiaId =   post_id;
	alert("cirugiaId = " +  cirugiaId);

     
	$.ajax({

	        url: "/traerProcedimientosCirugia/",
                data: {'cirugiaId':cirugiaId},
                type: "POST",
                dataType: 'json',
                success: function (info) {

            $('#postFormProcedimientosCirugia').trigger("reset");

 			//	$('#valorJsonP').val(info[0].fields.valorJson);
			//	$('#envioRipsIdP').val(envioRipsId);
				

            $('#modelHeadingProcedimientosCirugia').html("Detalle Procedimientos Cirugia");
            $('#crearModelProcedimientosCirugia').modal('show');

                },
                 error: function (request, status, error) {
			document.getElementById("mensajesErrorProcedimientosCirugia").innerHTML = 'Error Contacte a su Administrador' + ': ' + error
	   	    	}
            });
      
  });

$('#tablaSolicitudCirugia tbody').on('click', '.miAdicionarParticipantes', function() {

		alert("ENTRE miAdicionarParticipantes");

	     var post_id = $(this).data('pk');
	
	var row = $(this).closest('tr'); // Encuentra la fila

	// Nop estop toca por el DOM - html traer el valopr d ela columna



	cirugiaId =   post_id;
	alert("cirugiaId = " +  cirugiaId);

     
	$.ajax({

	        url: "/traerParticipantesCirugia/",
                data: {'cirugiaId':cirugiaId},
                type: "POST",
                dataType: 'json',
                success: function (info) {

            $('#postFormParticipantesCirugia').trigger("reset");

 			//	$('#valorJsonP').val(info[0].fields.valorJson);
			//	$('#envioRipsIdP').val(envioRipsId);
				

            $('#modelHeadingParticipantesCirugia').html("Detalle Participantes Cirugia");
            $('#crearModelParticipantesCirugia').modal('show');

                },
                 error: function (request, status, error) {
			document.getElementById("mensajesErrorParticipantesCirugia").innerHTML = 'Error Contacte a su Administrador' + ': ' + error
	   	    	}
            });
      
  });

$('#tablaIngresosCirugia tbody').on('click', '.miSolicitudCirugia2', function() {


		 var post_id = $(this).data('pk');
		document.getElementById("ingresoId2").value  = post_id;
		username_id = document.getElementById("username_id").value;

		document.getElementById("username3_id").value  = username_id;


		
})





/* ---------------------------------
Para borrar detalle rips
------------------------------------*/





	/*------------------------------------------
        --------------------------------------------
        Create GuardarDetalleRips
        --------------------------------------------
        --------------------------------------------*/

/*------------------------------------------
        --------------------------------------------
        EnvioRips
        --------------------------------------------
        --------------------------------------------*/





function CerrarModalJson()
{

            $('#crearModelRipsJson').modal('hide');
}

function CerrarModalEnvioJson()
{

            $('#crearModelRipsEnvioJson').modal('hide');
}

function ProgramacionCirugia()
{
	alert("Programacion");
            $('#post_id').val('');
            $('#postFormProgramacionCirugia').trigger("reset");
            $('#modelHeadingProgramacionCirugia').html("Creacion Programacion de Cirugia");
	   var sede = document.getElementById("sede").value;
	   document.getElementById("sedesClinica_id").value =  sede;
	   document.getElementById("username2_id").value =  document.getElementById("username_id").value;

            $('#crearModelProgramacionCirugia').modal('show');      
}

function SolicitudCirugia()
{	
	alert("Solicitud");

            $('#post_id').val('');
            $('#postFormSolicitudCirugia').trigger("reset");
            $('#modelHeadingSolicitudCirugia').html("Creacion Solicitud de Cirugia");
	   var sede = document.getElementById("sede").value;
	   document.getElementById("sedesClinica_id").value =  sede;
	   document.getElementById("username2_id").value =  document.getElementById("username_id").value;
	    arrancaCirugia(4,data);
	    dataTableIngresosCirugiaInitialized = true;
		document.getElementById("cirugiaId2").value = post_id
            $('#crearModelSolicitudCirugia').modal('show');      
}



function CrearProgramacionCirugia()
{
	var sede = document.getElementById("sede").value;
	document.getElementById("sedesClinica_id").value =  sede;

            $.ajax({
                data: $('#postFormEnviosRips').serialize(),
	        url: "/crearProgramacionCirugia/",
                type: "POST",
                dataType: 'json',
                success: function (data2) {
		  
                  $('#postFormEnviosRips').trigger("reset");
		var data =  {}   ;
	        data['username'] = username;
  	        data['sedeSeleccionada'] = sedeSeleccionada;
	        data['nombreSede'] = nombreSede;
	        data['sede'] = sede;
	        data['username_id'] = username_id;
	        data = JSON.stringify(data);
	

	     arrancaCirugia(2,data);
	    dataTableProgramacionCirugiaInitialized = true;

	     arrancaCirugia(1,data);
	    dataTablesalasCirugiaInitialized = true;


 		 $('#crearModelProgramacionCirugia').modal('hide');
		 $("#mensajes").html(data2.message);

                },
            error: function (request, status, error) {
		document.getElementById("mensajesErrorModalProgramacion").innerHTML = 'Error Contacte a su Administrador' + ': ' + error
	   	    	}
            });


}



function CrearSolicitudCirugia()
{

	alert("Entre CrearSolicitudCirugia");
	var row = $(this).closest('tr'); // Encuentra la fila

	alert("row =" +  row);
	console.log("row =",  row);

	var sede = document.getElementById("sede").value;
	alert("sede = " + sede);

	document.getElementById("sedesClinica_id").value =  sede;
	

            $.ajax({
                data: $('#postFormSolicitudCirugia').serialize(),
	        url: "/crearSolicitudCirugia/",
                type: "POST",
                dataType: 'json',
                success: function (data2) {
		  
                  $('#postFormSolicitudCirugia').trigger("reset");
		var data =  {}   ;
	        data['username'] = username;
  	        data['sedeSeleccionada'] = sedeSeleccionada;
	        data['nombreSede'] = nombreSede;
	        data['sede'] = sede;
	        data['username_id'] = username_id;
	        data = JSON.stringify(data);

	     arrancaCirugia(2,data);
	    dataTableProgramacionCirugiaInitialized = true;

	     arrancaCirugia(1,data);
	    dataTableSalasCirugiaInitialized = true;

	     arrancaCirugia(3,data);
	    dataTableSolicitudCirugiaInitialized = true;

 		 $('#crearModelSolicitudCirugia').modal('hide');
		 $("#mensajes").html(data2.message);

                },
            error: function (request, status, error) {
		document.getElementById("mensajesErrorModalSolicitud").innerHTML = 'Error Contacte a su Administrador' + ': ' + error
	   	    	}
            });


}


