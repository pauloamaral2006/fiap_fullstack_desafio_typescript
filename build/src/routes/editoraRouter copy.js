"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const editoraController_1 = __importDefault(require("../controllers/editoraController"));
const router = (0, express_1.Router)();
router.get("/editora", editoraController_1.default.findAll);
router.get("/editora/:id", editoraController_1.default.findById);
router.post("/editora", editoraController_1.default.create);
router.put("/editora/:id", editoraController_1.default.update);
router.delete("/editora/:id", editoraController_1.default.delete);
exports.default = router;
