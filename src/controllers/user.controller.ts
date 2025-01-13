import { Response, NextFunction } from 'express';
import { extend, isEmpty } from 'lodash';

import UserModel from '../models/user.model';

import { IGetUserAuthInfoRequest } from '../../types';

import { ErrorException } from '../error-handler/error.exception';

import { generateAuthToken } from '../middleware/jwt.middleware';

import { deleteUserRecord, getUserRecord, registerUser, updateUserRecord } from '../services/user.service';

import { handleSuccessResponse } from '../utils/response.handler';
import { asyncHandler } from '../utils/async.handler';

const register = asyncHandler(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  const {
    body: { username, email, password },
  } = req;

  const userExists = await getUserRecord('email', email);

  if (!!userExists) throw ErrorException.fromCode('DuplicateEntityError', { key: email });

  const user = await registerUser({ username, email, password });

  handleSuccessResponse({ res, data: user, message: 'User registered successfully', statusCode: 200 });
});

const login = asyncHandler(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  const {
    body: { email, password },
  } = req;

  const userExists = await getUserRecord('email', email);
  if (!userExists) throw ErrorException.fromCode('Unauthenticated', { key: email });

  const validPassword = await UserModel.comparePassword(password, userExists.password);
  if (!validPassword) throw ErrorException.fromCode('Unauthenticated', { key: email });

  const token = generateAuthToken(userExists);

  handleSuccessResponse({ res, data: { user: userExists, token }, message: 'User Logged In Successfully', statusCode: 200 });
});

const updateUser = asyncHandler(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  const {
    user: { userId },
    body: { username, email },
  } = req;

  const data = {};
  if (username) extend(data, { username });
  if (email) extend(data, { email });

  if (isEmpty(data)) throw ErrorException.fromCode('MissingRequestData', { key: { username, email } });

  const updatedUser = await updateUserRecord(userId, data);

  if (!updatedUser) throw ErrorException.fromCode('NotFound', { key: userId });

  handleSuccessResponse({
    res,
    data: updatedUser,
    message: 'User updated successfully',
    statusCode: 200,
  });
});

const deleteUser = asyncHandler(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  const {
    user: { userId },
  } = req;

  const deletedUser = await deleteUserRecord(userId);

  if (!deletedUser) throw ErrorException.fromCode('NotFound', { key: userId });

  handleSuccessResponse({
    res,
    data: null,
    message: 'User deleted successfully',
    statusCode: 200,
  });
});

const getUser = asyncHandler(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  const {
    user: { userId },
  } = req;

  const user = await getUserRecord('_id', userId);

  if (!user) throw ErrorException.fromCode('NotFound', { key: userId });

  handleSuccessResponse({
    res,
    data: user,
    message: 'User record found',
    statusCode: 200,
  });
});

export { deleteUser, getUser, login, register, updateUser };
