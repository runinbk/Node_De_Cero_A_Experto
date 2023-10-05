const socketController = (socket) => {
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

        socket.broadcast.emit('enviar-mensaje', payload)

    });

    // socket.on('enviar-mensaje', (payload) => {
    // this.io.emit('enviar-mensaje', payload)
    // })

}

module.exports = {
    socketController,
}