const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { isEmailExist } = require('../helpers/db-validators');

const usuarioGet = async (req, res = response) => {

    const { limit = 5, desde = 0 } = req.query;
    const query = { state: true };

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(desde))
            .limit(Number(limit))
    ])

    res.json({
        // resp
        total,
        users
    });
}

const usuarioPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // TODO validar contra base de Datos
    if (password) {
        // Encriptar la contraseña 
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const user = await User.findByIdAndUpdate(id, resto);

    res.json(user);
}

// Crear usuario
const usuarioPost = async (req, res = response) => {


    const { nombre, correo, password, role } = req.body;
    const user = new User({ nombre, correo, password, role });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Guardar en DB
    await user.save();

    res.json({
        user
    });
}

const usuarioDelete = async (req, res = response) => {

    const { id } = req.params;
    const uid = req.uid;

    // Borrado Fisicamente
    // const user = await User.findByIdAndDelete(id);

    // cambio de estado...
    const user = await User.findByIdAndUpdate(id, { state: false });
    //const userAutentication = req.user;

    res.json({
        user//,
        //userAutentication
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