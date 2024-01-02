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
  const dependencies = {
    config,
    repository,
    entityManager,
  };

  const s: service = {
    user: new User(dependencies),
  };

  return s;
};

export { newService, service };
