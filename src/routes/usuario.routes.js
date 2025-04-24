const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/usuario.controller');

router.post('/', ctrl.crearUsuario);
router.get('/', ctrl.obtenerUsuarios);
router.get('/:id', ctrl.obtenerUsuario);
router.put('/:id', ctrl.actualizarUsuario);
router.delete('/:id', ctrl.eliminarUsuario);

module.exports = router;