import { Router, RequestHandler } from "exfa";
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

// Wrapper to handle async/await in route handlers
// Uses RequestHandler for proper type compatibility
const asyncHandler = <T extends RequestHandler>(fn: T): T => fn;

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
