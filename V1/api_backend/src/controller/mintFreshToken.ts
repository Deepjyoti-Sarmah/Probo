import { Request, Response } from "express";
import { getJsonStringifyData, handlePubSubWithTimeout, sendResponse } from "../utils";
import { client } from "../redis";

export const mintFreshToken = async (req: Request, res: Response) => {
  const { userId, stockSymbol, quantity } = req.body;
  const mintObject = {
    type: "trade",
    requestType: "mint",
    userId,
    stockSymbol,
    quantity
  }

  try {
    const pubSub = handlePubSubWithTimeout("mint", 5000);
    await client.lPush("taskQueue", getJsonStringifyData(mintObject));
    const response = await pubSub;
    sendResponse(res, response);
  } catch (error: any) {
    res.status(500).json({
      error: error.message || "Error in pub/sub communication"
    })
  }
}
