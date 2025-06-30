import * as dotenv from "dotenv";
dotenv.config();
import { DataSource } from "typeorm";
import { Books } from "./entity/Books";
import { Reviews } from "./entity/Reviews";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER,
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [Books, Reviews],
  migrations: ['src/migrations/**/*.ts'],
});
