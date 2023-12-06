import bcrypt from "bcrypt";
import { conn } from "../Config/conn.js";
import jwt from "jsonwebtoken";

const saltRounds = 10;

const registerController = async (req, res, next) => {
  try {
    const [rows] = await conn
      .promise()
      .execute("SELECT * FROM users WHERE email = ? AND usertype = ?", [
        req.body.email,
        req.body.usertype,
      ]);
    if (rows.length > 0) {
      return res.json({ error: "Account already exists" });
    }
    const sql =
      "INSERT INTO users (`name`, `email`, `password`, `usertype`) VALUES(?,?,?,?)";
    bcrypt.hash(req.body.password.toString(), saltRounds, async (err, hash) => {
      if (err) {
        return res.json({ error: "Error in hashing password" });
      }
      const values = [req.body.name, req.body.email, hash, req.body.usertype];
      try {
        const [user] = await conn.promise().execute(sql, values);
        if (user) {
          return res.status(200).json({
            status: "SUCCESS",
          });
        } else {
          return res.json({
            error: "Error while inserting data into db",
          });
        }
      } catch (error) {
        return res.json({
          error: "Error while inserting data into db",
        });
      }
    });
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  try {
    const sql = "SELECT * FROM  users WHERE email = ? AND usertype = ?";
    conn.query(sql, [req.body.email, req.body.usertype], (err, data) => {
      if (err) return res.json({ error: "Login error in server" });
      if (data.length > 0) {
        bcrypt.compare(
          req.body.password.toString(),
          data[0].password,
          (err, response) => {
            if (err) return res.json({ error: "Password compare error" });
            if (response) {
              const name = data[0].name;
              const email = data[0].email;
              const usertype = data[0].usertype;
              const token = jwt.sign(
                { name, email, usertype },
                "jwt-secret-key",
                {
                  expiresIn: "1d",
                }
              );
              res
                .status(200)
                .cookie("token", token, {
                  secure: false,
                  httpOnly: true,
                  sameSite: "lax",
                  path: "/",
                  overwrite: true,
                })
                .json({
                  status: "SUCCESS",
                });
            } else {
              return res.json({
                error: "Password doesn't matched",
              });
            }
          }
        );
      } else {
        return res.json({ error: "No email existed" });
      }
    });
  } catch (error) {
    next(error);
  }
};

const logoutController = (req, res, next) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ status: "SUCCESS" });
  } catch (error) {
    next(error);
  }
};

const getUserByEmailController = async (req, res, next) => {
  try {
    const email = req.body.email;
    const usertype = req.body.usertype;
    if (!email || !usertype) {
      return res.json({ error: "Email and usertype are required parameters" });
    }

    const [rows] = await conn
      .promise()
      .execute(
        "SELECT balance, id AS user_id FROM users WHERE email = ? AND usertype = ?",
        [email, usertype]
      );
    if (rows.length > 0) {
      const userId = rows[0].user_id;
      const balance = rows[0].balance;
      res
        .status(200)
        .json({ status: "SUCCESS", user_id: userId, balance: balance });
    } else {
      return res.json({ error: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};

const depositController = async (req, res, next) => {
  try {
    const userId = req.body.user_id;
    const depositAmount = req.body.amount;
    const transactionType = req.body.transaction_type;

    if (
      !userId ||
      !depositAmount ||
      isNaN(depositAmount) ||
      depositAmount <= 0
    ) {
      return res.json({ error: "Invalid user_id or amount provided" });
    }

    const [userRows] = await conn
      .promise()
      .execute("SELECT * FROM users WHERE id = ?", [userId]);

    if (userRows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const currentBalance = userRows[0].balance;
    const newBalance = parseFloat(currentBalance) + parseFloat(depositAmount);

    await conn
      .promise()
      .execute("UPDATE users SET balance = ? WHERE id = ?", [
        newBalance,
        userId,
      ]);

    const validTransactionTypes = ["Deposit", "WithDraw"];
    if (!validTransactionTypes.includes(transactionType)) {
      return res.json({ error: "Invalid transaction_type" });
    }

    await conn
      .promise()
      .execute(
        "INSERT INTO accounts (user_id, transaction_type, amount) VALUES (?, ?, ?)",
        [userId, transactionType, depositAmount]
      );

    return res.status(200).json({ status: "SUCCESS", new_balance: newBalance });
  } catch (error) {
    next(error);
  }
};

const withdrawController = async (req, res, next) => {
  try {
    const userId = req.body.user_id;
    const withdrawAmount = req.body.amount;
    const transactionType = req.body.transaction_type;

    if (
      !userId ||
      !withdrawAmount ||
      isNaN(withdrawAmount) ||
      withdrawAmount <= 0
    ) {
      return res.json({ error: "Invalid user_id or amount provided" });
    }

    const [userRows] = await conn
      .promise()
      .execute("SELECT * FROM users WHERE id = ?", [userId]);

    if (userRows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const currentBalance = userRows[0].balance;
    let newBalance;
    if (parseFloat(currentBalance) < parseFloat(withdrawAmount)) {
      return res.json({ error: "Insufficient Funds" });
    } else {
      newBalance = parseFloat(currentBalance) - parseFloat(withdrawAmount);
    }

    await conn
      .promise()
      .execute("UPDATE users SET balance = ? WHERE id = ?", [
        newBalance,
        userId,
      ]);

    const validTransactionTypes = ["Deposit", "Withdraw"]; // Add other valid types if needed
    if (!validTransactionTypes.includes(transactionType)) {
      return res.json({ error: "Invalid transaction_type" });
    }

    await conn
      .promise()
      .execute(
        "INSERT INTO accounts (user_id, transaction_type, amount) VALUES (?, ?, ?)",
        [userId, transactionType, withdrawAmount]
      );

    return res.status(200).json({ status: "SUCCESS", new_balance: newBalance });
  } catch (error) {
    next(error);
  }
};

const transactionController = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const [rows] = await conn
      .promise()
      .execute("SELECT * FROM accounts WHERE user_id = ?", [userId]);

    if (rows.length > 0) {
      return res.status(200).json({
        status: "SUCCESS",
        transactions: rows,
      });
    } else {
      return res.json({
        error: "transaction not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

export {
  registerController,
  loginController,
  logoutController,
  getUserByEmailController,
  depositController,
  transactionController,
  withdrawController,
};
