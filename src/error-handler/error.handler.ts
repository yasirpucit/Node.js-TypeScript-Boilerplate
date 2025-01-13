import { Request, Response, NextFunction } from 'express';
import { ErrorException } from './error.exception';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(`Error occurred in path ${req.path}:`, err);

  if (err instanceof ErrorException) {
    res.status(err.status).json({
      statusCode: err.status,
      error: err.name,
      message: err.message,
      metaData: err.metaData,
    });
  } else {
    res.status(500).json({
      statusCode: 500,
      error: err.name || 'UnknownError',
      message: err.message || 'An unexpected error occurred.',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
  }
};

export { errorHandler };
