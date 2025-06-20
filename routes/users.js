const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const validation = require('../middleware/validation');
const { isAuthenticated }= require('../middleware/authenticate.js')

router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

router.post('/', isAuthenticated, validation.saveContact, usersController.createUser)
router.put('/:id', isAuthenticated, validation.saveContact, usersController.updateUser);
router.delete('/:id', isAuthenticated, usersController.deleteUser);

module.exports = router;