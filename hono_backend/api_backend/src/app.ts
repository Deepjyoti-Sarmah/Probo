import { Hono } from "hono"
import { prettyJSON } from 'hono/pretty-json'
import { router } from "./router/api/v1/index.js"
import { config } from "dotenv"

const app = new Hono()
app.use(prettyJSON())
config()

app.get('/', (c) => {
  return c.text('Server running')
})

app.use("/api/v1/", router)

export default app;

