const router = require('express').Router();
const booksController = require('../controllers/books');
const validation = require('../middlewares/validateBook');

router.get('/', booksController.getAll);
router.get('/:id', booksController.getSingle);
router.post('/', validation.saveBook, booksController.createBook);
router.put('/:id', validation.saveBook, booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;