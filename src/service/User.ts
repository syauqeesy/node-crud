import jwt from "jsonwebtoken";

import {
  ApplicationError,
  newApplicationError,
} from "../application-error/main";
import {
  ERROR_USER_NOT_FOUND,
  ERROR_USER_PASSWORD_WRONG,
  ERROR_USER_USERNAME_ALREADY_USED,
} from "../application-error/user";
import { UserEntity } from "../entity/main";
import {
  CreateUserRequest,
  LoginRequest,
  LoginResponse,
  UserInfo,
} from "../payload/user";
import Service from "./Service";

interface UserService {
  create(body: CreateUserRequest): Promise<[UserInfo | null, ApplicationError]>;
  login(body: LoginRequest): Promise<[LoginResponse | null, ApplicationError]>;
}

class User extends Service implements UserService {
  public async create(
    body: CreateUserRequest
  ): Promise<[UserInfo | null, ApplicationError]> {
    const usernameUsed = await this.repository.user.findOne({
      where: {
        username: body.username,
      },
    });
    if (usernameUsed) return [null, ERROR_USER_USERNAME_ALREADY_USED];

    const user = new UserEntity();
    user.setUsername(body.username);
    user.setPassword(body.password);

    try {
      await user.save();
    } catch (err) {
      if (err instanceof Error)
        return [null, newApplicationError(500, err.message)];
    }

    return [user.getPublicInfo(), null];
  }

  public async login(
    body: LoginRequest
  ): Promise<[LoginResponse | null, ApplicationError]> {
    const user = await this.repository.user.findOne({
      where: {
        username: body.username,
      },
    });
    if (!user) return [null, ERROR_USER_NOT_FOUND];

    if (!user.comparePassword(body.password))
      return [null, ERROR_USER_PASSWORD_WRONG];

    const token = jwt.sign(
      {
        id: user.id,
      },
      this.config.APPLICATION_KEY,
      {
        expiresIn: 3600 * 24,
      }
    );

    return [
      {
        authentication_token: token,
      },
      null,
    ];
  }
}

export { UserService, User };
