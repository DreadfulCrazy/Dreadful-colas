
var socket = io();

var searchParams = new URLSearchParams(window.location.search);


if(!searchParams.has('escritorio')){

    window.location = 'index.html';// si la condicion no es verdad se va a salir de la pantalla e ira a index
    throw new Error('El escritorio es necesario');

}

var escritorio = searchParams.get('escritorio');
var label = $ ('small');
console.log(escritorio);

$('h1').text('Escritorio ' + escritorio);

$('button').on('click',function () {
   
    socket.emit('atenderTicket',{escritorio: escritorio}, function (resp) {
        
        if(resp=== 'No hay tickets'){
            label.text('No hay mas tickets por atender          ')
            alert(resp);
            return;
        }
        label.text('Ticket ' + resp.numero);
    });
});