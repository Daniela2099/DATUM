const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  edad: { type: Number, min: 0 },
  estado: { type: String, enum: ['activo', 'inactivo'], default: 'activo' },
  contraseña: { type: String, required: true },
  creadoEn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);