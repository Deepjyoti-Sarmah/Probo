import { Router } from "express";
import { getBalnce } from "../../../controller/balances/getBalance";
import { getBalanceStock } from "../../../controller/balances/getBalanceStock";
import { getUserInrBalance } from "../../../controller/balances/getUserInrBalance";
import { getUserStockBalance } from "../../../controller/balances/getUserStockBalance";

export const balanceRouter = Router();

balanceRouter.get("/inr", getBalnce)

balanceRouter.get("/stock", getBalanceStock)

balanceRouter.get("/inr/:userId", getUserInrBalance)

balanceRouter.get("/stock/:userId", getUserStockBalance)
