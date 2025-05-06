import { Router } from 'express';
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,

} from '../controllers/book.controller';

const profileRouter = Router();

profileRouter.get('/', getAllBooks);
profileRouter.get('/:id', getBookById);
profileRouter.post('/', createBook);
profileRouter.put('/:id', updateBook);
profileRouter.delete('/:id', deleteBook);

export default profileRouter; 