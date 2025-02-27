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
	destroy: true,
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
                          btn = btn + "<td> <input type='radio' class='miSol form-check-input ' data-pk='"  + row.pk + "'>" + "</input> </td>";
		         //  btn = btn + " <input type='checkbox' class='generaJson form-check-input ' data-pk='"  + row.pk + "'>" + "</input>";

                        return btn;
                    },
       
                    "targets": 15
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
                { data: "fields.nombreEmpresa"},
                { data: "fields.fechaEnvio"},
                { data: "fields.fechaRespuesta"},
                { data: "fields.cantidadFacturas"},
                { data: "fields.cantidadPasaron"},
		{ data: "fields.cantidadRechazadas"},
                { data: "fields.estadoPasoMinisterio"},
		 { data: "fields.fechaRegistro"},
		 { data: "fields.usuarioRegistro_id"},
		 { data: "fields.nombreRegistra"},
		  { data: "fields.nombreClinica"},
                { data: "fields.tipoNota"},
            ]

 });
}


function initTableDetalleRipsAdicionar(data) {


	return new DataTable('.tablaDetalleRipsAdicionar', {
	destroy: true,
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
	var tipoRips = table.row(0).cell(rowindex, 14).data();  // jquery



	var data =  {}   ;
        data['username'] = username;
       data['sedeSeleccionada'] = sedeSeleccionada;
       data['nombreSede'] = nombreSede;
      data['sede'] = sede;
        data['username_id'] = username_id;
        data['empresaId'] = id_empresa;
  data['envioRipsId'] = id_rips;
  data['tipoRips'] = tipoRips;

        data = JSON.stringify(data);

	document.getElementById("empresaId").value = id_empresa;
	document.getElementById("envioRipsId").value = id_rips;
	document.getElementById("tipoRips2").value = tipoRips;

	document.getElementById("empresaId1").value = id_empresa;
	document.getElementById("envioRipsId1").value = id_rips;
	document.getElementById("tipoRips1").value = tipoRips;

	document.getElementById("empresaId3").value = id_empresa;
	document.getElementById("envioRipsId3").value = id_rips;
	document.getElementById("tipoRips3").value = tipoRips;

	// document.getElementById("envioRipsIdJ").value = id_rips;


	// alert("envio a initTableDetalleRipsAdicionar " + data);

// hasta aquip


	  table = $("#tablaEnviosRipsAdicionar").dataTable().fnDestroy();
	initTableDetalleRipsAdicionar(data);

	 initTableDetalleRips(data);    
	initTableRipsTransaccion(data);	   
	initTableRipsUsuarios(data);  
	initTableRipsProcedimientos(data); 
	initTableRipsHospitalizacion(data); 


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
		var tipoRips = dato3.tipoNota;  // jquery

		data['empresaId'] = id_empresa;
		data['envioRipsId'] = post_id;
		data['tipoRips'] = tipoRips;


	        data = JSON.stringify(data);

		document.getElementById("empresaId").value = id_empresa;
		document.getElementById("envioRipsId").value = post_id;
		document.getElementById("tipoRips2").value = tipoRips;	

		document.getElementById("empresaId1").value = id_empresa;
		document.getElementById("envioRipsId1").value = post_id;
		document.getElementById("tipoRips1").value = tipoRips;

	document.getElementById("empresaId3").value = id_empresa;
	document.getElementById("envioRipsId3").value =post_id;
	document.getElementById("tipoRips3").value = tipoRips;

		 document.getElementById("envioRipsIdJ").value = post_id;


		  table = $("#tablaDetalleRipsAdicionar").dataTable().fnDestroy();

		  initTableDetalleRipsAdicionar(data);
	

		  table = $("#tablaDetalleRips").dataTable().fnDestroy();
		 initTableDetalleRips(data);
         
	  table = $("#tablaRipsTransaccion").dataTable().fnDestroy();
		initTableRipsTransaccion(data);

	  table = $("#tablaRipsUsuarios").dataTable().fnDestroy();
		initTableRipsUsuarios(data);

	  table = $("#tablaRipsProcedimientos").dataTable().fnDestroy();
		initTableRipsProcedimientos(data);

	  table = $("#tablaRipsHospitalizacion").dataTable().fnDestroy();
		initTableRipsHospitalizacion(data);
		

  });

function initTableDetalleRips(data) {

	return new DataTable('.tablaDetalleRips', {
	destroy: true,
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
			      btn = btn + " <button class='miDetalle btn-primary ' data-pk='" + row.pk + "'>" + '<i class="fa fa-pencil"></i>' + "</button>";
                 	      btn = btn + " <button class='miJson btn-primary  ' data-action='post/" + row.pk + "/delete' data-pk='" + row.pk + "'>" + '<i class="fa fa-trash"></i>' + "</button>";


                        
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
	var tipoRips = document.getElementById("tipoRips2").value ;

        var facturaId = post_id;

	$.ajax({

	        url: "/actualizarEmpresaDetalleRips/",
                data: {'facturaId':facturaId, 'empresaId':empresaId,'envioRipsId':envioRipsId, 'username_id':username_id, 'tipoRips':tipoRips},
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
		data['tipoRips'] = tipoRips;

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

     var post_id = $(this).data('pk');


       var detalleRipsId = post_id;


	$.ajax({

	        url: "/traeDetalleRips/",
                data: {'detalleRipsId':post_id},
                type: "POST",
                dataType: 'json',
                success: function (info) {

            $('#postFormRipsDetalle').trigger("reset");





  	
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



  });


 $('#tablaDetalleRips tbody').on('click', '.miJson', function() {

	     var post_id = $(this).data('pk');
	var envioRipsId = document.getElementById("envioRipsId").value ;

	var table = $('#tablaDetalleRips').DataTable();  // Inicializa el DataTable jquery//
	
	var rowindex = table.row(0).node();  // Selecciona la primera fila jquery
       console.log("rowindex= " , rowindex);

	
	var facturaId = table.row(0).cell(rowindex, 1).data();  // jquery
       console.log("facturaId = " , facturaId );
       console.log("otra1 = " , table.row(0).cell(rowindex, 0).data() );
       console.log("otra2 = " , table.row(0).cell(rowindex, 2).data() );

      
	$.ajax({

	        url: "/traerJsonRips/",
                data: {'envioRipsId':envioRipsId,'facturaId':facturaId},
                type: "POST",
                dataType: 'json',
                success: function (info) {

            $('#postFormRipsJson').trigger("reset");

  	
 				$('#valorJson').val(info[0].fields.valorJson);
				

            $('#modelHeadingRipsJson').html("Detalle Envios Rips");
            $('#crearModelRipsJson').modal('show');

                },
                 error: function (request, status, error) {
	   			    $("#mensajes").html(" !  Reproduccion  con error !");
	   	    	}
            });
      
  });




 $('#tablaEnvioRips tbody').on('click', '.generaJson', function() {


  });


function initTableRipsTransaccion(data) {




	return new DataTable('.tablaRipsTransaccion', {
	destroy: true,
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




	return new DataTable('.tablaRipsUsuarios', {
	destroy: true,
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



function initTableRipsProcedimientos(data) {




	return new DataTable('.tablaRipsProcedimientos', {
	destroy: true,
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
                         
                          btn = btn + " <input type='radio' class='miProcedimientos form-check-input ' data-pk='"  + row.pk + "'>" + "</input>";
                        return btn;
                    },
     
                    "targets": 24
               }
            ],	 
    
            ajax: {
                 url:"/load_tablaRipsProcedimientos/" +  data,
                 type: "POST",
                 dataSrc: ""
            },
            lengthMenu: [2,3, 5, 10, 20, 30, 40, 50],
            columns: [
             	 { data: "fields.id"},
                { data: "fields.codPrestador"},
                { data: "fields.fechaInicioAtencion"},
                { data: "fields.idMIPRES"},
                { data: "fields.numAutorizacion"},
                { data: "fields.numDocumentoIdentificacion"},
                { data: "fields.vrServicio"},
                { data: "fields.valorPagoModerador"},
                { data: "fields.numFEVPagoModerador"},
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
 });
}



function initTableRipsHospitalizacion(data) {




	return new DataTable('.tablaRipsHospitalizacion', {
	destroy: true,
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
                         
                          btn = btn + " <input type='radio' class='miHospitalizacion form-check-input ' data-pk='"  + row.pk + "'>" + "</input>";
                        return btn;
                    },
     
                    "targets": 20
               }
            ],	 
    
            ajax: {
                 url:"/load_tablaRipsHospitalizacion/" +  data,
                 type: "POST",
                 dataSrc: ""
            },
            lengthMenu: [2,3, 5, 10, 20, 30, 40, 50],
            columns: [
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


	var envioRipsId = document.getElementById("envioRipsId1").value ;

	var sedeSeleccionada = document.getElementById("sedeSeleccionada").value;
        var username = document.getElementById("username").value;
        var nombreSede = document.getElementById("nombreSede").value;
    	var sede = document.getElementById("sede").value;
	var tipoRips = document.getElementById("tipoRips").value;


        var username_id = document.getElementById("username_id").value;

            $.ajax({

	        url: "/generarJsonRips/",
		data: {'envioRipsId':envioRipsId, 'sede':sede, 'username_id':username_id,'tipoRips':tipoRips},
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


function EnviarJsonRips()
{


	var envioRipsId = document.getElementById("envioRipsId3").value ;

	var sedeSeleccionada = document.getElementById("sedeSeleccionada").value;
        var username = document.getElementById("username").value;
        var nombreSede = document.getElementById("nombreSede").value;
    	var sede = document.getElementById("sede").value;
	var tipoRips = document.getElementById("tipoRips3").value;


        var username_id = document.getElementById("username_id").value;

            $.ajax({

	        url: "/enviarJsonRips/",
		data: {'envioRipsId':envioRipsId, 'sede':sede, 'username_id':username_id,'tipoRips':tipoRips},
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

function CerrarModalJson()
{

            $('#crearModelRipsJson').modal('hide');
}
