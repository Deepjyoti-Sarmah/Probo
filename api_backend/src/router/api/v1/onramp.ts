import { Router } from "express";
import { onrampInr } from "../../../controller/onrampInr";

export const onrampRouter = Router();

onrampRouter.post("/inr", onrampInr);