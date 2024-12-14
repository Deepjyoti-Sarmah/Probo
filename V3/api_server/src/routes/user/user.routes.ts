import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { Hono, type Context } from "hono";
import { authMiddleware } from "../../middlewares/auth.middlewares.js";
import { client } from "../../redis.js";
import { handlePubSubWithTimeout, sendResponse, stringifyJsonData, TaskQueue, TimeoutMs } from "../../utils/helper.utils.js";

const userRoute = new Hono()
  .use(authMiddleware)
  .post("/onramp",
    zValidator("json",
      z.object({
        amount: z.number().gt(0)
      })
    ),
    async (c: Context) => {
      const { amount } = await c.req.json()
      const { userId } = c.get("userId")
      const { role } = c.get("role")

      if (role !== "User") {
        return c.json({ message: "only user can onramp money" }, 403)
      }

      try {
        const onrampObject = {
          payload: {
            userId,
            amount
          },
          type: "onramp_amount"
        }

        await client.lPush(TaskQueue, stringifyJsonData(onrampObject))
        const response = await handlePubSubWithTimeout(onrampObject.type, TimeoutMs)
        sendResponse(c, response)
      } catch (error) {
        return c.json({ message: "error while onramping money" }, 500)
      }
    }
  )
  .post("/buy",
    zValidator("json",
      z.object({
        symbol: z.string().min(1),
        symbolType: z.enum(["Yes", "No"]),
        quantity: z.number().gt(0),
        price: z.number().gt(0),
      })
    ),
    async (c: Context) => {
      const { symbol, symbolType, quantity, price } = await c.req.json()
      const { userId } = c.get("userId")
      const { role } = c.get("role")

      if (role !== "User") {
        return c.json({ message: "only user can buy stocks" }, 403)
      }

      try {
        const buyObject = {
          payload: {
            userId,
            symbol,
            symbolType,
            quantity,
            price
          },
          type: "buy_stocks"
        }

        await client.lPush(TaskQueue, stringifyJsonData(buyObject))
        const response = await handlePubSubWithTimeout(buyObject.type, TimeoutMs)
        sendResponse(c, response)
      } catch (error) {
        return c.json({ message: "Error while buying stocks" }, 500)
      }
    }
  )
  .post("/sell",
    zValidator("json",
      z.object({
        symbol: z.string().min(1),
        symbolType: z.enum(["Yes", "No"]),
        quantity: z.number().gt(0),
        price: z.number().gt(0),
      })
    ),
    async (c: Context) => {
      const { symbol, symbolType, quantity, price } = await c.req.json()
      const { userId } = c.get("userId")
      const { role } = c.get("role")

      if (role !== "User") {
        return c.json({ message: "only user can sell stocks" }, 403)
      }

      try {
        const sellObject = {
          payload: {
            userId,
            symbol,
            symbolType,
            quantity,
            price
          },
          type: "sell_stocks"
        }

        await client.lPush(TaskQueue, stringifyJsonData(sellObject))
        const response = await handlePubSubWithTimeout(sellObject.type, TimeoutMs)
        sendResponse(c, response)
      } catch (error) {
        return c.json({ message: "Error while selling stocks" }, 500)
      }
    }
  )
  .post("/cancel/buy",
    zValidator("json",
      z.object({
        orderId: z.string().min(1),
        symbol: z.string().min(1)
      })
    ),
    async (c: Context) => {
      const { orderId, symbol } = c.req.query()
      const { userId } = c.get("userId")
      const { role } = c.get("role")

      if (role !== "User") {
        return c.json({ message: "only user can cancel buy order" }, 403)
      }

      try {
        const cancelBuyObject = {
          payload: {
            userId,
            orderId,
            symbol
          },
          type: "cancel_buy"
        }

        await client.lPush(TaskQueue, stringifyJsonData(cancelBuyObject))
        const response = handlePubSubWithTimeout(cancelBuyObject.type, TimeoutMs)
        sendResponse(c, response)
      } catch (error) {
        return c.json({ message: "Error while cancelling buy stocks" }, 500)
      }
    }
  )
  .post("/cancel/sell",
    zValidator("json",
      z.object({
        orderId: z.string().min(1),
        symbol: z.string().min(1)
      })
    ),
    async (c: Context) => {
      const { orderId, symbol } = c.req.query()
      const { userId } = c.get("userId")
      const { role } = c.get("role")

      if (role !== "User") {
        return c.json({ message: "only user can cancel sell order" }, 403)
      }

      try {
        const cancelSellObject = {
          payload: {
            userId,
            orderId,
            symbol
          },
          type: "cancel_sell"
        }

        await client.lPush(TaskQueue, stringifyJsonData(cancelSellObject))
        const response = handlePubSubWithTimeout(cancelSellObject.type, TimeoutMs)
        sendResponse(c, response)
      } catch (error) {
        return c.json({ message: "Error while cancelling sell stocks" }, 500)
      }
    }
  )

export default userRoute;
