const { response } = require('express');

const { Categoria } = require('../models')

// Obener todas las categorias - paginado- total - populate
const obtenerCategorias = async (req, res = response) => {
    const { limit = 5, desde = 0 } = req.query;
    const query = { state: true };

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('user', 'nombre')
            .skip(Number(desde))
            .limit(Number(limit))
    ])

    res.json({
        total,
        categorias
    });
}

// Obtener categoria por ID - populate {}
const obtenerCategoria = async (req, res = response) => {

    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate('user', 'nombre');

    res.json(categoria);
}

// Crear categoras
const crearCategoria = async (req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        });
    }

    // Generar la data guardada
    const data = {
        nombre,
        user: req.user._id
    }

    const categoria = new Categoria(data);

    // Guardar DB
    await categoria.save();

    res.status(201).json(categoria);

}

// Actualizar categoria
const actualizarCategoria = async (req, res = response) => {
    const { id } = req.params;
    const { state, user, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.user = req.user._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

    res.json(categoria);

}

// Borrar categoria - cambiar el estado a false
const borrarCategoria = async (req, res = response) => {
    const { id } = req.params;
    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, { state: false }, { new: true });

    res.json(categoriaBorrada)
}


module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}