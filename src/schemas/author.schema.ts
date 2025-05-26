import { z } from 'zod';

// Schema for creating an author
export const createAuthorSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters')
});

// Schema for updating an author
export const updateAuthorSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional()
});

// Schema for author ID parameter
export const authorIdSchema = z.object({
  id: z.string().uuid('Invalid author ID format')
});

// Type inference
export type CreateAuthorInput = z.infer<typeof createAuthorSchema>;
export type UpdateAuthorInput = z.infer<typeof updateAuthorSchema>; 