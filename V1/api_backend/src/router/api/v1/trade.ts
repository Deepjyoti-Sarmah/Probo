import { Router } from "express";
import { mintFreshToken } from "../../../controller/mintFreshToken";

export const tradeRouter = Router();

tradeRouter.post("/mint", mintFreshToken);