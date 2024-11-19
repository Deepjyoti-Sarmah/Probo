import { Router } from "express";
import { getOrderbook } from "../../../controller/getOrderbook";
import { getOrderbookById } from "../../../controller/getOrderbookById";

export const orderBookRouter = Router();

orderBookRouter.get("", getOrderbook);

orderBookRouter.get("/:stockSymbol", getOrderbookById);