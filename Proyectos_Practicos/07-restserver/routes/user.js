const { Router } = require('express');

const {
    usuarioGet,
    usuarioPost,
    usuarioDelete,
    usuarioPath,
    usuarioPut
} = require('../controllers/user');

const router = Router();

router.get('/', usuarioGet);

router.put('/:id?', usuarioPut);

router.post('/', usuarioPost);

router.delete('/', usuarioDelete);

router.patch('/', usuarioPath);

module.exports = router;