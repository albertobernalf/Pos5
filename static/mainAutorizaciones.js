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

	table = $("#tablaAutorizaciones").dataTable().fnDestroy();
		
	 initTableAutorizacionesDetalle(data); 
	var table = $('#tablaAutorizaciones').DataTable();  // Inicializa el DataTable jquery//


	var rowindex = table.row(0).node();  // Selecciona la primera fila jquery
        console.log("rowindex= " , rowindex);


	var data =  {}   ;
        data['username'] = username;
	       data['sedeSeleccionada'] = sedeSeleccionada;
	       data['nombreSede'] = nombreSede;
	      data['sede'] = sede;
	        data['username_id'] = username_id;
	   

	        data = JSON.stringify(data);



	 initTableAutorizacionesDetalle(data);    

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

		data['empresaId'] = id_empresa;
		data['envioRipsId'] = post_id;
		data['tipoRips'] = tipoRips;


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
			      btn = btn + " <button class='miDetalle btn-primary ' data-pk='" + row.pk + "'>" + '<i class="fa fa-pencil"></i>' + "</button>";
                        
                        return btn;
                    },
           
                    "targets": 9
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
                { data: "fields.clinicoExamenes_id"},
                { data: "fields.cums_id"},
                { data: "fields.autorizado"},
                { data: "fields.cantidadSolicitada"},
                { data: "fields.cantidadAutorizada"},
                { data: "fields.valorSolicitado"},
                { data: "fields.valorAutorizado"},
		 { data: "fields.usuarioRegistro_id"},
            ]
 });
}


initTableAutorizaciones(data);	


});  //// AQUI cierra el document.ready




	
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




function CerrarModalJson()
{

            $('#crearModelRipsJson').modal('hide');
}
