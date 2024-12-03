import { Hono } from "hono"
import { prettyJSON } from 'hono/pretty-json'
import { router } from "./routers/api/v1/index.routes.js"
import { config } from "dotenv"
import { cors } from "hono/cors"

const app = new Hono().basePath("/api")
app.use(prettyJSON())
app.use(cors())
config()

app.get('/', (c) => {
  return c.text('Server running')
})

app.route("/v1", router)

export default app;

