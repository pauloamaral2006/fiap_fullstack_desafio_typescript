"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// services/livro.service.ts
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.default = {
    create(data) {
        return prisma.livro.create({ data });
    },
    findAll() {
        return prisma.livro.findMany({
            include: { editora: true },
        });
    },
    findById(id) {
        return prisma.livro.findUnique({
            where: { id },
        });
    },
    update(id, data) {
        return prisma.livro.update({
            where: { id },
            data,
        });
    },
    delete(id) {
        return prisma.livro.delete({
            where: { id },
        });
    },
};
