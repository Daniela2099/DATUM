const usuarioService = require('../services/usuario.service');

const enviarRespuesta = (res, status, exito, mensaje, datos) => {
  res.status(status).json({ exito, mensaje, ...(datos && { datos }) });
};

exports.crearUsuario = async (req, res, next) => {
  try {
    const usuario = await usuarioService.crearUsuario(req.body);
    enviarRespuesta(res, 201, true, 'Usuario creado correctamente', usuario);
  } catch (err) {
    next(err);
  }
};

exports.obtenerUsuarios = async (req, res, next) => {
  try {
    const usuarios = await usuarioService.obtenerUsuarios();
    enviarRespuesta(res, 200, true, 'Usuarios obtenidos correctamente', usuarios);
  } catch (err) {
    next(err);
  }
};

exports.obtenerUsuario = async (req, res, next) => {
  try {
    const usuario = await usuarioService.obtenerUsuario(req.params.id);
    enviarRespuesta(res, 200, true, 'Usuario encontrado', usuario);
  } catch (err) {
    next(err);
  }
};

exports.actualizarUsuario = async (req, res, next) => {
  try {
    const usuario = await usuarioService.actualizarUsuario(req.params.id, req.body);
    enviarRespuesta(res, 200, true, 'Usuario actualizado', usuario);
  } catch (err) {
    next(err);
  }
};

exports.eliminarUsuario = async (req, res, next) => {
  try {
    await usuarioService.eliminarUsuario(req.params.id);
    enviarRespuesta(res, 200, true, 'Usuario eliminado');
  } catch (err) {
    next(err);
  }
};