import { Request, Response } from "express";
import { symbolExists, userExists } from "../types";
import { ORDERBOOK, STOCK_BALANCE } from "..";

export const SellOrderForNo = async (req: Request, res: Response) => {
    const { userId, stockSymbol, quantity, price, stockType } = req.body;

    if (!(userId && stockSymbol && quantity && price && stockType)) {
        res.status(400).json({
            success: false,
            message: "Invalidd Input"
        })
        return
    }

    try {
        if (!userExists(userId)) {
            res.status(400).json({
                success: false,
                message: "User does not exists"
            })
            return
        }

        if (!symbolExists(stockSymbol)) {
            res.status(400).json({
                success: false,
                message: "symbol does not exist"
            })
            return
        }

        if (!["yes", "no"].includes(stockType)) {
            res.status(400).json({
                success: false,
                message: "Invalid stock type"
            })
            return

        }

        if (stockType !== "no") {
            res.status(400).json({
                success: false,
                message: "Stock type must be no"
            })
            return
        }

        const userStockBalance = STOCK_BALANCE[userId]?.[stockSymbol]?.[stockType]?.quantity || 0;
        const userLockedBalance = STOCK_BALANCE[userId]?.[stockSymbol]?.[stockType]?.locked || 0;

        if (quantity > (userStockBalance - userLockedBalance)) {
            res.status(400).json({
                success: false,
                message: "Insufficient unlocked stock balance",
                currebtBalance: userStockBalance,
                lockedBalance: userLockedBalance
            })
            return
        }

        const totelSellValue = quantity * price;

        STOCK_BALANCE[userId][stockSymbol][stockType].quantity -= quantity;
        STOCK_BALANCE[userId][stockSymbol][stockType].locked += quantity;

        if (!ORDERBOOK[stockSymbol][stockType][price]) {
            ORDERBOOK[stockSymbol][stockType][price] = {
                total: 0,
                order: {}
            }
        }

        ORDERBOOK[stockSymbol][stockType][price].total += quantity;
        ORDERBOOK[stockSymbol][stockType][price].order[userId] = (ORDERBOOK[stockSymbol][stockType][price].order[userId] || 0) + quantity;

        res.status(200).json({
            success: false,
            message: "Sell order placed successfully",
            order: {
                userId,
                stockSymbol,
                quantity,
                price,
                stockType,
                totelSellValue
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
        return
    }

}