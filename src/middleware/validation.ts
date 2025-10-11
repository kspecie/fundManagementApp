import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../errors/AppError";

export interface ValidationRule {
  field: string;
  required?: boolean;
  type?: "string" | "number" | "email" | "uuid" | "date";
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  enum?: string[];
}

export const validateRequest = (rules: ValidationRule[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: string[] = [];

    for (const rule of rules) {
      const value = req.body[rule.field];

      // Check required fields
      if (
        rule.required &&
        (value === undefined || value === null || value === "")
      ) {
        errors.push(`${rule.field} is required`);
        continue;
      }

      // Skip validation if field is not required and not provided
      if (
        !rule.required &&
        (value === undefined || value === null || value === "")
      ) {
        continue;
      }

      // Type validation
      if (rule.type) {
        switch (rule.type) {
          case "string":
            if (typeof value !== "string") {
              errors.push(`${rule.field} must be a string`);
              continue;
            }
            break;
          case "number":
            if (typeof value !== "number" || isNaN(value)) {
              errors.push(`${rule.field} must be a number`);
              continue;
            }
            break;
          case "email":
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
              errors.push(`${rule.field} must be a valid email address`);
              continue;
            }
            break;
          case "uuid":
            const uuidRegex =
              /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
            if (!uuidRegex.test(value)) {
              errors.push(`${rule.field} must be a valid UUID`);
              continue;
            }
            break;
          case "date":
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (!dateRegex.test(value)) {
              errors.push(`${rule.field} must be in YYYY-MM-DD format`);
              continue;
            }
            const date = new Date(value);
            if (isNaN(date.getTime())) {
              errors.push(`${rule.field} must be a valid date`);
              continue;
            }
            break;
        }
      }

      // String length validation
      if (rule.type === "string" && typeof value === "string") {
        if (rule.minLength && value.length < rule.minLength) {
          errors.push(
            `${rule.field} must be at least ${rule.minLength} characters long`
          );
        }
        if (rule.maxLength && value.length > rule.maxLength) {
          errors.push(
            `${rule.field} must be no more than ${rule.maxLength} characters long`
          );
        }
      }

      // Number range validation
      if (rule.type === "number" && typeof value === "number") {
        if (rule.min !== undefined && value < rule.min) {
          errors.push(`${rule.field} must be at least ${rule.min}`);
        }
        if (rule.max !== undefined && value > rule.max) {
          errors.push(`${rule.field} must be no more than ${rule.max}`);
        }
      }

      // Pattern validation
      if (
        rule.pattern &&
        typeof value === "string" &&
        !rule.pattern.test(value)
      ) {
        errors.push(`${rule.field} format is invalid`);
      }

      // Enum validation
      if (rule.enum && !rule.enum.includes(value)) {
        errors.push(`${rule.field} must be one of: ${rule.enum.join(", ")}`);
      }
    }

    if (errors.length > 0) {
      throw new ValidationError(errors.join("; "));
    }

    next();
  };
};

// Predefined validation schemas
export const fundValidationRules: ValidationRule[] = [
  {
    field: "name",
    required: true,
    type: "string",
    minLength: 1,
    maxLength: 255,
  },
  {
    field: "vintage_year",
    required: true,
    type: "number",
    min: 1900,
    max: new Date().getFullYear() + 1,
  },
  { field: "target_size_usd", required: true, type: "number", min: 0 },
  {
    field: "status",
    required: true,
    type: "string",
    enum: ["Fundraising", "Investing", "Closed"],
  },
];

export const investorValidationRules: ValidationRule[] = [
  {
    field: "name",
    required: true,
    type: "string",
    minLength: 1,
    maxLength: 255,
  },
  {
    field: "investor_type",
    required: true,
    type: "string",
    enum: ["Individual", "Institution", "Family Office"],
  },
  { field: "email", required: true, type: "email", maxLength: 255 },
];

export const investmentValidationRules: ValidationRule[] = [
  { field: "investor_id", required: true, type: "uuid" },
  { field: "amount_usd", required: true, type: "number", min: 0.01 },
  { field: "investment_date", required: true, type: "date" },
];

export const uuidParamValidation = (paramName: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const value = req.params[paramName];
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(value)) {
      throw new ValidationError(`${paramName} must be a valid UUID`);
    }

    next();
  };
};
