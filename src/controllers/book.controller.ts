import { Request, Response } from 'express';
import prisma from '../lib/prisma';


interface BookInput {
  title: string;
  authorId: string;
  description: string;
}

// Get all books
export const getAllBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const books = await prisma.book.findMany({
      include: {
        author: true
      }
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'An error occurred' });
  }
};

// Get a single book by ID
export const getBookById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const book = await prisma.book.findUnique({
      where: { id },
      include: {
        author: true
      }
    });
    if (!book) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'An error occurred' });
  }
};

// Create a new book
export const createBook = async (req: Request<{}, {}, BookInput>, res: Response): Promise<void> => {
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
    res.status(500).json({ error: error instanceof Error ? error.message : 'An error occurred' });
  }
};

// Update a book
export const updateBook = async (req: Request<{ id: string }, {}, BookInput>, res: Response): Promise<void> => {
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
    res.status(500).json({ error: error instanceof Error ? error.message : 'An error occurred' });
  }
};

// Delete a book
export const deleteBook = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.book.delete({
      where: { id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'An error occurred' });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
}; 