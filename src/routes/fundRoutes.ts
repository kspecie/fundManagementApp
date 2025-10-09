import { Router } from 'express';
import { fetchAllFunds } from '../controllers/fundController';

const router = Router();

router.get('/funds', fetchAllFunds);

export default router;