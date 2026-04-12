// Input validation schemas using Zod
// Used on both client (form validation) and server (API route validation)

import { z } from 'zod';
import { CATEGORIES } from '@/types';

export const submitItemSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be under 100 characters')
    // Strip HTML tags to prevent XSS
    .transform((val) => val.replace(/<[^>]*>/g, '').trim()),

  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be under 1000 characters')
    .transform((val) => val.replace(/<[^>]*>/g, '').trim()),

  category: z.enum(CATEGORIES, {
    message: 'Please select a valid category',
  }),

  location: z
    .string()
    .min(2, 'Location is required')
    .max(200, 'Location too long')
    .transform((val) => val.replace(/<[^>]*>/g, '').trim()),

  date_found: z
    .string()
    .refine((val) => {
      const date = new Date(val);
      return !isNaN(date.getTime()) && date <= new Date();
    }, 'Date found must be a valid past date'),

  submitter_name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name too long')
    .transform((val) => val.replace(/<[^>]*>/g, '').trim()),

  submitter_email: z
    .string()
    .email('Please enter a valid email address')
    .max(254, 'Email too long'),
});

export const claimSchema = z.object({
  item_id: z.string().uuid('Invalid item reference'),

  claimant_name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name too long')
    .transform((val) => val.replace(/<[^>]*>/g, '').trim()),

  claimant_email: z
    .string()
    .email('Please enter a valid email address'),

  description: z
    .string()
    .min(20, 'Please provide at least 20 characters describing ownership')
    .max(1000, 'Description too long')
    .transform((val) => val.replace(/<[^>]*>/g, '').trim()),
});

export type SubmitItemSchema = z.infer<typeof submitItemSchema>;
export type ClaimSchema = z.infer<typeof claimSchema>;