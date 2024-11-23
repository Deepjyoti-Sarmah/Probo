import { Router } from "express";
import { getBalnce } from "../../../controller/balances/getBalance";
import { getUserInrBalance } from "../../../controller/balances/getUserInrBalance";
import { getUserStockBalance } from "../../../controller/balances/getUserStockBalance";
import { getStockBalance } from "../../../controller/balances/getBalanceStock";

export const balanceRouter = Router();

balanceRouter.get("/inr", getBalnce)

balanceRouter.get("/stock", getStockBalance)

balanceRouter.get("/inr/:userId", getUserInrBalance)

balanceRouter.get("/stock/:userId", getUserStockBalance)
