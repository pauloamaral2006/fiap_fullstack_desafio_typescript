import fs from "fs";
import path from "path";

import AppDataSource from "../config/dataSource";
import filterFields from "../utils/filterFields";
import LivroEntity from "../entity/livroEntity";
import { NaoEncontrado, RegraNegocio } from "../erros/tratarErro";
import EditoraService from "./editoraService";
import { ILike } from "typeorm";
import EditoraEntity from "../entity/editoraEntity";

const LivroRepository = AppDataSource.getRepository(LivroEntity);

export default class LivroService {
  private static async checkDuplicidade(
    isbn: string,
    id: number = 0,
  ): Promise<void> {
    const existente = await LivroRepository.findOneBy({
      isbn: isbn,
    });

    if (existente && (id == 0 || existente.id !== id)) {
      throw new RegraNegocio("ISBN já cadastrado");
    }
  }

  static async findAll(filters?: {
    autor?: string;
    titulo?: string;
    editoraId?: number;
    editoraNome?: string;
  }): Promise<LivroEntity[]> {
    return await LivroRepository.find({
      where: {
        ...(filters?.autor && { autor: ILike(`%${filters.autor}%`) }),
        ...(filters?.titulo && { titulo: ILike(`%${filters.titulo}%`) }),
        ...(filters?.editoraId && {
          editora: { id: filters.editoraId },
        }),
        ...(filters?.editoraNome && {
          editora: { nome: ILike(`%${filters.editoraNome}%`) },
        }),
      },
      relations: ["editora"],
    });
  }

  static async findById(id: number): Promise<LivroEntity> {
    const livro = await LivroRepository.findOne({ where: { id } });
    console.log("Livro encontrado:", livro);
    if (!livro) {
      throw new NaoEncontrado("Livro não encontrado");
    }
    return livro;
  }

  static async create(data: LivroEntity): Promise<LivroEntity> {
    const filteredData = filterFields(LivroEntity, data);

    await EditoraService.findById(filteredData.editora);
    await this.checkDuplicidade(filteredData.isbn);

    const livro = await LivroRepository.save(filteredData);
    return livro;
  }

  static async update(id: number, data: Partial<LivroEntity>): Promise<void> {
    let livro = await this.findById(id);

    const filteredData = filterFields(LivroEntity, data, ["id"]);
    livro = { ...livro, ...filteredData };
    await this.checkDuplicidade(livro.isbn, id);

    await LivroRepository.update({ id }, filteredData);
  }

  static async delete(id: number): Promise<void> {
    const livro = await this.findById(id);
    await LivroRepository.delete({ id: livro.id });
  }

  private static async checkEditoraExistente(editoraId: number): Promise<void> {
    try {
      await EditoraService.findById(editoraId);
    } catch (error) {
      throw new RegraNegocio("Editora associada não encontrada");
    }
  }
  static async carregar(): Promise<LivroEntity[]> {
    try {
      const editoraCache = new Map<string, EditoraEntity | null>();
      const filePath = path.resolve("./src/config/livros.json");

      const file = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(file);

      const livros: LivroEntity[] = [];

      for (const item of parsed) {
        const livro = filterFields(LivroEntity, item);

        let editora = editoraCache.get(livro.editora.nome);

        if (!editora) {
          editora = await EditoraService.findByNome(livro.editora.nome);

          if (!editora) {
            const filteredData = filterFields(EditoraEntity, item.editora);
            editora = await EditoraService.create(filteredData);
          }

          editoraCache.set(livro.editora.nome, editora);
        }

        livro.editora = editora.id;
        livros.push(livro);
      }

      const isbns = livros.map((l) => l.isbn);

      const existentes = await LivroRepository.find({
        where: isbns.map((isbn: string) => ({ isbn })),
      });

      const existentesSet = new Set(existentes.map((l) => l.isbn));

      const novos = livros.filter((l) => !existentesSet.has(l.isbn));

      if (novos.length === 0) {
        return []; //
      }
      console.log("Livros a serem inseridos:", novos);
      const entities = LivroRepository.create(novos);
      return await LivroRepository.save(entities);
    } catch (error) {
      console.error("Erro ao carregar livros:", error);
      throw error;
    }
  }
}
