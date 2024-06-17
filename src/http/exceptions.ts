class CustomError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    console.log(statusCode)
  }
}

class Exceptions {
  public static _400(message: string = 'Solicitud incorrecta'): CustomError {
    throw new CustomError(message, 400);
  }

  public static _401(message: string = 'No autorizado'): CustomError {
    throw new CustomError(message, 401);
  }

  public static _403(message: string = 'Prohibido'): CustomError {
    throw new CustomError(message, 403);
  }

  public static _404(message: string = 'Recurso no encontrado'): CustomError {
    throw new CustomError(message, 404);
  }

  public static _408(message: string = 'Tiempo de espera agotado'): CustomError {
    throw new CustomError(message, 408);
  }

  public static _405(message: string = 'Método no permitido'): CustomError {
    throw new CustomError(message, 405);
  }

  public static _409(message: string = 'Conflicto'): CustomError {
    throw new CustomError(message, 409);
  }

  public static _500(message: string = 'Error interno del servidor'): CustomError {
    throw new CustomError(message, 500);
  }
}

export { CustomError, Exceptions };
