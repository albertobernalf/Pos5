console.log('Hola Alberto Hi!')


let dataTable;
let dataTableB;
let dataTableTarifariosProcedimientosInitialized = false;
let dataTableTarifariosSuministrosInitialized = false;



function arrancaTarifarios(valorTabla,valorData)
{
    data = {}
    data = valorData;

    if (valorTabla == 1)
    {
        let dataTableOptionsProcedimientos  ={
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
	    { width: '10%', targets: [9,15] },
		{     "render": function ( data, type, row ) {
                        var btn = '';
             btn = btn + " <input type='radio' name='miProcedimientos' class='miAutorizacion form-check-input ' data-pk='"  + row.pk + "'>" + "</input>";


                       return btn;
                    },

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
                 url:"/load_dataTarifariosProcedimientos/" +  data,
                 type: "POST",
                 dataSrc: ""
            },
            columns: [
                { data: "fields.id"},
                { data: "fields.codigoHomologado"},
                { data: "fields.tiposTarifa_id"},
                { data: "fields.codigoCups_id"},
                { data: "fields.concepto_id"},
                { data: "fields.colValor1"},
                { data: "fields.colValor2"},
                { data: "fields.colValor3"},
                { data: "fields.colValor4"},
                { data: "fields.colValor5"},
                { data: "fields.colValor6"},
                { data: "fields.colValor7"},
                { data: "fields.colValor8"},
                { data: "fields.colValor9"},
                { data: "fields.colValor10"},
                { data: "fields.usuarioRegistro_id"},
                { data: "fields.fechaRegistro"},
                { data: "fields.estadoReg"},

            ]
            }
	        dataTable = $('#tablaTarifariosProcedimientos').DataTable(dataTableOptionsProcedimientos);


  }

    if (valorTabla == 2)
    {

        let dataTableOptionsSuministros  ={
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
                      btn = btn + " <button class='miSuministro btn-primary ' data-pk='" + row.pk + "'>" + '<i class="fa fa-pencil"></i>' + "</button>";
                       return btn;
                    },
                    "targets":18
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
                 url:"/load_datatarifariosSuministros/" +  data,
                 type: "POST",
                 dataSrc: ""
            },
            columns: [
	          { data: "fields.id"},
                { data: "fields.codigoHomologado"},
                { data: "fields.tiposTarifa_id"},
                { data: "fields.codigoCum_id"},
                { data: "fields.concepto_id"},
                { data: "fields.colValor1"},
                { data: "fields.colValor2"},
                { data: "fields.colValor3"},
                { data: "fields.colValor4"},
                { data: "fields.colValor5"},
                { data: "fields.colValor6"},
                { data: "fields.colValor7"},
                { data: "fields.colValor8"},
                { data: "fields.colValor9"},
                { data: "fields.colValor10"},
                { data: "fields.usuarioRegistro_id"},
                { data: "fields.fechaRegistro"},
                { data: "fields.estadoReg"},
                     ]
            }

            if  (dataTableTarifariosSuministrosInitialized)  {

		            dataTableB = $("#tablaTarifariosSuministros").dataTable().fnDestroy();

                    }

                dataTableB = $('#tablaTarifariosSuministros').DataTable(dataTableOptionsSumnistros);

	            dataTableTarifariosSuministrosInitialized  = true;
      }


    if (valorTabla == 3)
    {
        let dataTableOptionsHonorarios  ={
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
	    { width: '10%', targets: [9,15] },
		{     "render": function ( data, type, row ) {
                        var btn = '';
             btn = btn + " <input type='radio' name='miHonorarios' class='miHonorarios form-check-input ' data-pk='"  + row.pk + "'>" + "</input>";


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
                 url:"/load_dataTarifariosHonorarios/" +  data,
                 type: "POST",
                 dataSrc: ""
            },
            columns: [
                { data: "fields.id"},
                { data: "fields.sedesClinica_id"},

                { data: "fields.paciente"},
                { data: "fields.folio"},
                { data: "fields.fechaSolicitud"},

                { data: "fields.numeroAutorizacion"},
                { data: "fields.fechaAutorizacion"},
                { data: "fields.medico"},
                { data: "fields.observaciones"},
                { data: "fields.estadoAutorizacion"},
                { data: "fields.numeroSolicitud"},
                { data: "fields.fechaVigencia"},
                { data: "fields.empresa_id"},
                { data: "fields.empresaNombre"},
                { data: "fields.plantaOrdena_id"},
                { data: "fields.usuarioRegistro_id"},
            ]
            }
	        dataTable = $('#tablaTarifariosHonorarios').DataTable(dataTableOptionsHonorarios);


  }


}
	
const initDataTableTarifarios = async () => {
	if  (dataTableTarifariosProcedimientosInitialized)  {
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

        arrancaTarifarios(1,data);
	    dataTableTarifariosProcedimientosInitialized = true;
}


 // COMIENZA ONLOAD

window.addEventListener('load', async () => {
    await  initDataTableTarifarios();
	 $('#tablatarifariosProcedimientos tbody tr:eq(0) .miProcedimientos').prop('checked', true);  // Checkprimera fila el checkbox creo solo javascript


});


 /* FIN ONLOAD */



 $('#tablaProcedimientos tbody').on('click', '.miAutorizacion', function() {

        var post_id = $(this).data('pk');
        var autorizacionId = post_id;
	    var row = $(this).closest('tr'); // Encuentra la fila

	    var data =  {}   ;
	    var sedeSeleccionada = document.getElementById("sedeSeleccionada").value;
        var username = document.getElementById("username").value;
        var nombreSede = document.getElementById("nombreSede").value;
    	var sede = document.getElementById("sede").value;
        var username_id = document.getElementById("username_id").value;
	document.getElementById("autorizacionId").value = autorizacionId ;

        var data =  {}   ;
        data['username'] = username;
        data['sedeSeleccionada'] = sedeSeleccionada;
        data['nombreSede'] = nombreSede;
        data['sede'] = sede;
        data['username_id'] = username_id;
        data['autorizacionId'] = autorizacionId;
    	data = JSON.stringify(data);

        arrancaTarifarios(2,data);


  });


function CerrarModalJson()
{

            $('#crearModelRipsJson').modal('hide');
}
