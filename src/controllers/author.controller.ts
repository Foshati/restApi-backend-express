import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma';

// Define the Author type based on Prisma model
type Author = {
    id: string;
    name: string;
};

// Custom error class for API errors
export class ApiError extends Error {
    statusCode: number;
    
    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

// Helper function to handle errors
const handleError = (error: unknown, res: Response) => {
    console.error('Error:', error);
    
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                status: 'error',
                message: 'Author not found'
            });
        }
        
        if (error.code === 'P2002') {
            return res.status(409).json({
                status: 'error',
                message: 'Author with this email already exists'
            });
        }
    }

    if (error instanceof ApiError) {
        return res.status(error.statusCode).json({
            status: 'error',
            message: error.message
        });
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
};

// Get all authors
export const getAllAuthors = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { search, page = '1', limit = '10' } = req.query;
        const pageNumber = parseInt(page as string, 10);
        const limitNumber = parseInt(limit as string, 10);
        const skip = (pageNumber - 1) * limitNumber;

        const where: Prisma.AuthorWhereInput = {};
        
        if (search && typeof search === 'string') {
            where.OR = [
                { name: { contains: search } }
            ];
        }

        const [authors, total] = await Promise.all([
            prisma.author.findMany({
                where,
                include: { books: true },
                skip,
                take: limitNumber,
                orderBy: { name: 'asc' }
            }),
            prisma.author.count({ where })
        ]);

        const totalPages = Math.ceil(total / limitNumber);

        res.status(200).json({
            status: 'success',
            data: authors,
            meta: {
                page: pageNumber,
                limit: limitNumber,
                total,
                totalPages
            }
        });
    } catch (error) {
        handleError(error, res);
    }
};

// Get author by ID
export const getAuthorById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        
        const author = await prisma.author.findUnique({
            where: { id },
            include: { books: true }
        });

        if (!author) {
            throw new ApiError(404, 'Author not found');
        }

        res.status(200).json({
            status: 'success',
            data: author
        });
    } catch (error) {
        handleError(error, res);
    }
};

// Create new author
export const createAuthor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, email, bio, birthDate } = req.body;

        // Check if author with same name exists (since email is not in the model)
        const existingAuthor = await prisma.author.findFirst({
            where: { name }
        });

        if (existingAuthor) {
            throw new ApiError(409, 'Author with this name already exists');
        }

        const author = await prisma.author.create({
            data: {
                name
            }
        });

        res.status(201).json({
            status: 'success',
            data: author
        });
    } catch (error) {
        handleError(error, res);
    }
};

// Update author
export const updateAuthor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        // Check if author exists
        const existingAuthor = await prisma.author.findUnique({
            where: { id }
        });

        if (!existingAuthor) {
            throw new ApiError(404, 'Author not found');
        }


        // Check if name is being updated to a name that already exists
        if (name && name !== existingAuthor.name) {
            const nameExists = await prisma.author.findFirst({
                where: { name, id: { not: id } }
            });

            if (nameExists) {
                throw new ApiError(409, 'An author with this name already exists');
            }
        }

        const updateData: any = {};
        if (name !== undefined) updateData.name = name;

        const author = await prisma.author.update({
            where: { id },
            data: updateData
        });

        res.status(200).json({
            status: 'success',
            data: author
        });
    } catch (error) {
        handleError(error, res);
    }
};

// Delete author
export const deleteAuthor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;

        // First check if author exists
        const author = await prisma.author.findUnique({
            where: { id }
        });

        if (!author) {
            throw new ApiError(404, 'Author not found');
        }

        // Delete the author
        await prisma.author.delete({
            where: { id }
        });

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        handleError(error, res);
    }
};