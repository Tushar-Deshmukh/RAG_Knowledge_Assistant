export interface AppErrorOptions {
  details?: unknown;
  cause?: unknown;
}

export class AppError extends Error {
  readonly code: string;
  readonly httpStatus: number;
  readonly details?: unknown;

  constructor(
    message: string,
    code: string,
    httpStatus: number,
    options: AppErrorOptions = {},
  ) {
    super(
      message,
      options.cause === undefined ? undefined : { cause: options.cause },
    );
    this.name = new.target.name;
    this.code = code;
    this.httpStatus = httpStatus;
    this.details = options.details;
  }
}

export class DimensionMismatchError extends AppError {
  constructor(message: string, details?: { left: number; right: number }) {
    super(message, "DIMENSION_MISMATCH", 500, { details });
  }
}

export class ZeroVectorError extends AppError {
  constructor(message: string) {
    super(message, "ZERO_VECTOR", 422);
  }
}
