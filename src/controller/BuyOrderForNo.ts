import { Request, Response } from "express";
import { symbolExists, userExists } from "../types";
import { INR_BALANCES, ORDERBOOK, STOCK_BALANCE } from "..";

export const BuyOrderForNo = async (req: Request, res: Response) => {

    const { userId, stockSymbol, quantity, price, stockType } = req.body;

    if (!(userId && stockSymbol && quantity && price && stockType)) {
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
                message: "user does not exists"
            })
            return
        }

        if (!symbolExists(stockSymbol)) {
            res.status(400).json({
                success: false,
                message: "stock symbol does not exist"
            })
            return
        }

        if (!['yes', "no"].includes(stockType)) {
            res.status(400).json({
                success: false,
                message: "stock type does not exists"
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

        const totalCost = quantity * price;

        if (INR_BALANCES[userId].balance < totalCost) {
            res.status(400).json({
                success: false,
                message: "Insufficiant balance"
            })
            return
        }

        INR_BALANCES[userId].balance -= totalCost;
        INR_BALANCES[userId].locked += totalCost;

        if (!ORDERBOOK[stockSymbol][stockType][price]) {
            ORDERBOOK[stockSymbol][stockType][price] = {
                total: 0,
                orders: {}
            }
        }

        ORDERBOOK[stockSymbol][stockType][price].total += quantity;
        ORDERBOOK[stockSymbol][stockType][price].order[userId] = (ORDERBOOK[stockSymbol][stockType][price].order[userId] || 0) + quantity;

        STOCK_BALANCE[userId][stockSymbol][stockType].quantity += quantity;

        res.status(200).json({
            success: true,
            message: "Buy order placed successfully",
            order: {
                userId,
                stockSymbol,
                stockType,
                price,
                totalCost,
                quantity
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