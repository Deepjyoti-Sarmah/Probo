import { serve } from '@hono/node-server'
import env from './env.js'
import app from './app.js'

const port = env.PORT || 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
