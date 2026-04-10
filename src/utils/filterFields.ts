import AppDataSource from "../config/dataSource";
import { RegraNegocio } from "../erros/tratarErro";

function filterFields(entity: any, data: any, omitFields: string[] = []) {
  const repository = AppDataSource.getRepository(entity);

  const allowedFields = repository.metadata.columns.map(
    (col) => col.propertyName,
  );

  const result: any = {};

  for (const key of allowedFields) {
    if (!omitFields.includes(key) && data[key] !== undefined) {
      result[key] = data[key];
    }
  }

  if (Object.keys(result).length === 0) {
    throw new RegraNegocio("Nenhum campo válido informado.");
  }

  return result;
}

export default filterFields;
