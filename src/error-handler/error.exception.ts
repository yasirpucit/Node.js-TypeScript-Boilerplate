import { ErrorCode } from './error.code';

export class ErrorException extends Error {
  public readonly status: number;
  public readonly metaData?: any;

  constructor(code: string = ErrorCode.UnknownError, message: string, metaData: any = null, status: number = 500) {
    super(code);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = code;
    this.status = status;
    this.metaData = metaData;
    this.message = message;
  }

  static fromCode(code: string, metaData?: any): ErrorException {
    let status: number, message: string;
    switch (code) {
      case ErrorCode.DuplicateEntityError:
        status = 422;
        message = `${metaData.key || 'Data'} already exists`;
        break;
      case ErrorCode.Unauthenticated:
        status = 401;
        message = 'Unauthorized! Invalid Credentials';
        break;
      case ErrorCode.MissingRequestData:
        status = 400;
        message = 'Invalid data provided!';
        break;
      case ErrorCode.AsyncError:
        status = 400;
        message = 'Aync Error Occured';
        break;
      case ErrorCode.NotFound:
        status = 404;
        message = 'No record found';
        break;
      default:
        status = 500;
        message = `Unknown Error Occured`;
    }
    return new ErrorException(code, message, metaData, status);
  }
}
