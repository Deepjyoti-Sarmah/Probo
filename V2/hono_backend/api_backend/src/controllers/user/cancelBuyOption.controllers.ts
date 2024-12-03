import type { Context } from "hono";
import { CancleOrderSchema } from "../../schemas/index.schemas.js";
import { getJsonStringifyData, handlePubSubWithTimeout, sendResponse, TaskQueue, TimeOutMs } from "../../utils/index.utils.js";
import { client } from "../../redis.js";

export const cancelBuyOption = async (c: Context) => {

  const parseData = CancleOrderSchema.safeParse(c.req.json())
  if (!parseData.success) {
    return c.json({ message: "Invalid Input" }, { status: 400 })
  }

  try {
    const { orderId, marketSymbol } = parseData.data;
    const cancelBuyObject = {
      type: "cancelBuyOrder",
      payload: {
        orderId,
        marketSymbol
      }
    }

    const response = await handlePubSubWithTimeout("cancelBuyOrder", TimeOutMs)
    await client.lPush(TaskQueue, getJsonStringifyData(cancelBuyObject))
    sendResponse(c, response)
  } catch (error) {
    return c.json({ message: "Error while canceling Buy option" }, { status: 500 })
  }
}
