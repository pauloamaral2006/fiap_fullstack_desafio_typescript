"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dataSource_1 = __importDefault(require("../config/dataSource"));
const filterFields_1 = __importDefault(require("../utils/filterFields"));
const livroEntity_1 = __importDefault(require("../entity/livroEntity"));
const tratarErro_1 = require("../erros/tratarErro");
const editoraService_1 = __importDefault(require("./editoraService"));
const typeorm_1 = require("typeorm");
const editoraEntity_1 = __importDefault(require("../entity/editoraEntity"));
const LivroRepository = dataSource_1.default.getRepository(livroEntity_1.default);
class LivroService {
    static async checkDuplicidade(titulo, id = 0) {
        const existente = await LivroRepository.findOneBy({
            titulo: titulo,
        });
        if (existente && (id == 0 || existente.id !== id)) {
            throw new tratarErro_1.RegraNegocio("Livro já cadastrado");
        }
    }
    static async findAll(filters) {
        return await LivroRepository.find({
            where: {
                ...(filters?.autor && { autor: (0, typeorm_1.ILike)(`%${filters.autor}%`) }),
                ...(filters?.titulo && { titulo: (0, typeorm_1.ILike)(`%${filters.titulo}%`) }),
                ...(filters?.editoraId && {
                    editora: { id: filters.editoraId },
                }),
                ...(filters?.editoraNome && {
                    editora: { nome: (0, typeorm_1.ILike)(`%${filters.editoraNome}%`) },
                }),
            },
            relations: ["editora"],
        });
    }
    static async findById(id) {
        const livro = await LivroRepository.findOne({ where: { id } });
        console.log("Livro encontrado:", livro);
        if (!livro) {
            throw new tratarErro_1.NaoEncontrado("Livro não encontrado");
        }
        return livro;
    }
    static async create(data) {
        const filteredData = (0, filterFields_1.default)(livroEntity_1.default, data);
        await editoraService_1.default.findById(filteredData.editora);
        await this.checkDuplicidade(filteredData.titulo);
        const livro = await LivroRepository.save(filteredData);
        return livro;
    }
    static async update(id, data) {
        let livro = await this.findById(id);
        const filteredData = (0, filterFields_1.default)(livroEntity_1.default, data, ["id"]);
        livro = { ...livro, ...filteredData };
        await this.checkDuplicidade(livro.titulo, id);
        await LivroRepository.update({ id }, filteredData);
    }
    static async delete(id) {
        const livro = await this.findById(id);
        await LivroRepository.delete({ id: livro.id });
    }
    static async checkEditoraExistente(editoraId) {
        try {
            await editoraService_1.default.findById(editoraId);
        }
        catch (error) {
            throw new tratarErro_1.RegraNegocio("Editora associada não encontrada");
        }
    }
    static async carregar() {
        try {
            const editoraCache = new Map();
            const filePath = path_1.default.resolve("./src/config/livros.json");
            const file = fs_1.default.readFileSync(filePath, "utf-8");
            const parsed = JSON.parse(file);
            const livros = [];
            for (const item of parsed) {
                const livro = (0, filterFields_1.default)(livroEntity_1.default, item);
                let editora = editoraCache.get(livro.editora.nome);
                if (!editora) {
                    editora = await editoraService_1.default.findByNome(livro.editora.nome);
                    if (!editora) {
                        const filteredData = (0, filterFields_1.default)(editoraEntity_1.default, item.editora);
                        editora = await editoraService_1.default.create(filteredData);
                    }
                    editoraCache.set(livro.editora.nome, editora);
                }
                livro.editora = editora.id;
                livros.push(livro);
            }
            const isbns = livros.map((l) => l.isbn);
            const existentes = await LivroRepository.find({
                where: isbns.map((isbn) => ({ isbn })),
            });
            const existentesSet = new Set(existentes.map((l) => l.isbn));
            const novos = livros.filter((l) => !existentesSet.has(l.isbn));
            if (novos.length === 0) {
                return []; // ✅ sempre retorna array
            }
            const entities = LivroRepository.create(novos);
            return await LivroRepository.save(entities);
        }
        catch (error) {
            console.error("Erro ao carregar livros:", error);
            throw error;
        }
    }
}
exports.default = LivroService;
