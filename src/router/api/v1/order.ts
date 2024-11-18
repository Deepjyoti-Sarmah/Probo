import { Router } from "express";
import { BuyOrderForYes } from "../../../controller/BuyOrderForYes";
import { SellOrderForYes } from "../../../controller/SellOrderForYes";
import { BuyOrderForNo } from "../../../controller/BuyOrderForNo";
import { SellOrderForNo } from "../../../controller/SellOrderForNo";

export const orderRouter = Router();

orderRouter.post("/buy", BuyOrderForYes);

orderRouter.post("/sell", SellOrderForYes);

orderRouter.post("/buy", BuyOrderForNo);

orderRouter.post("/sell", SellOrderForNo);