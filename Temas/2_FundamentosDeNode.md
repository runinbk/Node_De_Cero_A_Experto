# Fundamentos de Node

---

## Temas Puntuales de la Seccion

### La sección se enfoca en los siguientes temas:

- ¿Por qué es tan popular Node?
- ¿Qué es blocking y non-blocking I/O?
- Realizar nuestro primer programa de Node
- Comprender como es que Node resuelve los procesos síncronos y asíncronos
- Comprender el ciclo de vida de un proceso en Node

---

## Preguntas Comunes sobre Node

### ¿ Que es Node ?

Piensen en JavaScript el que ustedes conocen y ejecutan en el navegador web, pero llegan Node y lo eleva al nivel de poderlo ejecutar desde el lado del servidor y ya no únicamente en la máquina del cliente lo que lo vuelve un lenguaje de backEnd.

Nos da acceso al sistema de archivos del equipo información sobre el sistema operativo, procesos que está ejecutando la computadora y Node corre sobre el motor B8 de Google que resumiendo el B8 es un engen de JavaScript de alto desempeño que está escrito en C++, el mismo que usa Google Chrome y trabaja traduciendo el código que escribimos de JavaScript al lenguaje de máquina.

Y esto lo hace tan eficiente que por eso no es sorprendentemente rápido.

### ¿ Que puedo hacer Con Node ?

Estos son ciertos ejemplos, a lo largo del curso haremos estos y aún más cosas.

Por ejemplo:

- Uso de sockets para una comunicación real cliente, servidor, servidor, cliente, algo muy parecido a un chat o lo que hace Facebook, por ejemplo, que cuando alguien te taconea en algo, o sea, alguien te dice ay, mira Fernando, esta foto te podría interesar inmediatamente ustedes son notificados y a la vez cuando ustedes responden, la otra persona también recibe notificaciones en tiempo real.

- Manejo de archivos o mejor dicho, el foil envió un equipo, también podemos trabajar con cargas simultáneas, imagínense que una persona suba 10 es archivos, en el momento en que un archivo se sube, ustedes inmediatamente pueden empezar a ejecutar algún tipo de trabajo sin esperar que los otros nueve archivos se terminen de subir.

- Servidores locales y remotos con información en tiempo real, conexiones a base de datos.

- Creación de servicios REST en segundos, Node es súper popular, especialmente la librería de Express, que también la usaremos acá para crear nuestras propias APIs o servicios que pueden ser consumidos por cualquier persona a nivel mundial, ya sea por una aplicación móvil, una aplicación de escritorio, ámbas o bien cualquier petición de otros servidores hacia nuestro servidor.

### ¿ Por que Node es tan popular ?

- Entradas y salidas no realizan bloqueos del servidor.

- Es sumamente rápido y fácil de configurar.

- Actualmente existen más de cuatrocientos setenta mil paquetes disponibles, es el ecosistema de librerías open source más grande del mundo.

- Si ustedes saben JavaScript, ya conocen la mayor parte de Node.

---

## node-blocking-vs-non-blocking

Un pequeño demo para explicar la diferencia

Esto es parte de mi curso de Node: de cero a experto que puedes encontrar aquí

Class `usuarios/usuarios.js` :

```js
const getUsuarioSync = (id) => {
  const startPoint = new Date().getTime();
  while (new Date().getTime() - startPoint <= 3000) {
    // Esperando...
    // Haciendo fetch de base de datos...
    // Robando datos de facebook...
  }

  return {
    id,
    nombre: `Usuario ${id}`,
  };
};

const getUsuario = (id, callback) => {
  const usuario = {
    id,
    nombre: `Usuario ${id}`,
  };

  setTimeout(() => {
    callback(usuario);
  }, 3000);
};

module.exports = {
  getUsuario,
  getUsuarioSync,
};
```

Class `app-blocking.js`

```js
const { getUsuarioSync } = require("./usuarios/usuarios");

console.log("Inicio de programa");
console.time("inicio");

const usuario1 = getUsuarioSync(1);
console.log("Usuario 1:", usuario1);

const usuario2 = getUsuarioSync(2);
console.log("Usuario 2:", usuario2);

console.log("Fin de programa");
console.timeEnd("inicio");
```

Class `app-non-blocking.js`

```js
const { getUsuario } = require("./usuarios/usuarios");

console.log("Inicio de programa");
console.time("inicio");

getUsuario(1, (usuario) => {
  console.log("Usuario 1:", usuario);
});

getUsuario(2, (usuario) => {
  console.log("Usuario 2:", usuario);
  console.timeEnd("inicio");
});

console.log("Fin de programa");
```

¿Cuál es la diferencia?

Pues básicamente es el código que se encuentra aquí adentro, que no es el mejor ejemplo del mundo, pero esto ejemplifica lo que es una instrucción que esté bloqueando como un ciclo while.

El ciclo while va a estar bloqueando al azar, bloqueando porque está haciendo procedimientos hasta

que se cumple esta condición del tiempo 3 segundos, y aquí lo que nosotros tenemos es exactamente el mismo ejercicio.

Note que tengo un centimo de 3 segundos, es exactamente la misma cantidad que tenemos acá.
Pero mi código demoró mucho menos en ejecutarse nuevamente.
Voy a hacer inicio de programa, fin de programa y ambos resultados ya los tenemos de manera simultánea.
Eventualmente nosotros tenemos que estar trabajando de manera no bloqueante para aprovechar en máximo poder que tiene out y en general casi cualquier lenguaje de programación.
Deberíamos de hacerlo de esta manera.

Pero hay algo interesante aquí, hay muchas formas de trabajar estas instrucciones, no bloqueantes, pero realmente no. No es que empieza a crear diferentes hilos, no es que hay diferentes o maneja diferentes ámbitos de otras formas.
