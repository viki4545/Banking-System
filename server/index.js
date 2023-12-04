import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./src/Config/conn.js";
import { userRouter } from "./src/Router/userRouter.js";
import { bankerRouter } from "./src/Router/bankerRouter.js";

const PORT = 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
connectDB;

// Server running test route
app.get("/", (req, res) => {
  res.status(200).json({ data: "ok" });
});

app.use("/user", userRouter);
app.use("/banker", bankerRouter);

app.listen(5000, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
