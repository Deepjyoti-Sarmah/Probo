import { Request, Response } from "express";
import { ORDERBOOK } from "..";

export const getOrderbook = async (req: Request, res: Response) => {
    try {
        const data = ORDERBOOK;

        if (!data) {
            res.status(400).json({
                success: false,
                message: "Orderbook not found"
            })
            return
        }

        res.status(200).json({
            success: true,
            message: "orderbook returned",
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
        return
    }
}