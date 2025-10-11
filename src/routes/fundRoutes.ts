import { Router } from "express";
import { fetchAllFunds } from "../controllers/fundController";
import { createNewFund } from "../controllers/fundController";
import { updateExistingFund } from "../controllers/fundController";
import { getSpecificFund } from "../controllers/fundController";
import { getAllInvestmentsForFund } from "../controllers/fundController";
import { createNewInvestmentForFund } from "../controllers/fundController";
import {
  validateRequest,
  fundValidationRules,
  investmentValidationRules,
  uuidParamValidation,
} from "../middleware/validation";

const router = Router();

router.get("/", fetchAllFunds);
router.get("/:id", uuidParamValidation("id"), getSpecificFund);
router.post("/", validateRequest(fundValidationRules), createNewFund);
router.put(
  "/:id",
  uuidParamValidation("id"),
  validateRequest(fundValidationRules),
  updateExistingFund
);
router.get(
  "/:id/investments",
  uuidParamValidation("id"),
  getAllInvestmentsForFund
);
router.post(
  "/:id/investments",
  uuidParamValidation("id"),
  validateRequest(investmentValidationRules),
  createNewInvestmentForFund
);

export default router;
