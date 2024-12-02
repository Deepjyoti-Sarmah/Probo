import { Hono } from "hono";
import { checkAdminAuth } from "../../../../middlewares/auth.middlewares.js";
import { createCatagory } from "../../../../controllers/createCatagory.contollers.js";
import { createMarket } from "../../../../controllers/admin/createMarket.controllers.js";

export const adminRoutes = new Hono()
  .use(checkAdminAuth)
  .post("/create/catagory", createCatagory)
  .post("/create/market", createMarket)
  .post("/mint",)

