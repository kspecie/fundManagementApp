import { Request, Response, NextFunction } from "express";
import { AppError } from "./AppError";

export interface ErrorResponse {
  error: {
    message: string;
    code?: string;
    statusCode: number;
    timestamp: string;
    path: string;
  };
}

export const handleDatabaseError = (error: any): AppError => {
  // Handle PostgreSQL specific errors
  if (error.code) {
    switch (error.code) {
      case "23503": // Foreign key violation
        const match = error.detail?.match(
          /Key \(([^)]+)\)=\(([^)]+)\) is not present in table "([^"]+)"/
        );
        if (match) {
          const [, , id, table] = match;
          return new (require("./AppError").ForeignKeyError)(table, id);
        }
        return new (require("./AppError").ForeignKeyError)(
          "Referenced resource",
          "unknown"
        );

      case "23505": // Unique constraint violation
        const uniqueMatch = error.detail?.match(
          /Key \(([^)]+)\)=\(([^)]+)\) already exists/
        );
        if (uniqueMatch) {
          const [, field, value] = uniqueMatch;
          return new (require("./AppError").UniqueConstraintError)(
            field,
            value
          );
        }
        return new (require("./AppError").ConflictError)(
          "Resource already exists"
        );

      case "23502": // Not null violation
        return new (require("./AppError").ValidationError)(
          "Required field is missing"
        );

      case "23514": // Check constraint violation
        return new (require("./AppError").ValidationError)(
          "Invalid data provided"
        );

      default:
        return new (require("./AppError").DatabaseError)(
          `Database error: ${error.message}`,
          error
        );
    }
  }

  return new (require("./AppError").DatabaseError)(
    error.message || "Database operation failed",
    error
  );
};

export const globalErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let appError: AppError;

  // If it's already an AppError, use it
  if (error instanceof AppError) {
    appError = error;
  } else {
    // Handle database errors
    if (error.name === "error" && (error as any).code) {
      appError = handleDatabaseError(error);
    } else {
      // Generic error
      appError = new AppError(
        error.message || "An unexpected error occurred",
        500,
        false
      );
    }
  }

  // Log error for debugging
  console.error("Error occurred:", {
    message: appError.message,
    statusCode: appError.statusCode,
    code: appError.code,
    stack: appError.stack,
    url: req.url,
    method: req.method,
    body: req.body,
    params: req.params,
  });

  const errorResponse: ErrorResponse = {
    error: {
      message: appError.message,
      code: appError.code,
      statusCode: appError.statusCode,
      timestamp: new Date().toISOString(),
      path: req.path,
    },
  };

  res.status(appError.statusCode).json(errorResponse);
};

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
