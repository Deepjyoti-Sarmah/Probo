import { Request, Response } from "express";
import { INR_BALANCES } from "../..";

export const getBalnce = async (req: Request, res: Response) => {
  try {
    const balance = INR_BALANCES;

    if (!balance) {
      res.status(400).json({
        success: false,
        message: "Balance not found"
      })
      return
    }

    res.status(200).json({
      success: true,
      message: "Balance received",
      data: balance
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
    return
  }

}
