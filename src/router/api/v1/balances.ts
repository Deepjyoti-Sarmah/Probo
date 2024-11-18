import { Router } from "express";
import { getBalnce } from "../../../controller/getBalance";
import { getUserInrBalance } from "../../../controller/getUserInrBalance";
import { getUserStockBalance } from "../../../controller/getUserStockBalance";
import { getBalanceStock } from "../../../controller/getBalanceStock";

export const balanceRouter = Router();

balanceRouter.get("/inr", getBalnce)

balanceRouter.get("/stock", getBalanceStock)

balanceRouter.get("/inr/:userId", getUserInrBalance)

balanceRouter.get("/stock/:userId", getUserStockBalance)