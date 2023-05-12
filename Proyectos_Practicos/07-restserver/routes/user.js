const { Router } = require('express');
const { check } = require('express-validator');

const {
    usuarioGet,
    usuarioPost,
    usuarioDelete,
    usuarioPath,
    usuarioPut
} = require('../controllers/user');

const {
    validarCampos,
    validarJWT,
    isAdminRole,
    haveRole
} = require('../middlewares')
// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { isAdminRole, haveRole } = require('../middlewares/validar-role');

const { isRoleValue, isEmailExist, isUserForID } = require('../helpers/db-validators');

const router = Router();

router.get('/', usuarioGet);

router.put('/:id?', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(isUserForID),
    check('role').custom(isRoleValue),
    validarCampos
], usuarioPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser de mas de  letras').isLength({ min: 6 }),
    check('correo').custom(isEmailExist),
    // check('role', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(isRoleValue),
    validarCampos
], usuarioPost);

router.delete('/:id?', [
    validarJWT,
    // isAdminRole,
    haveRole('ADMIN_ROLE', 'SALES_ROLE', 'USER_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(isUserForID),
    validarCampos
], usuarioDelete);

router.patch('/', usuarioPath);

module.exports = router;