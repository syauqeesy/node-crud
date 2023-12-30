import { Server } from "http";
import express, { Application as ExpressApplication, json } from "express";
import Application from "./Application";

class Http implements Application {
  private readonly e: ExpressApplication;

  constructor() {
    this.e = express();
  }

  private closeServer(server: Server): void {
    console.log("closing server");

    server.close(() => console.log("server closed"));
  }

  public run(): void {
    this.e.use(json());

    const server = this.e.listen(5000, () =>
      console.log(`server run on port: ${5000}`)
    );

    process.on("SIGINT", (): void => this.closeServer(server));
    process.on("SIGTERM", (): void => this.closeServer(server));
  }
}

export default Http;
