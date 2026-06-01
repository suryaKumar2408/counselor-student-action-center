import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const requestId = (req.headers['x-request-id'] as string) || 'unknown';

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: 'error',
      statusCode: err.statusCode,
      message: err.message,
      requestId,
    });
    return;
  }

  // Log unexpected errors in development/production
  console.error(`[${requestId}] Unexpected error:`, err);

  res.status(500).json({
    status: 'error',
    statusCode: 500,
    message: 'Internal server error',
    requestId,
  });
};
