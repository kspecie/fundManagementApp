import { Request, Response } from "express";
import { getAllInvestorsModel } from "../models/investorModels";
import { createNewInvestorModel } from "../models/investorModels";
import { asyncHandler } from "../errors/errorHandler";

export const fetchAllInvestors = asyncHandler(
  async (req: Request, res: Response) => {
    console.log(
      "hit GET /api/investors/ with investorController and fetchAllInvestors"
    );
    const investors = await getAllInvestorsModel();
    res.status(200).json(investors);
  }
);

export const createNewInvestor = asyncHandler(
  async (req: Request, res: Response) => {
    console.log(
      "hit POST /api/investors/ with investorController and createNewInvestor"
    );
    console.log("req.body:", req.body);
    const newInvestor = await createNewInvestorModel(req.body);
    res.status(201).json(newInvestor);
  }
);
