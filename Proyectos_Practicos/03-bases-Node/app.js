// const { argv } = require("process");
const { crearArchivo } = require("./helpers/multiplicar");
const colors = require("colors");
const argv = require("./config/yargs");

console.clear();

// console.log(process.argv);
console.log(argv);

crearArchivo(argv.b, argv.l, argv.h)
  .then((nombreArchivo) => console.log(nombreArchivo.rainbow, "creado"))
  .catch((err) => console.log(err));

// console.log("base: yargs", argv.b);

// const [, , arg3 = "base=5"] = process.argv;
// const [, base = 5] = arg3.split("=");

// const base = 4;

// crearArchivo(base)
//   .then((npmbreArchivo) => console.log(npmbreArchivo, "Creado"))
//   .catch((err) => console.log(err));
