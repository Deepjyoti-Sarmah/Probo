import { Request, Response } from "express";
import { symbolExists } from "../types";
import { ORDERBOOK } from "..";

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

        if (!symbolExists(stockSymbol)) {
            res.status(400).json({
                success: false,
                message: "stock symbol does not exists"
            })
            return
        }

        const orderBook = ORDERBOOK[stockSymbol];

        if (!orderBook) {
            res.status(400).json({
                success: false,
                message: "No orderbook found for this symbol"
            })
            return
        }

        const proccessedOrderbook = {
            yes: Object.entries(orderBook.yes as Record<string, { total: number }>).map(([price, data]) => ({
                price: parseFloat(price),
                quantity: data.total
            })).sort((a, b) => b.price - a.price),
            no: Object.entries(orderBook.no as Record<string, { total: number }>).map(([price, data]) => ({
                price: parseFloat(price),
                quantity: data.total
            })).sort((a, b) => b.price - a.price)
        }

        res.status(200).json({
            success: false,
            message: "Order book",
            data: {
                symbol: stockSymbol,
                orderBook: proccessedOrderbook
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Interval server error"
        })
        return
    }
}