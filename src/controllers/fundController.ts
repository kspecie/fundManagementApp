import { Request, Response } from "express";
import { getAllFundsModel } from "../models/fundsModel";
import { createNewFundModel } from "../models/fundsModel";
import { updateExistingFundModel } from "../models/fundsModel";
import { getSpecificFundModel } from "../models/fundsModel";
import { getAllInvestmentsForFundModel } from "../models/fundsModel";
import { createNewInvestmentForFundModel } from "../models/fundsModel";
import { asyncHandler } from "../errors/errorHandler";
import { NotFoundError } from "../errors/AppError";

export const fetchAllFunds = asyncHandler(
  async (req: Request, res: Response) => {
    console.log("hit GET /api/funds/ with fundController and fetchAllFunds");
    const funds = await getAllFundsModel();
    console.log("funds fetched:", funds);
    res.status(200).json(funds);
  }
);

export const getSpecificFund = asyncHandler(
  async (req: Request, res: Response) => {
    console.log(
      "hit GET /api/funds/:id with fundController and getSpecificFund"
    );
    const { id } = req.params;
    const fund = await getSpecificFundModel(id);

    if (!fund) {
      throw new NotFoundError("Fund", id);
    }

    res.status(200).json(fund);
  }
);

export const createNewFund = asyncHandler(
  async (req: Request, res: Response) => {
    console.log("hit POST /api/funds/ with fundController and createNewFund");
    console.log("req.body:", req.body);
    const newFund = await createNewFundModel(req.body);
    res.status(201).json(newFund);
  }
);

export const updateExistingFund = asyncHandler(
  async (req: Request, res: Response) => {
    console.log(
      "hit PUT /api/funds/:id with fundController and updateExistingFund"
    );
    const { id } = req.params;
    const updatedFund = await updateExistingFundModel(id, req.body);

    if (!updatedFund) {
      throw new NotFoundError("Fund", id);
    }

    res.status(200).json(updatedFund);
  }
);

export const getAllInvestmentsForFund = asyncHandler(
  async (req: Request, res: Response) => {
    console.log(
      "hit GET /api/funds/:id/investments with fundController and getAllInvestmentsForFund"
    );
    const { id } = req.params;
    const investments = await getAllInvestmentsForFundModel(id);
    res.status(200).json(investments);
  }
);

export const createNewInvestmentForFund = asyncHandler(
  async (req: Request, res: Response) => {
    console.log(
      "hit POST /api/funds/:id/investments with fundController and createNewInvestmentForFund"
    );
    console.log("req.body:", req.body);
    console.log("fund_id from params:", req.params.id);
    const { id } = req.params;
    const newInvestment = await createNewInvestmentForFundModel(id, req.body);
    res.status(201).json(newInvestment);
  }
);
