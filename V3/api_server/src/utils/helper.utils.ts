import { subscriber } from "../redis.js";
import type { Context } from "hono";

export const handlePubSubWithTimeout = (channel: string, timeoutMs: number) => {
  return new Promise((resolve, reject) => {

    const timeOut = setTimeout(() => {
      subscriber.unsubscribe(channel)
      reject(new Error("Response time out "))
    }, timeoutMs)

    subscriber.subscribe(channel, (message: any) => {
      clearTimeout(timeOut)
      subscriber.unsubscribe(channel)
      resolve(message)
    })
  })
}

export const stringifyJsonData = (data: any) => JSON.stringify(data);

export const sendResponse = (c: Context, payload: any) => {
  try {
    const { error, ...data } = JSON.parse(payload)

    if (error) {
      return c.json({ message: error }, 400)
    }

    return c.json({ data }, 200)
  } catch (error) {
    return c.json({ message: "Invalid response from sendResponse" }, 500)
  }
}

export const TimeoutMs: number = 5000;
export const TaskQueue: string = "taskQueue";
export const AuthQueue: string = "authQueue";
