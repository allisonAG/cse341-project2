const express = require('express');
const router = require('express').Router();

const booksController = require('../controllers/books');

router.get('/', booksController.getAll);
router.get('/:id', booksController.getSingle);
router.post('/', booksController.createBook);

module.exports = router;