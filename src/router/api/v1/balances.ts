import { Router } from "express";
import { getBalnce } from "../../../controller/getBalance";
import { getUserInrBalance } from "../../../controller/getUserInrBalance";

export const balanceRouter = Router();

balanceRouter.get("/inr", getBalnce)

balanceRouter.get("/stock", getBalnce)

balanceRouter.get("/inr/:userId", getUserInrBalance)