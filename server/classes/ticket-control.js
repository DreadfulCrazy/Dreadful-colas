const fs = require('fs')

class Ticket {

    constructor(numero,escritorio){

        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor(){ // con este al realizar: ticketControl = new TicketControl===> crearia una nueva instancia llamando a este constructor

        this.ultimo = 0;
        this.hoy = new Date().getDate();

        this.tickets =[];// 3contendra todos los tickets por atender
        this.ultimos4 = [];
        let data = require('../data/data.json');
        
        if(data.hoy===this.hoy){
            this.ultimo = data.ultimo;
            this.tickets = data.tickets; // 3para que guarde esos tickets por atender 
            this.ultimos4 = data.ultimos4;
        }else{
            this.reiniciarConteo()
        }
    }


    reiniciarConteo(){// metodo de la calse 
         this.ultimo = 0;
         this.tickets = [];//tickets por atender
         this.ultimos4 = [];// tickets que estan siendo atendidos
         console.log('Se ha inicializado sistema');
         this.grabarArchivo();
        
    }

    siguiente(){    
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo,null);// llamamos la instancia

        this.tickets.push(ticket);// 3aqui ingresamos los tickets al array

        this.grabarArchivo();// lo graba primero para luego mostrarlo 

        return `Ticket ${ this.ultimo}`;
    }

    getUltimoTicket(){

        return `Ticket ${ this.ultimo}`; 
    }

    getUltimos4(){

        return this.ultimos4;
    }

    atenderTicket(escritorio){

        if(this.tickets.length === 0){
            return 'No hay tickets';
        }

        let numeroTicket = this.tickets[0].numero;// eliminar la referencia por objeto 

        this.tickets.shift(); // elimina la primera posicion del arreglo 

        let atenderTicket = new Ticket(numeroTicket,escritorio);// tickt que atendera 

        this.ultimos4.unshift(atenderTicket);// agregar el ticket al inicio del arreglo

        if(this.ultimos4.length > 4){// solo 4 tickets por arreglo
            this.ultimos4.splice(-1,1);// borra el ultimo del arreglo
        }

        console.log('ultimos4');
        console.log(this.ultimos4);

        this.grabarArchivo();

        return atenderTicket; 
    }

    grabarArchivo(){

        let jsonData={
            ultimo:this.ultimo,// se usa this porque esta llamando la propiedad perteneciente a esta clase
            hoy: this.hoy,
            tickets: this.tickets,// 3grabamos el array de tickets
            ultimos4 : this.ultimos4
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json',jsonDataString);// Recuerda que esta funcion es para escribir en el json 


    }

}

module.exports = {
    TicketControl
}