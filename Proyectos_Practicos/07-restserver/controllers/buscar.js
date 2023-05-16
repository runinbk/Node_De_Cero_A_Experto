const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { Categoria, Producto, User } = require('../models')

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const buscarUsuarios = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino); //TRUE

    // Buscar usuario por ID
    if (esMongoID) {
        const usuario = await User.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        })
    }

    // Buscar usuario por nombre y correo
    const regex = new RegExp(termino, 'i');
    const usuarios = await User.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ state: true }]
    });
    return res.json({
        results: usuarios
    })
}

// Buscar por Categorias
const buscarCategorias = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino); //TRUE

    // Buscar categoria por ID
    if (esMongoID) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : []
        })
    }

    // Buscar categoria por nombre
    const regex = new RegExp(termino, 'i');
    const categorias = await Categoria.find({
        $or: [{ nombre: regex }],
        $and: [{ state: true }]
    });
    return res.json({
        results: categorias
    })
}

// Buscar por Productos
const buscarProductos = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino); //TRUE

    // Buscar producto por ID
    if (esMongoID) {
        const producto = await Producto.findById(termino)
            .populate('categoria', 'nombre');
        return res.json({
            results: (producto) ? [producto] : []
        })
    }

    // Buscar producto por nombre
    const regex = new RegExp(termino, 'i');
    const productos = await Producto.find({ nombre: regex, state: true })
        .populate('categoria', 'nombre')

    return res.json({
        results: productos
    })
}

const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res)
            break;

        case 'categorias':
            buscarCategorias(termino, res)
            break;

        case 'productos':
            buscarProductos(termino, res)
            break;
        default:
            res.status(500).json({
                msg: 'Se te olvido hacer esta busqueda'
            })
    }


}


module.exports = {
    buscar
}