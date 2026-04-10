"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const livroController_1 = __importDefault(require("../controllers/livroController"));
const router = (0, express_1.Router)();
router.get("/livro", livroController_1.default.findAll);
router.get("/livro/:id", livroController_1.default.findById);
router.post("/livro", livroController_1.default.create);
router.put("/livro/:id", livroController_1.default.update);
router.delete("/livro/:id", livroController_1.default.delete);
router.post("/livro/carregar", livroController_1.default.carregar);
exports.default = router;
