import { Request } from 'express';

export interface IGetUserAuthInfoRequest extends Request {
  user: { userId: string; username: string; email: string }; // or any other type
}
