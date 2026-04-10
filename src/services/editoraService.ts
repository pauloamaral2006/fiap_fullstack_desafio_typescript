import AppDataSource from "../config/dataSource";
import EditoraEntity from "../entity/editoraEntity";
import filterFields from "../utils/filterFields";
import { NaoEncontrado, RegraNegocio } from "../erros/tratarErro";

const EditoraRepository = AppDataSource.getRepository(EditoraEntity);

export default class EditoraService {
  private static async checkDuplicidade(
    nome: string,
    id: number = 0,
  ): Promise<void> {
    const existente = await EditoraRepository.findOneBy({
      nome: nome,
    });

    if (existente && (id == 0 || existente.id !== id)) {
      throw new RegraNegocio("Editora já cadastrada");
    }
  }

  static async findAll(): Promise<EditoraEntity[]> {
    return await EditoraRepository.find();
  }

  static async findById(id: number): Promise<EditoraEntity> {
    const editora = await EditoraRepository.findOne({ where: { id } });

    if (!editora) {
      throw new NaoEncontrado("Editora não encontrada");
    }
    return editora;
  }

  static async findByNome(nome: string): Promise<EditoraEntity | null> {
    const editora = await EditoraRepository.findOne({ where: { nome: nome } });

    return editora;
  }

  static async create(data: EditoraEntity): Promise<EditoraEntity> {
    const filteredData = filterFields(EditoraEntity, data);
    await this.checkDuplicidade(filteredData.nome);
    const editora = await EditoraRepository.save(filteredData);
    return editora;
  }

  static async update(id: number, data: Partial<EditoraEntity>): Promise<void> {
    let editora = await this.findById(id);

    const filteredData = filterFields(EditoraEntity, data, ["id"]);
    editora = { ...editora, ...filteredData };

    await this.checkDuplicidade(editora.nome, id);

    await EditoraRepository.update({ id }, filteredData);
  }

  static async delete(id: number): Promise<void> {
    const editora = await this.findById(id);
    await EditoraRepository.delete({ id: editora.id });
  }
}
