console.log('Hola Alberto Hi!')


let dataTable;
let dataTableB;
let dataTableC;
let dataTableTarifariosProcedimientosInitialized = false;
let dataTableTarifariosSuministrosInitialized = false;
let dataTableTarifariosDescripcionProcedimientosInitialized = false;


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
             btn = btn + " <input type='radio' name='miProcedimientos' class='miProcedimientos form-check-input ' data-pk='"  + row.pk + "'>" + "</input>";

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
                 url:"/load_dataTarifariosProcedimientos/" +  data,
                 type: "POST",
                 dataSrc: ""
            },
            columns: [
                { data: "fields.id"},
                { data: "fields.tipoTarifa"},
                { data: "fields.cups"},
                { data: "fields.codigoHomologado"},
                { data: "fields.exaNombre"},
                { data: "fields.colValorBase"},
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

    if (valorTabla == 4)
    {

        let dataTableOptionsDescripcionProcedimientos  ={
  lengthMenu: [2, 4, 15],
           processing: true,
            serverSide: false,
            scrollY: '120px',
	    scrollX: true,
	    scrollCollapse: true,
            paging:false,
            columnDefs: [
		{ className: 'centered', targets: [0, 1, 2, 3, 4, 5] },
		{     "render": function ( data, type, row ) {
                        var btn = '';
 			 btn = btn + " <input type='radio' name='miDescripcionProcedimiento' class='miDescripcionProcedimiento form-check-input ' data-pk='"  + row.pk + "'>" + "</input>";
             btn = btn + " <button class='miAplicarProcedimientos btn-primary ' data-pk='" + row.pk + "'>" + '<i class="fa-duotone fa-regular fa-thumbs-up"></i>' + "</button>";

                       return btn;
                    },
                    "targets":5
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
                 url:"/load_datatarifariosDescripcionProcedimientos/" +  data,
                 type: "POST",
                 dataSrc: ""
            },
            columns: [
	          { data: "fields.id"},
                { data: "fields.tipo"},
                { data: "fields.tipoTarifa"},
                { data: "fields.columna"},
                { data: "fields.descripcion"},
                     ]
            }

            if  (dataTableTarifariosDescripcionProcedimientosInitialized)  {

		            dataTableB = $("#tablaTarifariosDescripcionProcedimientos").dataTable().fnDestroy();

                    }

                dataTableC = $('#tablaTarifariosDescripcionProcedimientos').DataTable(dataTableOptionsDescripcionProcedimientos);

	            dataTableTarifariosDescripcionProcedimientosInitialized  = true;
      }



}
	
const initDataTableTarifariosDescripcionProcedimientos = async () => {
	if  (dataTableTarifariosDescripcionProcedimientosInitialized)  {
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

        arrancaTarifarios(4,data);
	    dataTableTarifariosDescripcionProcedimientosInitialized = true;

        arrancaTarifarios(1,data);
	    dataTableTarifariosProcedimientosInitialized = true;



}


 // COMIENZA ONLOAD

window.addEventListener('load', async () => {
    await  initDataTableTarifariosDescripcionProcedimientos();
	 $('#tablaTarifariosDescripcionProcedimientos tbody tr:eq(0) .miProcedimientos').prop('checked', true);  // Checkprimera fila el checkbox creo solo javascript


});


 /* FIN ONLOAD */



 $('#tablaTarifariosProcedimientos tbody').on('click', '.miProcedimientos', function() {

        var post_id = $(this).data('pk');
        var row = $(this).closest('tr'); // Encuentra la fila

	alert("Ingrese Modal Editar Procedimiento");


        var username_id = document.getElementById("username_id").value;

            $.ajax({

	        url: "/traerTarifarioProcedimientos/",

	    	data: {'post_id': post_id},
                type: "POST",
                dataType: 'json',
                success: function (data2) {

	

	    $('#post_id').val('');
            $('#postFormEditarTarifarioProcedimientos').trigger("reset");
            $('#modelHeadingEditarTarifarioProcedimientos').html("Editar Tarifario Procedimientos");

  		$('#postEditar_id').val(data2.id);
 		 $('#codigoHomologadoEditar').val(data2.codigoHomologado);
 		 $('#colValorBaseEditar').val(data2.colValorBase);
 		 $('#colValor1Editar').val(data2.colValor1);
 		 $('#colValor2Editar').val(data2.colValor2);
 		 $('#colValor3Editar').val(data2.colValor3);
 		 $('#colValor4Editar').val(data2.colValor4);
 		 $('#colValor5Editar').val(data2.colValor5);
 		 $('#colValor6Editar').val(data2.colValor6);
 		 $('#colValor7Editar').val(data2.colValor7);
 		 $('#colValor8Editar').val(data2.colValor8);
 		 $('#colValor9Editar').val(data2.colValor9);
 		 $('#colValor10Editar').val(data2.colValor10);



            $('#crearModelEditarTarifarioProcedimientos').modal('show');


		   $("#mensajes").html(data2.message);
                         },
               error: function (request, status, error) {
	   			    $("#mensajes").html(" !  Reproduccion  con error !");
	   	    	}
            });


  });




$('#tablaTarifariosDescripcionProcedimientos tbody').on('click', '.miAplicarProcedimientos', function() {

        alert(" Entre miAplicarProcedimientos ");

        var post_id = $(this).data('pk');
	    var row = $(this).closest('tr'); // Encuentra la fila

	    var table = $('#tablaTarifariosDescripcionProcedimientos').DataTable();  // Inicializa el DataTable jquery

	    var rowindex = table.row(row).data(); // Obtiene los datos de la fila


	        console.log(" fila selecciona de vuelta AQUI PUEDE ESTAR EL PROBLEMA = " ,  table.row(row).data());
	        dato1 = Object.values(rowindex);
		console.log(" fila seleccionad d evuelta dato1 = ",  dato1);
	        dato3 = dato1[2];
		console.log(" fila selecciona de vuelta dato3 = ",  dato3);
	        console.log ( "dato3 columna = " , dato3.columna);
	        console.log ( "dato3  descripcion = " , dato3.descripcion);
	        console.log ( "dato3 = tipoTarifa " , dato3.tipoTarifa);
            $('#postFormAplicarTarifario').trigger("reset");

	        $('#post_id').val(dato3.columna);
	         $('#columnaAplicar').val(dato3.columna);
	          $('#descripcionTarifario').val(dato3.descripcion);
	           $('#tiposTarifaTarifario_id').val(dato3.tipoTarifa);


            $('#modelHeadingAplicarTarifario').html("Aplicar Tarifarios");
            $('#crearModelAplicarTarifario').modal('show');

  });

function CerrarModalJson()
{

            $('#crearModelRipsJson').modal('hide');
}

function CrearItemTarifario()
{
	alert("Ingrese crear Item Tarifario");


	var sedeSeleccionada = document.getElementById("sedeSeleccionada").value;
        var username = document.getElementById("username").value;
        var nombreSede = document.getElementById("nombreSede").value;
    	var sede = document.getElementById("sede").value;
    	var username_id = document.getElementById("username_id").value;

 	var codigoHomologadoItem = document.getElementById("codigoHomologadoItem").value;
 	var tiposTarifaItem_id = document.getElementById("tiposTarifaItem_id").value;
 	var codigoCupsItem_id = document.getElementById("codigoCupsItem_id").value;
 	var conceptoItem_id = document.getElementById("conceptoItem_id").value;
 	var colValorBaseItem = document.getElementById("colValorBaseItem").value;



        var username_id = document.getElementById("username_id").value;

            $.ajax({

	        url: "/crearItemTarifario/",

	    	data: {'codigoHomologadoItem':codigoHomologadoItem , 'tiposTarifaItem_id' :tiposTarifaItem_id, 'codigoCupsItem_id' : codigoCupsItem_id,'conceptoItem_id':conceptoItem_id, 'colValorBaseItem':colValorBaseItem, 'username_id': username_id},
                type: "POST",
                dataType: 'json',
                success: function (data2) {

	
		var data =  {}   ;
	        data['username'] = username;
	       data['sedeSeleccionada'] = sedeSeleccionada;
	       data['nombreSede'] = nombreSede;
	      data['sede'] = sede;
	        data['username_id'] = username_id;
	        data = JSON.stringify(data);
	
		  var tableA = $('#tablaEnviosRips').DataTable();
	          tableA.ajax.reload();

		   $("#mensajes").html(data2.message);
                         },
               error: function (request, status, error) {
	   			    $("#mensajes").html(" !  Reproduccion  con error !");
	   	    	}
            });



}

function AplicarTarifario()
{
	alert("Ingrese Grabar Item Tarifario");


	var post_id = document.getElementById("post_id").value ;
	var tiposTarifaTarifario_id = document.getElementById("tiposTarifaTarifario_id").value ;

	var porcentaje = document.getElementById("porcentaje").value ;
	var valorAplicar = document.getElementById("valorAplicar").value ;
	var columnaAplicar = document.getElementById("columnaAplicar").value ;

	var sedeSeleccionada = document.getElementById("sedeSeleccionada").value;
        var username = document.getElementById("username").value;
        var nombreSede = document.getElementById("nombreSede").value;
    	var sede = document.getElementById("sede").value;
        var username_id = document.getElementById("username_id").value;


            $.ajax({

	        url: "/aplicarTarifas/",
		data: {'post_id' : post_id, 'tiposTarifaTarifario_id':tiposTarifaTarifario_id, 'porcentaje':porcentaje,'valorAplicar':valorAplicar,
		'columnaAplicar':columnaAplicar},
                type: "POST",
                dataType: 'json',
                success: function (data2) {

	
		var data =  {}   ;
	        data['username'] = username;
	       data['sedeSeleccionada'] = sedeSeleccionada;
	       data['nombreSede'] = nombreSede;
	      data['sede'] = sede;
	        data['username_id'] = username_id;
	        data = JSON.stringify(data);



		   $("#mensajes").html(data2.message);

		    	  $('#crearModelAplicarTarifario').modal('hide');


                         },
               error: function (request, status, error) {
	   			    $("#mensajes").html(" !  Reproduccion  con error !");
	   	    	}
            });

}

function ModalDescripcionProcedimiento()
{

	alert("Ingrese Modal Descripcion Procedimiento");

	    $('#post_id').val('');
            $('#postFormDescripcionProcedimientos').trigger("reset");
            $('#modelHeadingDescripcionProcedimientos').html("Descripcion Procedimientos");
            $('#crearModelDescripcionProcedimientos').modal('show');

}


function GuardarDescripcionProcedimientos()
{
	alert("Ingrese GuardarDescripcionProcedimientos");

	var sedeSeleccionada = document.getElementById("sedeSeleccionada").value;
        var username = document.getElementById("username").value;
        var nombreSede = document.getElementById("nombreSede").value;
    	var sede = document.getElementById("sede").value;
        var tiposTarifa_id = document.getElementById("tiposTarifa_id").value;
        var columna = document.getElementById("columna").value;
        var descripcion = document.getElementById("descripcion").value;



            $.ajax({

	        url: "/guardarDescripcionProcedimientos/",
		data: {'tiposTarifa_id':tiposTarifa_id,'columna':columna, 'descripcion':descripcion},
                type: "POST",
                dataType: 'json',
                success: function (data2) {

	
		var data =  {}   ;
	        data['username'] = username;
	       data['sedeSeleccionada'] = sedeSeleccionada;
	       data['nombreSede'] = nombreSede;
	      data['sede'] = sede;
	        data['username_id'] = username_id;
	        data = JSON.stringify(data);

     		  arrancaTarifarios(4,data);
	    dataTableTarifariosDescripcionProcedimientosInitialized = true;
	
		   $("#mensajes").html(data2.message);
 	  $('#crearModelDescripcionProcedimientos').modal('hide');


                         },
               error: function (request, status, error) {
	   			    $("#mensajes").html(" !  Reproduccion  con error !");
	   	    	}
            });

}

function ModalCrearTarifarioProcedimientos()
{

	alert("Ingrese Modal Descripcion Procedimiento");

	    $('#post_id').val('');
            $('#postFormCrearTarifarioProcedimientos').trigger("reset");
            $('#modelHeadingCrearTarifarioProcedimientos').html("Crear Tarifario sabana Procedimientos");
            $('#crearModelCrearTarifarioProcedimientos').modal('show');

}



function CrearTarifarioProcedimientos()
{

	alert("Ingrese CrearTarifarioProcedimientos");
	    var post_id = $(this).data('pk');


	var sedeSeleccionada = document.getElementById("sedeSeleccionada").value;
        var username = document.getElementById("username").value;
        var username_id = document.getElementById("username2_id").value;
        var nombreSede = document.getElementById("nombreSede").value;
    	var sede = document.getElementById("sede").value;
        var tiposTarifa1_id = document.getElementById("tiposTarifa1_id").value;
	var usuarioRegistro_id = document.getElementById("usuarioRegistro_id").value;
    alert( "este es eltiposTarifa1_id =" + tiposTarifa1_id) ;


            $.ajax({

	        url: "/crearTarifarioProcedimientos/",
    		data: {'tiposTarifa_id':tiposTarifa1_id,'username_id':username_id},
                type: "POST",
                dataType: 'json',
                success: function (data2) {

	
		var data =  {}   ;
	        data['username'] = username;
	       data['sedeSeleccionada'] = sedeSeleccionada;
	       data['nombreSede'] = nombreSede;
	      data['sede'] = sede;
	        data['username_id'] = username_id;
	        data = JSON.stringify(data);

     		  arrancaTarifarios(4,data);
	    dataTableTarifariosDescripcionProcedimientosInitialized = true;
	
     		  arrancaTarifarios(1,data);
	    dataTableTarifariosProcedimientosInitialized = true;



		   $("#mensajes").html(data2.message);
 	  $('#crearModelDescripcionProcedimientos').modal('hide');


                         },
               error: function (request, status, error) {
	   			    $("#mensajes").html(" !  Reproduccion  con error !");
	   	    	}
            });

} 

function GuardarEditarTarifarioProcedimientos()
{
	alert("Entre GuardarEditarTarifarioProcedimientos");

	var post_id = document.getElementById("postEditar_id").value;
	var username_id = document.getElementById("username_id").value;
	var codigoHomologadoEditar = document.getElementById("codigoHomologadoEditar").value;
	var colValorBaseEditar = document.getElementById("colValorBaseEditar").value;
	var colValor1Editar = document.getElementById("colValor1Editar").value;
	var colValor2Editar = document.getElementById("colValor2Editar").value;
	var colValor3Editar = document.getElementById("colValor3Editar").value;
	var colValor4Editar = document.getElementById("colValor4Editar").value;
	var colValor5Editar = document.getElementById("colValor5Editar").value;
	var colValor6Editar = document.getElementById("colValor6Editar").value;
	var colValor7Editar = document.getElementById("colValor7Editar").value;
	var colValor8Editar = document.getElementById("colValor8Editar").value;
	var colValor9Editar = document.getElementById("colValor9Editar").value;
	var colValor10Editar = document.getElementById("colValor10Editar").value;

            $.ajax({

	        url: "/guardarEditarTarifarioProcedimientos/",
    		data: {'post_id':post_id, 'codigoHomologadoEditar':codigoHomologadoEditar,'colValorBaseEditar':colValorBaseEditar,
				'colValor1Editar':colValor1Editar,'colValor2Editar':colValor2Editar,'colValor3Editar':colValor3Editar,'colValor4Editar':colValor4Editar,
				'colValor5Editar':colValor5Editar,'colValor6Editar':colValor6Editar,'colValor7Editar':colValor7Editar,'colValor8Editar':colValor8Editar,
				'colValor9Editar':colValor9Editar,'colValor10Editar':colValor10Editar,'username_id':username_id},
                type: "POST",
                dataType: 'json',
                success: function (data2) {
	
		var data =  {}   ;
	        data['username'] = username;
	       data['sedeSeleccionada'] = sedeSeleccionada;
	       data['nombreSede'] = nombreSede;
	      data['sede'] = sede;
	        data['username_id'] = username_id;
	        data = JSON.stringify(data);
     		  arrancaTarifarios(4,data);
	    dataTableTarifariosDescripcionProcedimientosInitialized = true;
     		  arrancaTarifarios(1,data);
	    dataTableTarifariosProcedimientosInitialized = true;

		   $("#mensajes").html(data2.message);
 	  $('#crearModelEditarTarifarioProcedimientos').modal('hide');

                         },
               error: function (request, status, error) {
	   			    $("#mensajes").html(" !  Reproduccion  con error !");
	   	    	}
            });

}


