import { Request, Response } from "express";
import { userExists } from "../types";
import { STOCK_BALANCE } from "..";

export const getUserStockBalance = async (req: Request, res: Response) => {

    const { userId } = req.params;

    if (!userId) {
        res.status(400).json({
            success: false,
            message: "UserId is availabe"
        })
        return
    }

    try {
        if (!userExists(userId)) {
            res.status(400).json({
                success: false,
                message: "User not found"
            })
            return
        }

        const stocksBalance = STOCK_BALANCE[userId] || {};

        res.status(200).json({
            success: true,
            message: "User stock balance",
            data: stocksBalance
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
        return
    }
}