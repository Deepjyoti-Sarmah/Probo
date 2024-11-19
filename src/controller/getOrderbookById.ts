import { Request, Response } from "express";

export const getOrderbookById = async (req: Request, res: Response) => {

    const { stockSymbol } = req.params;

    if (!stockSymbol) {
        res.status(400).json({
            success: false,
            message: "stock symbol is not valid"
        })
        return;
    }

    try {
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Interval server error"
        })
        return
    }
}