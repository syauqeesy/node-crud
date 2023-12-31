import { Server } from "http";
import express, { Application as ExpressApplication, json } from "express";

import Application from "./Application";
import Config from "./Config";
import Database from "./Database";
import { newService, service } from "../service/main";
import { newRepository, repository } from "../entity/main";
import { newHandler } from "../handler/main";

class Http implements Application {
  private readonly e: ExpressApplication;

  private readonly config: Config;
  private readonly database: Database;

  private readonly repository: repository;
  private readonly service: service;

  constructor() {
    this.e = express();

    this.config = new Config();
    this.database = new Database(this.config);

    this.repository = newRepository(this.database.getDataSource());
    this.service = newService(
      this.config,
      this.repository,
      this.database.getDataSource().createEntityManager()
    );
  }

  private closeServer(server: Server): void {
    console.log("closing server");

    this.database.disconnect();

    server.close(() => console.log("server closed"));
  }

  public run(): void {
    this.e.use(json());

    if (!this.config.APPLICATION_KEY) {
      return console.log("application key is not set");
    }

    this.database.connect();

    newHandler(this.e, this.config, this.service);

    const server = this.e.listen(this.config.APPLICATION_PORT, () => {
      console.log(`server run on port: ${this.config.APPLICATION_PORT}`);
    });

    process.on("SIGINT", (): void => this.closeServer(server));
    process.on("SIGTERM", (): void => this.closeServer(server));
  }
}

export default Http;
