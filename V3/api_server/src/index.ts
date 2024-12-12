import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono().basePath("/api/v1")

app.get('/', (c) => {
  return c.text('Server is running')
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
