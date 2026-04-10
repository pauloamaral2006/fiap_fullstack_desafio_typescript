"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const editoraEntity_1 = __importDefault(require("../entity/editoraEntity"));
const livroEntity_1 = __importDefault(require("../entity/livroEntity"));
const AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: process.env.DB_CONNECTION_STRING || "./src/config/database.sqlite",
    entities: [editoraEntity_1.default, livroEntity_1.default],
    synchronize: true,
});
exports.default = AppDataSource;
