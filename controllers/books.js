const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Books']
    const result = mongodb.getDatabase().db().collection('books').find();
    result.toArray().then((books) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Books']
    const bookId = new ObjectId(req.params.id);
    const result = mongodb.getDatabase().db().collection('books').find({ _id: bookId });
    result.toArray().then((books) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books);
    });
};

const createBook = async (req, res) => {
    //#swagger.tags=['Books']
    const book = {
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        genre: req.body.genre,
        pages: Number(req.body.pages),
        publishedYear: Number(req.body.publishedYear),
        available: Boolean(req.body.available)
    };

    const response = await mongodb.getDatabase().db().collection('books').insertOne(book);
    if (response.acknowledged) {
        res.status(201).json({ id: response.insertedId });
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the book')
    }
};


const updateBook = async (req, res) => {
    //#swagger.tags=['Books']
    const bookId = new ObjectId(req.params.id);
    const book = {
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        genre: req.body.genre,
        pages: Number(req.body.pages),
        publishedYear: Number(req.body.publishedYear),
        available: Boolean(req.body.available)
    };

    const response = await mongodb.getDatabase().db().collection('books').replaceOne({ _id: bookId }, book);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the book')
    }
};

const deleteBook = async (req, res) => {
    //#swagger.tags=['Books']
    const bookId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('books').deleteOne({ _id: bookId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the book')
    }
};


module.exports = {
    getAll,
    getSingle,
    createBook,
    updateBook,
    deleteBook
};