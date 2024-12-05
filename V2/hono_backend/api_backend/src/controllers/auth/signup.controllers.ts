import type { Context } from "hono";
import { SignupSchema } from "../../schemas/index.schemas.js";
import { getJsonStringifyData, handlePubSubWithTimeout, sendResponse, TaskQueue, TimeOutMs } from "../../utils/index.utils.js";
import { client } from "../../redis.js";

export const signup = async (c: Context) => {
  const parseData = SignupSchema.safeParse(c.req.json())
  if (!parseData.success) {
    return c.json({ message: "Invalid inputs" }, { status: 400 })
  }

  try {
    const { username, email, password, role } = parseData.data;

    const signUpOpbject = {
      type: "signup",
      payload: {
        username,
        email,
        password,
        role
      }
    }

    const response = await handlePubSubWithTimeout("signup", TimeOutMs)
    await client.lPush(TaskQueue, getJsonStringifyData(signUpOpbject))
    sendResponse(c, response)
  } catch (error) {
    return c.json({ message: "Error signuping users" }, { status: 500 })
  }
}
