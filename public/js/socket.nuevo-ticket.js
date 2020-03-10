
// Comando para establecer lar conexion

var socket = io();

var label = $('#lblNuevoTicket');// cuando se va usar muchas veces un mismo elemento se realiza la referencia 

socket.on('connect',function () {
    console.log('Conectado al Server');
});

socket.on('disconnect',function () {
    console.log('Sever desconectado');
});

socket.on('estadoActual',function (resp) { 
    console.log(resp);
    label.text(resp.actual);

 })

$('button').on('click',function () { // cuando el boton sea precionado 
    
    socket.emit('siguienteTicket',null,function(siguienteTicket){
        /*emitira un evento=> primer parametro nombre del evento:
         siguienteTicket, segundo: data
         en este caso null; y por ultimo el callback donde 
        recibira  el nuevo ticket desde el server*/ 
        
        label.text(siguienteTicket);
        
    });
    
});



