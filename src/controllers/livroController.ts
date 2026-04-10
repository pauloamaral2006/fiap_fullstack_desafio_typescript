import { Request, Response } from "express";

import EnumHttpStatusCode from "../enum/EnumHttpStatusCode";
import LivroService from "../services/livroService";
import trataErros from "../erros/tratarErro";

export default class LivroController {
  static async findAll(req: Request, res: Response) {
    const { autor, titulo, editoraId, editoraNome } = req.query;

    const parsedEditoraId = Number(editoraId);

    const lista = await LivroService.findAll({
      autor: typeof autor === "string" ? autor : undefined,
      titulo: typeof titulo === "string" ? titulo : undefined,
      editoraId: !isNaN(parsedEditoraId) ? parsedEditoraId : undefined,
      editoraNome: typeof editoraNome === "string" ? editoraNome : undefined,
    });

    return res.json(lista);
  }

  static async findById(req: Request, res: Response) {
    try {
      const result = await LivroService.findById(Number(req.params.id));
      return res.json(result);
    } catch (error) {
      trataErros(res, error, "Erro ao encontrar livro");
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const editora = await LivroService.create(req.body);
      return res
        .status(EnumHttpStatusCode.CREATED)
        .json({ message: "Livro criado com sucesso", data: editora });
    } catch (error) {
      trataErros(res, error, "Erro ao criar livro");
    }
  }

  static async update(req: Request, res: Response) {
    try {
      await LivroService.update(Number(req.params.id), req.body);
      return res.json({
        message: "Livro atualizado com sucesso",
      });
    } catch (error) {
      trataErros(res, error, "Erro ao atualizar livro");
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await LivroService.delete(Number(req.params.id));
      return res.json({ message: "Livro excluído com sucesso" });
    } catch (error) {
      trataErros(res, error, "Erro ao excluir livro");
    }
  }

  static async carregar(req: Request, res: Response) {
    try {
      const livros = await LivroService.carregar();
      return res.json({
        message: "Livros carregados com sucesso",
        livros: livros,
      });
    } catch (error) {
      trataErros(res, error, "Erro ao carregar livros");
    }
  }
}
