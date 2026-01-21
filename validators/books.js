const { body } = require('express-validator');

const createBookValidation = [
    body('title')
        .notEmpty()
        .withMessage('Title name is required'),
    
    body('author')
        .notEmpty()
        .withMessage('Author is required'),
    
    body('pages')
        .notEmpty()
        .withMessage('Pages is required')
        .isInt({ min: 1 })
        .withMessage('Pages must be a number'),
    
    body('publishedYear')
        .notEmpty()
        .withMessage('Published year is required')
        .isInt({ min: 0 })
        .withMessage('Published year must be a number'),
    
    body('available')
        .isBoolean()
        .withMessage('Available must be boolean')
];

const updateBookValidation = [
    body('title')
        .optional()
        .notEmpty()
        .withMessage('Title cannot be empty'),

    body('author')
        .optional()
        .notEmpty()
        .withMessage('Author cannot be empty'),

    body('pages')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Pages must be a positive number'),

    body('publishedYear')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Published year must be a number'),


    body('available')
        .optional()
        .isBoolean()
        .withMessage('Available must be boolean')
];

module.exports = {
    createBookValidation,
    updateBookValidation
}