const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { validateUser } = require('../middlewares/validateUser');

// Crear usuario
router.post('/usuarios', validateUser, userController.createUser);

// Login de usuario
router.post('/usuarios/login', userController.loginUser);

// Obtener todos los usuarios
router.get('/usuarios', userController.getAllUsers);

// Obtener un usuario por ID
router.get('/usuarios/:id', userController.getUserById);

// Actualizar usuario
router.put('/usuarios/:id', validateUser, userController.updateUser);

// Eliminar usuario
router.delete('/usuarios/:id', userController.deleteUser);

module.exports = router;