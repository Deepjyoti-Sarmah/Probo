import { Request, Response } from "express";
import { getJsonStringifyData, handlePubSubWithTimeout, sendResponse } from "../../utils";
import { client } from "../../redis";

export const getBalnce = async (req: Request, res: Response) => {

  const inrBalanceObject = {
    type: "getInrBalance",
    requestType: "balance"
  }

  try {
    //    const balance = INR_BALANCES;

    //    if (!balance) {
    //     res.status(400).json({
    //        success: false,
    //        message: "Balance not found"
    //      })
    //      return
    //    }

    //    res.status(200).json({
    //      success: true,
    //      message: "Balance received",
    //      data: balance
    //    });

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
