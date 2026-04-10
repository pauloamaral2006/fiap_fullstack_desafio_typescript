"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const editoraRouter_1 = __importDefault(require("./editoraRouter"));
const livroRouter_1 = __importDefault(require("./livroRouter"));
const erro_1 = require("../middleware/erro");
const router = (app) => {
    app.route("/").get((req, res) => {
        res
            .status(200)
            .send("Desafio de Projeto - Sistema de Gerenciamento de Biblioteca");
    });
    app.use(express_1.default.json(), erro_1.erroMiddleware, editoraRouter_1.default, livroRouter_1.default);
};
exports.default = router;
