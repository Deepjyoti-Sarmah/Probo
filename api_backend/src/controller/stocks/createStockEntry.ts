import { Request, Response } from "express";
import { INR_BALANCES, ORDERBOOK, STOCK_BALANCE } from "../..";
import { symbolExists } from "../../types";
import { getJsonStringifyData, handlePubSubWithTimeout, sendResponse } from "../../utils";
import { client } from "../../redis";

export const createStockEntry = async (req: Request, res: Response) => {
  const { stockSymbol } = req.params;

  // if (!stockSymbol) {
  //     res.status(400).json({
  //         message: "stockSymbol not defined"
  //     });
  //     return;
  // }

  // try {
  //     if (!symbolExists(stockSymbol)) {
  //         res.status(400).json({
  //             success: false,
  //             message: "Symbol already exists"
  //         })
  //         return
  //     }

  //     const orderbook = ORDERBOOK[stockSymbol] = {
  //         yes: {},
  //         no: {}
  //     }


  //     const stockData = Object.keys(INR_BALANCES).forEach(userId => {
  //         if (!STOCK_BALANCE[userId]) {
  //             STOCK_BALANCE[userId] = {}
  //         }

  //         STOCK_BALANCE[userId][stockSymbol] = {
  //             yes: {
  //                 quantity: 0,
  //                 locked: 0
  //             },
  //             no: {
  //                 quantity: 0,
  //                 locked: 0
  //             }
  //         }
  //     })

  //     res.status(200).json({
  //         success: true,
  //         message: "Symbol created successfully",
  //         data: {
  //             orderbook: orderbook,
  //             stockBalance: stockData
  //         }
  //     });
  // } catch (error) {
  //     res.status(500).json({
  //         success: false,
  //         message: "Internal server error"
  //     });
  //     return
  // }

  const symbolObj = {
    type: "symbolCreate",
    requestType: "symbol",
    stockSymbol
  }

  try {
    const pubSub = handlePubSubWithTimeout("symbol", 5000);
    await client.lPush("taskQueue", getJsonStringifyData(symbolObj));
    const response = await pubSub;
    sendResponse(res, response);
  } catch (error: any) {
    res.status(500).json({
      error: error.message || "Error in pubsub connumnication"
    })
  }
}
