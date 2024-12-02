import { Request, Response } from "express";
import { getJsonStringifyData, handlePubSubWithTimeout, sendResponse } from "../../utils";
import { client } from "../../redis";

export const getUserInrBalance = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const inrBalanceObj = {
    type: "getInrBalance",
    requestType: "balance",
    userId
  }
  try {
    const pubSub = handlePubSubWithTimeout("balance", 5000);
    await client.lPush("taskQueue", getJsonStringifyData(inrBalanceObj));
    const response = await pubSub;
    sendResponse(res, response);
  } catch (error: any) {
    res.status(500).json({
      error: error.message || "Error in pubsub communication"
    })
  }
}
