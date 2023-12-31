import { newApplicationError } from "./main";

export const ERROR_USER_USERNAME_ALREADY_USED = newApplicationError(
  400,
  "username already used"
);

export const ERROR_USER_NOT_FOUND = newApplicationError(
  404,
  "username not found"
);
export const ERROR_USER_PASSWORD_WRONG = newApplicationError(
  400,
  "password wrong"
);
