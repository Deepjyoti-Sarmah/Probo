import type { Context, Next } from "hono";
import { Jwt } from "hono/utils/jwt";
import { env } from "process";

export const checkAdminAuth = async (c: Context, next: Next) => {
  let token;

  token = c.req.header("Authorization")?.replace(/Bearer\s+/i, "")

  if (!token) {
    return c.json({ message: "Not authorized to access this route" }, { status: 403 })
  }

  try {
    const decoded = await Jwt.verify(token, env.JWT_SECRET || "") as {
      role: string,
      userId: string
    }

    if (decoded.role != "Admin") {
      return c.json({ message: "Unauthorized" }, { status: 403 })
    }

    c.set("userId", decoded.userId)
    await next()
  } catch (error) {
    throw new Error("Invalid token! You are not authorized");
  }
}

export const checkUserAuth = async (c: Context, next: Next) => {
  let token;

  token = c.req.header("Authorization")?.replace(/Bearer\s+/i, "")

  if (!token) {
    return c.json({ message: "Not authorized to access this route" }, { status: 403 })
  }

  try {
    const decoded = await Jwt.verify(token, env.JWT_SECRET || "") as {
      role: string,
      userId: string
    }

    // if (decoded.role != "User") {
    //   return c.json({ status: 403, message: "Unauthorized" })
    // }

    c.set("userId", decoded.userId)
    await next()
  } catch (error) {
    throw new Error("Invalid token! You are not authorized");
  }
}
