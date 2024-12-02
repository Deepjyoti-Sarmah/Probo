import dotenv from "dotenv";
import { client, subscriber } from "./redis";
import { getJsonStringifyData } from "./utils";
import { doUserCreate } from "./services/userEngine";
import { doBalance } from "./services/balanceEngine";
import { doSymbolCreate } from "./services/symbolEngine";
import { doMint } from "./services/mintEngine";
import { doOnRamp } from "./services/onRampEngine";
import { doOrder } from "./services/orderEngine";
import { doReset } from "./services/resetEngine";
import { getOrderbook } from "./services/orderbookEngine";
dotenv.config({})

let processData;
const processTask = async (data: any) => {
  const { requestType } = JSON.parse(data);

  switch (requestType) {
    case "balance":
      processData = await doBalance(data);
      client.publish("balance", getJsonStringifyData(processData));
      break;

    case "user":
      processData = await doUserCreate(data);
      client.publish("user", getJsonStringifyData(processData));
      break;

    case "symbol":
      processData = await doSymbolCreate(data);
      client.publish("symbol", getJsonStringifyData(processData));
      break;

    case "mint":
      processData = await doMint(data);
      client.publish("mint", getJsonStringifyData(processData));
      break;

    case "onRamp":
      processData = await doOnRamp(data);
      client.publish("onRamp", getJsonStringifyData(processData));
      break;

    case "order":
      processData = await doOrder(data);
      client.publish("order", getJsonStringifyData(processData));
      break;

    case "reset":
      processData = await doReset();
      client.publish("reset", getJsonStringifyData(processData));
      break;

    case "orderBook":
      processData = await getOrderbook(data);
      client.publish("orderBook", getJsonStringifyData(processData));
      break;
  }
}

const worker = async () => {
  while (true) {
    try {
      const data = await subscriber.brPop("taskQueue", 0);
      if (data) {
        await processTask(data?.element)
      }
    } catch (error) {
      console.error(error)
    }
  }
}

worker();
