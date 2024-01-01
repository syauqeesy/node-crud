import { Response } from "express";

export const writeSuccessResponse = (
  res: Response,
  status: 200 | 201,
  message: string,
  data: unknown
): Response => {
  const response = {
    status: true,
    message: message,
    data: data,
  };

  return res.status(status).json(response);
};

export const writeFailResponse = (
  res: Response,
  status: 400 | 401 | 404 | 500,
  message: string,
  error: unknown
): Response => {
  const response = {
    status: false,
    message: message,
    error: error,
  };

  return res.status(status).json(response);
};
