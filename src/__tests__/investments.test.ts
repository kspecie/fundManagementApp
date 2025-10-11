import request from "supertest";
import express from "express";
import fundRoutes from "../routes/fundRoutes";

// Mock the database
jest.mock("../db", () => ({
  pool: {
    query: jest.fn(),
  },
}));

// Create a test app
const app = express();
app.use(express.json());
app.use("/api/funds", fundRoutes);

describe("Investments API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/funds/:id/investments", () => {
    test("should create investment with valid data", async () => {
      const fundId = "550e8400-e29b-41d4-a716-446655440000";
      const newInvestment = {
        investor_id: "770e8400-e29b-41d4-a716-446655440002",
        amount_usd: 50000000,
        investment_date: "2024-01-15",
      };

      const mockCreatedInvestment = {
        id: "aa0e8400-e29b-41d4-a716-446655440005",
        fund_id: fundId,
        investor_id: newInvestment.investor_id,
        amount_usd: newInvestment.amount_usd,
        investment_date: newInvestment.investment_date,
      };

      const { pool } = require("../db");
      pool.query.mockResolvedValue({ rows: [mockCreatedInvestment] });

      const response = await request(app)
        .post(`/api/funds/${fundId}/investments`)
        .send(newInvestment)
        .expect(201);

      expect(response.body).toHaveProperty("id");
      expect(response.body.fund_id).toBe(fundId);
      expect(response.body.investor_id).toBe(newInvestment.investor_id);
      expect(response.body.amount_usd).toBe(50000000);
      expect(response.body.investment_date).toBe("2024-01-15");
    });
  });
});
