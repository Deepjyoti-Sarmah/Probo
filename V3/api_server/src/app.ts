import { Hono } from "hono";

//routes
import routes from "./routes/index.routes.js";

const app = new Hono()

app.get("/", (c) => {
  return c.text("Server is running...")
})

app.route("/", routes)


export default app;
