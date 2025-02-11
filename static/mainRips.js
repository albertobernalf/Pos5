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
        detalleRips = 1;
 

        data = JSON.stringify(data);

     	initTableEnviosRips(data);	
	//initTableDetalleRipsAdicionar(data);

	// Voy a seleccionar el primer registro d ela tabla 

	var table = $('#tablaEnviosRips').DataTable();  // Inicializa el DataTable
	var primeraFila = table.row(0).node();  // Selecciona la primera fila

	// Selecciona el checkbox dentro de la primera fila (suponiendo que está dentro de una celda 'td')
	//$(primeraFila).find('td input[type="checkbox"]').prop('checked', true);  // Marca el checkbox
	// var radio = $(primeraFila).find('.radio-row');


	//alert ("radio = " + radio.prop('checked'));

	

	//$('input[name="mycheck"]').prop('checked', true);
	// aquip lo marco

	//$(primeraFila).checkbox.prop('checked', true);

	//var vale = $('input[name="mycheck"]:checked').val();
	//alert ("Este es el vale = " + vale );
        		
	// Para leer el seleccionado
	//$(primeraFila).$('input[type="radio"]').prop('checked', true);


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

  // evento para cuando se seleccione un checkbox

 $('#tablaEnviosRips tbody').on('click', '.miSol', function() {
    alert ("Entre nueva ");


    var row = $(this).closest('tr'); // Encuentra la fila
    var rowData = table.row(row).data(); // Obtiene los datos de la fila

    if ($(this).is(':checked')) {

      console.log('Fila seleccionada:', rowData);
	console.log(Object.keys(rowData));
      dato1 = Object.values(rowData);
      dato3 = dato1[2];
      dato4 = Object.values(dato3);

      alert ("first = " + dato1);
      alert ("second = " + dato1[1]);
      alert ("thrid = " + dato1[2]);

      alert ( "dato0 id = " + dato4[0]);
      alert ( "dato1 fechaEnvio = " + dato4[1]);
      alert ( "dato2 fechaRespuesta = " + dato4[2]);
      alert ( "dato3 facturas = " + dato4[3]);
      alert ( "dato4 pasaron = " + dato4[4]);
      alert ( "dato5  rechazadas = " + dato4[5]);
      alert ( "dato6  alministerio = " + dato4[6]);
      alert ( "dato7 fechaRegistro " + dato4[7]);
      alert ( "dato8 A ??= " + dato4[8]);
      alert ( "dato9 usuarioRegistro = " + dato4[9]);
      alert ( "dato10 empresa = " + dato4[10]); 
      alert ( "dato11 cereo el checkbox o sedsClinica = " + dato4[11]);  
     alert ( "dato12 Negativox = " + dato4[12]);   

    } else {
      console.log('Fila deseleccionada:', rowData);
    }
  });


	/*--------------------------------------------
        Click to Edit Button
        --------------------------------------------
        --------------------------------------------*/
        $('body').on('click', '.editPostEnviosRips', function () {

	alert ("POAQUI NO DEBO ENTRAR");


	tableA = $('#tablaEnviosRips').DataTable();
	var row = tableA.row(this).node();
	var row1 = $(this).data
	alert("this = " + JSON.stringify ($(this).data));
	alert("this = " + JSON.stringify ($(this)));
	
	alert("row = "  + row);
	// Busca el checkbox dentro de esa fila
        var checkbox = $(row).find('.checkbox-row');
	
	if (checkbox.prop('checked')) {
            console.log('Checkbox está marcado en esta fila.');
        } else {
            console.log('Checkbox NO está marcado en esta fila.');
        }

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

 // COMIENZA ONLOAD

window.addEventListener('load', function() {

	$('#tablaEnviosRips tbody tr:eq(0) .miSol').prop('checked', true);
	
	alert("Acabe de marcar la fila checkbox . Verificar ...");


	var data =  {}   ;
        data['username'] = username;
        data['sedeSeleccionada'] = sedeSeleccionada;
        data['nombreSede'] = nombreSede;
        data['sede'] = sede;
        data['username_id'] = username_id;
        data['empresaId'] = 3;
        data['detalleRips'] = 1;
        data = JSON.stringify(data);

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

// hasta aquip

	initTableDetalleRipsAdicionar(data);


	var selección = [];
	$("#tablaEnviosRips  tr td input[type='checkbox']:checked").each(function () {
	row = $(this).closest('tr');
	seleccion.push({
	    numero: row.find('td:eq(0)').text(),
	    descripción: row.find('td:eq(1)').text()
	});
	});
	console.log(selección);

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



