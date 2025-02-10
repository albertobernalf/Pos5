var $ = jQuery;
console.log('Hola Alberto Hi!')

$(document).ready(function () {

	var sedeSeleccionada = document.getElementById("sedeSeleccionada").value;
        var username = document.getElementById("username").value;
        var nombreSede = document.getElementById("nombreSede").value;
    	var sede = document.getElementById("sede").value;
        var username_id = document.getElementById("username_id").value;

	document.getElementById("empresaId").value = 3;
         

        var data =  {}   ;

        data['username'] = username;
        data['sedeSeleccionada'] = sedeSeleccionada;
        data['nombreSede'] = nombreSede;
        data['sede'] = sede;
        data['username_id'] = username_id;
        valor=1;
        empresaId = 3;

	// Voy a seleccionar el primer registro d ela tabla 

	$('#tablaEnviosRips tr').eq(1).addClass('selected');
        
        detalleRips = 1;
 
	// fecha actual
	let fecha = new Date();

	ano = fecha.getFullYear();
	mes = fecha.getMonth() + 1;
	dia = fecha.getDate();
        diaDesde = '01'

        desdeFecha = ano + '-' + mes + '-' + diaDesde + ' 00:00:00'
        hastaFecha = ano + '-' + mes + '-' + dia + ' 23:59:59'
	//alert("desdefecha1 = "+ desdeFecha);
	// alert("hastafecha1 = "+ hastaFecha);
        desdeFactura=0;
        hastaFactura=0;

	data['desdeFecha'] = desdeFecha;
	data['hastaFecha'] = hastaFecha;
	data['desdeFactura'] = desdeFactura;
	data['hastaFactura'] = hastaFactura;
	data['bandera'] = 'Por Fecha';
	data['empresaId'] = empresaId;
	data['detalleRips'] = detalleRips;


        data = JSON.stringify(data);

     	initTableEnviosRips(data);	
	initTableDetalleRipsAdicionar(data);


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
   	    "select": {
	        "style": 'os',
	        "selector": 'td:first-child'
	    },


	   
            columnDefs: [
                {
                    "render": function ( data, type, row ) {
                        var btn = '';
                          btn = btn + " <input type='radio'   class='form-check-input editPostEnviosRips' data-pk='"  + row.pk + "'>" + "</input>";
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



	/*--------------------------------------------
        Click to Edit Button
        --------------------------------------------
        --------------------------------------------*/
        $('body').on('click', '.editPostEnviosRips', function () {

          var post_id = $(this).data('pk');
       alert("edito Envios Rips pk1 = " + $(this).data('pk'));

	var sedeSeleccionada = document.getElementById("sedeSeleccionada").value;
        var username = document.getElementById("username").value;
        var nombreSede = document.getElementById("nombreSede").value;
    	var sede = document.getElementById("sede").value;
        var username_id = document.getElementById("username_id").value;

	//// Aqui el ajax que trae el codigo de la empresa

            $.ajax({

	        url: "/buscaEmpresaRips/",
                data: {'envioRips':post_id},
                type: "POST",
                dataType: 'json',
                success: function (data) {
                		dato1 = data[0];
                         dato2 = dato1;
		         dato3 = dato2['fields']
			alert( "dato3 empresa =  " +	 dato3['empresa_id']);

		document.getElementById("empresaId").value = dato3['empresa_id'];


	        var data =  {}   ;
	        data['username'] = username;
	        data['sedeSeleccionada'] = sedeSeleccionada;
	        data['nombreSede'] = nombreSede;
	        data['sede'] = sede;
	        data['username_id'] = username_id;
		data['empresaId'] = dato3['empresa_id'];
		data['detalleRips'] = post_id;
	        data = JSON.stringify(data);

		initTableDetalleRipsAdicionar(data);
		
		initTableDetalleRips(data);         

                },
                error: function (data) {
                        $('.success-msg').css('display','block');
                        $('.success-msg').text(data.error);
                }
            });

	// fin ajax         



        });


// Aqui tabla Detalle Rips

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


// Aqui tabla Detalle Rips Adicionar

function initTableDetalleRipsAdicionar(data) {
	
	alert("tablaDetalleRipsAdicionar. Suerte");

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
                          btn = btn + " <input type='radio'  class='form-check-input editPostDetalleRipsAdicionar' data-pk='"  + row.pk + "'>" + "</input>";
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


});  //// AQUI cierra el document.ready


// Aquip la funtion del Datatable EnvosRisp




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
