"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const dataSource_1 = __importDefault(require("./config/dataSource"));
const routes_1 = __importDefault(require("./routes"));
dataSource_1.default.initialize()
    .then(() => {
    console.log("Banco de dados conectado.");
})
    .catch((err) => {
    console.error("Erro na conexão com o banco de dados", err);
});
const app = (0, express_1.default)();
(0, routes_1.default)(app);
exports.default = app;
