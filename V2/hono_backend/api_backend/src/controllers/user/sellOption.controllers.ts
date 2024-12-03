import type { Context } from "hono";
import { OrderSchema } from "../../schemas/index.schemas.js";
import { getJsonStringifyData, handlePubSubWithTimeout, sendResponse, TaskQueue, TimeOutMs } from "../../utils/index.utils.js";
import { client } from "../../redis.js";

export const sellOption = async (c: Context) => {

  const parseData = OrderSchema.safeParse(c.req.json())
  if (!parseData.success) {
    return c.json({ message: "Invalid Input" }, { status: 400 })
  }

  try {
    const { symbol, quantity, price, stockType } = parseData.data;

    const sellObject = {
      type: "sell",
      payload: {
        symbol,
        quantity,
        price,
        stockType
      }
    }

    const response = await handlePubSubWithTimeout("sell", TimeOutMs)
    await client.lPush(TaskQueue, getJsonStringifyData(sellObject))
    sendResponse(c, response)
  } catch (error) {
    return c.json({ message: "Error while selling opinion" }, { status: 500 })
  }
}
