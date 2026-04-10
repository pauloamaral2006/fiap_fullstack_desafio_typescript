"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EnumHttpStatusCode_1 = __importDefault(require("../enum/EnumHttpStatusCode"));
const livroService_1 = __importDefault(require("../services/livroService"));
const tratarErro_1 = __importDefault(require("../erros/tratarErro"));
class LivroController {
    static async findAll(req, res) {
        const { autor, titulo, editoraId, editoraNome } = req.query;
        const parsedEditoraId = Number(editoraId);
        const lista = await livroService_1.default.findAll({
            autor: typeof autor === "string" ? autor : undefined,
            titulo: typeof titulo === "string" ? titulo : undefined,
            editoraId: !isNaN(parsedEditoraId) ? parsedEditoraId : undefined,
            editoraNome: typeof editoraNome === "string" ? editoraNome : undefined,
        });
        return res.json(lista);
    }
    static async findById(req, res) {
        try {
            const result = await livroService_1.default.findById(Number(req.params.id));
            return res.json(result);
        }
        catch (error) {
            (0, tratarErro_1.default)(res, error, "Erro ao encontrar livro");
        }
    }
    static async create(req, res) {
        try {
            const editora = await livroService_1.default.create(req.body);
            return res
                .status(EnumHttpStatusCode_1.default.CREATED)
                .json({ message: "Livro criado com sucesso", data: editora });
        }
        catch (error) {
            (0, tratarErro_1.default)(res, error, "Erro ao criar livro");
        }
    }
    static async update(req, res) {
        try {
            await livroService_1.default.update(Number(req.params.id), req.body);
            return res.json({
                message: "Livro atualizado com sucesso",
            });
        }
        catch (error) {
            (0, tratarErro_1.default)(res, error, "Erro ao atualizar livro");
        }
    }
    static async delete(req, res) {
        try {
            await livroService_1.default.delete(Number(req.params.id));
            return res.json({ message: "Livro excluído com sucesso" });
        }
        catch (error) {
            (0, tratarErro_1.default)(res, error, "Erro ao excluir livro");
        }
    }
    static async carregar(req, res) {
        try {
            const livros = await livroService_1.default.carregar();
            return res.json({
                message: "Livros carregados com sucesso",
                livros: livros,
            });
        }
        catch (error) {
            (0, tratarErro_1.default)(res, error, "Erro ao carregar livros");
        }
    }
}
exports.default = LivroController;
