import { Router } from "express";
import { BuyOrder } from "../../../controller/orders/BuyOrder";
import { SellOrder } from "../../../controller/orders/SellOrder";
export const orderRouter = Router();

orderRouter.post("/buy", BuyOrder);

orderRouter.post("/sell", SellOrder);

