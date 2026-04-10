"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = __importDefault(require("./src/app.js"));
const PORTA = process.env.DB_CONNECTION_PORT || 3000;
app_js_1.default.listen(PORTA, () => {
    console.log(`Servidor executando em http://localhost:${PORTA}`);
});
