const { io } = require('../server');
const {TicketControl} = require('../classes/ticket-control');


const ticketControl = new TicketControl();// creamos la nueva instancia activando el constructor 

io.on('connection', (client) => {
// recuerda io es el servidor 
        client.on('siguienteTicket',(data,callback)=>{// el nombre del evento que escucha, recibe data, ydespues el callback
            
            let siguiente = ticketControl.siguiente();// llama a la funcion siguiente de la clase control
            callback(siguiente); // y retorna en el callback el numero de ticket     
        });

        // emitir un evento estadoActual

        io.emit('estadoActual',{
            actual: ticketControl.getUltimoTicket(),
            ultimos4: ticketControl.getUltimos4()
        });

        client.on('atenderTicket',(data,callback)=>{

            if(!data.escritorio){

                return callback({
                    err:true,
                    mensaje: 'El escritorio es necesario'
                });
            }

            let atenderTicket = ticketControl.atenderTicket(data.escritorio);

            callback(atenderTicket);

            // actualizar o notificar cambios en los ultimos4

            client.broadcast.emit('ultimos4',{
                ultimos4: ticketControl.getUltimos4()
            });
        });

});