const { response } = require("express")

const validarArchivoSubir = (req, res = response, next) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).send({ msg: 'No hay Archivos que subir - validarArchivoSubir' });
        return;
    }

    next();

}

module.exports = {
    validarArchivoSubir
}