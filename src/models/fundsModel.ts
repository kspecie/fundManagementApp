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

export const getAllFunds = async (): Promise<Fund[]> => {
  const query = `
        SELECT id, name, vintage_year, target_size_usd, status, created_at
        FROM funds
        ORDER BY created_at DESC
        `;
  const { rows } = await pool.query<Fund>(query);
  console.log(rows)
  return rows;
};
