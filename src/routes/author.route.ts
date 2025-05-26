import { Router, Request, Response, NextFunction } from "express";
import { 
  createAuthor, 
  deleteAuthor, 
  getAllAuthors, 
  getAuthorById, 
  updateAuthor 
} from "../controllers/author.controller";
import { validate } from "../middleware/validate";
import { 
  createAuthorSchema, 
  updateAuthorSchema, 
  authorIdSchema 
} from "../schemas/author.schema";

const authorRouter = Router();

// Helper type for async route handlers
type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

// Wrapper to handle async/await in route handlers
const asyncHandler = (fn: AsyncRequestHandler) => 
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

// Get all authors
authorRouter.get("/", asyncHandler(getAllAuthors));

// Get author by ID
authorRouter.get(
  "/:id", 
  validate(authorIdSchema, 'params'),
  asyncHandler(getAuthorById)
);

// Create new author
authorRouter.post(
  "/", 
  validate(createAuthorSchema),
  asyncHandler(createAuthor)
);

// Update author
authorRouter.put(
  "/:id",
  validate(authorIdSchema, 'params'),
  validate(updateAuthorSchema),
  asyncHandler(updateAuthor)
);

// Delete author
authorRouter.delete(
  "/:id",
  validate(authorIdSchema, 'params'),
  asyncHandler(deleteAuthor)
);

export default authorRouter;
