import { DataSource } from "typeorm";

import Config from "./Config";

class Database {
  private readonly config: Config;
  private readonly database: DataSource;

  constructor(config: Config) {
    this.config = config;

    const dataSourceConfig = {
      type: this.config.DATABASE_TYPE,
      host: this.config.DATABASE_HOST,
      port: this.config.DATABASE_PORT,
      username: this.config.DATABASE_USER,
      password: this.config.DATABASE_PASSWORD,
      database: this.config.DATABASE_NAME,
      entities: ["./dist/entity/*.js"],
      migrations: ["./dist/migration/*.js"],
      migrationsTableName: "migrations",
    };

    this.database = new DataSource(dataSourceConfig);
  }

  public connect(): void {
    this.database
      .initialize()
      .then(() => {
        console.log("database connected");
      })
      .catch(() => {
        console.error("failed to connect to database");
      });
  }

  public disconnect(): void {
    this.database
      .destroy()
      .then(() => {
        console.log("database disconnected");
      })
      .catch(() => {
        console.error("failed to disconnect from database");
      });
  }

  getDataSource(): DataSource {
    return this.database;
  }
}

export default Database;
