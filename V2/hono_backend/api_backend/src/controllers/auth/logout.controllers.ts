import type { Context } from "hono";
import { type } from "os";
import { getJsonStringifyData, handlePubSubWithTimeout, sendResponse, TaskQueue, TimeOutMs } from "../../utils/index.utils.js";
import { client } from "../../redis.js";

export const logout = async (c: Context) => {
  try {
    const userId = c.get("userId")
    const logoutObject = {
      type: "logout",
      payload: { userId }
    }

    const response = await handlePubSubWithTimeout("logout", TimeOutMs)
    await client.lPush(TaskQueue, getJsonStringifyData(logoutObject))
    sendResponse(c, response)
  } catch (error) {
    return c.json({ message: "Error logging out" }, { status: 500 })
  }
}
