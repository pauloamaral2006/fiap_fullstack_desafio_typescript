"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistroDuplicado = void 0;
const EnumHttpStatusCode_1 = require("../enum/EnumHttpStatusCode");
class RegistroDuplicado extends Error {
    statusCode;
    constructor(message, statusCode = EnumHttpStatusCode_1.EnumHttpStatusCode.BAD_REQUEST) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.RegistroDuplicado = RegistroDuplicado;
