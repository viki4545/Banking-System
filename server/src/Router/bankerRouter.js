import Router from "express";
import {
  accountsController,
  bankerLoginController,
  bankerLogoutController,
  bankerRegisterController,
  transactionHistoryController,
} from "../Controllers/bankerController.js";
import jwt from "jsonwebtoken";

const bankerRouter = Router();

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({ error: "You are not authenticated" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.status(400).json({ error: "token error" });
      } else {
        req.name = decoded.name;
        req.email = decoded.email;
        req.usertype = decoded.usertype;
        next();
      }
    });
  }
};

bankerRouter.post("/register", bankerRegisterController);
bankerRouter.post("/login", bankerLoginController);
bankerRouter.get("/logout", bankerLogoutController);
bankerRouter.get("/accounts", accountsController);
bankerRouter.get("/transactionHistory/:userId", transactionHistoryController);

export { bankerRouter };
