"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataSource_1 = __importDefault(require("../config/dataSource"));
const editoraEntity_1 = __importDefault(require("../entity/editoraEntity"));
const filterFields_1 = __importDefault(require("../utils/filterFields"));
const tratarErro_1 = require("../erros/tratarErro");
const EditoraRepository = dataSource_1.default.getRepository(editoraEntity_1.default);
class EditoraService {
    static async checkDuplicidade(nome, id = 0) {
        const existente = await EditoraRepository.findOneBy({
            nome: nome,
        });
        if (existente && (id == 0 || existente.id !== id)) {
            throw new tratarErro_1.RegraNegocio("Editora já cadastrada");
        }
    }
    static async findAll() {
        return await EditoraRepository.find();
    }
    static async findById(id) {
        const editora = await EditoraRepository.findOne({ where: { id } });
        if (!editora) {
            throw new tratarErro_1.NaoEncontrado("Editora não encontrada");
        }
        return editora;
    }
    static async findByNome(nome) {
        const editora = await EditoraRepository.findOne({ where: { nome: nome } });
        return editora;
    }
    static async create(data) {
        const filteredData = (0, filterFields_1.default)(editoraEntity_1.default, data);
        await this.checkDuplicidade(filteredData.nome);
        const editora = await EditoraRepository.save(filteredData);
        return editora;
    }
    static async update(id, data) {
        let editora = await this.findById(id);
        const filteredData = (0, filterFields_1.default)(editoraEntity_1.default, data, ["id"]);
        editora = { ...editora, ...filteredData };
        await this.checkDuplicidade(editora.nome, id);
        await EditoraRepository.update({ id }, filteredData);
    }
    static async delete(id) {
        const editora = await this.findById(id);
        await EditoraRepository.delete({ id: editora.id });
    }
}
exports.default = EditoraService;
