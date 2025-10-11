import { Router } from "express";
import { fetchAllFunds } from "../controllers/fundController";
import { createNewFund } from "../controllers/fundController";
import { updateExistingFund } from "../controllers/fundController";
import { getSpecificFund } from "../controllers/fundController";
import { getAllInvestmentsForFund } from "../controllers/fundController";
import { createNewInvestmentForFund } from "../controllers/fundController";

const router = Router();

router.get("/", fetchAllFunds);
router.get("/:id", getSpecificFund);
router.post("/", createNewFund);
router.put("/:id", updateExistingFund);
router.get("/:id/investments", getAllInvestmentsForFund);
router.post("/:id/investments", createNewInvestmentForFund);


export default router;
