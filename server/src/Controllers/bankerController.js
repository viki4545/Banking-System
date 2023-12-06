import bcrypt from "bcrypt";
import { conn } from "../Config/conn.js";
import jwt from "jsonwebtoken";

const saltRounds = 10;

const bankerRegisterController = async (req, res, next) => {
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
        const [banker] = await conn.promise().execute(sql, values);
        if (banker) {
          res.status(200).json({
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

const bankerLoginController = (req, res, next) => {
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
              res.cookie("token", token);
              return res.status(200).json({
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

const bankerLogoutController = (req, res, next) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ status: "SUCCESS" });
  } catch (error) {
    next(error);
  }
};

const accountsController = async (req, res, next) => {
  try {
    const sql = `SELECT * from users WHERE usertype = "User"`;
    const [banker] = await conn.promise().execute(sql);
    if (banker.length > 0) {
      res.status(200).json({
        status: "SUCCESS",
        accounts: banker,
      });
    } else {
      res.json({
        error: "No user found",
      });
    }
  } catch (error) {
    next(error);
  }
};

const transactionHistoryController = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const sql = "SELECT * from accounts WHERE user_id = ?";
    const [transaction] = await conn.promise().execute(sql, [userId]);
    if (transaction.length > 0) {
      res.status(200).json({
        status: "SUCCESS",
        history: transaction,
      });
    } else {
      res.json({
        error: "no transaction found",
      });
    }
  } catch (error) {
    next(error);
  }
};

export {
  bankerRegisterController,
  bankerLoginController,
  bankerLogoutController,
  accountsController,
  transactionHistoryController,
};
