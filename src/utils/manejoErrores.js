module.exports = (err, req, res, next) => {
  const status = err.status || 500;
  const mensaje = err.mensaje || 'Error interno del servidor';
  res.status(status).json({ exito: false, mensaje, error: err.error || {} });
};