import { Router } from "express";
import { fetchAllInvestors } from "../controllers/investorController";  
import { createNewInvestor } from "../controllers/investorController";

const router = Router();

router.get("/", fetchAllInvestors);
router.post("/", createNewInvestor);

export default router;