import { Hono } from "hono";
import { authRoutes } from "./auth/auth.routes.js";
import { adminRoutes } from "./admin/admin.routes.js";
import { userRoutes } from "./user/user.routes.js";

export const router = new Hono();

router.route("/auth", authRoutes)
router.route("/admin", adminRoutes)
router.route("/user", userRoutes)



