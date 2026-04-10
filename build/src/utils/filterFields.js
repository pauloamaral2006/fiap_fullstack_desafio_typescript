"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataSource_1 = __importDefault(require("../config/dataSource"));
const tratarErro_1 = require("../erros/tratarErro");
function filterFields(entity, data, omitFields = []) {
    const repository = dataSource_1.default.getRepository(entity);
    const allowedFields = repository.metadata.columns.map((col) => col.propertyName);
    const result = {};
    for (const key of allowedFields) {
        if (!omitFields.includes(key) && data[key] !== undefined) {
            result[key] = data[key];
        }
    }
    if (Object.keys(result).length === 0) {
        throw new tratarErro_1.RegraNegocio("Nenhum campo válido informado.");
    }
    return result;
}
exports.default = filterFields;
