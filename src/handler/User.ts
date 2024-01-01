import { Request, Response } from "express";
import Handler from "./Handler";
import {
  CreateUserRequest,
  GetUserByIdRequest,
  LoginRequest,
} from "../payload/user";
import {
  createUserRequestValidation,
  getUserByIdRequestValidation,
  loginRequestValidation,
} from "../validation/user";
import { writeFailResponse, writeSuccessResponse } from "../common/response";

class User extends Handler {
  public async create(request: Request, response: Response): Promise<void> {
    const body: CreateUserRequest = request.body;

    const validated = createUserRequestValidation.validate(body);
    if (validated.error) {
      writeFailResponse(
        response,
        400,
        "validation error",
        validated.error.details
      );
      return;
    }

    const [result, err] = await this.service.user.create(body);
    if (err) {
      writeFailResponse(response, err.code, err.message, null);
      return;
    }

    if (result)
      writeSuccessResponse(response, 200, "create user success", result);
    return;
  }

  public async login(request: Request, response: Response): Promise<void> {
    const body: LoginRequest = request.body;

    const validated = loginRequestValidation.validate(body);
    if (validated.error) {
      writeFailResponse(
        response,
        400,
        "validation error",
        validated.error.details
      );
      return;
    }

    const [result, err] = await this.service.user.login(body);
    if (err) {
      writeFailResponse(response, err.code, err.message, null);
      return;
    }

    if (result) writeSuccessResponse(response, 200, "login success", result);
    return;
  }

  public async getById(request: Request, response: Response): Promise<void> {
    const body: GetUserByIdRequest = {
      id: request.params.id,
    };

    const validated = getUserByIdRequestValidation.validate(body);
    if (validated.error) {
      writeFailResponse(
        response,
        400,
        "validation error",
        validated.error.details
      );
      return;
    }

    const [result, err] = await this.service.user.getById(body);
    if (err) {
      writeFailResponse(response, err.code, err.message, null);
      return;
    }

    if (result) writeSuccessResponse(response, 200, "get user success", result);
    return;
  }
}

export default User;
