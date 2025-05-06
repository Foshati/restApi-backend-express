const express = require('express');
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} = require('../controllers/book.controller');

// Get all books
router.get('/', getAllBooks);

// Get a single book by ID
router.get('/:id', getBookById);

// Create a new book
router.post('/', createBook);

// Update a book
router.put('/:id', updateBook);

// Delete a book
router.delete('/:id', deleteBook);

module.exports = router; 