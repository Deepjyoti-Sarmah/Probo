import type { Context, Next } from "hono";
import { Jwt } from "hono/utils/jwt";
import env from "../utils/env.js";

interface UserPayload {
  userId: string;
  role: "Admin" | "User";
}

export const authMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ message: "Missing or invalid authorization token" }, 401)
  }

  const token = authHeader.split(" ")[1]

  try {

    const decoded = await Jwt.verify(token, env.JWT_SECRET || "") as unknown as UserPayload

    c.set("userId", decoded.userId)
    c.set("role", decoded.role)

    if (decoded.role === "Admin") {
      await next()
    } else if (decoded.role === "User") {
      await next()
    } else {
      return c.json({ message: "Unauthorized" }, 403)
    }
  } catch (error) {
    return c.json({ message: "Invalid authorization token" }, 401)
  }
}
