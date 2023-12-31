import { Application, Request, Response } from "express";

import Config from "../application/Config";
import { service } from "../service/main";
import User from "./User";

type handler = {
  user: User;
};

const newHandler = (
  e: Application,
  config: Config,
  service: service
): handler => {
  const h: handler = {
    user: new User(config, service),
  };

  e.get("/api/v1/user", (req: Request, res: Response) => h.user.get(req, res));

  return h;
};

export { newHandler, handler };
