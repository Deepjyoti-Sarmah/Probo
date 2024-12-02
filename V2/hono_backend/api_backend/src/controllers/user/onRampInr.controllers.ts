import type { Context } from "hono"
import { OnRampInrSchema } from "../../schemas/index.schemas.js";
import { getJsonStringifyData, handlePubSubWithTimeout, sendResponse, TaskQueue, TimeOutMs } from "../../utils/index.utils.js";
import { client } from "../../redis.js";

export const onRampInr = async (c: Context) => {
  const parseData = OnRampInrSchema.safeParse(c.req.json())
  if (!parseData.success) {
    return c.json({ message: "Invalid Input" }, { status: 400 })
  }

  try {
    const { amount } = parseData.data;

    const onRampInrObject = {
      type: "onRampInr",
      payload: {
        amount
      }
    }

    const response = await handlePubSubWithTimeout("onRampInr", TimeOutMs)
    await client.lPush(TaskQueue, getJsonStringifyData(onRampInrObject))
    sendResponse(c, response)
  } catch (error) {
    return c.json({ message: "error while onramping Inr" }, { status: 500 })
  }
}
