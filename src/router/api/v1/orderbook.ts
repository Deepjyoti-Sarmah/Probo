import { Router } from "express";
import { getOrderbook } from "../../../controller/getOrderbook";

export const orderBookRouter = Router();

orderBookRouter.get("", getOrderbook);