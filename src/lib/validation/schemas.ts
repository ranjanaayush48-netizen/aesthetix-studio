import { z } from 'zod';

export const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  business_name: z.string().min(1, 'Business name is required'),
  whatsapp: z.string().min(1, 'WhatsApp number is required'),
  service: z.string().min(1, 'Please select a service'),
  business_description: z.string().min(5, 'Please provide a brief business description'),
  existing_website: z.boolean().default(false),
  website_url: z.string().url('Invalid URL').optional().or(z.literal('')),
  budget: z.string().min(1, 'Please select a budget range'),
  timeline: z.string().min(1, 'Please select a timeline'),
  project_description: z.string().min(10, 'Project description must be at least 10 characters'),
  notes: z.string().optional(),
});

export const reviewSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  business_name: z.string().min(1, 'Business name is required'),
  email: z.string().email('Invalid email address'),
  rating: z.number().int().min(1, 'Rating must be at least 1').max(5, 'Rating cannot exceed 5'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  project: z.string().min(1, 'Please specify the project or service'),
});

export type LeadInput = z.infer<typeof leadSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
