const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt');

exports.crearUsuario = async (datos) => {
  const existeCorreo = await Usuario.findOne({ correo: datos.correo });
  if (existeCorreo) throw { status: 400, mensaje: 'Correo ya registrado' };
  datos.contraseña = await bcrypt.hash(datos.contraseña, 10);
  return await Usuario.create(datos);
};

exports.obtenerUsuarios = async () => {
  return await Usuario.find().select('-contraseña');
};

exports.obtenerUsuario = async (id) => {
  const usuario = await Usuario.findById(id).select('-contraseña');
  if (!usuario) throw { status: 404, mensaje: 'Usuario no encontrado' };
  return usuario;
};

exports.actualizarUsuario = async (id, datos) => {
  if (datos.correo) {
    const existe = await Usuario.findOne({ correo: datos.correo, _id: { $ne: id } });
    if (existe) throw { status: 400, mensaje: 'Correo ya en uso por otro usuario' };
  }
  if (datos.contraseña) {
    datos.contraseña = await bcrypt.hash(datos.contraseña, 10);
  }
  const usuario = await Usuario.findByIdAndUpdate(id, datos, { new: true }).select('-contraseña');
  if (!usuario) throw { status: 404, mensaje: 'Usuario no encontrado' };
  return usuario;
};

exports.eliminarUsuario = async (id) => {
  const resultado = await Usuario.findByIdAndDelete(id);
  if (!resultado) throw { status: 404, mensaje: 'Usuario no encontrado' };
};