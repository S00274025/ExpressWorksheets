import { Request, Response, NextFunction } from 'express';

export const loggerMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  console.log(`${req.method} ${req.originalUrl} at ${new Date().toISOString()}`);
  next();
};