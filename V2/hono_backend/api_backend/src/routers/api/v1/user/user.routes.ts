import { Hono } from "hono";
import { checkUserAuth } from "../../../../middlewares/auth.middlewares.js";
import { onRampInr } from "../../../../controllers/user/onRampInr.controllers.js";

export const userRoutes = new Hono()
  .use(checkUserAuth)
  .post("/onramp/inr", onRampInr)
  .post("/buy",)
  .post("/sell",)
  .post("/cancel/buy",)
  .post("/cancel/sell",)
