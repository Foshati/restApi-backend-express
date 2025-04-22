import { Request, Response } from "express";
import { prisma } from '../lib/prisma';

// get all authors (getAllAuthors)
export const getAllAuthors = async (req: Request, res: Response) => {
    try {
        const allAuthors = await prisma.author.findMany({
            include: { books: true }
        });
        res.status(200).json({ data: allAuthors });
    } catch (error: unknown) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch authors" });
    }
};

//get author by id (getAuthorById)
export const getAuthorById = async (req: Request, res: Response) => {
    try {
        const authorId = req.params.id;
        const author = await prisma.author.findUnique({
            where: { id: authorId }
        });
        res.status(200).json({ data: author });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch author" });
    }
};

//create author (createAuthor)
export const createAuthor = async (req: Request, res: Response) => {
    try {
        const authorData = req.body;
        const author = await prisma.author.create({
            data: authorData
        });
        res.status(201).json({ data: author });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create author" });
    }
};

//update author (updateAuthor)
export const updateAuthor = async (req: Request, res: Response) => {
    try {
        const authorId = req.params.id;
        const authorData = req.body;
        const author = await prisma.author.update({
            where: { id: authorId },
            data: authorData
        });
        res.status(200).json({ data: author });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to update author" });
    }
};

//delete author (deleteAuthor)
export const deleteAuthor = async (req: Request, res: Response) => {
    try {
        const authorId = req.params.id;
        const author = await prisma.author.delete({
            where: { id: authorId }
        });
        res.status(200).json({ data: {} });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to delete author" });
    }
};