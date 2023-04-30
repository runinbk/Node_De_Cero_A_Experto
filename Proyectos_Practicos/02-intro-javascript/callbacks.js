////No es más que una función que se va a ejecutar después en cierto punto del tiempo.

// setTimeout( () => {
//     console.log('Hola Mundo');
// } , 1000 );

// const getUsuarioByID = (id) => {
//   const user = {
//     id,
//     nombre: "Fernando",
//   };
//   setTimeout(() => {
//     console.log(user);
//   }, 1500);
// };

const getUsuarioByID = (id, callback) => {
  const user = {
    id,
    nombre: "Kevin",
  };

  setTimeout(() => {
    callback(user);
  }, 1500);
};

getUsuarioByID(10, (usuario) => {
  console.log(usuario.id);
  console.log(usuario.nombre.toUpperCase());
});

//La cosa esta de que los callbacks no son más que una función que se manda como argumento.
