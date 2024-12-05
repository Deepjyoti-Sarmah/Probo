import type { Context } from "hono";
import { LoginSchema } from "../../schemas/index.schemas.js";
import { type } from "os";
import { getJsonStringifyData, handlePubSubWithTimeout, sendResponse, TaskQueue, TimeOutMs } from "../../utils/index.utils.js";
import { client } from "../../redis.js";
import { Jwt } from "hono/utils/jwt";
import { env } from "process";

interface LoginResponse {
  success: boolean;
  userId?: string;
  role?: string;
  email?: string;
  username?: string;
  error?: string;
}

export const login = async (c: Context) => {
  const parseData = LoginSchema.safeParse(c.req.json())
  if (!parseData.success) {
    return c.json({ message: "Invalid inputs" }, { status: 400 })
  }

  try {
    const { email, password } = parseData.data;

    const loginObject = {
      type: "login",
      payload: {
        email,
        password
      }
    }

    const response = await handlePubSubWithTimeout("login", TimeOutMs) as LoginResponse
    await client.lPush(TaskQueue, getJsonStringifyData(loginObject))

    if (!response || !response.success) {
      return c.json({ message: "Login failed" }, { status: 400 })
    }

    const token = await Jwt.sign({
      userId: c.get("userId"),
      role: c.get("role")
    },
      env.JWT_SECRET || "",
      "HS256"
    )

    const responseWithToken = {
      ...response,
      token
    }


    sendResponse(c, getJsonStringifyData(responseWithToken))
  } catch (error) {
    return c.json({ message: "Error logining user" }, { status: 500 })
  }
}
