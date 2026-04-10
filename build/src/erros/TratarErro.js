"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NaoEncontrado = exports.RegraNegocio = exports.ManipulaErros = void 0;
exports.default = trataErros;
const EnumHttpStatusCode_1 = __importDefault(require("../enum/EnumHttpStatusCode"));
class ManipulaErros extends Error {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.ManipulaErros = ManipulaErros;
class RegraNegocio extends ManipulaErros {
    constructor(message) {
        super(message, EnumHttpStatusCode_1.default.BAD_REQUEST);
    }
}
exports.RegraNegocio = RegraNegocio;
class NaoEncontrado extends ManipulaErros {
    constructor(message) {
        super(message, EnumHttpStatusCode_1.default.NOT_FOUND);
    }
}
exports.NaoEncontrado = NaoEncontrado;
function trataErros(res, error, defaultMessage = "") {
    if (error instanceof RegraNegocio || error instanceof NaoEncontrado) {
        return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: defaultMessage });
}
