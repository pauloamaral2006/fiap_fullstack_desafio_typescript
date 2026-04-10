import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import EditoraEntity from "./editoraEntity";

@Entity({
  name: "livros",
})
export default class LivroEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  titulo: string;
  @Column()
  autor: string;
  @Column()
  isbn: string;
  @Column()
  ano_publicacao: number;
  @OneToOne(() => EditoraEntity, { eager: true })
  @JoinColumn()
  editora: EditoraEntity;

  constructor(
    id: number,
    titulo: string,
    autor: string,
    isbn: string,
    ano_publicacao: number,
    editora: EditoraEntity,
  ) {
    this.titulo = titulo;
    this.autor = autor;
    this.isbn = isbn;
    this.ano_publicacao = ano_publicacao;
    this.editora = editora;
  }
}
