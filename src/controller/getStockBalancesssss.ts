import { Request, Response } from "express";
import { STOCK_BALANCE } from "..";

export const getStockBalancesssss = async (req: Request, res: Response) => {
  const stocks = STOCK_BALANCE;

  if (!stocks) {
    return res.status(400).json({
      success: false,
      message: "Stocks not found"
    })
  }

  try {
    res.status(200).json({
      success: true,
      message: "Stock received",
      data: stocks
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}
