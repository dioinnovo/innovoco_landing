/**
 * Client Schema
 * 
 * Data validation schemas for client information
 */

import { z } from 'zod';

export const ClientInfoSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().optional(),
  industry: z.string().optional(),
  companySize: z.string().optional(),
  currentChallenges: z.array(z.string()).optional(),
  interestedSolutions: z.array(z.string()).optional()
});

export type ClientInfo = z.infer<typeof ClientInfoSchema>;

export const validateClientInfo = (data: unknown) => {
  return ClientInfoSchema.parse(data);
};

export const createDefaultClientEmailSchema = () => {
  return ClientInfoSchema;
};

export const validateClientEmailSchema = (data: unknown) => {
  return ClientInfoSchema.safeParse(data);
};