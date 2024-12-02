import { Request, Response } from "express";
import { getJsonStringifyData, handlePubSubWithTimeout, sendResponse } from "../../utils";
import { client } from "../../redis";

export const createUserEntry = async (req: Request, res: Response) => {

  const { userId } = req.params;

  const userObj = {
    type: "createUser",
    requestType: "user",
    userId
  }

  try {
    const pubSub = handlePubSubWithTimeout("user", 5000);
    await client.lPush("taskQueue", getJsonStringifyData(userObj));
    const response = await pubSub;
    sendResponse(res, response);

  } catch (error: any) {
    res.status(500).json({
      error: error.message || "Error in pubsub connumnication"
    })

  }
}
