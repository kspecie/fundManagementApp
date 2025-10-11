export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public code?: string;

  constructor(
    message: string,
    statusCode: number,
    isOperational = true,
    code?: string
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.code = code;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(message, 400);
    this.name = "ValidationError";
    this.code = field
      ? `VALIDATION_${field.toUpperCase()}`
      : "VALIDATION_ERROR";
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, id?: string) {
    const message = id
      ? `${resource} with id ${id} not found`
      : `${resource} not found`;
    super(message, 404);
    this.name = "NotFoundError";
    this.code = "RESOURCE_NOT_FOUND";
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409);
    this.name = "ConflictError";
    this.code = "RESOURCE_CONFLICT";
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, originalError?: any) {
    super(message, 500);
    this.name = "DatabaseError";
    this.code = "DATABASE_ERROR";

    // Log the original error for debugging
    if (originalError) {
      console.error("Original database error:", originalError);
    }
  }
}

export class ForeignKeyError extends AppError {
  constructor(resource: string, id: string) {
    super(`${resource} with id ${id} does not exist`, 400);
    this.name = "ForeignKeyError";
    this.code = "FOREIGN_KEY_VIOLATION";
  }
}

export class UniqueConstraintError extends AppError {
  constructor(field: string, value: string) {
    super(`${field} '${value}' already exists`, 409);
    this.name = "UniqueConstraintError";
    this.code = "UNIQUE_CONSTRAINT_VIOLATION";
  }
}
