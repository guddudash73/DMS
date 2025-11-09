import { z } from 'zod';

export const PatientId = z.string().min(1);
export type PatientId = z.infer<typeof PatientId>;

export const Patient = z.object({
  patientId: PatientId,
  name: z.string().min(1),
  phone: z.string().min(7).max(20).optional(),
  dob: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  createdAt: z.number().int().nonnegative(),
  updatedAt: z.number().int().nonnegative(),
});

export type Patient = z.infer<typeof Patient>;
