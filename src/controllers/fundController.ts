import { Request, Response } from 'express';
import { getAllFunds } from '../models/fundsModel'; 


export const fetchAllFunds = async (req: Request, res: Response) => { 
    try {
        const funds = await getAllFunds();
        res.status(200).json(funds);
    } catch (error) {
        console.error('Error fetching all funds:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}