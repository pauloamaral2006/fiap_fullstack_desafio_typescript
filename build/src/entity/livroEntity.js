"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const editoraEntity_1 = __importDefault(require("./editoraEntity"));
let LivroEntity = class LivroEntity {
    id;
    titulo;
    autor;
    isbn;
    ano_publicacao;
    editora;
    constructor(id, titulo, autor, isbn, ano_publicacao, editora) {
        this.titulo = titulo;
        this.autor = autor;
        this.isbn = isbn;
        this.ano_publicacao = ano_publicacao;
        this.editora = editora;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], LivroEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LivroEntity.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LivroEntity.prototype, "autor", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LivroEntity.prototype, "isbn", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], LivroEntity.prototype, "ano_publicacao", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => editoraEntity_1.default, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: "editora" }),
    __metadata("design:type", editoraEntity_1.default)
], LivroEntity.prototype, "editora", void 0);
LivroEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: "livros",
    }),
    __metadata("design:paramtypes", [Number, String, String, String, Number, editoraEntity_1.default])
], LivroEntity);
exports.default = LivroEntity;
