const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, isAdminRole } = require('../middlewares');
const {
    crearProducto,
    obtenerProducto,
    obtenerProductos,
    actualizarProducto,
    borrarProducto
} = require('../controllers/productos');

const { isCategoryForID, isProductForID } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/categorias
 */

// Obetener todas las categorias - publico
router.get('/', obtenerProductos)

// Obetener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(isProductForID),
    validarCampos
], obtenerProducto);

// Crear categoria - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un ID de Mongo').isMongoId(),
    check('categoria').custom(isCategoryForID),
    validarCampos
], crearProducto);

// Actualizar un registro por este id - privado - cualquier persona con un token valido
router.put('/:id', [
    validarJWT,
    // check('categoria', 'No es un ID de Mongo').isMongoId(),
    check('id').custom(isProductForID),
    validarCampos
], actualizarProducto)

// Borrar una categoria - Admin
router.delete('/:id', [
    validarJWT,
    isAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos,
    check('id').custom(isProductForID),
    validarCampos
], borrarProducto);

module.exports = router;