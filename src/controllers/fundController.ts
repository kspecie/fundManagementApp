import { Request, Response } from 'express';
import { Fund } from '../types/models'; // Assume your models are here


// --- Placeholder DB Client/Query Runner ---
const db = {
  query: async (text: string, params: any[] = []): Promise<any> => {
    console.log('DB Query:', text, 'Params:', params);
    // In a real app, this would execute the SQL query against the Docker container
    return { rows: [] as Fund[] }; // Mock return
  }
};
// ------------------------------------------

// GET /funds
export const listFunds = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await db.query(
                'SELECT id, name, vintage_year, target_size_usd, status, created_at FROM funds ORDER BY created_at DESC'
            );
            res.status(200).json(result.rows);
        } catch (error) {
            console.error('Error listing funds:', error);
            res.status(500).json({ message: 'Failed to retrieve funds.' });
        }
    };
  
  // GET /funds/:id
  export const getFundById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // The 'id' path parameter
    try {
        const result = await db.query(
            'SELECT id, name, vintage_year, target_size_usd, status, created_at FROM funds WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            res.status(404).json({ message: `Fund with id ${id} not found.` });
            return;
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error(`Error fetching fund ${id}:`, error);
      res.status(500).json({ message: 'Failed to retrieve fund.' });
    }
  };
  
  // POST /funds
  export const createFund = async (req: Request, res: Response): Promise<void> => {
    const { name, vintage_year, target_size_usd, status } = req.body;
  
    // Basic validation (use a library like Zod or Joi in production)
    if (!name || !vintage_year || !target_size_usd || !status) {
      res.status(400).json({ message: 'Missing required fund fields.' });
      return;
    }
  
    try {
        const result = await db.query(
            `INSERT INTO funds (name, vintage_year, target_size_usd, status) 
             VALUES ($1, $2, $3, $4) 
             RETURNING id, name, vintage_year, target_size_usd, status, created_at`,
            [name, vintage_year, target_size_usd, status]
        );

        res.status(201).json(result.rows[0]);
    } catch (error: any) {
      if (error.code === '23505') { // PostgreSQL unique violation code
          res.status(409).json({ message: 'A fund with this name already exists.' });
      } else {
          console.error('Error creating fund:', error);
          res.status(500).json({ message: 'Failed to create fund.' });
      }
    }
  };
  
  // PUT /funds
  // NOTE: Your API guideline uses PUT /funds which is atypical for an update;
  // usually, it's PUT /funds/:id. We will follow your guideline.
  export const updateFund = async (req: Request, res: Response): Promise<void> => {
    const { id, name, vintage_year, target_size_usd, status } = req.body;
  
    if (!id) {
      res.status(400).json({ message: 'Fund ID is required for update.' });
      return;
    }
  
    try {
      const result = await db.query(
        `UPDATE funds 
         SET name = $2, vintage_year = $3, target_size_usd = $4, status = $5 
         WHERE id = $1 
         RETURNING id, name, vintage_year, target_size_usd, status, created_at`,
        [id, name, vintage_year, target_size_usd, status]
      );
  
      if (result.rows.length === 0) {
        res.status(404).json({ message: `Fund with id ${id} not found.` });
        return;
      }
  
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error(`Error updating fund ${id}:`, error);
      res.status(500).json({ message: 'Failed to update fund.' });
    }
  };
  
