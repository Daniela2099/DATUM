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
    console.error(err);  // Esto te dará más detalles sobre el error
    res.status(500).json({ error: 'Error al crear el usuario', message: err.message });
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

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, '-password');
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

// Actualizar un usuario
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario actualizado exitosamente', user });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};