import { newApplicationError } from "./main";

export const ERROR_USER_USERNAME_ALREADY_USED = newApplicationError(
  400,
  "username already used"
);
