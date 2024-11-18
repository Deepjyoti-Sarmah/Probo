import { Router } from "express";
import { createUserEntry } from "../../../controller/createUser";

export const userRouter = Router();

userRouter.post("/create/:userId", createUserEntry);