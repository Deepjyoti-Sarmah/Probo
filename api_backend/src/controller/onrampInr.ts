import { Request, Response } from "express";
import { getJsonStringifyData, handlePubSubWithTimeout, sendResponse } from "../utils";
import { client } from "../redis";

export const onrampInr = async (req: Request, res: Response) => {
  const { userId, amount } = req.body;

  const onrampObject = {
    type: "onrampInr",
    requestType: "onRamp",
    userId,
    amount
  }

  try {
    const pubSub = handlePubSubWithTimeout("onRamp", 5000);
    await client.lPush("taskOueue", getJsonStringifyData(onrampObject));
    const response = await pubSub;
    sendResponse(res, response);
  } catch (error: any) {
    res.status(500).json({
      error: error.message || "Error in pub/sub communication"
    })
  }
}
