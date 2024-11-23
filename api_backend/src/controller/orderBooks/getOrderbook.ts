import { Request, Response } from "express";
import { getJsonStringifyData, handlePubSubWithTimeout, sendResponse } from "../../utils";
import { client } from "../../redis";

export const getOrderbook = async (req: Request, res: Response) => {
  const orderBookObj = {
    type: "orderBook",
    requestType: "orderBook"
  }
  try {
    const pubSub = handlePubSubWithTimeout("orderBook", 5000);
    await client.lPush("taskQueue", getJsonStringifyData(orderBookObj));
    const response = await pubSub;
    sendResponse(res, response);
  } catch (error: any) {
    res.status(500).json({
      error: error.message || "Error in pubsub communication"
    })
  }
}
