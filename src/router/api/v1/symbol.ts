import { Router } from "express";
import { createStockEntry } from "../../../controller/stocks/createStockEntry";

export const symbolRouter = Router()

symbolRouter.post("/create/:stockSymbol", createStockEntry)