import { Pool } from "pg";
import { pool } from "../db";

export interface Investor {
  id: string;
  name: string;
  investor_type: string;
  email: string;
  created_at: string;
}

export const getAllInvestorsModel = async (): Promise<Investor[]> => {
    const query = `
    SELECT *
    FROM investors
    ORDER BY created_at DESC
    `;
    const { rows: allInvestors } = await pool.query<Investor>(query);
    console.log("allInvestors:", allInvestors);
    return allInvestors;
}

export const createNewInvestorModel = async (investor: Investor): Promise<Investor> => {
    const query = `
    INSERT INTO investors (name, investor_type, email) VALUES ($1, $2, $3) RETURNING *
    `;
    const { rows: newInvestor } = await pool.query<Investor>(query, [
        investor.name,
        investor.investor_type,
        investor.email,
    ]);
    console.log("newInvestor:", newInvestor);
    return newInvestor[0];
}