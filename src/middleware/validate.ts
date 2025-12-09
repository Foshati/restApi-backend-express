import { Request, Response, NextFunction } from 'exfa';
import { z } from 'zod';

export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}

type ValidationSource = 'body' | 'params' | 'query';

// Zod v4 compatible schema type
type ZodSchema = z.ZodType<any, any, any>;

export const validate = (schema: ZodSchema, source: ValidationSource = 'body') => 
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data = req[source];
            await schema.parseAsync(data);
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                // Format Zod errors in a more user-friendly way
                // Zod v4 uses 'issues' instead of 'errors'
                const issues = error.issues || [];
                const errorMessages = issues.map((err: any) => {
                    const path = err.path?.join('.') || '';
                    return path ? `${path}: ${err.message}` : err.message;
                }).join(', ');

                res.status(400).json({
                    status: 'error',
                    message: `Validation failed: ${errorMessages}`,
                    errors: issues
                });
                return;
            }
            next(error);
        }
    };