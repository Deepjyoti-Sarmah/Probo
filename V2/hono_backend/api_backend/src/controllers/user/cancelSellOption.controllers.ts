import type { Context } from "hono";
import { client } from "../../redis.js";
import { CancleOrderSchema } from "../../schemas/index.schemas.js";
import { getJsonStringifyData, handlePubSubWithTimeout, sendResponse, TaskQueue, TimeOutMs } from "../../utils/index.utils.js";

export const cancelSellOption = async (c: Context) => {

  const parseData = CancleOrderSchema.safeParse(c.req.json())
  if (!parseData.success) {
    return c.json({ message: "Invalid Input" }, { status: 400 })
  }

  try {
    const { orderId, marketSymbol } = parseData.data;
    const cancelSellObject = {
      type: "cancelBuyOrder",
      payload: {
        orderId,
        marketSymbol
      }
    }

    const response = await handlePubSubWithTimeout("cancelBuyOrder", TimeOutMs)
    await client.lPush(TaskQueue, getJsonStringifyData(cancelSellObject))
    sendResponse(c, response)
  } catch (error) {
    return c.json({ message: "Error while canceling Sell Opnion" }, { status: 500 })
  }
}
