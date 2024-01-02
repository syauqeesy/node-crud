import { EntityManager } from "typeorm";
import Config from "../application/Config";
import { repository } from "../entity/main";

class Service {
  protected readonly config: Config;
  protected readonly repository: repository;
  protected readonly entityManager: EntityManager;

  constructor(dependencies: {
    config: Config;
    repository: repository;
    entityManager: EntityManager;
  }) {
    this.config = dependencies.config;
    this.repository = dependencies.repository;
    this.entityManager = dependencies.entityManager;
  }
}

export default Service;
