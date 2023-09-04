# Sockets : Fundamentos

## 1. Indice

- []()
- []()
- []()
- []()

## 2. Temas Puntuales

Aquí cubriremos varios temas como:

- Introducción a los sockets
- Resolver preguntas comunes sobre los sockets
- Instalación de Socket.io
- Detectar conexiones y desconexiones de usuarios
- Emitir mensajes cliente servidor / servidor cliente
- Escuchar los mensajes servidor cliente / cliente servidor
- Broadcast
- Callbacks en los sockets
- Pruebas en Heroku

## 3. ¿Que son los Sockets y para que nos pueden servir?

Un socket es un punto final de un canal de comunicación bidireccional entre dos programas que se ejecutan en la misma o en diferentes computadoras. Los socket se utilizan para la comunicación entre procesos (IPC) en redes informáticas.

Los socket se utilizan para una variedad de propósitos, que incluyen:

- Transferencia de archivos
- Llamadas de procedimiento remoto
- Juegos de red
- Charla en tiempo real
- Buscando en la web

Los sockets generalmente se implementan mediante la API de sockets de Berkeley, que es un conjunto de llamadas al sistema que proporciona una interfaz para la pila de protocolos de red subyacente.

La API de sockets de Berkeley está disponible en la mayoría de los sistemas operativos similares a Unix, así como en Windows.

Los sockets se pueden usar para crear conexiones TCP y UDP. Las conexiones TCP son confiables, ya que se garantiza que los datos se entregarán en el orden en que se enviaron. Las conexiones UDP no son confiables, ya que los datos pueden perderse o entregarse fuera de servicio.

Los sockets son una poderosa herramienta para la comunicación entre procesos. Se pueden usar para crear conexiones confiables y eficientes entre programas que se ejecutan en la misma o en diferentes computadoras.

## 4. Socket.io

`Socket.io` no es la tecnologia de sockets, es mas bien una implementacion de Sockets ya lista para utilizarse, asi como uno puede implementar desde cero su rest server pero tambien puede utilizar Express.

```bash
npm i socket.io # Comando para descargar la libreria a travez de nmp
```
