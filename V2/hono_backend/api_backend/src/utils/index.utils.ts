import { subscriber } from "../redis.js"
import type { Context } from "hono";

export const TaskQueue = "taskQueue";
export const TimeOutMs = 5000;

export const handlePubSubWithTimeout = (channel: string, timeOutMs: number) => {
  return new Promise((resolve, reject) => {
    const timeOut = setTimeout(() => {
      subscriber.unsubscribe(channel)
      reject(new Error("Response time out"))
    }, timeOutMs)

    subscriber.subscribe(channel, (message: any) => {
      clearTimeout(timeOut)
      subscriber.unsubscribe(channel)
      resolve(message)
    })
  })
}

export const getJsonStringifyData = (data: any) => JSON.stringify(data)

export const sendResponse = (c: Context, payload: any) => {
  try {
    const { error, ...data } = JSON.parse(payload)
    if (error)
      return c.json({ message: error }, { status: 400 })

    return c.json({ data }, { status: 200 })

  } catch (error) {
    return c.json({ message: "Invalid response from the server" }, { status: 500 })
  }
}
