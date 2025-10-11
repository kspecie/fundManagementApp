import { Router } from "express";
import { fetchAllInvestors } from "../controllers/investorController";
import { createNewInvestor } from "../controllers/investorController";
import {
  validateRequest,
  investorValidationRules,
} from "../middleware/validation";

const router = Router();

router.get("/", fetchAllInvestors);
router.post("/", validateRequest(investorValidationRules), createNewInvestor);

export default router;
