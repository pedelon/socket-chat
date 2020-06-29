var socket = io();

var params = new URLSearchParams(window.location.search);
if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('el nombre y sala son necesarios');
}
var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};



socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) {
        console.log('usuarios conectados', resp);

    })

});

socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});


// Enviar información
socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});

// Escuchar información
socket.on('crearMensaje', function(mensaje) {
    console.log('Servidor:', mensaje);
});

socket.on('listaPersona', function(personas) {
    console.log(personas);
});

socket.on('mensajePrivado', function(mensaje) {

    console.log(' Mensaje Privado: ', mensaje);

});