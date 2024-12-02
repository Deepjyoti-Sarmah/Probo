import express from "express";
import dotenv from "dotenv";
import { WebSocket, WebSocketServer } from "ws";
import { client, subscriber } from "./redis";
dotenv.config({});

const app = express();

let userSubscriptions: Map<string, Set<WebSocket>> = new Map();

const httpServer = app.listen(process.env.PORT || 8080);
const wss = new WebSocketServer({ server: httpServer })

wss.on("connection", (ws) => {
  ws.on("error", console.error)

  ws.on("message", (message) => {
    handleMessage(message, ws)
  })

  ws.on("close", () => {
    console.log("Client disconnected");

    for (const stockSymbol of userSubscriptions.keys()) {
      const listener = userSubscriptions.get(stockSymbol)

      if (listener) {
        client.unsubscribe(`orderbook.${stockSymbol}`);
      }
    }

    userSubscriptions.clear();
  })
})

let response: any;

const handleMessage = async (message: any, ws: WebSocket) => {
  try {
    const decodeMessage = message.toString();
    const { type, stockSymbol } = JSON.parse(decodeMessage);

    if (type === "subscribe") {
      if (!userSubscriptions.has(stockSymbol)) {
        userSubscriptions.set(stockSymbol, new Set<WebSocket>([ws]))
      } else {
        userSubscriptions.get(stockSymbol)?.add(ws)
      }
    }

    if (type === "unsubscribe") {
      await client.unsubscribe(`orderbook.${stockSymbol}`);
    }

    await subscriber.subscriber("order", (message: string) => {
      response = JSON.parse(message);

      userSubscriptions.get(stockSymbol)!.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          const data = {
            event: "event_orderbook_update",
            message: response
          }

          client.send(JSON.stringify(data));
        }
      })
    })
  } catch (error) {
    console.error(error)
  }

}
