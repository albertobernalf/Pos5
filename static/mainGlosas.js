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
        valor=1
        liquidacionId = 1
        data['valor'] = valor;
 
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

        data = JSON.stringify(data);

     	initTableEnviosRips(data);	


function initTableGlosas(data) {

	return new DataTable('.tablaGlosas', {
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
                          btn = btn + " <input type='radio'  class='form-check-input editPostGlosas' data-pk='"  + row.pk + "'>" + "</input>";
                        return btn;
                    },
           
                    "targets": 13
               }
            ],
            ajax: {
                 url:"/load_dataGlosas/" +  data,
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
		 { data: "fields.jsonError"},
		 { data: "fields.jsonAprobado"},
		 { data: "fields.fechaRegistro"},
		 { data: "fields.usuarioRegistro_id"},


            ]

 });


}

});  //// AQUI cierra el document.ready

/*------------------------------------------
        --------------------------------------------
        Click to Button
        --------------------------------------------
        --------------------------------------------*/

function Glosas()
{
    
	
	
            $('#post_id').val('');
            $('#postFormCrearGlosas').trigger("reset");
            $('#modelHeadingGlosas').html("Creacion Glosas");
            $('#crearModelGlosas').modal('show');
        
}


	/*------------------------------------------
        --------------------------------------------
        Create Post Code Abonos
        --------------------------------------------
        --------------------------------------------*/

function CrearGlosas()
{

            $.ajax({
                data: $('#postFormGlosas').serialize(),
	        url: "/guardaGlosas/",
                type: "POST",
                dataType: 'json',
                success: function (data) {

		   $("#mensajes").html(data.message);
                  $('#postFormGlosas').trigger("reset");

	 	  var tableA = $('#tablaGlosas').DataTable();
	          tableA.ajax.reload();

 		 $('#crearModelGlosas').modal('hide');
                },
                error: function (data) {
                        $('.success-msg').css('display','block');
                        $('.success-msg').text(data.error);
                }
            });


}



