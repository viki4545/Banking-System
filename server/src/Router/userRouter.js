import Router from "express";
import {
  depositController,
  getUserByEmailController,
  loginController,
  logoutController,
  registerController,
  transactionController,
  withdrawController,
} from "../Controllers/userController.js";
import jwt from "jsonwebtoken";

const userRouter = Router();

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ error: "You are not authenticated" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json({ error: "token error" });
      } else {
        req.name = decoded.name;
        req.email = decoded.email;
        req.usertype = decoded.usertype;
        next();
      }
    });
  }
};

userRouter.post("/register", registerController);
userRouter.post("/login", loginController);
userRouter.get("/logout", logoutController);
userRouter.post("/getUserByEmail", verifyUser, getUserByEmailController);
userRouter.post("/deposit", verifyUser, depositController);
userRouter.post("/withdraw", verifyUser, withdrawController);
userRouter.get("/transaction/:userId", verifyUser, transactionController);
export { userRouter };
