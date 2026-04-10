import { Router } from "express";

import EditoraController from "../controllers/editoraController";

const router = Router();

router.get("/editora", EditoraController.findAll);
router.get("/editora/:id", EditoraController.findById);
router.post("/editora", EditoraController.create);
router.put("/editora/:id", EditoraController.update);
router.delete("/editora/:id", EditoraController.delete);

export default router;
