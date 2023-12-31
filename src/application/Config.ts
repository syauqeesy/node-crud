import { config } from "dotenv";

class Config {
  public readonly APPLICATION_PORT: number;
  public readonly APPLICATION_BASE_URL: string;
  public readonly APPLICATION_KEY: string;

  public readonly DATABASE_TYPE: "mysql";
  public readonly DATABASE_HOST: string;
  public readonly DATABASE_PORT: number;
  public readonly DATABASE_USER: string;
  public readonly DATABASE_PASSWORD: string;
  public readonly DATABASE_NAME: string;

  constructor() {
    config();

    this.APPLICATION_PORT = this.env<number>("APPLICATION_PORT", 5000);
    this.APPLICATION_BASE_URL = this.env<string>(
      "APPLICATION_BASE_URL",
      "localhost:5000"
    );
    this.APPLICATION_KEY = this.env<string>("APPLICATION_KEY", "");

    this.DATABASE_TYPE = this.env<"mysql">("DATABASE_TYPE", "mysql");
    this.DATABASE_HOST = this.env<string>("DATABASE_HOST", "127.0.0.1");
    this.DATABASE_PORT = this.env<number>("DATABASE_PORT", 3306);
    this.DATABASE_USER = this.env<string>("DATABASE_USER", "root");
    this.DATABASE_PASSWORD = this.env<string>("DATABASE_PASSWORD", "");
    this.DATABASE_NAME = this.env<string>("DATABASE_NAME", "node_crud");
  }

  private env<T>(name: string, defaultValue?: T): T {
    return process.env[name] ? (process.env[name] as T) : (defaultValue as T);
  }
}

export default Config;
