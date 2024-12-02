import { Request, Response } from "express";
import { getJsonStringifyData, handlePubSubWithTimeout, sendResponse } from "../../utils";
import { client } from "../../redis";

export const getUserStockBalance = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const stockBalanceObject = {
    type: "getUserStockBalance",
    requestType: "balance",
    userId
  }
  try {
    const pubSub = handlePubSubWithTimeout("balance", 5000);
    await client.lPush("taskQueue", getJsonStringifyData(stockBalanceObject));
    const response = await pubSub;
    sendResponse(res, response);
  } catch (error: any) {
    res.status(500).json({
      error: error.message || "Error in pubSub communication"
    })
  }
}
