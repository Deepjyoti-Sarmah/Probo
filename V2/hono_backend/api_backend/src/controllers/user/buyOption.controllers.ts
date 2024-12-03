import type { Context } from "hono";
import { OrderSchema } from "../../schemas/index.schemas.js";
import { getJsonStringifyData, handlePubSubWithTimeout, sendResponse, TaskQueue, TimeOutMs } from "../../utils/index.utils.js";
import { client } from "../../redis.js";

export const buyOption = async (c: Context) => {

  const parseData = OrderSchema.safeParse(c.req.json())
  if (!parseData.success) {
    return c.json({ message: "Invalid Inputs" }, { status: 400 })
  }

  try {
    const { symbol, quantity, price, stockType } = parseData.data;

    const buyObject = {
      type: "buy",
      payload: {
        symbol,
        quantity,
        price,
        stockType
      }
    }

    const response = await handlePubSubWithTimeout("buy", TimeOutMs)
    await client.lPush(TaskQueue, getJsonStringifyData(buyObject))
    sendResponse(c, response)
  } catch (error) {
    return c.json({ message: "Error while buying opinions" }, { status: 500 })
  }
}
