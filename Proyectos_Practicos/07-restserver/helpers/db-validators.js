const { Categoria, Role, User, Producto } = require('../models');

const isRoleValue = async (role = "") => {
    const existRole = await Role.findOne({ role });
    if (!existRole) {
        throw new Error(`El rol ${role} no esta registrado en la DB`);
    }
};

const isEmailExist = async (correo = '') => {
    const existEmail = await User.findOne({ correo });
    if (existEmail) {
        throw new Error(`El correo : "${correo}" ya esta registrado`)
    }
};

const isUserForID = async (id) => {
    const existUserID = await User.findById(id);
    if (!existUserID) {
        throw new Error(`El ID : ${id} no existe`)
    }
};

/**
 * Categorias
 */
const isCategoryForID = async (id) => {
    const existCategoryID = await Categoria.findById(id);
    if (!existCategoryID) {
        throw new Error(`El ID : ${id} no existe`)
    }
};

/**
 * Productos
 */
const isProductForID = async (id) => {
    const existProductID = await Producto.findById(id);
    if (!existProductID) {
        throw new Error(`El ID : ${id} no existe`)
    }
};

module.exports = {
    isRoleValue,
    isCategoryForID,
    isEmailExist,
    isProductForID,
    isUserForID,
};
