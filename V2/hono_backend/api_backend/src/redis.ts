import { env } from "process";
import { createClient } from "redis";

let client: any;
let subscriber: any;
async function redisClient() {
  const redis_url = env.REDIS_URL || "redis://localhost:6379"

  client = createClient({ url: redis_url })
  subscriber = createClient({ url: redis_url })

  await client.connect()
  await subscriber.connect()

  client.on('error', (err: Error) => console.log("Redis Client Error", err))
}

redisClient()

export { client, subscriber }
