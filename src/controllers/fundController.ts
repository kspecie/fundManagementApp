import { Request, Response } from "express";
import { getAllFundsModel } from "../models/fundsModel";
import { createNewFundModel } from "../models/fundsModel";
import { updateExistingFundModel } from "../models/fundsModel";
import { getSpecificFundModel } from "../models/fundsModel";
import { getAllInvestmentsForFundModel } from "../models/fundsModel";
import { createNewInvestmentForFundModel } from "../models/fundsModel";

export const fetchAllFunds = async (req: Request, res: Response) => {
  console.log("hit GET /api/funds/ with fundController and fetchAllFunds");
  try {
    const funds = await getAllFundsModel();
    console.log("funds fetched:", funds);
    res.status(200).json(funds);
  } catch (error) {
    console.error("Error fetching all funds in fetchAllFunds:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getSpecificFund = async (req: Request, res: Response) => {
  console.log("hit GET /api/funds/:id with fundController and getSpecificFund");
  try {
    const { id } = req.params;
    const fund = await getSpecificFundModel(id);
    res.status(200).json(fund);
  } catch (error) {
    console.error("Error fetching specific fund in getSpecificFund:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createNewFund = async (req: Request, res: Response) => {
  console.log("hit POST /api/funds/ with fundController and createNewFund");
  console.log("req.body:", req.body);
  try {
    const newFund = await createNewFundModel(req.body);
    res.status(200).json(newFund);
  } catch (error) {
    console.error("Error creating new fund in createNewFund:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateExistingFund = async (req: Request, res: Response) => {
  console.log("hit PUT /api/funds/ with fundController and updateExistingFund");
  try {
    const { id } = req.params;
    const updatedFund = await updateExistingFundModel(id, req.body);
    res.status(200).json(updatedFund);
  } catch (error) {
    console.error("Error updating existing fund in updateExistingFund:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllInvestmentsForFund = async (req: Request, res: Response) => {
  console.log(
    "hit GET /api/funds/:id/investments with fundController and getAllInvestmentsForFund"
  );
  try {
    const { id } = req.params;
    const investments = await getAllInvestmentsForFundModel(id);
    res.status(200).json(investments);
  } catch (error) {
    console.error(
      "Error fetching all investments for fund in getAllInvestmentsForFund:",
      error
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createNewInvestmentForFund = async (req: Request, res: Response) => {
  console.log(
    "hit POST /api/funds/:id/investments with fundController and createNewInvestmentForFund"
  );
  console.log("req.body:", req.body);
  console.log("fund_id from params:", req.params.id);
  try {
    const { id } = req.params;
    const newInvestment = await createNewInvestmentForFundModel(id, req.body);
    res.status(201).json(newInvestment);
  } catch (error) {
    console.error(
      "Error creating new investment for fund in createNewInvestmentForFund:",
      error
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
};
