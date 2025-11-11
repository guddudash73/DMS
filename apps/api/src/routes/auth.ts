import { Router } from 'express';
import { validate } from '../middlewares/zod';
import { LoginRequest, RefreshRequest } from '@dms/types';
import { env } from '../config/env';

const r = Router();

r.post('/login', validate(LoginRequest), (_req, res) => {
  return res.status(501).json({
    error: 'NOT_IMPLEMENTED',
    note: 'Contracts validated. Business logic lands after Day 12',
    ttl: {
      access: env.ACCESS_TOKEN_TTL_SEC,
      refresh: env.REFRESH_TOKEN_TTL_SEC,
    },
  });
});

r.post('/refresh', validate(RefreshRequest), (_req, res) => {
  return res.status(501).json({ error: 'NOT_IMPLEMENTED' });
});

export default r;
