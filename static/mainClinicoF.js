
console.log('Hola Alberto Hi!')

const form = document.getElementById('formHistoria')
const form2 = document.getElementById('formClinicos')
console.log(form)
console.log(form2)

let dataTable;
let dataTableClinicoInitialized = false;


$('.editPostar').on('click',function(event)
{
 	 alert("Entre a editPostt"); 
	 var post_id = $(this).data('pk');
          alert("pk1 = " + $(this).data('pk'));


});

function arrancaClinico(valorTabla,valorData)
{
    data = {}
    data = valorData;

    if (valorTabla == 1)
    {
        let dataTableOptionsClinico  ={
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
                          btn = btn + " <input type='radio' name='miClinico' class='form-check-input editPostClinico' data-pk='" + row.pk + "'>" + "</input>";


                       return btn;
                    },

                    "targets": 12
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
                 url:"/load_dataClinico/" +  data,
                 type: "POST",
                 dataSrc: ""
            },
            columns: [
               { data: "fields.tipoIng"},
                { data: "fields.id"},
                { data: "fields.tipoDoc"},
                { data: "fields.documento"},
                { data: "fields.nombre"},
                { data: "fields.consec"},
                { data: "fields.fechaIngreso"},
                { data: "fields.fechaSalida"},
		{ data: "fields.servicioNombreIng"},
                { data: "fields.camaNombreIng"},
                { data: "fields.dxActual"},
		{ data: "fields.salidaClinica"},
           ]
            }

		alert("AQUI VOY");

	        dataTable = $('#tablaClinico').DataTable(dataTableOptionsClinico);

				alert("AQUI llegue");



  }
}

const initDataTableClinico = async () => {
	if  (dataTableClinicoInitialized)  {
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


        arrancaClinico(1,data);
	    dataTableClinicoInitialized = true;
}

 // COMIENZA ONLOAD

window.addEventListener('load', async () => {
    await  initDataTableClinico();
	 $('#tablaClinico tbody tr:eq(0) .miClinico').prop('checked', true);  // Checkprimera fila el checkbox creo solo javascript

});


 /* FIN ONLOAD */



	/*--------------------------------------------
        Click to Edit Button
        --------------------------------------------
        --------------------------------------------*/
        $('body').on('click', '.editPostClinico', function () {
	
          var post_id = $(this).data('pk');
          alert("pk1 = " + $(this).data('pk'));

	$.ajax({
	           url: '/creacionHc/postConsultaHcli/',
	            data : {post_id:post_id},
	           type: 'POST',
	           dataType : 'json',
	  		success: function (data) {
                        alert("Regrese");
                       alert("data="  + data);
	  		  // var dato = JSON.parse(respuesta);
			 $('#pk').val(data.pk);
	       	        $('#tipoDocId').val(data.tipoDocId);
        	       	$('#nombreTipoDoc').val(data.nombreTipoDoc);
	                $('#documentoId').val(data.documentoId);
	                $('#documento2').val(data.documento);
	                $('#consec').val(data.consec);

                  },
	   		    error: function (request, status, error) {
	   			    $("#mensajes").html(" !  Reproduccion  con error !");
	   	    	}
	     });

        });

        /*------------------------------------------
        --------------------------------------------
        Print Error Msg
        --------------------------------------------
        --------------------------------------------*/
        function printErrorMsg(msg) {
            $('.error-msg').find('ul').html('');
            $('.error-msg').css('display','block');
            $.each( msg, function( key, value ) {
                $(".error-msg").find("ul").append('<li>'+value+'</li>');
            });
        }




