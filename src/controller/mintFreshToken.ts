import { Request, Response } from "express";
import { STOCK_BALANCE } from "..";
import { symbolExists, userExists } from "../types";

export const mintFreshToken = async (req: Request, res: Response) => {

    const { userId, stockSymbol, quantity } = req.body;

    if (!(userId && stockSymbol && quantity)) {
        res.status(400).json({
            success: false,
            message: "Invalid user"
        })
        return
    }

    try {
        if (!userExists(userId)) {
            res.status(400).json({
                success: false,
                message: "User Id does not exist"
            })
            return
        }

        if (!symbolExists(stockSymbol)) {
            res.status(400).json({
                success: false,
                message: "Stock symbol does not exist"
            })
            return
        }

        if (!STOCK_BALANCE[userId]) {
            STOCK_BALANCE[userId] = {};
        }

        if (!STOCK_BALANCE[userId][stockSymbol]) {
            STOCK_BALANCE[userId][stockSymbol] = {
                yes: { quantity: 0, locked: 0 },
                no: { quantity: 0, locked: 0 }
            }
        }

        const stockBalance = STOCK_BALANCE[userId][stockSymbol].yes.quantity += quantity;

        res.status(200).json({
            success: false,
            message: "stock added",
            data: stockBalance
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Internal server error"
        })
        return
    }
}