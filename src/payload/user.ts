export type UserInfo = {
  id: string;
  username: string;
  created_at: string;
};

export type CreateUserRequest = {
  username: string;
  password: string;
};

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  authentication_token: string;
};
