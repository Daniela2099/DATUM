const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { validateUser } = require('../middlewares/validateUser');

// Ruta para crear usuario
router.post('/users', validateUser, userController.createUser);

// Ruta para autenticación
router.post('/users/login', userController.loginUser);

module.exports = router;