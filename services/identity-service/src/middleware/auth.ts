import { Request, Response, NextFunction } from 'express';

// This is a placeholder for actual authentication middleware.
// In a real application, you would verify a JWT or session token here.
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];

  if (apiKey && apiKey === 'super-secret-key') {
    return next();
  }

  res.status(401).json({ message: 'Unauthorized' });
};
