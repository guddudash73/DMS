import type { Request, Response, NextFunction } from 'express';
import { type ZodType } from 'zod';

export const validate = (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    const issues = parsed.error.flatten();
    return res.status(400).json({ error: 'VALIDATION_ERROR', issues });
  }

  req.body = parsed.data as unknown;
  return next();
};
