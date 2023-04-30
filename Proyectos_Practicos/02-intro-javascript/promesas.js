const empleados = [
  {
    id: 1,
    nombre: "Fernando",
  },
  {
    id: 2,
    nombre: "Linda",
  },
  {
    id: 3,
    nombre: "Karen",
  },
];

const salarios = [
  {
    id: 1,
    salario: 1000,
  },
  {
    id: 2,
    salario: 1500,
  },
];

const getEmpleado = (id) => {
  return new Promise((resolve, reject) => {
    const empleado = empleados.find((e) => e.id === id)?.nombre;
    empleado ? resolve(empleado) : reject(`No existe empleado con el id ${id}`);
  });
};

const getSalario = (id) => {
  return new Promise((resolve, reject) => {
    const salario = salarios.find((s) => s.id === id)?.salario;
    salario ? resolve(salario) : reject(`No existe el salario con el id ${id}`);
  });
};

const id = 2;

// getEmpleado(id)
//   .then((empleados) => console.log(empleados))
//   .catch((err) => console.log(err));

// getSalario(id)
//   .then((salarios) => console.log(salarios))
//   .catch((err) => console.log(err));

// getEmpleado(id)
//   .then((empleados) => {
//     getSalario(id)
//       .then((salarios) => {
//         console.log(
//           "El empleado: ",
//           empleados,
//           ", tiene una salario de: ",
//           salarios
//         );
//       })
//       .catch((err) => console.log(err));
//   })
//   .catch((err) => console.log(err));

let nombre;

getEmpleado(id)
  .then((empleado) => {
    nombre = empleado;
    return getSalario(id);
  })
  .then((salario) =>
    console.log("El empleado:", nombre, ", tiene un salario de:", salario)
  )
  .catch((err) => console.log(err));
