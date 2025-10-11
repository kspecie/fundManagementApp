# Testing Guide

This project uses **Jest** and **Supertest** for unit and integration testing.

## Test Setup

### Dependencies

- `jest` - Test runner and assertion library
- `@types/jest` - TypeScript definitions for Jest
- `supertest` - HTTP assertion library for API testing
- `@types/supertest` - TypeScript definitions for Supertest
- `ts-jest` - TypeScript preprocessor for Jest

### Configuration

- `jest.config.js` - Jest configuration with TypeScript support
- `src/__tests__/setup.ts` - Global test setup file

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Structure

```
src/
├── __tests__/
│   ├── setup.ts              # Global test setup
│   ├── funds.test.ts         # Funds API tests
│   ├── investors.test.ts     # Investors API tests
│   ├── investments.test.ts   # Investments API tests
│   └── models/
│       └── fundsModel.test.ts # Model unit tests
```

## Test Coverage

Current coverage: **83.66%** statements, **87.5%** functions

### Coverage by Module:

- **Controllers**: 74.07% statements
- **Models**: 92% statements
- **Routes**: 100% statements

## Test Types

### 1. API Integration Tests

- Test HTTP endpoints using Supertest
- Mock database connections
- Verify request/response formats
- Test status codes and response bodies

### 2. Model Unit Tests

- Test database model functions
- Mock database pool queries
- Verify data transformation
- Test error handling

## Mocking Strategy

### Database Mocking

```typescript
jest.mock("../db", () => ({
  pool: {
    query: jest.fn(),
  },
}));

// In tests
const { pool } = require("../db");
pool.query.mockResolvedValue({ rows: mockData });
```

### Console Mocking

```typescript
// Suppress console output in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
```

## Example Tests

### API Test Example

```typescript
test("should return array of funds", async () => {
  const mockFunds = [{ id: "test-id", name: "Test Fund" }];
  pool.query.mockResolvedValue({ rows: mockFunds });

  const response = await request(app).get("/api/funds").expect(200);

  expect(response.body).toBeInstanceOf(Array);
});
```

### Model Test Example

```typescript
test("should return specific fund by id", async () => {
  const mockFund = { id: "test-id", name: "Test Fund" };
  pool.query.mockResolvedValue({ rows: [mockFund] });

  const result = await getSpecificFundModel("test-id");
  expect(result).toEqual(mockFund);
});
```

## Best Practices

1. **Mock External Dependencies** - Database, file system, external APIs
2. **Test Structure** - Use describe blocks for organization
3. **Clear Test Names** - Descriptive test descriptions
4. **Setup/Cleanup** - Use beforeEach/afterEach for test isolation
5. **Assertions** - Test both success and error cases
6. **Coverage** - Aim for high test coverage on critical paths

## Adding New Tests

1. Create test file in `src/__tests__/` directory
2. Import necessary modules and mock dependencies
3. Write descriptive test cases with proper assertions
4. Run tests to verify they pass
5. Check coverage to ensure adequate testing

## Test Commands Reference

| Command                                   | Description                        |
| ----------------------------------------- | ---------------------------------- |
| `npm test`                                | Run all tests once                 |
| `npm run test:watch`                      | Run tests in watch mode            |
| `npm run test:coverage`                   | Run tests with coverage report     |
| `npm test -- --verbose`                   | Run tests with detailed output     |
| `npm test -- --testNamePattern="pattern"` | Run specific tests by name pattern |
