var $ = jQuery;
console.log('Hola Alberto Hi!')

$(document).ready(function () {

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

	alert("esta es la data que envio = username" + data.username);
	alert("esta es la data que envio = sedeSeleccionada" + data.sedeSeleccionada);
	alert("esta es la data que envio = nombreSede " + data.nombreSede);
	alert("esta es la data que envio = username_id " + data.username_id);
	alert("esta es la data que envio = sede " + data.sede);

	data = JSON.stringify(data);


	initTableEnviosRips(data);	

function initTableEnviosRips(data) {

	return new DataTable('.tablaEnviosRips', {
	 "language": {
                  "lengthMenu": "Display _MENU_ registros",
                   "search": "Filtrar registros:",
                    },
            processing: true,
            serverSide: false,
            scrollY: '300px',
	    scrollX: true,
	    scrollCollapse: true,
            paging:false,
   	   
            columnDefs: [
                {
                    "render": function ( data, type, row ) {
                        var btn = '';
                         
                          btn = btn + " <input type='radio' class='miSol form-check-input ' data-pk='"  + row.pk + "'>" + "</input>";
                        return btn;
                    },
       
                    "targets": 11
               }
            ],	  
            ajax: {
                 url:"/load_dataEnviosRips/" +  data,
                 type: "POST",
                 dataSrc: ""
            },
            lengthMenu: [2,3, 5, 10, 20, 30, 40, 50],
            columns: [
                { data: "fields.id"},
                { data: "fields.sedesClinica_id"},
                { data: "fields.empresa_id"},
                { data: "fields.fechaEnvio"},
                { data: "fields.fechaRespuesta"},
                { data: "fields.cantidadFacturas"},
                { data: "fields.cantidadPasaron"},
		{ data: "fields.cantidadRechazadas"},
                { data: "fields.estadoPasoMinisterio"},
		 { data: "fields.fechaRegistro"},
		 { data: "fields.usuarioRegistro_id"},
            ]

 });
}

});  //// AQUI cierra el document.ready
	


function initTableDetalleRips(data) {

	return new DataTable('.tablaDetalleRips', {
	 "language": {
                  "lengthMenu": "Display _MENU_ registros",
                   "search": "Filtrar registros:",
                    },
            processing: true,
            serverSide: false,
            scrollY: '300px',
	    scrollX: true,
	    scrollCollapse: true,
            paging:false,
            columnDefs: [
                {
                    "render": function ( data, type, row ) {
                        var btn = '';
                          btn = btn + " <input type='radio'  class='form-check-input editPostDetalleRips' data-pk='"  + row.pk + "'>" + "</input>";
                        return btn;
                    },
           
                    "targets": 9
               }
            ],
            ajax: {
                 url:"/load_dataDetalleRips/" +  data,
                 type: "POST",
                dataSrc: ""
            },

            lengthMenu: [2,3, 5, 10, 20, 30, 40, 50],
            columns: [

		 { data: "fields.id"},
                { data: "fields.factura_id"},
                { data: "fields.cuv"},
                { data: "fields.estadoPasoAlMinisterio"},
                { data: "fields.rutaJsonRespuesta"},
                { data: "fields.rutaJsonFactura"},
                { data: "fields.rutaPdf"},
                { data: "fields.rutaZip"},
		 { data: "fields.usuarioRegistro_id"},
            ]
 });
}



function initTableDetalleRipsAdicionar(data) {


	
	return new DataTable('.tablaDetalleRipsAdicionar', {
	 "language": {
                  "lengthMenu": "Display _MENU_ registros",
                   "search": "Filtrar registros:",
                    },
            processing: true,
            serverSide: false,
            scrollY: '300px',
	    scrollX: true,
	    scrollCollapse: true,
            paging:false,
            columnDefs: [
                {
                    "render": function ( data, type, row ) {
                        var btn = '';
                          btn = btn + " <input type='radio'  class='miFactura form-check-input ' data-pk='"  + row.pk + "'>" + "</input>";
                        return btn;
                    },
           
                    "targets": 6
               }
            ],
            ajax: {
                 url:"/load_dataDetalleRipsAdicionar/" +  data,
                 type: "POST",
                dataSrc: ""
            },

            lengthMenu: [2,3, 5, 10, 20, 30, 40, 50],
            columns: [
		{ data: "fields.id"},
                { data: "fields.factura"},
                { data: "fields.fechaFactura"},
                { data: "fields.paciente"},
                { data: "fields.totalFactura"},
                { data: "fields.estado"},
            ]
 });
}


 $('#tablaEnviosRips tbody').on('click', '.miSol', function() {

        var post_id = $(this).data('pk');
	var row = $(this).closest('tr'); // Encuentra la fila

             console.log("La fila que selecciono de COMIENZO es : " , row );

	        var data =  {}   ;
	
		var table = $('#tablaEnviosRips').DataTable();  // Inicializa el DataTable jquery 	      
  	        var rowindex = table.row(row).data(); // Obtiene los datos de la fila


	        console.log(" fila selecciona de vuelta AQUI PUEDE ESTAR EL PROBLEMA = " ,  table.row(row).data());
	        dato1 = Object.values(rowindex);
		console.log(" fila seleccionad d evuelta dato1 = ",  dato1);
	        dato3 = dato1[2];
		console.log(" fila selecciona de vuelta dato3 = ",  dato3);
	        console.log ( "dato10 empresa = " , dato3.empresa_id); 

		var id_empresa = dato3.empresa_id;  // jquery

		data['empresaId'] = id_empresa;
		data['detalleRips'] = post_id;

	        data = JSON.stringify(data);

		document.getElementById("empresaId").value = id_empresa;
		document.getElementById("envioRipsId").value = post_id;


		  table = $("#tablaDetalleRipsAdicionar").dataTable().fnDestroy();

		  initTableDetalleRipsAdicionar(data);

		table = $("#tablaDetalleRips").dataTable().fnDestroy();
	

		 initTableDetalleRips(data);         
      

  });


 $('#tablaDetalleRipsAdicionar tbody').on('click', '.miFactura', function() {

        var post_id = $(this).data('pk');
	var row = $(this).closest('tr'); // Encuentra la fila
	alert("Entre a la factura fila Nro = " + row);
        console.log("La fila que selecciono de COMIENZO es : " , row );

	var sedeSeleccionada = document.getElementById("sedeSeleccionada").value;
        var username = document.getElementById("username").value;
        var nombreSede = document.getElementById("nombreSede").value;
    	var sede = document.getElementById("sede").value;
        var username_id = document.getElementById("username_id").value;

	
	var tableA = $('#tablaEnviosRipsAdicionar').DataTable();  // Inicializa el DataTable jquery 	      
        var rowindex = tableA.row(row).data(); // Obtiene los datos de la fila
        dato1 = Object.values(row);
	console.log(" fila seleccionad dato1 = ",  dato1);
        dato3 = dato1[2];
	console.log(" fila seleccionada dato3 = ",  dato3);
        console.log ( "dato empresa = " , dato3.factura_id); 

		var empresaId = document.getElementById("empresaId").value 
		var facturaId = 40   // dato3.factura_id;  
		var envioRipsId = document.getElementById("envioRipsId").value 

		alert("facturaId = " + facturaId);

		/* Aqui va el ajax qu actualiza EL ENVIORIPS DE LA FACTURA Y crea el enviodetallerisp fila */

	$.ajax({

	        url: "/actualizarEmpresaDetalleRips/",
                data: {'facturaId':facturaId, 'empresaId':empresaId,'envioRipsId':envioRipsId, 'username_id':username_id, 	},
                type: "POST",
                dataType: 'json',
                success: function (data) {


	        var data =  {}   ;
	        data['username'] = username;
	        data['sedeSeleccionada'] = sedeSeleccionada;
	        data['nombreSede'] = nombreSede;
	        data['sede'] = sede;
	        data['username_id'] = username_id;
		data['empresaId'] = dato3['empresa_id'];
		data['detalleRips'] = post_id;
	        data = JSON.stringify(data);
		
		table = $("#tablaDetalleRipsAdicionar").dataTable().fnDestroy();
		initTableDetalleRipsAdicionar(data);
		
		table = $("#tablaDetalleRips").dataTable().fnDestroy();
		initTableDetalleRips(data);         

                },
                error: function (data) {
                        $('.success-msg').css('display','block');
                        $('.success-msg').text(data.error);
                }
            });

		/* Fin AJAX  */
      

  });




 // COMIENZA ONLOAD

window.addEventListener('load', function() {



	$('#tablaEnviosRips tbody tr:eq(0) .miSol').prop('checked', true);  // Checkprimera fila el checkbox creo solo javascript


	var table = $('#tablaEnviosRips').DataTable();  // Inicializa el DataTable jquery//
	var rowindex = table.row(0).node();  // Selecciona la primera fila jquery
        console.log("rowindex= " , rowindex);

	var id_empresa = table.row(0).cell(rowindex, 2).data();  // jquery
	var id_rips = table.row(0).cell(rowindex, 0).data();  // jquery

	alert("con empresa = " + id_empresa);	
	alert("con rips = " + id_rips);	

	var data =  {}   ;
        data['username'] = username;
       data['sedeSeleccionada'] = sedeSeleccionada;
       data['nombreSede'] = nombreSede;
      data['sede'] = sede;
        data['username_id'] = username_id;
        data['empresaId'] = id_empresa;
  data['envioRipsId'] = id_rips;

        data = JSON.stringify(data);
	document.getElementById("empresaId").value = id_empresa;
	document.getElementById("envioRipsId").value = id_rips;



	alert("envio a initTableDetalleRipsAdicionar " + data);

// hasta aquip

	initTableDetalleRipsAdicionar(data);

});

 /* FIN ONLOAD */

/*------------------------------------------
        --------------------------------------------
        Click to Button
        --------------------------------------------
        --------------------------------------------*/

function EnvioRips()
{
    
	
	
            $('#post_id').val('');
            $('#postFormCrearEnviosRips').trigger("reset");
            $('#modelHeadingEnviosRips').html("Creacion Envios Rips");
            $('#crearModelEnviosRips').modal('show');
        
}


	/*------------------------------------------
        --------------------------------------------
        Create Post Code Abonos
        --------------------------------------------
        --------------------------------------------*/

function CrearEnviosRips()
{

            $.ajax({
                data: $('#postFormEnviosRips').serialize(),
	        url: "/guardaEnviosRips/",
                type: "POST",
                dataType: 'json',
                success: function (data) {

		   $("#mensajes").html(data.message);
                  $('#postFormEnviosRips').trigger("reset");

	 	  var tableA = $('#tablaEnviosRips').DataTable();
	          tableA.ajax.reload();

 		 $('#crearModelEnviosRips').modal('hide');
                },
                error: function (data) {
                        $('.success-msg').css('display','block');
                        $('.success-msg').text(data.error);
                }
            });


}

function DetalleRips()
{
    
	
	
            $('#post_id').val('');
            $('#postFormCrearDetalleRips').trigger("reset");
            $('#modelHeadingDetalleRips').html("Detalle Envios Rips");
            $('#crearModelDetalleRips').modal('show');
        
}



function CrearDetalleRips()
{

            $.ajax({
                data: $('#postFormDetalleRips').serialize(),
	        url: "/guardaDetalleRips/",
                type: "POST",
                dataType: 'json',
                success: function (data) {

		   $("#mensajes").html(data.message);
                  $('#postFormDetalleRips').trigger("reset");

	 	  var tableA = $('#tablaDetalleRips').DataTable();
	          tableA.ajax.reload();

 		 $('#crearModelDetalleRips').modal('hide');
                },
                error: function (data) {
                        $('.success-msg').css('display','block');
                        $('.success-msg').text(data.error);
                }
            });


}

