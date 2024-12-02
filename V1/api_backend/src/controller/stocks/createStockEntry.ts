import { Request, Response } from "express";
import { getJsonStringifyData, handlePubSubWithTimeout, sendResponse } from "../../utils";
import { client } from "../../redis";

export const createStockEntry = async (req: Request, res: Response) => {
  const { stockSymbol } = req.params;

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
