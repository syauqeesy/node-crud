import { Request, Response } from "express";
import Handler from "./Handler";

class User extends Handler {
  public async get(request: Request, response: Response): Promise<void> {
    response.status(200).json({
      status: true,
      message: "Get User Success",
      data: null,
    });

    return;
  }
}

export default User;
