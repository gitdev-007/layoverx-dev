import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public errorCode: string = 'INTERNAL_ERROR',
    public details?: any
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  // 1. Zod Payload Validation Failure (RFC 7807 Problem Details)
  if (err instanceof ZodError) {
    const issues = (err as any).issues || (err as any).errors || [];
    res.status(400).json({
      type: 'https://layoverx.in/errors/validation-error',
      title: 'Invalid Request Payload',
      status: 400,
      code: 'VALIDATION_FAILED',
      errors: issues.map((e: any) => ({
        path: Array.isArray(e.path) ? e.path.join('.') : String(e.path || ''),
        message: e.message,
      })),
    });
    return;
  }

  // 2. Custom Application Errors
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      type: `https://layoverx.in/errors/${err.errorCode.toLowerCase()}`,
      title: err.message,
      status: err.statusCode,
      code: err.errorCode,
      details: err.details || null,
    });
    return;
  }

  // 3. PostgreSQL / Supabase Unique Constraint Conflict
  if (err?.code === '23505') {
    res.status(409).json({
      type: 'https://layoverx.in/errors/conflict',
      title: 'Resource conflict: unique constraint violation',
      status: 409,
      code: 'RESOURCE_CONFLICT',
    });
    return;
  }

  // 4. PostgreSQL Foreign Key or Invalid UUID
  if (err?.code === '23503' || err?.code === '22P02') {
    res.status(404).json({
      type: 'https://layoverx.in/errors/not-found',
      title: 'The specified resource or related entity was not found',
      status: 404,
      code: 'NOT_FOUND',
    });
    return;
  }

  // 5. Fallback Internal Server Error (Never leak stack traces or internal DB info)
  console.error('[CRITICAL_UNHANDLED_ERROR]', {
    message: err.message || 'Unknown error',
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  res.status(500).json({
    type: 'https://layoverx.in/errors/internal-error',
    title: 'An unexpected internal error occurred. Our operations team has been notified.',
    status: 500,
    code: 'INTERNAL_SERVER_ERROR',
    traceId: `req_${Date.now()}`,
  });
}
