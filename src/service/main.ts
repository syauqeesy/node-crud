import { EntityManager } from "typeorm";
import Config from "../application/Config";
import { repository } from "../entity/main";

import { User, UserService } from "./User";

type service = {
  user: UserService;
};

const newService = (
  config: Config,
  repository: repository,
  entityManager: EntityManager
): service => {
  const s: service = {
    user: new User(config, repository, entityManager),
  };

  return s;
};

export { newService, service };
