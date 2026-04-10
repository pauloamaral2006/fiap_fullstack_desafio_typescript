import { Router } from "express";

import LivroController from "../controllers/livroController";

const router = Router();

router.get("/livro", LivroController.findAll);
router.get("/livro/:id", LivroController.findById);
router.post("/livro", LivroController.create);
router.put("/livro/:id", LivroController.update);
router.delete("/livro/:id", LivroController.delete);
router.post("/livro/carregar", LivroController.carregar);

export default router;
