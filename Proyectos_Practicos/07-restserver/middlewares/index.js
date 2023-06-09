
const validaCampos = require('../middlewares/validar-campos');
const validaJWT = require('../middlewares/validar-jwt');
const validaRole = require('../middlewares/validar-role');
const validarArchivoSubir = require('../middlewares/validar-archivo')

module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validaRole,
    ...validarArchivoSubir
}

