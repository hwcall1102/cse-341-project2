const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Users']
    try {
        const users = await mongodb.getDb().db().collection('Users').find().toArray();
        res.setHeader('Content-Type', 'application/JSON');
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
const getSingle = async (req, res) => {
    //#swagger.tags=['Users']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid user id to find a user');
        };
        const userId = new ObjectId(req.params.id);
        const user = await mongodb.getDb().db().collection('Users').findOne({ _id: userId });;
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        res.setHeader('Content-Type', 'application/JSON');
        res.status(200).json(user);
        }catch (err) {
            res.status(400).json({ message: err.message });
        }
};

const createUser = async (req, res) => {
    //#swagger.tags=['Users']
    try {
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };
        const response = await mongodb.getDb().db().collection('Users').insertOne(user);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occured while creating the user');
        };
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateUser = async (req, res) => {
    //#swagger.tags=['Users']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid user id to update a user');
        };
        const userId = new ObjectId(req.params.id);
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };
        const response = await mongodb.getDb().db().collection('Users').replaceOne({ _id: userId }, user);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occured while updating the user');
        };
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags=['Users']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid user id to delete user');
        };
        const userId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().db().collection('Users').deleteOne({ _id: userId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occured while deleting the user');
        };
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = { getAll, getSingle, createUser, updateUser, deleteUser };