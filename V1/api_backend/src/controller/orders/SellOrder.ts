import { Request, Response } from "express";
import { getJsonStringifyData, handlePubSubWithTimeout, sendResponse } from "../../utils";
import { client } from "../../redis";

export const SellOrder = async (req: Request, res: Response) => {
  const { userId, stockSymbol, quantity, price, stockType } = req.body;
  const actualPrice = price / 100;

  const sellObject = {
    type: "sellOrderOption",
    requestType: "order",
    userId,
    quantity,
    actualPrice,
    stockType,
    stockSymbol
  }

  try {
    const pubSub = handlePubSubWithTimeout("order", 5000);
    await client.lPush("taskQueue", getJsonStringifyData(sellObject));
    const response = await pubSub;
    sendResponse(res, response);
  } catch (error: any) {
    res.status(500).json({
      error: error.message || "Error in pub/sub communication"
    })
  }
}
