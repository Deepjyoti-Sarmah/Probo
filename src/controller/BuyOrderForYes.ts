import { Request, Response } from "express";
import { symbolExists, userExists } from "../types";

export const BuyOrderForYes = async (req: Request, res: Response) => {

    const { userId, stockSymbol, quantity, price, stockType } = req.body;

    if (!(userId || stockSymbol || quantity || price || stockType)) {
        res.status(400).json({
            success: false,
            message: "Input are not valid"
        })
        return
    }

    try {
        if (!userExists(userId)) {
            res.status(400).json({
                success: false,
                message: "user does not exits"
            })
        }

        if (!symbolExists(stockSymbol)) {
            res.status(400).json({
                success: false,
                message: "stock symbol does not exits"
            })
        }

        if (!["yes", "no"].includes(stockType)) {
            res.status(400).json({
                success: false,
                message: "stock type does not exists"
            })
        }

        const totalCost = quantity * price;



    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
        return
    }
}