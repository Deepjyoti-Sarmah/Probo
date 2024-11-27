import { Router } from "express";
import { createUserEntry } from "../../../controller/users/createUser";

export const userRouter = Router();

userRouter.post("/create/:userId", createUserEntry);
