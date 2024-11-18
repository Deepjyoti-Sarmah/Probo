import { Router } from "express";
import { createStockEntry } from "../../../controller/createStockEntry";

export const symbolRouter = Router()

symbolRouter.post("/create/:stockSymbol", createStockEntry)