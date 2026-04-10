"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EditoraController_1 = __importDefault(require("../controllers/EditoraController"));
const router = (0, express_1.Router)();
router.post("/", EditoraController_1.default.create);
router.get("/", EditoraController_1.default.findAll);
router.get("/:id", EditoraController_1.default.findById);
router.put("/:id", EditoraController_1.default.update);
router.delete("/:id", EditoraController_1.default.delete);
exports.default = router;
