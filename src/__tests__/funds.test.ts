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

describe("Funds API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/funds", () => {
    test("should return array of funds", async () => {
      const mockFunds = [
        {
          id: "550e8400-e29b-41d4-a716-446655440000",
          name: "Test Fund",
          vintage_year: 2024,
          target_size_usd: 100000000,
          status: "Fundraising",
          created_at: "2024-01-01T00:00:00.000Z",
        },
      ];

      const { pool } = require("../db");
      pool.query.mockResolvedValue({ rows: mockFunds });

      const response = await request(app).get("/api/funds").expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.headers["content-type"]).toMatch(/json/);
    });
  });

  describe("GET /api/funds/:id", () => {
    test("should return fund for valid UUID", async () => {
      const validUUID = "550e8400-e29b-41d4-a716-446655440000";
      const mockFund = {
        id: validUUID,
        name: "Test Fund",
        vintage_year: 2024,
        target_size_usd: 100000000,
        status: "Fundraising",
        created_at: "2024-01-01T00:00:00.000Z",
      };

      const { pool } = require("../db");
      pool.query.mockResolvedValue({ rows: [mockFund] });

      const response = await request(app)
        .get(`/api/funds/${validUUID}`)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.id).toBe(validUUID);
    });
  });

  describe("POST /api/funds", () => {
    test("should create fund with valid data", async () => {
      const newFund = {
        name: "Test Fund",
        vintage_year: 2024,
        target_size_usd: 100000000,
        status: "Fundraising",
      };

      const mockCreatedFund = {
        id: "550e8400-e29b-41d4-a716-446655440001",
        ...newFund,
        created_at: "2024-01-01T00:00:00.000Z",
      };

      const { pool } = require("../db");
      pool.query.mockResolvedValue({ rows: [mockCreatedFund] });

      const response = await request(app)
        .post("/api/funds")
        .send(newFund)
        .expect(200);

      expect(response.body).toHaveProperty("id");
      expect(response.body.name).toBe("Test Fund");
      expect(response.body.vintage_year).toBe(2024);
      expect(response.body.target_size_usd).toBe(100000000);
      expect(response.body.status).toBe("Fundraising");
    });
  });

  describe("GET /api/funds/:id/investments", () => {
    test("should return array of investments for valid fund", async () => {
      const validUUID = "550e8400-e29b-41d4-a716-446655440000";
      const mockInvestments = [
        {
          id: "990e8400-e29b-41d4-a716-446655440004",
          fund_id: validUUID,
          investor_id: "770e8400-e29b-41d4-a716-446655440002",
          amount_usd: 50000000,
          investment_date: "2024-03-15",
        },
      ];

      const { pool } = require("../db");
      pool.query.mockResolvedValue({ rows: mockInvestments });

      const response = await request(app)
        .get(`/api/funds/${validUUID}/investments`)
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
    });
  });
});
