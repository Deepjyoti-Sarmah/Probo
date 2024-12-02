import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./router/api/v1";
dotenv.config({})

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
