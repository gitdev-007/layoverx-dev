import { Router, Response } from 'express';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.js';

const router = Router();

/**
 * GET /api/user/me
 * Protected endpoint returning current authenticated user details.
 */
router.get('/me', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  res.status(200).json({ success: true, user: req.user });
});

export default router;
