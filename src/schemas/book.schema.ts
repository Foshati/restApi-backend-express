import { z } from 'zod';

// Schema for creating a book
export const createBookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  isbn: z.string().min(10, 'ISBN must be at least 10 characters'),
  authorId: z.string().uuid('Invalid author ID format'),
  publishedYear: z.number().int().min(1800).max(new Date().getFullYear()),
  price: z.number().positive('Price must be positive'),
  genre: z.string().optional(),
});

// Schema for updating a book
export const updateBookSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  description: z.string().optional(),
  isbn: z.string().min(10, 'ISBN must be at least 10 characters').optional(),
  authorId: z.string().uuid('Invalid author ID format').optional(),
  publishedYear: z.number().int().min(1800).max(new Date().getFullYear()).optional(),
  price: z.number().positive('Price must be positive').optional(),
  genre: z.string().optional(),
});

// Schema for book ID parameter
export const bookIdSchema = z.object({
  id: z.string().uuid('Invalid book ID format'),
});

// Type inference
export type CreateBookInput = z.infer<typeof createBookSchema>;
export type UpdateBookInput = z.infer<typeof updateBookSchema>; 