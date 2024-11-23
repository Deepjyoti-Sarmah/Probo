import { Request, Response } from "express";
import { INR_BALANCES, ORDERBOOK, STOCK_BALANCE } from "..";
import { getJsonStringifyData, handlePubSubWithTimeout, sendResponse } from "../utils";
import { client } from "../redis";

export const resetValues = async (req: Request, res: Response) => {

  const resetObject = {
    type: "reset",
    requestType: "reset"
  }

  try {
    const pubSub = handlePubSubWithTimeout("reset", 5000);
    await client.lPush("taskQueue", getJsonStringifyData(resetObject));
    const response = await pubSub;
    sendResponse(res, response);
  } catch (error: any) {
    res.status(500).json({
      error: error.message || "Error in pub/sub communication"
    });
  }

}
