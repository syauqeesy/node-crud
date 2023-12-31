import { EntityManager } from "typeorm";
import Config from "../application/Config";
import { repository } from "../entity/main";

class Service {
  protected readonly config: Config;
  protected readonly repository: repository;
  protected readonly entityManager: EntityManager;

  constructor(
    config: Config,
    repository: repository,
    entityManager: EntityManager
  ) {
    this.config = config;
    this.repository = repository;
    this.entityManager = entityManager;
  }
}

export default Service;
