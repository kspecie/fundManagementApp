import { Router } from "express";
import { fetchAllFunds } from "../controllers/fundController";
import { createNewFund } from "../controllers/fundController";
import { updateExistingFund } from "../controllers/fundController";
import { getSpecificFund } from "../controllers/fundController";

const router = Router();

router.get("/", fetchAllFunds);
router.get("/:id", getSpecificFund);
router.post("/", createNewFund);
router.put("/:id", updateExistingFund);

export default router;
