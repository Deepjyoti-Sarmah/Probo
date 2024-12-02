import { Hono } from "hono";

export const authRoutes = new Hono()
  .post("/register",)
  .post("/login",)
  .post("/logout",)
