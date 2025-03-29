import { Request, Response, NextFunction } from 'express';

export const exampleMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("Example middleware executed");
    next();
  } catch (error) {
    res.error(error, 500);
  }
};
