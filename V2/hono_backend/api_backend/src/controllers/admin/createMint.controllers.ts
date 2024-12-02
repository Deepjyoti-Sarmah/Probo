import type { Context } from "hono";
import { MintSchema } from "../../schemas/index.schemas.js";
import { getJsonStringifyData, handlePubSubWithTimeout, sendResponse, TaskQueue, TimeOutMs } from "../../utils/index.utils.js";
import { client } from "../../redis.js";

export const createMint = async (c: Context) => {
  const parseData = MintSchema.safeParse(c.req.json())
  if (!parseData.success) {
    return c.json({ message: "Invalid Input" }, { status: 400 })
  }

  try {
    const { symbol, quantity, price } = parseData.data;

    const mintObject = {
      type: "mint",
      payload: {
        symbol,
        quantity,
        price
      }
    }

    const response = await handlePubSubWithTimeout("mint", TimeOutMs)
    await client.lPush(TaskQueue, getJsonStringifyData(mintObject))
    sendResponse(c, response)
  } catch (error) {
    return c.json({ message: "Error while miniting" }, { status: 500 })
  }
}
