module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"],
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.d.ts",
    "!src/server.ts",
    "!src/db/index.ts",
  ],
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/src/__tests__/setup.ts"],
  testTimeout: 10000,
};
