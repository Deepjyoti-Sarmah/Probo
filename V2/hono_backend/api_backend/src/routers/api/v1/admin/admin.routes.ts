import { Hono } from "hono";
import { checkAdminAuth } from "../../../../middlewares/auth.middlewares.js";
import { createMarket } from "../../../../controllers/admin/createMarket.controllers.js";
import { createCategory } from "../../../../controllers/admin/createCategory.contollers.js";
import { createMint } from "../../../../controllers/admin/createMint.controllers.js";

export const adminRoutes = new Hono()
  .use(checkAdminAuth)
  .post("/create/catagory", createCategory)
  .post("/create/market", createMarket)
  .post("/mint", createMint)

