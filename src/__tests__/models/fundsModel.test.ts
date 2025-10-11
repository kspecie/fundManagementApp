import {
  getAllFundsModel,
  getSpecificFundModel,
} from "../../models/fundsModel";

// Mock the database pool
jest.mock("../../db", () => ({
  pool: {
    query: jest.fn(),
  },
}));

import { pool } from "../../db";

describe("Funds Model", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllFundsModel", () => {
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

      (pool.query as jest.Mock).mockResolvedValue({ rows: mockFunds });

      const result = await getAllFundsModel();

      expect(result).toEqual(mockFunds);
      expect(pool.query).toHaveBeenCalledWith(
        expect.stringContaining("SELECT")
      );
    });
  });

  describe("getSpecificFundModel", () => {
    test("should return specific fund by id", async () => {
      const mockFund = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        name: "Test Fund",
        vintage_year: 2024,
        target_size_usd: 100000000,
        status: "Fundraising",
        created_at: "2024-01-01T00:00:00.000Z",
      };

      (pool.query as jest.Mock).mockResolvedValue({ rows: [mockFund] });

      const result = await getSpecificFundModel(
        "550e8400-e29b-41d4-a716-446655440000"
      );

      expect(result).toEqual(mockFund);
      expect(pool.query).toHaveBeenCalledWith(
        expect.stringContaining("WHERE id = $1"),
        ["550e8400-e29b-41d4-a716-446655440000"]
      );
    });
  });
});
