import { Router } from "express";
import { userRouter } from "./user";
import { symbolRouter } from "./symbol";
import { orderBookRouter } from "./orderbook";
import { balanceRouter } from "./balances";
import { resetRouter } from "./reset";
import { onrampRouter } from "./onramp";
import { orderRouter } from "./order";
import { tradeRouter } from "./trade";

export const router = Router();

router.use("/user", userRouter)
router.use("/symbol", symbolRouter)
router.use("/orderbook", orderBookRouter)
router.use("/balances", balanceRouter)
router.use("/reset", resetRouter)
router.use("/onramp", onrampRouter)
router.use("/order", orderRouter)
router.use("/trade", tradeRouter)

