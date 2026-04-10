import express from "express";

import editoraRouter from "./editoraRouter";
import livroRouter from "./livroRouter";
import { erroMiddleware } from "../middleware/erro";

const router = (app: express.Application) => {
  app.route("/").get((req, res) => {
    res
      .status(200)
      .send("Desafio de Projeto - Sistema de Gerenciamento de Biblioteca");
  });
  app.use(express.json(), erroMiddleware, editoraRouter, livroRouter);
};

export default router;
