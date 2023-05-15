const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { JWTgenerate } = require('../helpers/jwt-generate');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSingIn = async (req, res = response) => {

    const { id_token } = req.body;

    try {

        const { nombre, img, correo } = await googleVerify(id_token);

        let user = await User.findOne({ correo });

        if (!user) {
            // Si no existe el usuario, tengo que crearlo...
            const data = {
                nombre,
                correo,
                password: '123456',
                img,
                role: "USER_ROLE",
                google: true,
                state: true
            };

            user = new User(data);
            await user.save();
        }

        // Si el usuario en DB
        if (!user.state) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
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
            msg: 'Google not fount'
        });
    }

}

module.exports = {
    login,
    googleSingIn
}