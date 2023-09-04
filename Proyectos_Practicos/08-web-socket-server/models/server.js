const express = require('express');
const cors = require('cors');
const { socketController } = require('../controllers/sockets');

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
        this.io.on('connection', socketController);
    }

    listen() {
        // this.app.listen(this.port, () => {

        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port);
        })
    }

}

module.exports = Server;
