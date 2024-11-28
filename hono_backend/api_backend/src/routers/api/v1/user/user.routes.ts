import { Hono } from "hono";

export const userRoutes = new Hono()
  .post("/onramp/inr",)
  .post("/buy",)
  .post("/sell",)
  .post("/cancel/buy",)
  .post("/cancel/sell",)
