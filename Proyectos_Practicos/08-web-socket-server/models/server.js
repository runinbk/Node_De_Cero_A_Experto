const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        // requisitos para usar web sockets
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        // Añadir los path { url } de cada elemento
        this.paths = {}

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();

        // Configuracion de Sockets
        this.sockets();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Directorio publico
        this.app.use(express.static('public'));
        // this.app.use(express.static(path.join(__dirname, 'public')));

    }

    // Añadir las rutas que se encuentran en el path
    routes() {
        // this.app.use(this.paths.auth, require('../routes/auth'));
    }

    // Sockets
    sockets() {
        this.io.on('connection', socket => {
            console.log("Cliente conectado", socket.id);

            socket.on('disconnect', () => {
                console.log(`El cliente desconectó`, socket.id);
            })

            //Escuchar evento emitido
            socket.on('enviar-mensaje', (payload, callback) => {
                const id = 123456;
                callback(id); // Esta línea envía la respuesta al cliente
                // Aqui tambien se pueden regresar objetos
                // callback({ id, fecha: new Date().getTime() });
            });

            // socket.on('enviar-mensaje', (payload) => {
            // this.io.emit('enviar-mensaje', payload)
            // })

        });
    }

    listen() {
        // this.app.listen(this.port, () => {

        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port);
        })
    }

}

module.exports = Server;
