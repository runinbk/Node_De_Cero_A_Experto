const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { isEmailExist } = require('../helpers/db-validators');

const usuarioGet = async (req, res = response) => {

    const { limit = 5, desde = 0 } = req.query;
    const query = { state: true };

    // const users = await User.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limit));
    // const total = await User.countDocuments(query);

    // const resp = await Promise.all([
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

const usuarioPost = async (req, res = response) => {


    const { nombre, correo, password, role } = req.body;
    const user = new User({ nombre, correo, password, role });

    // Verificar si el correo existe
    /*
    * Esta seccion fue acomodada en /helpers/db-validartors.js siguiendo las buenas practicas...
    *const existEmail = await User.findOne({ correo });
    *if (existEmail) {
    *    return res.status(400).json({
    *        msg: 'El correo ya existe'
    *    });
    *}
    */

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

    // Borrado Fisicamente
    // const user = await User.findByIdAndDelete(id);

    // cambio de estado...
    const user = await User.findByIdAndUpdate(id, { state: false });

    res.json({
        user
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