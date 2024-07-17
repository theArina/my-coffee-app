import type { Request, Response, NextFunction } from 'express';

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err.stack);

  const statusCode = 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    error: {
      message,
      status: statusCode,
    },
  });
}
