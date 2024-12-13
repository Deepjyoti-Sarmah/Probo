import { env } from "process";
import { createClient } from "redis";

let client: any
let subscriber: any
async function redisClient() {

  const redisUrl = env.REDIS_URL || "redis://localhost:6379"
  try {
    client = createClient({ url: redisUrl })
    subscriber = createClient({ url: redisUrl })

    await client.connect()
    await subscriber.connect()

    client.on("error",
      (err: Error) => console.error("Redis client error ", err)
    );
  } catch (error) {
    return console.error("Error conecting to redis", error)
  }
}

redisClient();

export { client, subscriber }
