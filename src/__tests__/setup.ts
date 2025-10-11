// Test setup file
// This file runs before each test file

// Set test environment variables
process.env.NODE_ENV = "test";

// Mock console.log to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
