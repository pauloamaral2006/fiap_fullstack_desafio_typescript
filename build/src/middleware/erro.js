"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.erroMiddleware = void 0;
const EnumHttpStatusCode_1 = __importDefault(require("../enum/EnumHttpStatusCode"));
const erroMiddleware = (erro, req, res, next) => {
    const statusCode = erro.statusCode ?? EnumHttpStatusCode_1.default.INTERNAL_SERVER_ERROR;
    const mensagem = erro.statusCode ? erro.message : "Erro interno do servidor";
    res.status(statusCode).json({ mensagem });
    return next();
};
exports.erroMiddleware = erroMiddleware;
