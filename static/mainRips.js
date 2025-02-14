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
   	   
            columnDefs: [{

                    "render": function ( data, type, row ) {
                        var btn = '';
                         
                          btn = btn + " <input type='radio' class='miSol form-check-input ' data-pk='"  + row.pk + "'>" + "</input>";
		         //  btn = btn + " <input type='checkbox' class='generaJson form-check-input ' data-pk='"  + row.pk + "'>" + "</input>";

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


 // COMIENZA ONLOAD

window.addEventListener('load', function() {

	
	$('#tablaEnviosRips tbody tr:eq(0) .miSol').prop('checked', true);  // Checkprimera fila el checkbox creo solo javascript
	// alert("Despues de Colocar el checkbox en TablaEnviosRips");	


	var table = $('#tablaEnviosRips').DataTable();  // Inicializa el DataTable jquery//
	//alert("Despues de Referenciar TablaEnviosRips");	
	var rowindex = table.row(0).node();  // Selecciona la primera fila jquery
        console.log("rowindex= " , rowindex);


	var id_empresa = table.row(0).cell(rowindex, 2).data();  // jquery
	var id_rips = table.row(0).cell(rowindex, 0).data();  // jquery

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

	document.getElementById("empresaId1").value = id_empresa;
	document.getElementById("envioRipsId1").value = id_rips;



	// alert("envio a initTableDetalleRipsAdicionar " + data);

// hasta aquip


	  table = $("#tablaEnviosRipsAdicionar").dataTable().fnDestroy();
	initTableDetalleRipsAdicionar(data);

	 initTableDetalleRips(data);    
	initTableRipsTransaccion(data);	   
	initTableRipsUsuarios(data);  

});

 /* FIN ONLOAD */



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
		data['envioRipsId'] = post_id;

	        data = JSON.stringify(data);

		document.getElementById("empresaId").value = id_empresa;
		document.getElementById("envioRipsId").value = post_id;

		document.getElementById("empresaId1").value = id_empresa;
		document.getElementById("envioRipsId1").value = post_id;

		  table = $("#tablaDetalleRipsAdicionar").dataTable().fnDestroy();

		  initTableDetalleRipsAdicionar(data);

		

		  table = $("#tablaDetalleRips").dataTable().fnDestroy();
		
		 initTableDetalleRips(data);
         
	  table = $("#tablaRipsTransaccion").dataTable().fnDestroy();
	initTableRipsTransaccion(data);
	  table = $("#tablaRipsUsuarios").dataTable().fnDestroy();
	initTableRipsUsuarios(data);

		

  });

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
                          btn = btn + " <input type='radio'  class='miDetalle form-check-input ' data-pk='"  + row.pk + "'>" + "</input>";
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
                { data: "fields.numeroFactura_id"},
                { data: "fields.cuv"},
                { data: "fields.estadoPasoMinisterio"},
                { data: "fields.rutaJsonRespuesta"},
                { data: "fields.rutaJsonFactura"},
                { data: "fields.rutaPdf"},
                { data: "fields.rutaZip"},
		 { data: "fields.usuarioRegistro_id"},
            ]
 });
}

 $('#tablaDetalleRipsAdicionar tbody').on('click', '.miFactura', function() {

        var post_id = $(this).data('pk');
	var row = $(this).closest('tr'); // Encuentra la fila
	var sedeSeleccionada = document.getElementById("sedeSeleccionada").value;
        var username = document.getElementById("username").value;
        var nombreSede = document.getElementById("nombreSede").value;
    	var sede = document.getElementById("sede").value;
        var username_id = document.getElementById("username_id").value;
	var empresaId = document.getElementById("empresaId").value; 
	var envioRipsId = document.getElementById("envioRipsId").value ;
        var facturaId = post_id;

	$.ajax({

	        url: "/actualizarEmpresaDetalleRips/",
                data: {'facturaId':facturaId, 'empresaId':empresaId,'envioRipsId':envioRipsId, 'username_id':username_id},
                type: "POST",
                dataType: 'json',
                success: function (data2) {
	        var data =  {}   ;
	        data['username'] = username;
	        data['sedeSeleccionada'] = sedeSeleccionada;
	        data['nombreSede'] = nombreSede;
	        data['sede'] = sede;
	        data['username_id'] = username_id;
		data['empresaId'] = empresaId;
		data['envioRipsId'] = envioRipsId;
	        data = JSON.stringify(data);

		  table = $("#tablaDetalleRipsAdicionar").dataTable().fnDestroy();		
		 initTableDetalleRipsAdicionar(data);		

		
		table = $("#tablaDetalleRips").dataTable().fnDestroy();
		initTableDetalleRips(data);         
                },
                 error: function (request, status, error) {
	   			    $("#mensajes").html(" !  Reproduccion  con error !");
	   	    	}
            });

  });

 $('#tablaDetalleRips tbody').on('click', '.miDetalle', function() {
	alert ("Entre detalle Rips");
     var post_id = $(this).data('pk');

	alert("id de detalleRips = " +  post_id);
       var detalleRipsId = post_id;


	$.ajax({

	        url: "/traeDetalleRips/",
                data: {'detalleRipsId':post_id},
                type: "POST",
                dataType: 'json',
                success: function (info) {

            $('#postFormRipsDetalle').trigger("reset");

			alert("Factura" + info[0].fields.numeroFactura);
			alert("ripsEnvios_id" + info[0].fields.ripsEnvios_id);
			alert("post_id" + info[0].fields.id);

  	
 				$('#detalleRipsId').val(detalleRipsId);
				
  		        	$('#numeroFacturaT').val(info[0].fields.numeroFactura);
        	       	$('#cuv').val(info[0].fields.cuv);
	                $('#estadoPasoMinisterio').val(info[0].fields.estadoPasoMinisterio);
	                $('#rutaJsonRespuesta').val(info[0].fields.rutaJsonRespuesta);
	                $('#rutaJsonFactura').val(info[0].fields.rutaJsonFactura);
	                $('#fechaRegistro').val(info[0].fields.fechaRegistro);
	                $('#estadoReg').val(info[0].fields.estadoReg);
	                $('#ripsEnvios').val(info[0].fields.ripsEnvios_id);
	                $('#usuarioRegistro_id').val(info[0].fields.usuarioRegistro_id);
	                $('#estado').val(info[0].fields.estado);
	                $('#rutaPdf').val(info[0].fields.rutaPdf);
	                $('#rutaZip').val(info[0].fields.rutaZip);


            $('#modelHeadingRipsDetalle').html("Detalle Envios Rips");
            $('#crearModelRipsDetalle').modal('show');

                },
                 error: function (request, status, error) {
	   			    $("#mensajes").html(" !  Reproduccion  con error !");
	   	    	}
            });

alert ("Ya avri la modal");
        

  });



 $('#tablaEnvioRips tbody').on('click', '.generaJson', function() {
	alert ("Entre generar JSON");

  });


function initTableRipsTransaccion(data) {

	alert("Entre TableRipsTransaccion");
	alert ("data = " + JSON.stringify(data));

	return new DataTable('.tablaRipsTransaccion', {

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
   	   
            columnDefs: [{

                    "render": function ( data, type, row ) {
                        var btn = '';
                         
                          btn = btn + " <input type='radio' class='miTransaccion form-check-input ' data-pk='"  + row.pk + "'>" + "</input>";
                        return btn;
                    },
     
                    "targets": 8
               }
            ],	 
    
            ajax: {
                 url:"/load_tablaRipsTransaccion/" +  data,
                 type: "POST",
                 dataSrc: ""
            },
            lengthMenu: [2,3, 5, 10, 20, 30, 40, 50],
            columns: [
             	 { data: "fields.id"},
                { data: "fields.numDocumentoIdObligado"},
                { data: "fields.numNota"},
                { data: "fields.fechaRegistro"},
                { data: "fields.tipoNota_id"},
                { data: "fields.usuarioRegistro_id"},
                { data: "fields.ripsEnvio_id"},
                { data: "fields.sedesClinica_id"},
            ]

 });
}


function initTableRipsUsuarios(data) {

	alert("Entre TableRipsUsuarios");
	alert ("data = " + JSON.stringify(data));

	return new DataTable('.tablaRipsUsuarios', {

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
   	   
            columnDefs: [{

                    "render": function ( data, type, row ) {
                        var btn = '';
                         
                          btn = btn + " <input type='radio' class='miUsuarios form-check-input ' data-pk='"  + row.pk + "'>" + "</input>";
                        return btn;
                    },
     
                    "targets": 16
               }
            ],	 
    
            ajax: {
                 url:"/load_tablaRipsUsuarios/" +  data,
                 type: "POST",
                 dataSrc: ""
            },
            lengthMenu: [2,3, 5, 10, 20, 30, 40, 50],
            columns: [
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

 });
}



});  //// AQUI cierra el document.ready


	/*------------------------------------------
        --------------------------------------------
        Create GuardarDetalleRips
        --------------------------------------------
        --------------------------------------------*/


function GuardarDetalleRips()
{

            $.ajax({
                data: $('#postFormRipsDetalle').serialize(),
	        url: "/guardaDetalleRips/",
                type: "POST",
                dataType: 'json',
                success: function (data2) {
		   $("#mensajes").html(data2.message);
                  $('#postFormDetalleRips').trigger("reset");

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

		data['empresaId'] = empresaId;
		data['envioRipsId'] = envioRipsId;
	        data = JSON.stringify(data);

		  var tableA = $('#tablaDetalleRips').DataTable();
	          tableA.ajax.reload();

 		 $('#crearModelRipsDetalle').modal('hide');
                },
               error: function (request, status, error) {
	   			    $("#mensajes").html(" !  Reproduccion  con error !");
	   	    	}
            });


}



	
function CrearEnviosRips()
{


            $.ajax({
                data: $('#postFormEnviosRips').serialize(),
	        url: "/guardaEnviosRips/",
                type: "POST",
                dataType: 'json',
                success: function (data2) {
		   $("#mensajes").html(data2.message);
                  $('#postFormEnviosRips').trigger("reset");

		var data =  {}   ;
	        data['username'] = username;
	       data['sedeSeleccionada'] = sedeSeleccionada;
	       data['nombreSede'] = nombreSede;
	      data['sede'] = sede;
	        data['username_id'] = username_id;
        data = JSON.stringify(data);
	
		  var tableA = $('#tablaEnviosRips').DataTable();
	          tableA.ajax.reload();

 		 $('#crearModelEnviosRips').modal('hide');
                },
            error: function (request, status, error) {
	   			    $("#mensajes").html(" !  Reproduccion  con error !");
	   	    	}
            });


}



/*------------------------------------------
        --------------------------------------------
        EnvioRips
        --------------------------------------------
        --------------------------------------------*/

function EnvioRips()
{
    
	
	
            $('#post_id').val('');
            $('#postFormCrearEnviosRips').trigger("reset");
            $('#modelHeadingEnviosRips').html("Creacion Envios Rips");
            $('#crearModelEnviosRips').modal('show');
        
}



function GenerarJsonRips()
{

	alert("Entre Generar json Rips");
	var envioRipsId = document.getElementById("envioRipsId1").value ;

	var sedeSeleccionada = document.getElementById("sedeSeleccionada").value;
        var username = document.getElementById("username").value;
        var nombreSede = document.getElementById("nombreSede").value;
    	var sede = document.getElementById("sede").value;
	alert("sede = " + sede);

        var username_id = document.getElementById("username_id").value;

            $.ajax({

	        url: "/generarJsonRips/",
		data: {'envioRipsId':envioRipsId, 'sede':sede, 'username_id':username_id},
                type: "POST",
                dataType: 'json',
                success: function (data2) {
			alert("llegue de Gererar los JSON del Rips seleccionado");

		   $("#mensajes").html(data2.message);
                         },
               error: function (request, status, error) {
	   			    $("#mensajes").html(" !  Reproduccion  con error !");
	   	    	}
            });


}
