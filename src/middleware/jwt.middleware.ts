import jwt from 'jsonwebtoken';

import { IUser } from '../models/user.model';
import { ErrorException } from '../error-handler/error.exception';
import { ErrorCode } from '../error-handler/error.code';

import config from '../config/app.config';

const {
  jwt: { secret, expiresIn },
} = config;

const generateAuthToken = (user: IUser): string => {
  const { _id, email, username } = user;
  const token = jwt.sign({ _id, email, username }, secret, {
    expiresIn: expiresIn,
  });

  return token;
};

const verifyToken = (token: string): { _id: string; email: string; username: string } => {
  try {
    const tokenData = jwt.verify(token, secret);
    return tokenData as { _id: string; email: string; username: string };
  } catch (error) {
    throw ErrorException.fromCode(ErrorCode.Unauthenticated, { key: null });
  }
};

export { generateAuthToken, verifyToken };
