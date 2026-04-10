import "reflect-metadata";
import { DataSource } from "typeorm";

import EditoraEntity from "../entity/editoraEntity";
import LivroEntity from "../entity/livroEntity";

const AppDataSource = new DataSource({
  type: "better-sqlite3",
  database: process.env.DB_CONNECTION_STRING || "./src/config/database.sqlite",
  entities: [EditoraEntity, LivroEntity],
  synchronize: true,
});

export default AppDataSource;
