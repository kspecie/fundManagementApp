import { Pool } from "pg";
import { pool } from "../db";

export interface Fund {
  id: string;
  name: string;
  vintage_year: number;
  target_size_usd: number;
  status: string;
  created_at: string;
}

export const getAllFundsModel = async (): Promise<Fund[]> => {
  const query = `
        SELECT id,
               name,
               vintage_year,
               target_size_usd::float8 AS target_size_usd,
               status,
               created_at
        FROM funds
        ORDER BY created_at DESC
        `;
  const { rows: allFunds } = await pool.query<Fund>(query);
  console.log(allFunds);
  return allFunds;
};

export const getSpecificFundModel = async (id: string): Promise<Fund> => {
  const query = `
    SELECT id, name, vintage_year, target_size_usd::float8 AS target_size_usd, status, created_at
    FROM funds
    WHERE id = $1
  `;
  const { rows: specificFund } = await pool.query<Fund>(query, [id]);
  console.log("specificFund:", specificFund);
  return specificFund[0];
};

export const createNewFundModel = async (fund: Fund): Promise<Fund> => {
  const query = `
    INSERT INTO funds (name, vintage_year, target_size_usd, status) VALUES ($1, $2, $3, $4) RETURNING id, name, vintage_year, target_size_usd::float8 AS target_size_usd, status, created_at
  `;
  const { rows: newFund } = await pool.query<Fund>(query, [
    fund.name,
    fund.vintage_year,
    fund.target_size_usd,
    fund.status,
  ]);
  console.log("newFund:", newFund);
  return newFund[0];
};

export const updateExistingFundModel = async (
  id: string,
  updates: Pick<Fund, "name" | "vintage_year" | "target_size_usd" | "status">
): Promise<Fund> => {
  const query = `
    UPDATE funds
    SET name = $2,
        vintage_year = $3,
        target_size_usd = $4,
        status = $5
    WHERE id = $1
    RETURNING id, name, vintage_year, target_size_usd::float8 AS target_size_usd, status, created_at
  `;
  const { rows: updatedFund } = await pool.query<Fund>(query, [
    id,
    updates.name,
    updates.vintage_year,
    updates.target_size_usd,
    updates.status,
  ]);
  console.log("updatedFund:", updatedFund);
  return updatedFund[0];
};
