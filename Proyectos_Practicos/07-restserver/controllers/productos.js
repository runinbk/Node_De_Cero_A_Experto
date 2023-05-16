const { response } = require('express');

const { Producto } = require('../models');
// const { body } = require('express-validator');

// Obener todas las productos - paginado- total - populate
const obtenerProductos = async (req, res = response) => {
    const { limit = 5, desde = 0 } = req.query;
    const query = { state: true };

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('user', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limit))
    ])

    res.json({
        total,
        productos
    });
}

// Obtener producto por ID - populate {}
const obtenerProducto = async (req, res = response) => {

    const { id } = req.params;
    const producto = await Producto.findById(id)
        .populate('user', 'nombre')
        .populate('categoria', 'nombre');

    res.json(producto);
}

// Crear productos
const crearProducto = async (req, res = response) => {

    const { state, user, ...body } = req.body;
    const nombre = req.body.nombre.toUpperCase();

    const productoDB = await Producto.findOne({ nombre: body.nombre });

    if (productoDB) {
        return res.status(400).json({
            msg: `La producto ${productoDB.nombre}, ya existe`
        });
    }

    // Generar la data guardada
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        user: req.user._id
    }

    const producto = new Producto(data);

    // Guardar DB
    await producto.save();

    res.status(201).json(producto);

}

// Actualizar producto
const actualizarProducto = async (req, res = response) => {
    const { id } = req.params;
    const { state, user, ...data } = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }

    data.user = req.user._id;

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

    res.json(producto);

}

// Borrar producto - cambiar el estado a false
const borrarProducto = async (req, res = response) => {
    const { id } = req.params;
    const productoBorrada = await Producto.findByIdAndUpdate(id, { state: false }, { new: true });

    res.json(productoBorrada)
}


module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}