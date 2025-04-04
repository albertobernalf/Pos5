console.log('Hola Alberto Hi!')

let dataTable;
let dataTableB;
let dataTableC;


let dataTableConveniosInitialized = false;
let dataTableConveniosProcedimientosInitialized = false;
let dataTableConveniosSuministrosInitialized = false;
let dataTableConveniosHonorariosInitialized = false;


$(document).ready(function() {
    
var table = $('#tablaConvenios').DataTable();
    
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


function arrancaConvenios(valorTabla,valorData)
{
    data = {}
    data = valorData;


    if (valorTabla == 1)
    {
        let dataTableOptionsConvenios  ={
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
	     btn = btn + " <button class='editoConvenio btn-primary ' data-pk='" + row.pk + "'>" + '<i class="fa-duotone fa-regular fa-thumbs-up"></i>' + "</button>";
             btn = btn + " <input type='radio' name='miConvenio' class='miConvenio2 form-check-input ' data-pk='"  + row.pk + "'>" + "</input>";
                       return btn;
                    },

                    "targets": 13
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
                 url:"/load_dataConvenios/" +  data,
                 type: "POST",
                 dataSrc: ""
            },
            columns: [
                { data: "fields.id"},
                { data: "fields.empresa"},
                { data: "fields.empresa_id"},
                { data: "fields.nombreConvenio"},
                { data: "fields.descripcion"},
                { data: "fields.vigenciaDesde"},
                { data: "fields.vigenciaHasta"},
                { data: "fields.tarifariosDescripcionProc_id"},
                { data: "fields.tarifariosDescripcionProc"},
		        { data: "fields.tarifariosDescripcionSum_id"},
	        	{ data: "fields.tarifariosDescripcionSum"},
                { data: "fields.tarifariosDescripcionHono_id"},
                { data: "fields.tarifariosDescripcionHono"},
                ]
            }

	        dataTable = $('#tablaConvenios').DataTable(dataTableOptionsConvenios);

  }
 }

const initDataTableConvenios = async () => {

	if  (dataTableConveniosInitialized)  {
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


        arrancaConvenios(1,data);

	    dataTableConveniosInitialized = true;
}

 // COMIENZA ONLOAD

window.addEventListener('load', async () => {
    await  initDataTableConvenios();

	 $('#tablaConvenios tbody tr:eq(0) .miConvenio2').prop('checked', true);  // Checkprimera fila el checkbox creo solo javascript

});


 /* FIN ONLOAD */

$('#tablaConvenios tbody').on('click', '.editoConvenio', function() {

		alert("ENTRE edito Convenio");

	     var post_id = $(this).data('pk');
		var row = $(this).closest('tr'); // Encuentra la fila
	alert("convenioId = " +  post_id );

	$.ajax({

	        url: "/traerConvenio/",
                data: {'post_id':post_id},
                type: "POST",
                dataType: 'json',
                success: function (info) {

            $('#postFormEditarConvenios').trigger("reset");

  	
 				$('#postConvenio_id').val(info[0].fields.id);
				$('#nombreConvenio').val(info[0].fields.nombreConvenio);
				$('#vigenciaDesde').val(info[0].fields.vigenciaDesde);
				$('#vigenciaHasta').val(info[0].fields.vigenciaHasta);
$('#porcTarifario').val(info[0].fields.porcTarifario);
$('#porcSuministros').val(info[0].fields.porcSuministros);
$('#valorOxigeno').val(info[0].fields.valorOxigeno);
$('#porcEsterilizacion').val(info[0].fields.porcEsterilizacion);
$('#porcMaterial').val(info[0].fields.porcMaterial);
$('#hospitalario').val(info[0].fields.hospitalario);
$('#urgencias').val(info[0].fields.urgencias);
$('#ambulatorio').val(info[0].fields.ambulatorio);
$('#consultaExterna').val(info[0].fields.consultaExterna);
$('#copago').val(info[0].fields.copago);
$('#moderadora').val(info[0].fields.moderadora);
$('#tipofactura').val(info[0].fields.tipofactura);
$('#facturacionSuministros').val(info[0].fields.facturacionSuministros);
$('#facturacionCups').val(info[0].fields.facturacionCups);
$('#cuentaContable').val(info[0].fields.cuentaContable);
$('#requisitos').val(info[0].fields.requisitos);
$('#fechaRegistro').val(info[0].fields.fechaRegistro);
$('#estadoReg').val(info[0].fields.estadoReg);
$('#empresa_id').val(info[0].fields.empresa_id);
$('#usuarioRegistro_id').val(info[0].fields.usuarioRegistro_id);
$('#descripcion').val(info[0].fields.descripcion);
$('#tarifariosDescripcionProc_id').val(info[0].fields.tarifariosDescripcionProc_id);
$('#tarifariosDescripcionHono_id').val(info[0].fields.tarifariosDescripcionHono_id);
$('#tarifariosDescripcionSum_id').val(info[0].fields.tarifariosDescripcionSum_id);
			

            $('#modelHeadingEditarConvenios').html("Convenios");
            $('#editarModelConvenios').modal('show');

                },
                 error: function (request, status, error) {
	   			    $("#mensajes").html(" !  Reproduccion  con error !");
	   	    	}
            });
      
  });



function EditarGuardarConvenios()
{

	     var post_id = document.getElementById("postConvenio_id").value;
		var row = $(this).closest('tr'); // Encuentra la fila

  	var nombreConvenio = document.getElementById("nombreConvenio").value;
  	var descripcion = document.getElementById("descripcion").value;
  	var vigenciaDesde = document.getElementById("vigenciaDesde").value;
  	var vigenciaHasta = document.getElementById("vigenciaHasta").value;
  	var porcTarifario = document.getElementById("porcTarifario").value;
  	var porcSuministros = document.getElementById("porcSuministros").value;
  	var valorOxigeno = document.getElementById("valorOxigeno").value;
  	var porcEsterilizacion = document.getElementById("porcEsterilizacion").value;
  	var porcMaterial = document.getElementById("porcMaterial").value;
  	var hospitalario = document.getElementById("hospitalario").value;
  	var urgencias = document.getElementById("urgencias").value;
  	var ambulatorio = document.getElementById("ambulatorio").value;
  	var consultaExterna = document.getElementById("consultaExterna").value;
  	var copago = document.getElementById("copago").value;
  	var moderadora = document.getElementById("moderadora").value;
  	var tipofactura = document.getElementById("tipofactura").value;
  	var facturacionSuministros = document.getElementById("facturacionSuministros").value;     
  	var facturacionCups = document.getElementById("facturacionCups").value;
  	var cuentaContable = document.getElementById("cuentaContable").value;
  	var requisitos = document.getElementById("requisitos").value;
  	var empresa_id = document.getElementById("empresa_id").value;
  	var facturacionCups = document.getElementById("facturacionCups").value;
  	var usuarioRegistro_id = document.getElementById("username_id").value;
  	var descripcion = document.getElementById("descripcion").value;
  	var tarifariosDescripcionProc_id = document.getElementById("tarifariosDescripcionProc_id").value;
  	var tarifariosDescripcionSum_id = document.getElementById("tarifariosDescripcionSum_id").value;
  	var tarifariosDescripcionHono_id = document.getElementById("tarifariosDescripcionHono_id").value;

	$.ajax({

	        url: "/editarGuardarConvenios/",
                data: {'post_id':post_id,'nombreConvenio':nombreConvenio,'descripcion': descripcion, 'vigenciaDesde':vigenciaDesde,'vigenciaHasta':vigenciaHasta,'porcTarifario':porcTarifario, 'porcSuministros':porcSuministros, 'valorOxigeno':valorOxigeno,
			 'porcEsterilizacion':porcEsterilizacion,'porcMaterial':porcMaterial, 'hospitalario':hospitalario,  'urgencias':urgencias,'ambulatorio':ambulatorio,'consultaExterna':consultaExterna,'copago':copago,
			'moderadora':moderadora, 'tipofactura':tipofactura, 'facturacionSuministros':facturacionSuministros,'facturacionCups':facturacionCups, 'cuentaContable':cuentaContable, 'requisitos':requisitos,
			'empresa_id':empresa_id, 'facturacionCups':facturacionCups,'usuarioRegistro_id':usuarioRegistro_id, 'tarifariosDescripcionProc_id':tarifariosDescripcionProc_id, 'tarifariosDescripcionSum_id':tarifariosDescripcionSum_id,
			'tarifariosDescripcionHono_id':tarifariosDescripcionHono_id },
                type: "POST",
                dataType: 'json',
                success: function (info) {

            $('#postFormEditarConvenios').trigger("reset");

	     arrancaConvenios(1,data);

	    dataTableConveniosInitialized = true;

		
            $('#editarModelConvenios').modal('hide');

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

        arrancaConvenios(1,data);
  dataTableConveniosInitialized = true;

                },
                 error: function (request, status, error) {
	   			    $("#mensajes").html(" !  Reproduccion  con error !");
	   	    	}
            });
}


function AdicionarConvenio()
{
    
	alert("Entre Adicionar Convenio");

	
            $('#post_id').val('');
            $('#postFormCrearConvenios').trigger("reset");
            $('#modelHeadingCrearConvenios').html("Creacion Envios Rips");
            $('#crearModelConvenios').modal('show');
        
}



function CrearGuardarConvenios()
{

	     var post_id = document.getElementById("postConvenioC_id").value;
		var row = $(this).closest('tr'); // Encuentra la fila

  	var nombreConvenio = document.getElementById("nombreConvenioC").value;
  	var descripcion = document.getElementById("descripcionC").value;
  	var vigenciaDesde = document.getElementById("vigenciaDesdeC").value;
  	var vigenciaHasta = document.getElementById("vigenciaHastaC").value;
  	var porcTarifario = document.getElementById("porcTarifarioC").value;
  	var porcSuministros = document.getElementById("porcSuministrosC").value;
  	var valorOxigeno = document.getElementById("valorOxigenoC").value;
  	var porcEsterilizacion = document.getElementById("porcEsterilizacionC").value;
  	var porcMaterial = document.getElementById("porcMaterialC").value;
  	var hospitalario = document.getElementById("hospitalarioC").value;
  	var urgencias = document.getElementById("urgenciasC").value;
  	var ambulatorio = document.getElementById("ambulatorioC").value;
  	var consultaExterna = document.getElementById("consultaExternaC").value;
  	var copago = document.getElementById("copagoC").value;
  	var moderadora = document.getElementById("moderadoraC").value;
  	var tipofactura = document.getElementById("tipofacturaC").value;
  	var agrupada = document.getElementById("agrupadaC").value;
  	var facturacionSuministros = document.getElementById("facturacionSuministrosC").value;     
  	var facturacionCups = document.getElementById("facturacionCupsC").value;
  	var cuentaContable = document.getElementById("cuentaContable").value;
  	var requisitos = document.getElementById("requisitosC").value;
  	var empresa_id = document.getElementById("empresaC_id").value;
  	var facturacionCups = document.getElementById("facturacionCupsC").value;
  	var usuarioRegistro_id = document.getElementById("username_id").value;
  	var descripcion = document.getElementById("descripcionC").value;
  	var tarifariosDescripcionProc_id = document.getElementById("tarifariosDescripcionProcC_id").value;
  	var tarifariosDescripcionSum_id = document.getElementById("tarifariosDescripcionSumC_id").value;
  	var tarifariosDescripcionHono_id = document.getElementById("tarifariosDescripcionHonoC_id").value;

	$.ajax({

	        url: "/crearGuardarConvenios/",
                data: {'post_id':post_id,'nombreConvenio':nombreConvenio,'descripcion': descripcion, 'vigenciaDesde':vigenciaDesde,'vigenciaHasta':vigenciaHasta,'porcTarifario':porcTarifario, 'porcSuministros':porcSuministros, 'valorOxigeno':valorOxigeno,
			 'porcEsterilizacion':porcEsterilizacion,'porcMaterial':porcMaterial, 'hospitalario':hospitalario,  'urgencias':urgencias,'ambulatorio':ambulatorio,'consultaExterna':consultaExterna,'copago':copago,
			'moderadora':moderadora, 'tipofactura':tipofactura, 'agrupada':agrupada, 'facturacionSuministros':facturacionSuministros,'facturacionCups':facturacionCups, 'cuentaContable':cuentaContable, 'requisitos':requisitos,
			'empresa_id':empresa_id, 'facturacionCups':facturacionCups,'usuarioRegistro_id':usuarioRegistro_id, 'tarifariosDescripcionProc_id':tarifariosDescripcionProc_id, 'tarifariosDescripcionSum_id':tarifariosDescripcionSum_id,
			'tarifariosDescripcionHono_id':tarifariosDescripcionHono_id },
                type: "POST",
                dataType: 'json',
                success: function (info) {

            $('#postFormCrearConvenios').trigger("reset");

	     arrancaConvenios(1,data);

	    dataTableConveniosInitialized = true;

		
            $('#crearModelConvenios').modal('hide');

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

        arrancaConvenios(1,data);
  dataTableConveniosInitialized = true;

                },
                 error: function (request, status, error) {
	   			    $("#mensajes").html(" !  Reproduccion  con error !");
	   	    	}
            });
}















