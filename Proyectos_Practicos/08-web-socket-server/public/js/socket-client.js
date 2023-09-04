// Referencias de HTML
const Online = document.querySelector('#Online');
const Offline = document.querySelector('#Offline');
const txtMessaje = document.querySelector('#txtMessaje');
const btnSend = document.querySelector('#btnSend');

const socket = io();

// Listeners : observables que estan escuchando eventos

socket.on('connect', () => {
    // console.log("Cliente conectado");

    Offline.style.display = 'none';
    Online.style.display = '';
});
socket.on('disconnect', () => {
    // console.log(`El cliente desconectó`);

    Online.style.display = 'none';
    Offline.style.display = '';
});

socket.on('enviar-mensaje', (payload) => {
    console.log(payload);
})

// Emitir evento
btnSend.addEventListener('click', () => {
    const mensaje = txtMessaje.value;
    const payload = {
        mensaje,
        id: '123ABC',
        fecha: new Date().getTime()
    };

    // socket.emit('enviar-mensaje', (payload));

    socket.emit('enviar-mensaje', payload, (id) => {
        console.log('Desde el server', id);
    });

})