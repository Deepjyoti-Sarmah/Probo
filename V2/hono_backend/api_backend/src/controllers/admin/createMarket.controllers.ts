import type { Context } from "hono";
import { MarketSchema } from "../../schemas/index.schemas.js";
import { getJsonStringifyData, handlePubSubWithTimeout, sendResponse, TaskQueue, TimeOutMs } from "../../utils/index.utils.js";
import { client } from "../../redis.js";

export const createMarket = async (c: Context) => {
  const parseData = MarketSchema.safeParse(c.req.json())
  if (!parseData) {
    return c.json({ message: "Invalid inputs" }, { status: 400 })
  }

  try {
    const { symbol, description, endTime, sourceOfTruth, categoryTitle } = parseData;

    const createMarketObject = {
      type: "createMarket",
      payload: {
        symbol,
        description,
        endTime,
        sourceOfTruth,
        categoryTitle
      }
    }

    const response = await handlePubSubWithTimeout("createMarket", TimeOutMs)
    await client.lPush(TaskQueue, getJsonStringifyData(createMarketObject))
    sendResponse(c, response)
  } catch (error) {

  }

}
