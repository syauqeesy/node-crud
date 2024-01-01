import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Config from "../application/Config";
import { writeFailResponse } from "../common/response";

const verifyAuthenticationToken = (
  request: Request,
  response: Response,
  Next: NextFunction
): void => {
  const config = new Config();
  const authorization = request.header("authorization");

  if (!authorization) {
    writeFailResponse(response, 401, "unauthorized", null);
    return;
  }

  const token = authorization.split(" ")[1];

  try {
    jwt.verify(token, config.APPLICATION_KEY);
  } catch (err) {
    writeFailResponse(response, 401, "unauthorized", null);
    return;
  }

  return Next();
};

export default verifyAuthenticationToken;
