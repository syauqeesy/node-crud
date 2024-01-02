import Config from "../application/Config";
import { service } from "../service/main";

class Handler {
  protected readonly config: Config;
  protected readonly service: service;

  constructor(dependencies: { config: Config; service: service }) {
    this.config = dependencies.config;
    this.service = dependencies.service;
  }
}

export default Handler;
