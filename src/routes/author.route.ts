import { createAuthor, deleteAuthor, getAllAuthors, getAuthorById, updateAuthor } from "../controllers/author.controller";
import { Router } from "express";


const authorRouter = Router()


authorRouter.get("/", getAllAuthors);
authorRouter.get("/:id", getAuthorById);
authorRouter.post("/", createAuthor);
authorRouter.put("/:id", updateAuthor);
authorRouter.delete("/:id", deleteAuthor);

export default authorRouter;
