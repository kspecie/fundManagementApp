// src/routes/fundRoutes.ts

import { Router } from 'express';
import {
  listFunds,
  getFundById,
  createFund,
  updateFund,
} from '../controllers/fundController';

const router = Router();

// Fund Management Operations
router.get('/', listFunds);        // GET /funds
router.post('/', createFund);      // POST /funds
router.put('/', updateFund);       // PUT /funds (following your guideline)
router.get('/:id', getFundById);   // GET /funds/:id

export default router;