import Config from "../application/Config";
import { service } from "../service/main";

class Handler {
  protected readonly config: Config;
  protected readonly service: service;

  constructor(config: Config, service: service) {
    this.config = config;
    this.service = service;
  }
}

export default Handler;
