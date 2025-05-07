import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}

export const validate = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.parseAsync(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            // Format Zod errors in a more user-friendly way
            const errorMessages = error.errors.map(err => {
                return `${err.path.join('.')}: ${err.message}`;
            }).join(', ');

            res.status(400).json({
                status: 'error',
                message: errorMessages
            });
            return;
        }
        next(error);
    }
}; 