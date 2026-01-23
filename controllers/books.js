const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
    //#swagger.tags=['Books']
   
    mongodb.getDatabase().db().collection('books').find().toArray((err, lists) => {
        if (err) {
            res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });              
};

const getSingle = (req, res) => {
    //#swagger.tags=['Books']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid book id to find a book');
    }
    const userId = new ObjectId(req.params.id);
    mongodb.getDatabase().db().collection('books').find({ _id: userId }).toArray((err, result) => {
        if (err) {
            res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]); 
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
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the book')
    }
};

const updateBook = async (req, res) => {
    //#swagger.tags=['Books']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid book id to find a book');
    }

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
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid book id to find a book');
    }

    const bookId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('books').deleteOne( { _id: bookId } );
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