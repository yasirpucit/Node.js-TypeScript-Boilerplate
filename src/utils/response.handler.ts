import { Response } from 'express';

/**
 * Handles successful responses.
 * @param res - Express Response object.
 * @param data - The payload to be sent in the response.
 * @param message - Optional message describing the success.
 * @param statusCode - HTTP status code (default: 200).
 */
const handleSuccessResponse = <T>({
  res,
  data,
  message = 'Success',
  statusCode = 200,
}: {
  res: Response;
  data: T;
  message?: string;
  statusCode?: number;
}): void => {
  res.status(statusCode).json({
    statusCode,
    message,
    data,
  });
};

/**
 * Handles error responses.
 * @param res - Express Response object.
 * @param errorMessage - Description of the error.
 * @param statusCode - HTTP status code (default: 500).
 * @param errorDetails - Additional details about the error (optional).
 */
const handleErrorResponse = ({
  res,
  errorMessage,
  statusCode = 500,
  errorDetails,
}: {
  res: Response;
  errorMessage: string;
  statusCode?: number;
  errorDetails?: any;
}): void => {
  const errorResponse: { statusCode: number; error: string; details?: any } = {
    statusCode,
    error: errorMessage,
    ...(errorDetails && { details: errorDetails }),
  };

  res.status(statusCode).json(errorResponse);
};

export { handleErrorResponse, handleSuccessResponse };
