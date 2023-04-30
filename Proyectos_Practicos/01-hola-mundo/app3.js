console.log("Inicio del Programa"); //1

setTimeout(() => {
  console.log("Primer TimeOut"); //5
}, 3000);

setTimeout(() => {
  console.log("Segundo TimeOut"); //5
}, 0);

setTimeout(() => {
  console.log("Tercer TimeOut"); //5
}, 0);

console.log("Fin de Programa!!!");
