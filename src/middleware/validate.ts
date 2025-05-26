import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}

type ValidationSource = 'body' | 'params' | 'query';

export const validate = (schema: AnyZodObject, source: ValidationSource = 'body') => 
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data = req[source];
            await schema.parseAsync(data);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                // Format Zod errors in a more user-friendly way
                const errorMessages = error.errors.map(err => {
                    const path = err.path.join('.');
                    return path ? `${path}: ${err.message}` : err.message;
                }).join(', ');

                res.status(400).json({
                    status: 'error',
                    message: `Validation failed: ${errorMessages}`,
                    errors: error.errors
                });
                return;
            }
            next(error);
        }
    };