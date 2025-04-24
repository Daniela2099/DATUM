const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt');

router.post('/', async (req, res, next) => {
  try {
    const { correo, contraseña } = req.body;
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) return res.status(401).json({ exito: false, mensaje: 'Correo no registrado' });
    const valido = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!valido) return res.status(401).json({ exito: false, mensaje: 'Contraseña incorrecta' });
    const { contraseña: _, ...sinContraseña } = usuario.toObject();
    res.json({ exito: true, mensaje: 'Login exitoso', datos: sinContraseña });
  } catch (err) {
    next(err);
  }
});

module.exports = router;