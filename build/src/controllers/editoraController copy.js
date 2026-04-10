"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EnumHttpStatusCode_1 = __importDefault(require("../enum/EnumHttpStatusCode"));
const editoraService_1 = __importDefault(require("../services/editoraService"));
const tratarErro_1 = __importDefault(require("../erros/tratarErro"));
class EditoraController {
    static async findAll(req, res) {
        const lista = await editoraService_1.default.findAll();
        return res.json(lista);
    }
    static async findById(req, res) {
        try {
            const result = await editoraService_1.default.findById(Number(req.params.id));
            return res.json(result);
        }
        catch (error) {
            (0, tratarErro_1.default)(res, error, "Erro ao encontrar editora");
        }
    }
    static async create(req, res) {
        try {
            const editora = await editoraService_1.default.create(req.body);
            return res
                .status(EnumHttpStatusCode_1.default.CREATED)
                .json({ message: "Editora criada com sucesso", data: editora });
        }
        catch (error) {
            (0, tratarErro_1.default)(res, error, "Erro ao criar editora");
        }
    }
    static async update(req, res) {
        try {
            const editora = await editoraService_1.default.update(Number(req.params.id), req.body);
            return res.json({
                message: "Editora atualizada com sucesso",
                data: editora,
            });
        }
        catch (error) {
            (0, tratarErro_1.default)(res, error, "Erro ao atualizar editora");
        }
    }
    static async delete(req, res) {
        try {
            await editoraService_1.default.delete(Number(req.params.id));
            return res.json({ message: "Editora excluída com sucesso" });
        }
        catch (error) {
            (0, tratarErro_1.default)(res, error, "Erro ao atualizar editora");
        }
    }
}
exports.default = EditoraController;
