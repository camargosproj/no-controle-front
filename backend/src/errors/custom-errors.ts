export class HttpError extends Error {
  code: number;
  constructor(message: string, code: number) {
    console.log(`-- HttpError: `);
    super(message);
    this.code = code;
  }
}
export class BadRequestError extends HttpError {
  constructor(message: string) {
    super(message, 400);
  }
}
export class UnauthorizedError extends HttpError {
  constructor(message: string) {
    super(message, 401);
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string) {
    super(message, 404);
  }
}
