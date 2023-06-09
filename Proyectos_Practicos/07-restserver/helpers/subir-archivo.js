const path = require('path');
const { v4: uuidv4 } = require('uuid')

const extensionesDefault = ['png', 'jpg', 'jpeg', 'gif'];

const subirArchivo = (files, extensionesValidas = extensionesDefault, carpeta = "") => {

    return new Promise((resolve, reject) => {
        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];

        // Validar la extension
        const exensionesValidas = extensionesValidas;
        if (!exensionesValidas.includes(extension)) {
            return reject(`La extension ${extension} no es permitida. Las extensiones pemitidas son : ${exensionesValidas}`);
        }

        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }

            resolve(nombreTemp);
        });
    })

}

module.exports = {
    subirArchivo
}