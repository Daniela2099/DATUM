const { body } = require('express-validator');

exports.validateUser = [
  body('name').notEmpty().withMessage('El nombre es requerido'),
  body('email')
    .isEmail()
    .withMessage('Debe proporcionar un email válido'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres')
    .matches(/\d/)
    .withMessage('La contraseña debe contener al menos un número')
    .matches(/[A-Z]/)
    .withMessage('La contraseña debe contener al menos una letra mayúscula'),
  body('age')
    .optional()
    .isInt({ min: 0 })
    .withMessage('La edad debe ser un número positivo')
];