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
	

function initTableAutorizaciones(data) {

	return new DataTable('.tablaAutorizaciones', {
		
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
                          btn = btn + "<td> <input type='radio' class='miAutorizacion form-check-input ' data-pk='"  + row.pk + "'>" + "</input> </td>";

                        return btn;
                    },
       
                    "targets": 18
               }
            ],	 
    
            ajax: {
                 url:"/load_dataAutorizaciones/" +  data,
                 type: "POST",
                 dataSrc: ""
            },
            lengthMenu: [2,3, 5, 10, 20, 30, 40, 50],
            columns: [
                { data: "fields.id"},
                { data: "fields.sedesClinica_id"},
                { data: "fields.sede"},
                { data: "fields.paciente"},
                { data: "fields.folio"},
                { data: "fields.fechaSolicitud"},
                { data: "fields.justificacion"},
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

 });
}


 // COMIENZA ONLOAD

window.addEventListener('load', function() {
	
	$('#tablaAutorizaciones tbody tr:eq(0) .miAutorizacion').prop('checked', true);  // Checkprimera fila el checkbox creo solo javascript

	// table = $("#tablaAutorizaciones").dataTable().fnDestroy();

	var sedeSeleccionada = document.getElementById("sedeSeleccionada").value;
        var username = document.getElementById("username").value;
        var nombreSede = document.getElementById("nombreSede").value;
    	var sede = document.getElementById("sede").value;
        var username_id = document.getElementById("username_id").value;

	var table = $('#tablaAutorizaciones').DataTable();  // Inicializa el DataTable jquery//

	alert("aqui voy0");

	var rowindex = table.row(0).node();  // Selecciona la primera fila jquery
        console.log("rowindex= " , rowindex);

	alert("aqui voy1");
	var autorizacionId = table.row(0).cell(rowindex, 0).data();  // jquery
	alert("aqui voy2");

	var data =  {}   ;
        data['username'] = username;
       data['sedeSeleccionada'] = sedeSeleccionada;
       data['nombreSede'] = nombreSede;
      data['sede'] = sede;
        data['username_id'] = username_id;
	 data['autorizacionId'] = autorizacionId;

	alert ("Envio al detalle de aut = " + autorizacionId);
 
	        data = JSON.stringify(data);
alert("aqui voy3");


	 initTableAutorizacionesDetalle(data);    
alert("aqui voy4");


});

 /* FIN ONLOAD */



 $('#tablaAutorizaciones tbody').on('click', '.miAutorizacion', function() {

        var post_id = $(this).data('pk');
	var row = $(this).closest('tr'); // Encuentra la fila

             console.log("La fila que selecciono de COMIENZO es : " , row );

	        var data =  {}   ;

		var table = $('#tablaAutorizaciones').DataTable();  // Inicializa el DataTable jquery 	      

  	        var rowindex = table.row(row).data(); // Obtiene los datos de la fila


	        console.log(" fila selecciona de vuelta AQUI PUEDE ESTAR EL PROBLEMA = " ,  table.row(row).data());
	        dato1 = Object.values(rowindex);
		console.log(" fila seleccionad d evuelta dato1 = ",  dato1);
	        dato3 = dato1[2];
		console.log(" fila selecciona de vuelta dato3 = ",  dato3);
	        console.log ( "dato10 empresa = " , dato3.empresa_id); 

		var id_empresa = dato3.empresa_id;  // jquery
		var tipoRips = dato3.tipoNota;  // jquery


		


	        data = JSON.stringify(data);

		

  });


function initTableAutorizacionesDetalle(data) {

	return new DataTable('.tablaAutorizacionesDetalle', {
	
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
			      btn = btn + " <button class='miAutorizacionDetalle btn-primary ' data-pk='" + row.pk + "'>" + '<i class="fa fa-pencil"></i>' + "</button>";
                        
                        return btn;
                    },
           
                    "targets": 8
               }
            ],
            ajax: {
                 url:"/load_dataAutorizacionesDetalle/" +  data,
                 type: "POST",
                dataSrc: ""
            },

            lengthMenu: [2,3, 5, 10, 20, 30, 40, 50],
            columns: [

		{ data: "fields.id"},
                { data: "fields.tipoExamen"},
                { data: "fields.examen"},
                { data: "fields.cantidadSolicitada"},
                { data: "fields.cantidadAutorizada"},
                { data: "fields.valorSolicitado"},
                { data: "fields.valorAutorizado"},
                { data: "fields.autorizado"},
            ]
 });
}

 $('#tablaAutorizacionesDetalle tbody').on('click', '.miAutorizacionDetalle', function() {

        var post_id = $(this).data('pk');
	var row = $(this).closest('tr'); // Encuentra la fila

	alert ("Entre a leer Aut Detalle");

	var sedeSeleccionada = document.getElementById("sedeSeleccionada").value;
        var username = document.getElementById("username").value;
        var nombreSede = document.getElementById("nombreSede").value;
    	var sede = document.getElementById("sede").value;
        var username_id = document.getElementById("username_id").value;

	 document.getElementById("autorizacionDetalleId").value = post_id;


	var autorizacionDetalleId = post_id; 

	$.ajax({

	        url: "/leerDetalleAutorizacion/",
                data: {'autorizacionDetalleId':autorizacionDetalleId},
                type: "POST",
                dataType: 'json',
                success: function (info) {



 				$('#estadoAutorizacion').val(info[0].fields.estadoAutorizacion_id);
				
  		        	$('#numeroAutorizacion').val(info[0].fields.numeroAutorizacion);
        	       	$('#nombreExamen').val(info[0].fields.examenes_id);
	                $('#cantidadSolicitada').val(info[0].fields.cantidadSolicitada);
	                $('#cantidadAutorizada').val(info[0].fields.cantidadAutorizada);
	                $('#valorSolicitado').val(info[0].fields.valorSolicitado);
	                $('#valorAutorizado').val(info[0].fields.valorAutorizado);
	                $('#fechaRegistro').val(info[0].fields.fechaRegistro);



	        var data =  {}   ;
	        data['username'] = username;
	        data['sedeSeleccionada'] = sedeSeleccionada;
	        data['nombreSede'] = nombreSede;
	        data['sede'] = sede;
	        data['username_id'] = username_id;

	        data = JSON.stringify(data);

		 // table = $("#tablaAutorizaciones").dataTable().fnDestroy();		
		 initTableAutorizaciones(data);		
		
		 // table = $("#tablaAutorizacionesDetalle").dataTable().fnDestroy();
		initTableAutorizacionesDetalle(data);        

         	   $('#modelHeadingAutorizacionesDetalle').html("Detalle Autorizaciones");
 		 $('#crearModelAutorizacionesDetalle').modal('show');


                },
                 error: function (request, status, error) {
	   			    $("#mensajes").html(" !  Reproduccion  con error !");
	   	    	}
            });

  });



initTableAutorizaciones(data);	

// 	var table = $('#tablaAutorizaciones').DataTable();  // Inicializa el DataTable jquery//




});  //// AQUI cierra el document.ready






	
function ActualizarAut()
{
		alert("Entre ActualizarAut");


            $.ajax({
                data: $('#postFormAutorizacionesDetalle').serialize(),
	        url: "/actualizarAutorizacionDetalle/",
                type: "POST",
                dataType: 'json',
                success: function (data2) {
		   $("#mensajes").html(data2.message);
                  $('#postFormAutorizacionesDetalle').trigger("reset");

		var data =  {}   ;
	        data['username'] = username;
	       	data['sedeSeleccionada'] = sedeSeleccionada;
	       	data['nombreSede'] = nombreSede;
	      	data['sede'] = sede;
	        data['username_id'] = username_id;
       		data = JSON.stringify(data);
	
		  var tableA = $('#tablaAutorizacionesDetalle').DataTable();
	          tableA.ajax.reload();

 		 $('#crearModelAutorizacionesDetalle').modal('hide');
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
