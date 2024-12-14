import { zValidator } from "@hono/zod-validator";
import { z } from 'zod'
import { Hono, type Context } from "hono";
import { authMiddleware } from "../../middlewares/auth.middlewares.js";
import { client } from "../../redis.js";
import { handlePubSubWithTimeout, sendResponse, stringifyJsonData, TaskQueue, TimeoutMs } from "../../utils/helper.utils.js";

const adminRoute = new Hono().basePath("/create")
  .use(authMiddleware)
  .post("/category",
    zValidator("json",
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        icon: z.string().min(1)
      })
    ),
    async (c: Context) => {
      const { title, description, icon } = await c.req.json()
      const { userId } = c.get("userId");
      const { role } = c.get("role");

      if (role !== "Admin") {
        return c.json({ message: "only admin can create categories" }, 403)
      }

      try {
        const categoryObject = {
          payload: {
            userId,
            title,
            description,
            icon
          },
          type: "create_category"
        }

        await client.lPush(TaskQueue, stringifyJsonData(categoryObject))
        const response = await handlePubSubWithTimeout(categoryObject.type, TimeoutMs)
        sendResponse(c, response)
      } catch (error) {
        return c.json({ message: "Error creating category" }, 500)
      }
    }
  )
  .post("/market",
    zValidator("json",
      z.object({
        symbol: z.string().min(1),
        description: z.string().min(1),
        categotyTitle: z.string().min(1),
        endTime: z.string().datetime().transform((str) => new Date(str)),
        sourceOfTruth: z.string().min(1)
      })
    ),
    async (c: Context) => {
      const { symbol, description, categoryTitle, endTime, sourceOfTruth } = await c.req.json()
      const { userId } = c.get("userId")
      const { role } = c.get("role")

      if (role !== "Admin") {
        return c.json({ message: "only admin can create market" }, 403)
      }

      try {

        const marketObject = {
          payload: {
            userId,
            symbol,
            description,
            categoryTitle,
            endTime,
            sourceOfTruth
          },
          type: "create_market"
        }

        await client.lPush(TaskQueue, stringifyJsonData(marketObject))
        const response = await handlePubSubWithTimeout(marketObject.type, TimeoutMs)
        sendResponse(c, response)
      } catch (error) {
        return c.json({ message: "Error creating market" }, 500)
      }
    }
  )
  .post("/mint",
    zValidator("json",
      z.object({
        symbol: z.string().min(1),
        quantity: z.number().gt(0),
        price: z.number().gt(0),
      })
    ),
    async (c: Context) => {
      const { symbol, quantity, price } = await c.req.json()
      const { userId } = c.get("userId")
      const { role } = c.get("role")

      if (role !== "Admin") {
        return c.json({ messgae: "only admin can create new mints" }, 403)
      }

      try {

        const mintObject = {
          payload: {
            userId,
            symbol,
            quantity,
            price
          },
          type: "create_mint"
        }

        await client.lPush(TaskQueue, stringifyJsonData(mintObject))
        const response = await handlePubSubWithTimeout(mintObject.type, TimeoutMs)
        sendResponse(c, response)
      } catch (error) {
        return c.json({ message: "Error creating mint" }, 500)
      }
    }
  )


export default adminRoute;
