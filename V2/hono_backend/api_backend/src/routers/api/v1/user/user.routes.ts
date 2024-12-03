import { Hono } from "hono";
import { checkUserAuth } from "../../../../middlewares/auth.middlewares.js";
import { onRampInr } from "../../../../controllers/user/onRampInr.controllers.js";
import { buyOption } from "../../../../controllers/user/buyOption.controllers.js";
import { sellOption } from "../../../../controllers/user/sellOption.controllers.js";

export const userRoutes = new Hono()
  .use(checkUserAuth)
  .post("/onramp/inr", onRampInr)
  .post("/buy", buyOption)
  .post("/sell", sellOption)
  .post("/cancel/buy",)
  .post("/cancel/sell",)
