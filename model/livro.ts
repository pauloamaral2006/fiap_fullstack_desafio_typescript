import { Editora } from "../src/entities/editoraEntity";

export class Livro {
  titulo: string;
  autor: string;
  isbn: string;
  anoPublicacao: number;
  editora: Editora;

  constructor(
    titulo: string,
    autor: string,
    isbn: string,
    anoPublicacao: number,
    editora: Editora,
  ) {
    this.titulo = titulo;
    this.autor = autor;
    this.isbn = isbn;
    this.anoPublicacao = anoPublicacao;
    this.editora = editora;
  }
}
