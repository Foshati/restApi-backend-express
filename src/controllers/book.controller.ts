const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      include: {
        author: true
      }
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single book by ID
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await prisma.book.findUnique({
      where: { id },
      include: {
        author: true
      }
    });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new book
const createBook = async (req, res) => {
  try {
    const { title, authorId, description } = req.body;
    const book = await prisma.book.create({
      data: {
        title,
        authorId,
        description
      },
      include: {
        author: true
      }
    });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a book
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, authorId, description } = req.body;
    const book = await prisma.book.update({
      where: { id },
      data: {
        title,
        authorId,
        description
      },
      include: {
        author: true
      }
    });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.book.delete({
      where: { id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
}; 