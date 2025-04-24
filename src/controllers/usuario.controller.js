const User = require('../models/user.model');
const { validationResult } = require('express-validator');

// Crear nuevo usuario
exports.createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, email, password, age } = req.body;
    const user = new User({ name, email, password, age });
    await user.save();
    res.status(201).json({
      message: 'Usuario creado exitosamente',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

// Autenticación de usuario
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }
    res.status(200).json({
      message: 'Autenticación exitosa',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Error en la autenticación' });
  }
};