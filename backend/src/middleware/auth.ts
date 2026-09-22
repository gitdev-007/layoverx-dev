import { Request, Response, NextFunction } from 'express';
import { supabase, SUPABASE_URL } from '../utils/supabase.js';

export interface AuthenticatedRequest extends Request {
  user?: any;
  userRole?: string;
}

export function extractUserRole(user: any): string {
  if (!user) return 'anonymous';
  return (
    user.app_metadata?.role ||
    user.user_metadata?.role ||
    user.role ||
    'authenticated'
  );
}

export async function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Missing authorization token' });
      return;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      res.status(401).json({ error: 'Invalid authorization token' });
      return;
    }

    const isMockMode = process.env.NODE_ENV !== 'production' && (!SUPABASE_URL.startsWith('http') || SUPABASE_URL.includes('sample-project') || SUPABASE_URL.includes('placeholder'));
    if (isMockMode && (token.startsWith('mock_') || token.startsWith('test_') || token === 'test-token' || token === 'test_token')) {
      const mockRole = token.includes('admin') ? 'admin' : (token.includes('staff') || token.includes('operator') ? 'operator' : 'authenticated');
      const mockId = token.startsWith('test_user_') ? token.replace('test_user_', '') : 'test-user-id-001';
      req.user = {
        id: mockId,
        email: `${mockId}@example.com`,
        role: mockRole,
        app_metadata: { role: mockRole },
        user_metadata: { role: mockRole },
      };
      req.userRole = mockRole;
      return next();
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      res.status(401).json({ error: 'Invalid or expired token' });
      return;
    }

    req.user = user;
    req.userRole = extractUserRole(user);
    next();
  } catch (err: any) {
    console.error('[requireAuth] Authentication check failed:', err);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

export function requireRole(allowedRoles: string[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const role = req.userRole || extractUserRole(req.user);
    if (!role || (!allowedRoles.includes(role) && role !== 'admin')) {
      res.status(403).json({
        error: 'Forbidden: Insufficient privileges for this operation',
        requiredRoles: allowedRoles,
        currentRole: role,
      });
      return;
    }
    next();
  };
}

export async function optionalAuth(req: AuthenticatedRequest, _res: Response, next: NextFunction): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }
    const token = authHeader.split(' ')[1];
    if (!token) return next();

    const isMockMode = process.env.NODE_ENV !== 'production' && (!SUPABASE_URL.startsWith('http') || SUPABASE_URL.includes('sample-project') || SUPABASE_URL.includes('placeholder'));
    if (isMockMode && (token.startsWith('mock_') || token.startsWith('test_') || token === 'test-token' || token === 'test_token')) {
      const mockRole = token.includes('admin') ? 'admin' : 'authenticated';
      req.user = {
        id: token.startsWith('test_user_') ? token.replace('test_user_', '') : 'test-user-id-001',
        email: 'traveler@example.com',
        role: mockRole,
        app_metadata: { role: mockRole },
        user_metadata: { role: mockRole },
      };
      req.userRole = mockRole;
      return next();
    }

    const { data: { user } } = await supabase.auth.getUser(token);
    if (user) {
      req.user = user;
      req.userRole = extractUserRole(user);
    }
  } catch (_e) {
    // Optional auth failure is non-blocking
  }
  next();
}
