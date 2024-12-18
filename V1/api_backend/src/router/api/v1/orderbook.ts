import { Router } from "express";
import { getOrderbook } from "../../../controller/orderBooks/getOrderbook";
import { getOrderbookById } from "../../../controller/orderBooks/getOrderbookById";

export const orderBookRouter = Router();

orderBookRouter.get("", getOrderbook);

orderBookRouter.get("/:stockSymbol", getOrderbookById);
