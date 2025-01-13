import { Request, Response, NextFunction } from 'express';
import { ErrorCode } from '../error-handler/error.code';
import { ErrorException } from '../error-handler/error.exception';
import { verifyToken } from './jwt.middleware';

import { IGetUserAuthInfoRequest } from '../../types';

export const authMiddleware = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Bearer')) {
    const token = auth.slice(7);

    try {
      const tokenData = verifyToken(token);
      req.user = {
        userId: tokenData._id,
        email: tokenData.email,
        username: tokenData.username,
      };
      next();
    } catch (error) {
      throw ErrorException.fromCode(ErrorCode.Unauthenticated);
    }
  } else {
    throw ErrorException.fromCode(ErrorCode.Unauthenticated);
  }
};
