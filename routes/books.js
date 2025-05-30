const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');
const validation = require('../middleware/validation');
const auth = require('../middleware/authenticate')
router.get('/', booksController.getAllBooks);

router.get('/:id', booksController.getSingleBook);

router.post('/', auth.isAuthenticated, validation.saveBook, booksController.createBook)
router.put('/:id', auth.isAuthenticated, validation.saveBook, booksController.updateBook);
router.delete('/:id', auth.isAuthenticated, booksController.deleteBook);

module.exports = router;