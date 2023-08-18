export class HttpError extends Error {
  statusCode: number;
  constructor(message: string, code: number) {
    console.log(`-- HttpError: `);
    super(message);
    this.statusCode = code;
  }
}
export class BadRequestError extends HttpError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class GoneRequestError extends HttpError {
  constructor(message: string) {
    super(message, 410);
  }
}
export class UnauthorizedError extends HttpError {
  constructor(message: string) {
    super(message, 401);
  }
}

export class ConflictError extends HttpError {
  constructor(message: string) {
    super(message, 409);
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string) {
    super(message, 404);
  }
}
