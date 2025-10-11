import request from "supertest";
import express from "express";
import investorRoutes from "../routes/investorRoutes";

// Mock the database
jest.mock("../db", () => ({
  pool: {
    query: jest.fn(),
  },
}));

// Create a test app
const app = express();
app.use(express.json());
app.use("/api/investors", investorRoutes);

describe("Investors API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/investors", () => {
    test("should return array of investors", async () => {
      const mockInvestors = [
        {
          id: "770e8400-e29b-41d4-a716-446655440002",
          name: "Test Investor",
          investor_type: "Individual",
          email: "test@example.com",
          created_at: "2024-01-01T00:00:00.000Z",
        },
      ];

      const { pool } = require("../db");
      pool.query.mockResolvedValue({ rows: mockInvestors });

      const response = await request(app).get("/api/investors").expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.headers["content-type"]).toMatch(/json/);
    });
  });

  describe("POST /api/investors", () => {
    test("should create investor with valid data", async () => {
      const newInvestor = {
        name: "Test Investor",
        investor_type: "Individual",
        email: "test@example.com",
      };

      const mockCreatedInvestor = {
        id: "770e8400-e29b-41d4-a716-446655440003",
        ...newInvestor,
        created_at: "2024-01-01T00:00:00.000Z",
      };

      const { pool } = require("../db");
      pool.query.mockResolvedValue({ rows: [mockCreatedInvestor] });

      const response = await request(app)
        .post("/api/investors")
        .send(newInvestor)
        .expect(200);

      expect(response.body).toHaveProperty("id");
      expect(response.body.name).toBe("Test Investor");
      expect(response.body.investor_type).toBe("Individual");
      expect(response.body.email).toBe("test@example.com");
    });
  });
});
