import { z } from 'zod';

// Schema for creating a profile
export const createProfileSchema = z.object({
  userId: z.string().uuid('Invalid user ID format'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  phone: z.string().optional(),
  address: z.string().optional(),
  bio: z.string().optional(),
  avatar: z.string().url('Invalid avatar URL').optional(),
});

// Schema for updating a profile
export const updateProfileSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').optional(),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').optional(),
  email: z.string().email('Invalid email format').optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  bio: z.string().optional(),
  avatar: z.string().url('Invalid avatar URL').optional(),
});

// Schema for profile ID parameter
export const profileIdSchema = z.object({
  id: z.string().uuid('Invalid profile ID format'),
});

// Type inference
export type CreateProfileInput = z.infer<typeof createProfileSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>; 