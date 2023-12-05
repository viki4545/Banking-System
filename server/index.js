import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./src/Config/conn.js";
import { userRouter } from "./src/Router/userRouter.js";
import { bankerRouter } from "./src/Router/bankerRouter.js";

const PORT = process.env.PORT || 5000;
// const BASE_URL = process.env.BASE_URL;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [`${BASE_URL}`],
    credentials: true,
  })
);
app.use(cookieParser());
connectDB;

// Server running test route
app.get("/", (req, res) => {
  res.status(200).json({ data: "ok" });
});

app.use("user", userRouter);
app.use("banker", bankerRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
