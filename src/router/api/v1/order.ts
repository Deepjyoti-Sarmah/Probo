import { Router } from "express";
import { BuyOrderForYes } from "../../../controller/BuyOrderForYes";

export const orderRouter = Router();

orderRouter.post("/sell", BuyOrderForYes);