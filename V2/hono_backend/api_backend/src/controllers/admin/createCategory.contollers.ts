import type { Context } from "hono"
import { CategorySchema } from "../../schemas/index.schemas.js"
import { client } from "../../redis.js"
import { getJsonStringifyData, handlePubSubWithTimeout, sendResponse, TaskQueue, TimeOutMs } from "../../utils/index.utils.js"

export const createCategory = async (c: Context) => {
  const parseData = CategorySchema.safeParse(c.req.json())
  if (!parseData.success) {
    return c.json({ message: "Invalid inputs" }, { status: 400 })
  }

  try {
    const { title, icon, description } = parseData.data

    const createObject = {
      type: "createCatagory",
      payload: {
        title,
        icon,
        description
      }
    }

    const response = await handlePubSubWithTimeout("createCatagory", TimeOutMs)
    await client.lPush(TaskQueue, getJsonStringifyData(createObject))
    sendResponse(c, response)
  } catch (error) {
    return c.json({ messgae: "Error while creating catagory" }, { status: 500 })
  }
}
