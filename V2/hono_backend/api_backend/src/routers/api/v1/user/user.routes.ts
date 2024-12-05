import { Hono } from "hono";
import { checkUserAuth } from "../../../../middlewares/auth.middlewares.js";
import { onRampInr } from "../../../../controllers/user/onRampInr.controllers.js";
import { buyOption } from "../../../../controllers/user/buyOption.controllers.js";
import { sellOption } from "../../../../controllers/user/sellOption.controllers.js";
import { cancelBuyOption } from "../../../../controllers/user/cancelBuyOption.controllers.js";
import { cancelSellOption } from "../../../../controllers/user/cancelSellOption.controllers.js";
import { logout } from "../../../../controllers/auth/logout.controllers.js";

export const userRoutes = new Hono()
  .use(checkUserAuth)
  .post("/onramp/inr", onRampInr)
  .post("/buy", buyOption)
  .post("/sell", sellOption)
  .post("/cancel/buy", cancelBuyOption)
  .post("/cancel/sell", cancelSellOption)
  .post("/logout", logout)
