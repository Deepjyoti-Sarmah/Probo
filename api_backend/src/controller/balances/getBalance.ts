import { Request, Response } from "express";
import { getJsonStringifyData, handlePubSubWithTimeout, sendResponse } from "../../utils";
import { client } from "../../redis";

export const getBalnce = async (req: Request, res: Response) => {

  const inrBalanceObject = {
    type: "getBalance",
    requestType: "balance"
  }

  try {
    const pubSub = handlePubSubWithTimeout("balance", 5000);
    await client.lPush("taskQueue", getJsonStringifyData(inrBalanceObject));
    const response = await pubSub;
    sendResponse(res, response);
  } catch (error: any) {
    res.status(500).json({
      error: error.message || "Error in pubsub communication"
    })
  }
}
