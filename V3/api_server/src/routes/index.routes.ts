import { Hono } from "hono";

//routes
import authRoute from "./auth/auth.routes.js";
import adminRoute from "./admin/admin.routes.js";
import userRoute from "./user/user.routes.js";

const routes = new Hono().basePath("api/v1/")

routes.route("/auth", authRoute)
routes.route("/admin", adminRoute)
routes.route("/user", userRoute)

export default routes;
