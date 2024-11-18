import { Router } from "express";
import { resetValues } from "../../../controller/resetValues";

export const resetRouter = Router();

resetRouter.post("/", resetValues);