import { createAuthorSchema } from "schemas/author.schema";
import { createAuthor, deleteAuthor, getAllAuthors, getAuthorById, updateAuthor } from "../controllers/author.controller";
import { Router } from "express";
import { validate } from "middleware/validate";

const authorRouter = Router()

authorRouter.get("/", getAllAuthors);
authorRouter.get("/:id", getAuthorById);
authorRouter.post("/", validate(createAuthorSchema), createAuthor);
authorRouter.put("/:id", updateAuthor);
authorRouter.delete("/:id", deleteAuthor);

export default authorRouter;
