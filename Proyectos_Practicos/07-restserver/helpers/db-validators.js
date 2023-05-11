const Role = require('../models/role');
const User = require('../models/user');

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

module.exports = {
    isRoleValue,
    isEmailExist,
    isUserForID
};
