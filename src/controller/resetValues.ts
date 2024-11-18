import { Request, Response } from "express";
import { INR_BALANCES, ORDERBOOK, STOCK_BALANCE } from "..";

export const resetValues = async (req: Request, res: Response) => {
    try {
        Object.keys(INR_BALANCES).forEach(key => delete INR_BALANCES[key]);
        Object.keys(ORDERBOOK).forEach(key => delete ORDERBOOK[key]);
        Object.keys(STOCK_BALANCE).forEach(key => delete STOCK_BALANCE[key]);

        res.status(200).json({
            success: true,
            message: "all data has been reset",
            data: {
                INR_BALANCES,
                ORDERBOOK,
                STOCK_BALANCE
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server error"
        });
    }

}