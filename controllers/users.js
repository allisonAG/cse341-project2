const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
    //#swagger.tags=['Users']
   
    mongodb.getDatabase().db().collection('users').find().toArray((err, lists) => {

        if (err) {
            res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });              
};

const getSingle = (req, res) => {
    //#swagger.tags=['Users']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid user id to find a user');
    }

    const userId = new ObjectId(req.params.id);
    mongodb.getDatabase().db().collection('users').find({ _id: userId }).toArray((err, result) => {
        if (err) {
            res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]); 
    });             
};

const createUser = async (req, res) => {
    //#swagger.tags=['Users']
    const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    username: req.body.username,
    age: Number(req.body.age),
    role: req.body.role,
    active: Boolean(req.body.active),
    createdAt: req.body.createdAt
};

    const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
        
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the user')
    }
};


const updateUser = async (req, res) => {
    //#swagger.tags=['Users']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid user id to find a user');
    }

    const userId = new ObjectId(req.params.id);

    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        age: Number(req.body.age),
        role: req.body.role,
        active: Boolean(req.body.active),
        createdAt: req.body.createdAt
    };

    const response = await mongodb.getDatabase().db().collection('users').replaceOne({ _id: userId }, user);
        
        
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user')
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags=['Users']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid user id to find a user');
    }
    
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('users').deleteOne( { _id: userId } );
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the user')
    } 
};


module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};