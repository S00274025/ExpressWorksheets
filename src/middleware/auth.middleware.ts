import { Request, Response, NextFunction } from 'express';

export const authenticateKey = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const apiKey = req.headers['x-api-key'];
  const hasValidApiKey = Array.isArray(apiKey)
    ? apiKey.some((key) => typeof key === 'string' && key.trim().length > 0)
    : typeof apiKey === 'string' && apiKey.trim().length > 0;

  if (!hasValidApiKey) {
    res.status(401).json({
      status: 'fail',
      message: 'Unauthorized: Missing api-key header',
    });
    return;
  }

  next();
};