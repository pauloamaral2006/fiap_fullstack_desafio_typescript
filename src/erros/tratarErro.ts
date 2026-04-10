import { Response } from "express";

import EnumHttpStatusCode from "../enum/EnumHttpStatusCode";

export class ManipulaErros extends Error {
  readonly statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class RegraNegocio extends ManipulaErros {
  constructor(message: string) {
    super(message, EnumHttpStatusCode.BAD_REQUEST);
  }
}
export class NaoEncontrado extends ManipulaErros {
  constructor(message: string) {
    super(message, EnumHttpStatusCode.NOT_FOUND);
  }
}

export default function trataErros(
  res: Response,
  error: unknown,
  defaultMessage = "",
) {
  if (error instanceof RegraNegocio || error instanceof NaoEncontrado) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  return res.status(500).json({ message: defaultMessage });
}
