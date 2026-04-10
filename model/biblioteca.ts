import { Livro } from "./livro";

export class Biblioteca {
    livros: Livro[];

    constructor() {
        this.livros = [];
    }

    adicionarLivro(livro: Livro): void {
        this.livros.push(livro);
    }

    listarLivros(): Livro[] {
        return this.livros;
    }
}