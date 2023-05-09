const { response } = require('express');

const usuarioGet = (req, res = response) => {

    const { q, nombre = "no name", apikey, page, limit } = req.query;

    res.json({
        msg: 'get API',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const usuarioPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put API',
        id
    });
}

const usuarioPost = (req, res = response) => {

    const { nombre, edad } = req.body;

    res.json({
        msg: 'post API',
        nombre,
        edad
    });
}

const usuarioDelete = (req, res = response) => {
    res.json({
        msg: 'delete API'
    });
}

const usuarioPath = (req, res = response) => {
    res.json({
        msg: 'patch API'
    })
}

module.exports = {
    usuarioGet,
    usuarioPut,
    usuarioPost,
    usuarioDelete,
    usuarioPath
}