# Error Handling Examples

This document demonstrates the comprehensive error handling implemented in the API.

## Error Response Format

All errors now return a consistent JSON structure:

```json
{
  "error": {
    "message": "Human-readable error message",
    "code": "ERROR_CODE",
    "statusCode": 400,
    "timestamp": "2024-01-15T10:30:00.000Z",
    "path": "/api/funds/invalid-id"
  }
}
```

## Validation Errors (400 Bad Request)

### Invalid UUID in URL parameters

```bash
GET /api/funds/invalid-uuid
```

**Response:**

```json
{
  "error": {
    "message": "id must be a valid UUID",
    "code": "VALIDATION_ERROR",
    "statusCode": 400,
    "timestamp": "2024-01-15T10:30:00.000Z",
    "path": "/api/funds/invalid-uuid"
  }
}
```

### Missing required fields

```bash
POST /api/funds
Content-Type: application/json

{
  "name": "Test Fund"
  // missing vintage_year, target_size_usd, status
}
```

**Response:**

```json
{
  "error": {
    "message": "vintage_year is required; target_size_usd is required; status is required",
    "code": "VALIDATION_ERROR",
    "statusCode": 400,
    "timestamp": "2024-01-15T10:30:00.000Z",
    "path": "/api/funds"
  }
}
```

### Invalid field values

```bash
POST /api/funds
Content-Type: application/json

{
  "name": "Test Fund",
  "vintage_year": 1800,  // Too old
  "target_size_usd": -1000,  // Negative amount
  "status": "InvalidStatus"  // Not in enum
}
```

**Response:**

```json
{
  "error": {
    "message": "vintage_year must be at least 1900; target_size_usd must be at least 0; status must be one of: Fundraising, Investing, Closed",
    "code": "VALIDATION_ERROR",
    "statusCode": 400,
    "timestamp": "2024-01-15T10:30:00.000Z",
    "path": "/api/funds"
  }
}
```

### Invalid email format

```bash
POST /api/investors
Content-Type: application/json

{
  "name": "John Doe",
  "investor_type": "Individual",
  "email": "invalid-email"
}
```

**Response:**

```json
{
  "error": {
    "message": "email must be a valid email address",
    "code": "VALIDATION_ERROR",
    "statusCode": 400,
    "timestamp": "2024-01-15T10:30:00.000Z",
    "path": "/api/investors"
  }
}
```

## Not Found Errors (404)

### Non-existent fund

```bash
GET /api/funds/550e8400-e29b-41d4-a716-446655440999
```

**Response:**

```json
{
  "error": {
    "message": "Fund with id 550e8400-e29b-41d4-a716-446655440999 not found",
    "code": "RESOURCE_NOT_FOUND",
    "statusCode": 404,
    "timestamp": "2024-01-15T10:30:00.000Z",
    "path": "/api/funds/550e8400-e29b-41d4-a716-446655440999"
  }
}
```

### Non-existent endpoint

```bash
GET /api/nonexistent
```

**Response:**

```json
{
  "error": {
    "message": "Endpoint with id /api/nonexistent not found",
    "code": "RESOURCE_NOT_FOUND",
    "statusCode": 404,
    "timestamp": "2024-01-15T10:30:00.000Z",
    "path": "/api/nonexistent"
  }
}
```

## Conflict Errors (409)

### Duplicate fund name

```bash
POST /api/funds
Content-Type: application/json

{
  "name": "Titanbay Growth Fund I",  // Already exists
  "vintage_year": 2024,
  "target_size_usd": 100000000,
  "status": "Fundraising"
}
```

**Response:**

```json
{
  "error": {
    "message": "name 'Titanbay Growth Fund I' already exists",
    "code": "UNIQUE_CONSTRAINT_VIOLATION",
    "statusCode": 409,
    "timestamp": "2024-01-15T10:30:00.000Z",
    "path": "/api/funds"
  }
}
```

### Duplicate investor email

```bash
POST /api/investors
Content-Type: application/json

{
  "name": "Another Investor",
  "investor_type": "Individual",
  "email": "investments@gsam.com"  // Already exists
}
```

**Response:**

```json
{
  "error": {
    "message": "email 'investments@gsam.com' already exists",
    "code": "UNIQUE_CONSTRAINT_VIOLATION",
    "statusCode": 409,
    "timestamp": "2024-01-15T10:30:00.000Z",
    "path": "/api/investors"
  }
}
```

## Foreign Key Violation Errors (400)

### Non-existent fund_id in investment

```bash
POST /api/funds/550e8400-e29b-41d4-a716-446655440999/investments
Content-Type: application/json

{
  "investor_id": "770e8400-e29b-41d4-a716-446655440002",
  "amount_usd": 50000000,
  "investment_date": "2024-01-15"
}
```

**Response:**

```json
{
  "error": {
    "message": "funds with id 550e8400-e29b-41d4-a716-446655440999 does not exist",
    "code": "FOREIGN_KEY_VIOLATION",
    "statusCode": 400,
    "timestamp": "2024-01-15T10:30:00.000Z",
    "path": "/api/funds/550e8400-e29b-41d4-a716-446655440999/investments"
  }
}
```

### Non-existent investor_id in investment

```bash
POST /api/funds/550e8400-e29b-41d4-a716-446655440000/investments
Content-Type: application/json

{
  "investor_id": "770e8400-e29b-41d4-a716-446655440999",  // Non-existent
  "amount_usd": 50000000,
  "investment_date": "2024-01-15"
}
```

**Response:**

```json
{
  "error": {
    "message": "investors with id 770e8400-e29b-41d4-a716-446655440999 does not exist",
    "code": "FOREIGN_KEY_VIOLATION",
    "statusCode": 400,
    "timestamp": "2024-01-15T10:30:00.000Z",
    "path": "/api/funds/550e8400-e29b-41d4-a716-446655440000/investments"
  }
}
```

## Database Constraint Errors (400)

### Invalid investment amount

```bash
POST /api/funds/550e8400-e29b-41d4-a716-446655440000/investments
Content-Type: application/json

{
  "investor_id": "770e8400-e29b-41d4-a716-446655440002",
  "amount_usd": 0,  // Must be > 0
  "investment_date": "2024-01-15"
}
```

**Response:**

```json
{
  "error": {
    "message": "Invalid data provided",
    "code": "VALIDATION_ERROR",
    "statusCode": 400,
    "timestamp": "2024-01-15T10:30:00.000Z",
    "path": "/api/funds/550e8400-e29b-41d4-a716-446655440000/investments"
  }
}
```

### Invalid investment date

```bash
POST /api/funds/550e8400-e29b-41d4-a716-446655440000/investments
Content-Type: application/json

{
  "investor_id": "770e8400-e29b-41d4-a716-446655440002",
  "amount_usd": 50000000,
  "investment_date": "2030-01-15"  // Future date not allowed
}
```

**Response:**

```json
{
  "error": {
    "message": "Invalid data provided",
    "code": "VALIDATION_ERROR",
    "statusCode": 400,
    "timestamp": "2024-01-15T10:30:00.000Z",
    "path": "/api/funds/550e8400-e29b-41d4-a716-446655440000/investments"
  }
}
```

## Success Cases

### Valid fund creation

```bash
POST /api/funds
Content-Type: application/json

{
  "name": "New Test Fund",
  "vintage_year": 2024,
  "target_size_usd": 100000000,
  "status": "Fundraising"
}
```

**Response (201 Created):**

```json
{
  "id": "aa0e8400-e29b-41d4-a716-446655440005",
  "name": "New Test Fund",
  "vintage_year": 2024,
  "target_size_usd": 100000000,
  "status": "Fundraising",
  "created_at": "2024-01-15T10:30:00.000Z"
}
```

### Valid investment creation

```bash
POST /api/funds/550e8400-e29b-41d4-a716-446655440000/investments
Content-Type: application/json

{
  "investor_id": "770e8400-e29b-41d4-a716-446655440002",
  "amount_usd": 50000000,
  "investment_date": "2024-01-15"
}
```

**Response (201 Created):**

```json
{
  "id": "bb0e8400-e29b-41d4-a716-446655440006",
  "investor_id": "770e8400-e29b-41d4-a716-446655440002",
  "fund_id": "550e8400-e29b-41d4-a716-446655440000",
  "amount_usd": 50000000,
  "investment_date": "2024-01-15"
}
```

## Error Codes Reference

| Code                          | Description                       | HTTP Status |
| ----------------------------- | --------------------------------- | ----------- |
| `VALIDATION_ERROR`            | Input validation failed           | 400         |
| `RESOURCE_NOT_FOUND`          | Requested resource doesn't exist  | 404         |
| `RESOURCE_CONFLICT`           | Resource conflict (generic)       | 409         |
| `UNIQUE_CONSTRAINT_VIOLATION` | Duplicate unique field            | 409         |
| `FOREIGN_KEY_VIOLATION`       | Referenced resource doesn't exist | 400         |
| `DATABASE_ERROR`              | Database operation failed         | 500         |

## Benefits of This Error Handling System

1. **Consistent Error Format**: All errors follow the same JSON structure
2. **Specific Error Codes**: Easy to handle different error types programmatically
3. **Human-Readable Messages**: Clear error messages for debugging
4. **Proper HTTP Status Codes**: Correct status codes for different error types
5. **Comprehensive Validation**: Input validation before database operations
6. **Database Error Translation**: PostgreSQL errors are translated to user-friendly messages
7. **Request Context**: Each error includes timestamp and request path
8. **Graceful Degradation**: System continues to work even with invalid requests
