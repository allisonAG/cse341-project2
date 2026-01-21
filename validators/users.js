const { body } = require('express-validator');

const createUserValidation = [
    body('firstName')
        .notEmpty()
        .withMessage('First name is required'),
    
    body('lastName')
        .notEmpty()
        .withMessage('Last name is required'),
    
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    
    body('username')
        .notEmpty()
        .withMessage('Username is required'),
    
    body('age')
        .isInt({ min: 0 })
        .withMessage('Age must be a number'),
    
    body('active')
        .isBoolean()
        .withMessage('Active must be boolean')
];

const updateUserValidation = [
    body('firstName')
        .optional()
        .notEmpty()
        .withMessage('First name cannot be empty'),

    body('lastName')
        .optional()
        .notEmpty()
        .withMessage('Last name cannot be empty'),

    body('email')
        .optional()
        .isEmail()
        .withMessage('Email must be valid'),

    body('username')
        .optional()
        .notEmpty()
        .withMessage('Username cannot be empty'),

    body('age')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Age must be a positive number'),

    body('active')
        .optional()
        .isBoolean()
        .withMessage('Active must be boolean')
];

module.exports = {
    createUserValidation,
    updateUserValidation
}