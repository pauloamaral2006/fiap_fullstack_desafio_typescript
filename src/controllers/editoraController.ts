import { Request, Response } from "express";

import EnumHttpStatusCode from "../enum/EnumHttpStatusCode";
import EditoraService from "../services/editoraService";
import trataErros from "../erros/tratarErro";

export default class EditoraController {
  static async findAll(req: Request, res: Response) {
    const lista = await EditoraService.findAll();
    return res.json(lista);
  }

  static async findById(req: Request, res: Response) {
    try {
      const result = await EditoraService.findById(Number(req.params.id));
      return res.json(result);
    } catch (error) {
      trataErros(res, error, "Erro ao encontrar editora");
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const editora = await EditoraService.create(req.body);
      return res
        .status(EnumHttpStatusCode.CREATED)
        .json({ message: "Editora criada com sucesso", data: editora });
    } catch (error) {
      trataErros(res, error, "Erro ao criar editora");
    }
  }

  static async update(req: Request, res: Response) {
    try {
      await EditoraService.update(Number(req.params.id), req.body);
      return res.json({
        message: "Editora atualizada com sucesso",
      });
    } catch (error) {
      trataErros(res, error, "Erro ao atualizar editora");
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await EditoraService.delete(Number(req.params.id));
      return res.json({ message: "Editora excluída com sucesso" });
    } catch (error) {
      trataErros(res, error, "Erro ao atualizar editora");
    }
  }
}
