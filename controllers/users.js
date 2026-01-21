const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Users']
    try {
        const result = await mongodb.getDatabase().db().collection('users').find().toArray()
                    
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json('Some error occurred while retrieving users')
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Users']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Invalid user id');
        }
        
        const user = await mongodb.getDatabase().db().collection('users').findOne({ _id: new ObjectId(req.params.id) });
                
        if (!user) {
            return res.status(404).json('User not found');
        }
                
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json('An error occurred while retrieving the user')
    }
};

const createUser = async (req, res) => {
    //#swagger.tags=['Users']
    try {
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
        
        res.status(201).json({ id: response.insertedId });
    } catch (error) {
        res.status(500).json('Some error occurred while creating the user')
    }
};


const updateUser = async (req, res) => {
    //#swagger.tags=['Users']
    try {
         if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Invalid user id');
    }
    
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

        const response = await mongodb.getDatabase().db().collection('users').replaceOne({ _id: new ObjectId(req.params.id) }, user);
        
        if (response.matchedCount === 0) {
            return res.status(404).json('User not found');
        }
    
        res.status(204).send();
    } catch(error) {
        res.status(500).json('Some error occurred while updating the user')
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags=['Users']
    try {
        if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Invalid user id');
    }
    const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: new ObjectId(req.params.id) });
    
    if (response.deletedCount === 0) {
            return res.status(404).json('User not found');
        }

        res.status(204).send();
    } catch(error) {
        res.status(500).json('Some error occurred while deleting the user')
    }
    
};


module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};