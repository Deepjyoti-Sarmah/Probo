import express from "express";
import { router } from "./router/api/v1";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({})

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;

export const INR_BALANCES: any = {};
export const ORDERBOOK: any = {};
export const STOCK_BALANCE: any = {}

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
