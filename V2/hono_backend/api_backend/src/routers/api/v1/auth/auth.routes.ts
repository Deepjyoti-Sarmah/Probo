import { Hono } from "hono";
import { signup } from "../../../../controllers/auth/signup.controllers.js";
import { login } from "../../../../controllers/auth/login.controllers.js";

export const authRoutes = new Hono()
  .post("/register", signup)
  .post("/login", login)
