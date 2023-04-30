const deadpool = {
  nombre: "Wade",
  apellidos: "Winston",
  poder: "Regeneracion",
  getNombre() {
    return `${this.nombre} ${this.apellidos}: ${this.poder}`;
  },
};

// console.log(deadpool.getNombre());

// const nombre   = deadpool.nombre;
// const apellido = deadpool.apellido;
// const poder    = deadpool.poder;
// console.log(nombre, apellidos, poder);

// const { nombre, apellidos, edad = 0 } = deadpool;
// console.log(nombre, apellidos, edad);

function imprimeHeroe({ nombre, apellidos, poder, edad = 0 }) {
  nombre = "Kevin";
  console.log(nombre, apellidos, poder, edad);
}
// imprimeHeroe(deadpool);

const heroes = ["Deadpool", "Superman", "Batman"];

// const h1 = heroes[0];
// const h2 = heroes[1];
// const h3 = heroes[2];
const [, , h3] = heroes;

console.log(h3);
