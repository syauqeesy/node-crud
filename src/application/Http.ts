import { Server } from "http";
import express, { Application as ExpressApplication, json } from "express";

import Application from "./Application";
import Config from "./Config";
import Database from "./Database";

class Http implements Application {
  private readonly e: ExpressApplication;

  private readonly config: Config;
  private readonly database: Database;

  constructor() {
    this.e = express();

    this.config = new Config();
    this.database = new Database(this.config);
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

    const server = this.e.listen(this.config.APPLICATION_PORT, () => {
      console.log(`server run on port: ${this.config.APPLICATION_PORT}`);

      this.database.connect();
    });

    process.on("SIGINT", (): void => this.closeServer(server));
    process.on("SIGTERM", (): void => this.closeServer(server));
  }
}

export default Http;
