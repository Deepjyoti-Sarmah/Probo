
import { Request, Response } from "express";
import { getJsonStringifyData, handlePubSubWithTimeout, sendResponse } from "../../utils";
import { client } from "../../redis";

export const getOrderbookById = async (req: Request, res: Response) => {
  const symbol = req.params.stockSymbol;
  const orderbookObject = {
    type: "orderBook",
    requestType: "stockSymbol",
    symbol
  }
  try {
    const pubSub = handlePubSubWithTimeout("orderBook", 5000);
    await client.lPush("taskQueue", getJsonStringifyData(orderbookObject));
    const response = await pubSub;
    sendResponse(res, response);
  } catch (error: any) {
    res.status(500).json({
      error: error.message || "Error in pubsub communication"
    })
  }
}
