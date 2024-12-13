import { Hono, type Context } from "hono";
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { handlePubSubWithTimeout, sendResponse, stringifyJsonData, TaskQueue, TimeoutMs } from "../../utils/helper.utils.js";
import { client } from "../../redis.js";

const authRoute = new Hono()
  .post("/register",
    zValidator("json",
      z.object({
        username: z.string().min(1),
        email: z.string().email().min(1),
        password: z.string().min(6),
        role: z.enum(["Admin", "User"])
      })
    ),
    async (c: Context) => {
      const { username, email, password, role } = await c.req.json()

      try {
        const registerObject = {
          payload: {
            username,
            email,
            password,
            role
          },
          type: "register"
        }

        const response = await handlePubSubWithTimeout("register", TimeoutMs)
        await client.lPush(TaskQueue, stringifyJsonData(registerObject))
        sendResponse(c, response)
      } catch (error) {
        return c.json({ message: "Error registering users" }, 500)
      }
    }
  )
  .post("/login",
    zValidator("json",
      z.object({
        email: z.string().email().min(1),
        password: z.string().min(6),
      })
    ),
    async (c: Context) => {
      const { email, password } = await c.req.json();

      try {
        const loginObject = {
          payload: {
            email,
            password
          },
          type: "login"
        }

        const response = await handlePubSubWithTimeout("login", TimeoutMs)
        await client.lPush(TaskQueue, stringifyJsonData(loginObject))
        sendResponse(c, response)


      } catch (error) {
        return c.json({ message: "Error logging error" }, 500)
      }
    }
  )
  .post("/logout",
    zValidator("json",
      z.object({
        userId: z.string()
      })
    ),
    async (c: Context) => {
      const { userId } = c.get("userId")

      try {
        const logoutObject = {
          payload: {
            userId
          },
          type: "logout"
        }

        const response = await handlePubSubWithTimeout("logout", TimeoutMs)
        await client.lPush(TaskQueue, stringifyJsonData(logoutObject))
        sendResponse(c, response)
      } catch (error) {
        return c.json({ message: "Error logging out user" }, 500)
      }
    }
  )

export default authRoute;
