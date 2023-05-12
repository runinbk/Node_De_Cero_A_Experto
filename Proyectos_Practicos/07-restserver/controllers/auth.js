const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { JWTgenerate } = require('../helpers/jwt-generate');

const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try {
        // Verificar si el email existe
        const user = await User.findOne({ correo });
        if (!user) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }

        // Si el usuario esta activo
        if (!user.state) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            })
        }

        // Verificar la contraseña
        const validPassword = await bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }

        // Generar en JWT
        const token = await JWTgenerate(user.id);

        res.json({
            user,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

module.exports = {
    login
}