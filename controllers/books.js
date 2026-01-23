const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Books']
    try {
        const books = await mongodb
            .getDatabase()
            .db()
            .collection('books')
            .find()
            .toArray();

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json('An error occurred while retrieving books');
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Books']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Invalid book id');
        }

        const book = await mongodb
            .getDatabase()
            .db()
            .collection('books')
            .findOne({ _id: new ObjectId(req.params.id) });

        if (!book) {
            return res.status(404).json('Book not found');
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json('An error occurred while retrieving the book');
    }
};

const createBook = async (req, res) => {
    //#swagger.tags=['Books']
    try {
        const book = {
            title: req.body.title,
            author: req.body.author,
            isbn: req.body.isbn,
            genre: req.body.genre,
            pages: Number(req.body.pages),
            publishedYear: Number(req.body.publishedYear),
            available: Boolean(req.body.available)
        };

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('books')
            .insertOne(book);

        res.status(201).json({ id: response.insertedId });
    } catch (error) {
        res.status(500).json('Some error occurred while creating the book');
    }
};


const updateBook = async (req, res) => {
    //#swagger.tags=['Books']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Invalid book id');
        }
        const book = {
            title: req.body.title,
            author: req.body.author,
            isbn: req.body.isbn,
            genre: req.body.genre,
            pages: Number(req.body.pages),
            publishedYear: Number(req.body.publishedYear),
            available: Boolean(req.body.available)
        };

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('books')
            .replaceOne(
                { _id: new ObjectId(req.params.id) },
                book
            );

        if (response.matchedCount === 0) {
            return res.status(404).json('Book not found');
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json('Some error occurred while updating the book');
    }
};


const deleteBook = async (req, res) => {
    //#swagger.tags=['Books']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Invalid book id');
        }

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('books')
            .deleteOne({ _id: new ObjectId(req.params.id) });

        if (response.deletedCount === 0) {
            return res.status(404).json('Book not found');
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json('Some error occurred while deleting the book');
    }
};


module.exports = {
    getAll,
    getSingle,
    createBook,
    updateBook,
    deleteBook
};