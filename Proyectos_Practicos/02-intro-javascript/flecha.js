////// Funcion normal
// function sumar(a, b) {
//   return a + b;
// }
// console.log(sumar(5, 10));

//////Funcion de Flecha
// const sumar = (a, b = 10) => {
//   return a + b;
// };
const sumar = (a, b = 10) => a + b;
console.log(sumar(5));

const saludar = () => "Hola Mundo";
console.log(saludar());
