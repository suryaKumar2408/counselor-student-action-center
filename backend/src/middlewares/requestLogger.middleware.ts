import { Request, Response, NextFunction } from 'express';

/**
 * Logs method, route, status code, timestamp, and request ID
 * for every completed HTTP request.
 */
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.on('finish', () => {
    const requestId = req.headers['x-request-id'] || 'unknown';
    const timestamp = new Date().toISOString();
    console.log(
      `[${timestamp}] ${req.method} ${req.originalUrl} ${res.statusCode} (req-id: ${requestId})`
    );
  });
  next();
};
