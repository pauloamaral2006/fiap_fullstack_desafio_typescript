import express from "express";
import "reflect-metadata";

import AppDataSource from "./config/dataSource";
import router from "./routes";

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado.");
  })
  .catch((err) => {
    console.error("Erro na conexão com o banco de dados", err);
  });

const app = express();
router(app);

export default app;
