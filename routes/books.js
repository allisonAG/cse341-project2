const router = require('express').Router();
const booksController = require('../controllers/books');
const { createBookValidation, updateBookValidation } = require('../validators/books');
const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.get('/', booksController.getAll);
router.get('/:id', booksController.getSingle);
router.post(
    '/',
    createBookValidation,
    validate,
    booksController.createBook
);
router.put(
    '/:id',
    updateBookValidation,
    validate,
    booksController.updateBook
);
router.delete('/:id', booksController.deleteBook);

module.exports = router;