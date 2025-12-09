import { Router } from 'exfa';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} from '../controllers/book.controller';

const bookRouter = Router();

// Get all books
bookRouter.get('/', getAllBooks);

// Get a single book by ID
bookRouter.get('/:id', getBookById);

// Create a new book
bookRouter.post('/', createBook);

// Update a book
bookRouter.put('/:id', updateBook);

// Delete a book
bookRouter.delete('/:id', deleteBook);

export default bookRouter; 