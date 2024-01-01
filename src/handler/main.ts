import { Application, Request, Response } from "express";

import Config from "../application/Config";
import { service } from "../service/main";
import User from "./User";
import verifyAuthenticationToken from "../middleware/verifyAuthenticationToken";

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

  e.post("/api/v1/user/create", (req: Request, res: Response) =>
    h.user.create(req, res)
  );
  e.post("/api/v1/user/login", (req: Request, res: Response) =>
    h.user.login(req, res)
  );
  e.get(
    "/api/v1/user/:id",
    [verifyAuthenticationToken],
    (req: Request, res: Response) => h.user.getById(req, res)
  );

  return h;
};

export { newHandler, handler };
