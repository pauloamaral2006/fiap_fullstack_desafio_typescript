"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const livro_service_1 = __importDefault(require("../services/livro.service"));
exports.default = {
    async create(req, res) {
        const livro = await livro_service_1.default.create(req.body);
        return res.json(livro);
    },
    async findAll(req, res) {
        const livros = await livro_service_1.default.findAll();
        return res.json(livros);
    },
    async findById(req, res) {
        const livro = await livro_service_1.default.findById(Number(req.params.id));
        return res.json(livro);
    },
    async update(req, res) {
        const livro = await livro_service_1.default.update(Number(req.params.id), req.body);
        return res.json(livro);
    },
    async delete(req, res) {
        await livro_service_1.default.delete(Number(req.params.id));
        return res.json({ message: "Deletado" });
    },
};
