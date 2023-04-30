const colors = require("colors");
const fs = require("fs");

// const crearArchivo = (base = 5) => {
//   return new Promise((resolve, reject) => {

const crearArchivo = async (base = 5, listar = false, hasta = 10) => {
  try {
    let salida = "";

    for (let i = 0; i <= hasta; i++) {
      salida += `${base} ${"x".green} ${i} ${"=".grey} ${base * i} \n`;
    }

    if (listar) {
      console.log("=======================".green);
      console.log("    Tabla del :".gray, colors.blue(base));
      console.log("=======================".green);
      console.log(salida);
    }

    fs.writeFileSync(`tabla-${base}.txt`, salida);

    // resolve(`tabla-${base}.txt CREADO!!`);
    return `tabla-${base}.txt CREADO!!`;
  } catch (err) {
    throw err;
  }
};
//   });
// };

module.exports = {
  crearArchivo,
};
