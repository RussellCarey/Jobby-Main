import "reflect-metadata";
import { User } from "./src/entity/User";
import { Task } from "./src/entity/Task";
import { Project } from "./src/entity/Project";
import { Update } from "./src/entity/Update";

module.exports = {
  type: "postgres",
  host: process.env.PROD_DB_HOST,
  port: parseInt(process.env.PROD_DB_PORT),
  username: process.env.PROD_DB_USERNAME,
  password: process.env.PROD_DB_PW,
  database: process.env.PROD_DB_NAME,
  synchronize: true,
  logging: false,
  entities: ["src/entity/**/*.ts"],
  migrations: [__dirname + "/migration/**/*.ts"],
  subscribers: [],
  seeds: ["src/database/seeds/**/*.ts"],
  factories: ["src/database/factories/**/*.ts"],
};
