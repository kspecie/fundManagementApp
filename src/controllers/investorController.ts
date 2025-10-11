import { Request, Response } from "express";
import { getAllInvestorsModel } from "../models/investorModels";
import { createNewInvestorModel } from "../models/investorModels";

export const fetchAllInvestors = async (req: Request, res: Response) => {
  console.log("hit GET /api/investors/ with investorController and fetchAllInvestors");
  try {
    const investors = await getAllInvestorsModel();
    res.status(200).json(investors);
  } catch (error) {
    console.error("Error fetching all investors in fetchAllInvestors:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createNewInvestor = async (req: Request, res: Response) => {
  console.log("hit POST /api/investors/ with investorController and createNewInvestor");
  console.log("req.body:", req.body);
  try {
    const newInvestor = await createNewInvestorModel(req.body);
    res.status(200).json(newInvestor);
  } catch (error) {
    console.error("Error creating new investor in createNewInvestor:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

